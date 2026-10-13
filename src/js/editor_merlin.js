/**
 * Merlin support for the editor: completion, type on hover and errors.
 * Merlin runs in a Web Worker (merlin/merlin_worker.js, built from merlin_build/), and reads
 * the .cmi files of the libraries from merlin/cmis/. Until it is ready, or if it fails,
 * the editor keeps its simple completion (see ocaml_completions in editor_cm6.js).
 */

let merlin_worker = null;
let merlin_is_ready = false;
let merlin_next_id = 0;
let merlin_pending = new Map();

// Settings (configuration panel), on by default
function merlin_enabled() {
    return localStorage.getItem("betterocaml-merlin") !== "false";
}

function merlin_hover_enabled() {
    return localStorage.getItem("betterocaml-merlin-hover") !== "false";
}

function start_merlin() {
    if (merlin_worker !== null || !window.Worker || !merlin_enabled()) return;
    try {
        merlin_worker = new Worker("merlin/merlin_worker.js");
    } catch (e) {
        console.warn("Merlin is not available", e);
        return;
    }
    merlin_worker.onmessage = function (e) {
        let m = e.data;
        if (m.type === "ready") {
            merlin_is_ready = true;
            // Show the errors of the code already in the editors
            for (let i in editors) {
                editors[i].view.dispatch({effects: merlin_refresh.of(null)});
                CM.forceLinting(editors[i].view);
            }
            return;
        }
        let resolve = merlin_pending.get(m.id);
        merlin_pending.delete(m.id);
        if (m.error !== undefined) console.warn("Merlin error:", m.error);
        if (resolve) resolve(m.error === undefined ? m.result : null);
    };
    merlin_worker.onerror = function (e) {
        console.warn("Merlin worker failed", e);
        merlin_is_ready = false;
        for (const resolve of merlin_pending.values()) resolve(null);
        merlin_pending.clear();
    };
}

/**
 * Stop merlin (disabled in the settings): back to the simple completion, no errors shown
 */
function stop_merlin() {
    if (merlin_worker !== null) merlin_worker.terminate();
    merlin_worker = null;
    merlin_is_ready = false;
    for (const resolve of merlin_pending.values()) resolve(null);
    merlin_pending.clear();
    // Remove the errors already shown
    for (let i in editors) {
        editors[i].view.dispatch(CM.setDiagnostics(editors[i].view.state, []));
    }
}

/**
 * Ask merlin about the editor content
 * @param {string} type - "complete", "type" or "errors"
 * @param {EditorState} state - Editor state
 * @param {number} offset - Position in the document
 * @return {Promise} The answer, or null if merlin is not available
 */
function merlin_request(type, state, offset) {
    if (!merlin_is_ready) return Promise.resolve(null);
    let id = merlin_next_id++;
    return new Promise(function (resolve) {
        merlin_pending.set(id, resolve);
        merlin_worker.postMessage({id: id, type: type, source: state.doc.toString(), offset: offset});
    });
}

// CodeMirror completion icons for merlin's kinds of entries
function merlin_completion_type(kind, detail) {
    switch (kind) {
        case "value": return /->/.test(detail) ? "function" : "variable";
        case "constructor": case "variant": return "enum";
        case "label": return "property";
        case "module": return "namespace";
        case "modtype": return "interface";
        case "type": return "type";
        case "method": return "method";
        default: return "keyword";
    }
}

/**
 * Completion with merlin, or with the simple completion while merlin is not ready
 */
