/**
 * Code editor, based on CodeMirror 6 (bundled in js/codemirror6.js as the global `CM`,
 * see codemirror_build/). The rest of the page uses OCamlEditor objects through
 * getValue/setValue and the id/name/is_saved/ext_autocomplete fields.
 */

// Colors come from the CSS variables of css/theme/*.css: changing theme only swaps that file
const OCAML_EDITOR_THEME = CM.EditorView.theme({
    "&": {
        height: "100%",
        backgroundColor: "var(--editor-bg-color)",
        color: "var(--code-text-color)",
    },
    ".cm-scroller": {overflow: "auto"},
    ".cm-gutters": {
        backgroundColor: "var(--editor-gutter-bg-color)",
        color: "var(--editor-gutter-text-color)",
        border: "none",
    },
    ".cm-content": {caretColor: "var(--editor-cursor-color)"},
    ".cm-cursor, .cm-dropCursor": {borderLeftColor: "var(--editor-cursor-color)"},
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
        backgroundColor: "var(--editor-selection-bg-color)",
    },
    ".cm-selectionMatch": {backgroundColor: "var(--editor-code-highlight-color)"},
    "&.cm-focused .cm-matchingBracket": {
        backgroundColor: "transparent",
        outline: "1px solid var(--code-brackets)",
    },
    ".code-highlight": {backgroundColor: "var(--editor-code-highlight-color)"},
    ".cm-tooltip.cm-tooltip-autocomplete": {
        backgroundColor: "var(--toplevel-bg-color)",
        border: "none",
        fontSize: "var(--hint-font-size)",
    },
    ".cm-tooltip-autocomplete > ul > li": {color: "var(--code-text-color)"},
    ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
        backgroundColor: "var(--editor-selection-bg-color)",
        color: "var(--code-text-color)",
    },
    ".cm-panels": {
        backgroundColor: "var(--nav-bg-color)",
        color: "var(--ui-text-color)",
    },
    ".cm-searchMatch": {backgroundColor: "var(--editor-code-highlight-color)", outline: "1px solid var(--code-constant)"},
});

const OCAML_HIGHLIGHT = CM.HighlightStyle.define([
    {tag: CM.tags.keyword, color: "var(--code-keyword)"},
    {tag: CM.tags.operator, color: "var(--code-operator)"},
    {tag: CM.tags.standard(CM.tags.variableName), color: "var(--code-builtin)"},
    {tag: CM.tags.typeName, color: "var(--code-variable)"},
    {tag: CM.tags.variableName, color: "var(--code-variable)"},
    {tag: CM.tags.atom, color: "var(--code-atom)"},
    {tag: CM.tags.number, color: "var(--code-number)"},
    {tag: CM.tags.string, color: "var(--code-string)"},
    {tag: CM.tags.comment, color: "var(--code-comment)"},
    {tag: CM.tags.meta, color: "var(--code-meta)"},
]);

const OCAML_LANGUAGE = CM.StreamLanguage.define(CM.oCaml);

/**
 * Line that ends the phrase run by Ctrl-Enter: the first line containing ";;",
 * starting from the cursor line
 * @return {Line|null} CodeMirror line, or null if there is none
 */
function phrase_end_line(state) {
    let doc = state.doc;
    for (let n = doc.lineAt(state.selection.main.head).number; n <= doc.lines; n++) {
        let line = doc.line(n);
        if (line.text.includes(";;")) return line;
    }
    return null;
}

/**
 * Range of the phrase run by Ctrl-Enter: the last phrase ending before phrase_end_line
 * @return {{from: number, to: number}|null}
 */
function phrase_range(state) {
    let line = phrase_end_line(state);
    if (line === null) return null;
    let last = null;
    for (const m of state.sliceDoc(0, line.to).matchAll(CODE_SEPARATOR_REGEX)) last = m;
    return last && last[0].length > 0 ? {from: last.index, to: last.index + last[0].length} : null;
}

// Highlight of the phrase that Ctrl-Enter would run (kept when there is none)
const code_highlight_field = CM.StateField.define({
    create: () => CM.Decoration.none,
    update(deco, tr) {
        deco = deco.map(tr.changes);
        if (tr.docChanged || tr.selection) {
            let range = phrase_range(tr.state);
            if (range !== null) {
                deco = CM.Decoration.set([CM.Decoration.mark({class: "code-highlight"}).range(range.from, range.to)]);
            }
        }
        return deco;
    },
    provide: f => CM.EditorView.decorations.from(f),
});