async function merlin_completions(editor, context) {
    if (!merlin_is_ready) return ocaml_completions(editor, context);
    if (!context.explicit && !editor.ext_autocomplete) return null;
    // Only after an identifier or a module path, unless asked with Ctrl-Space
    if (!context.explicit && !context.matchBefore(/[\w'.]+$/)) return null;
    let r = await merlin_request("complete", context.state, context.pos);
    if (context.aborted) return null;
    if (r === null || r.options.length === 0) {
        // If typing went on while merlin was busy, CodeMirror drops this query
        // without asking again for the new text: ask again
        if (context.view && context.view.state.doc !== context.state.doc) {
            setTimeout(() => CM.startCompletion(context.view), 0);
        }
        return null;
    }
    return {
        from: r.from,
        options: r.options.map(o => ({
            label: o.label,
            type: merlin_completion_type(o.kind, o.detail),
            detail: o.detail,
            info: o.info || undefined, // Documentation, shown next to the list
        })),
        // Typing more letters filters this list instead of asking merlin again
        validFor: /^[\w']*$/,
    };
}

/**
 * Type and documentation of the expression under the mouse
 */
const merlin_hover = CM.hoverTooltip(async function (view, pos, side) {
    if (!merlin_is_ready || !merlin_hover_enabled()) return null;
    let line = view.state.doc.lineAt(pos);
    let ch = line.text.charAt(pos - line.from - (side < 0 ? 1 : 0));
    if (!/[\w'.)\]}]/.test(ch)) return null;
    let [types, doc] = await Promise.all([
        merlin_request("type", view.state, pos),
        merlin_request("document", view.state, pos),
    ]);
    if (types === null || types.length === 0) return null;
    let t = types[0];
    return {
        pos: t.from,
        end: t.to,
        above: true,
        create() {
            let dom = document.createElement("div");
            let type = document.createElement("div");
            type.className = "cm-merlin-type";
            type.textContent = t.type;
            dom.appendChild(type);
            if (doc) {
                let d = document.createElement("div");
                d.className = "cm-merlin-doc";
                d.textContent = doc;
                dom.appendChild(d);
            }
            return {dom};
        },
    };
}, {hoverTime: 400});

/**
 * Go to the definition of the identifier at pos: in the editor, or tell which library
 * defines it (their sources are not available)
 */
async function merlin_goto_definition(view, pos) {
    if (!merlin_is_ready) {
        show_toast(merlin_enabled() ? "Merlin is loading" : "Merlin is disabled in the settings");
        return;
    }
    let r = await merlin_request("locate", view.state, pos);
    if (r !== null && r.offset !== undefined) {
        view.dispatch({selection: {anchor: r.offset}, scrollIntoView: true});
        view.focus();
    } else if (r !== null && r.file !== undefined) {
        // stdlib__List.mli -> Stdlib.List
        let module = r.file.replace(/\.mli?$/, "").split("__")
            .map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(".");
        show_toast("Defined in the library module " + module);
    } else if (r !== null && r.library !== undefined) {
        // Merlin: "'Stdlib.List.map' seems to originate from 'List' whose MLI file could not be found"
        let m = r.library.match(/^'([^']+)' seems to originate from/);
        show_toast(m ? m[1] + " is defined in the OCaml library" : r.library);
    } else {
        show_toast("Definition not found");
    }
}

const merlin_goto_keys = CM.keymap.of([
    {key: "F12", run: view => { merlin_goto_definition(view, view.state.selection.main.head); return true; }},
]);

// Ctrl-click (Cmd-click on macOS) goes to the definition
const merlin_goto_click = CM.EditorView.domEventHandlers({
    mousedown(e, view) {
        if (!(e.ctrlKey || e.metaKey) || e.button !== 0 || !merlin_is_ready) return false;
        let pos = view.posAtCoords({x: e.clientX, y: e.clientY});
        if (pos === null) return false;
        e.preventDefault();
        merlin_goto_definition(view, pos);
        return true;
    },
});

// Ask for the errors again without a change of the code (when merlin becomes ready)
const merlin_refresh = CM.StateEffect.define();

/**
 * Errors and warnings, underlined in the editor
 */
const merlin_lint = CM.linter(async function (view) {
    let r = await merlin_request("errors", view.state, 0);
    if (r === null) return [];
    let length = view.state.doc.length;
    return r.map(e => {
        let from = Math.min(e.from, length);
        let to = Math.min(Math.max(e.to, from), length);
        if (to === from && from < length) to = from + 1; // Visible even when empty
        return {from: from, to: to, severity: e.severity, message: e.message};
    });
}, {
    delay: 600,
    needsRefresh: update => update.transactions.some(tr => tr.effects.some(e => e.is(merlin_refresh))),
});

/**
 * Editor extensions using merlin
 */
function merlin_extensions() {
    return [merlin_hover, merlin_lint, CM.lintGutter(), merlin_goto_keys, merlin_goto_click];
}

// Start merlin once the page and the toplevel are loaded, so it does not slow them down
window.addEventListener("load", function () {
    setTimeout(start_merlin, 1000);
});