class OCamlEditor {
    /**
     * @param {number} id - Editor id
     * @param {string} name - File name
     * @param {HTMLElement} parent - Element the editor is put in
     */
    constructor(id, name, parent) {
        this.id = id;
        this.name = name;
        this.is_saved = true;
        this.ext_autocomplete = localStorage.getItem("betterocaml-autocomplete") == "true";
        let editor = this;
        let run = f => () => { f(editor); return true; };

        this.view = new CM.EditorView({
            parent: parent,
            state: CM.EditorState.create({
                extensions: [
                    CM.lineNumbers(),
                    CM.highlightSpecialChars(),
                    CM.history(),
                    CM.drawSelection(),
                    CM.dropCursor(),
                    CM.EditorState.allowMultipleSelections.of(true),
                    CM.indentOnInput(),
                    CM.bracketMatching(),
                    CM.closeBrackets(),
                    CM.highlightSelectionMatches(),
                    CM.indentUnit.of("  "),
                    CM.EditorState.tabSize.of(2),
                    OCAML_LANGUAGE,
                    CM.syntaxHighlighting(OCAML_HIGHLIGHT),
                    OCAML_EDITOR_THEME,
                    code_highlight_field,
                    CM.autocompletion({
                        override: [context => ocaml_completions(editor, context)],
                        activateOnTypingDelay: 200,
                    }),
                    CM.Prec.highest(CM.keymap.of([
                        {key: "Mod-Enter", run: run(exec_last)},
                        {key: "Shift-Mod-Enter", run: run(exec_all)},
                        {key: "Mod-s", run: run(save)},
                        {key: "Mod-Space", run: CM.startCompletion},
                        {key: "Alt-f", run: CM.openSearchPanel},
                        {key: "Alt-g", run: CM.gotoLine},
                        {key: "Tab", run: insert_soft_tab, shift: CM.indentLess},
                        {key: "Backspace", run: delete_soft_tab},
                    ])),
                    CM.keymap.of([
                        ...CM.closeBracketsKeymap,
                        ...CM.defaultKeymap,
                        ...CM.searchKeymap,
                        ...CM.historyKeymap,
                        ...CM.completionKeymap,
                    ]),
                    CM.EditorView.updateListener.of(update => {
                        if (update.docChanged) editor.is_saved = false;
                    }),
                    CM.EditorView.domEventHandlers({
                        drop: (e) => editor_drop(e),
                    }),
                ],
            }),
        });
    }

    getValue() {
        return this.view.state.doc.toString();
    }

    setValue(text) {
        this.view.dispatch({changes: {from: 0, to: this.view.state.doc.length, insert: text}});
    }

    focus() {
        this.view.focus();
    }
}

/**
 * Tab: indent the selected lines, or insert spaces up to the next multiple of 2
 */
function insert_soft_tab(view) {
    let sel = view.state.selection.main;
    if (!sel.empty) return CM.indentMore(view);
    let line = view.state.doc.lineAt(sel.head);
    let spaces = 2 - ((sel.head - line.from) % 2);
    view.dispatch(view.state.update(view.state.replaceSelection(" ".repeat(spaces)), {
        scrollIntoView: true, userEvent: "input",
    }));
    return true;
}

/**
 * Backspace: delete 2 spaces at once when there are 2 spaces before the cursor
 */
function delete_soft_tab(view) {
    let sel = view.state.selection.main;
    if (!sel.empty || view.state.selection.ranges.length > 1) return false;
    let line = view.state.doc.lineAt(sel.head);
    if (sel.head - line.from >= 2 && view.state.sliceDoc(sel.head - 2, sel.head) === "  ") {
        view.dispatch({changes: {from: sel.head - 2, to: sel.head}, userEvent: "delete.backward"});
        return true;
    }
    return false;
}

/**
 * Autocompletion: module members after "Module.", else variables of the file and
 * stdlib names. When the "auto" setting is off, only on Ctrl-Space.
 */
function ocaml_completions(editor, context) {
    if (!context.explicit && !editor.ext_autocomplete) return null;
    let line = context.state.doc.lineAt(context.pos);
    let text = line.text;
    let start = context.pos - line.from, end = start;
    while (start && /\w/.test(text.charAt(start - 1))) --start;
    while (end < text.length && /\w/.test(text.charAt(end))) ++end;
    let word = text.slice(start, end);
    let result = list => list.length === 0 ? null : {
        from: line.from + start,
        to: line.from + end,
        options: list.map(label => ({label: label})),
        filter: false,
    };
    if (text.charAt(start - 1) === ".") { // Special module case
        let mstart = start - 1;
        while (mstart && /\w/.test(text.charAt(mstart - 1))) --mstart;
        let module = text.slice(mstart, start - 1);
        if (MODULE_HINT.hasOwnProperty(module)) {
            if (word.length === 0) return result(MODULE_HINT[module]);
            if (!MODULE_HINT[module].includes(word)) return result(includer(MODULE_HINT[module], word));
        }
    }
    // Remove comments and find all variables
    let variables = [...new Set(
        (context.state.doc.toString()
            .replace(COMMENT_REGEX, '')
            .match(VARIABLE_1_REGEX) || []
        ).map(x => x.replace(VARIABLE_2_REGEX, ""))
    )];
    let possibilities = variables.concat(MODULE_HINT["Base"]);
    let correspondance = includer(possibilities, word);
    if (word.length !== 0 && correspondance.length !== 0 && !possibilities.includes(word)) {
        return result(correspondance.slice(0, 5));
    }
    return null;
}
