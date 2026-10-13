/**
 * Page side of the OCaml toplevel running in a Web Worker (see toplevel_build/toplevel.ml).
 * The worker evaluates phrases and posts what to display; this file owns the DOM:
 * output panel, input textbox, history, Graphics canvas and the Stop button.
 * It exposes the same `executecallback` and `toplevelcallback` globals as the
 * toplevels running on the page, so the rest of the page does not depend on the mode.
 */

let toplevel_worker = null;
let toplevel_url = null;
let toplevel_busy = 0;
let toplevel_dom_ready = false;
let toplevel_pending_messages = [];
let toplevel_files = new Map(); // Files sent to the worker, sent again after a restart
let toplevel_stdin = null;
let toplevel_current_position = 0;
let toplevel_indent_request = 0;
let toplevel_escape_time = 0;

/**
 * Start the toplevel worker
 * @param {string} url - URL of the compiled toplevel
 * @return {void} Nothing
 */
function start_toplevel(url) {
    toplevel_url = url;
    spawn_toplevel_worker();
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", toplevel_dom_loaded);
    } else {
        toplevel_dom_loaded();
    }
}

function spawn_toplevel_worker() {
    toplevel_worker = new Worker(toplevel_url);
    toplevel_worker.onmessage = function (e) {
        if (toplevel_dom_ready) handle_toplevel_message(e.data);
        else toplevel_pending_messages.push(e.data);
    };
    toplevel_worker.onerror = function (e) {
        console.error("OCaml toplevel worker error", e);
    };
    for (const [name, content] of toplevel_files) {
        toplevel_worker.postMessage({type: "update_file", name: name, content: content});
    }
    set_toplevel_busy(0);
}

function toplevel_dom_loaded() {
    toplevel_dom_ready = true;
    send_toplevel_init();
    setup_toplevel_input();
    for (const m of toplevel_pending_messages) handle_toplevel_message(m);
    toplevel_pending_messages = [];
}

/**
 * Send the canvas used by Graphics and the stdin buffer to the worker
 */
function send_toplevel_init() {
    let init = {type: "init", base: new URL(".", document.baseURI).href};
    let transfer = [];
    let canvas = document.getElementById("test-canvas");
    if (canvas && canvas.transferControlToOffscreen) {
        // A canvas can only be transferred once: use a fresh one for each worker
        let fresh = canvas.cloneNode(false);
        canvas.replaceWith(fresh);
        let offscreen = fresh.transferControlToOffscreen();
        init.canvas = offscreen;
        transfer.push(offscreen);
    }
    if (self.crossOriginIsolated) {
        toplevel_stdin = new SharedArrayBuffer(8 + 65536);
        init.stdin = toplevel_stdin;
    }
    toplevel_worker.postMessage(init, transfer);
}

function set_toplevel_busy(n) {
    toplevel_busy = n;
    document.documentElement.classList.toggle("toplevel-busy", toplevel_busy > 0);
}


// Output

function toplevel_output_append(node) {
    document.getElementById("output").appendChild(node);
    let container = document.getElementById("toplevel-container");
    container.scrollTop = container.scrollHeight;
}

function make_span(cls, text) {
    let span = document.createElement("span");
    span.className = cls;
    span.textContent = text;
    return span;
}

function handle_toplevel_message(m) {
    switch (m.type) {
        case "text":
            toplevel_output_append(make_span(m.cls, m.text));
            break;
        case "ocaml": {
            let div = document.createElement("div");
            div.className = m.cls;
            for (const [cls, text] of m.tokens) div.appendChild(make_span(cls, text));
            toplevel_output_append(div);
            break;
        }
        case "console":
            console.log(m.text);
            break;
        case "begin":
            toplevel_current_position = document.getElementById("output").childNodes.length;
            break;
        case "done":
            set_toplevel_busy(Math.max(0, toplevel_busy - 1));
            break;
        case "highlight":
            highlight_toplevel_location(m);
            break;
        case "indent":
            apply_indent(m);
            break;
        case "stdin":
            answer_stdin();
            break;
        case "graphics_open":
            show_graphics(true);
            break;
        case "graphics_title":
            document.querySelector("#graphics .graphics-title").textContent = m.title || "Graphics main window";
            break;
    }
}

/**
 * Highlight an error location in the phrase echoed since the last "begin" message
 */
function highlight_toplevel_location(loc) {
    let line = 0;
    let node = document.getElementById("output").childNodes[toplevel_current_position];
    for (; node; node = node.nextSibling) {
        if (node.nodeType !== Node.ELEMENT_NODE || !node.classList.contains("sharp")) continue;
        line++;
        if (line < loc.line1 || line > loc.line2) continue;
        let from = line === loc.line1 ? loc.col1 : 0;
        let to = line === loc.line2 ? loc.col2 : Infinity;
        let pos = 0;
        for (const child of node.childNodes) {
            if (child.nodeType !== Node.ELEMENT_NODE) continue;
            let size = child.textContent.length;
            if (pos + size > from && pos < to) child.classList.add("errorloc");
            pos += size;
        }
    }
}

function answer_stdin() {
    let answer = prompt("The toplevel expects inputs:", "");
    let bytes = new TextEncoder().encode(answer === null ? "\n" : answer + "\n").slice(0, 65536);
    let ctrl = new Int32Array(toplevel_stdin, 0, 2);
    new Uint8Array(toplevel_stdin, 8, bytes.length).set(bytes);
    ctrl[1] = bytes.length;
    Atomics.store(ctrl, 0, 1);
    Atomics.notify(ctrl, 0);
}


// Graphics window: floating and not modal, so code can still be run while it is open

/**
 * Show the Graphics window
 * @param {boolean} large - Make it larger, for Graphics.open_graph
 */
function show_graphics(large) {
    let win = document.getElementById("graphics");
    if (large && !win.classList.contains("open")) {
        win.style.width = Math.min(560, window.innerWidth * 0.45) + "px";
    }
    win.classList.add("open");
}

function hide_graphics() {
    document.getElementById("graphics").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", function () {
    let win = document.getElementById("graphics");
    let header = win.querySelector(".graphics-header");
    let start = null;
    header.addEventListener("pointerdown", function (e) {
        if (e.target.closest(".graphics-close")) return;
        let rect = win.getBoundingClientRect();
        start = {x: e.clientX - rect.left, y: e.clientY - rect.top};
        header.setPointerCapture(e.pointerId);
    });
    header.addEventListener("pointermove", function (e) {
        if (!start) return;
        let left = Math.min(Math.max(0, e.clientX - start.x), window.innerWidth - 50);
        let top = Math.min(Math.max(0, e.clientY - start.y), window.innerHeight - 30);
        win.style.left = left + "px";
        win.style.top = top + "px";
        win.style.right = "auto";
    });
    header.addEventListener("pointerup", function () {
        start = null;
    });
});


// Commands

function toplevel_post(message) {
    toplevel_worker.postMessage(message);
}

function toplevel_execute(mode, content) {
    set_toplevel_busy(toplevel_busy + 1);
    toplevel_post({type: "execute", mode: mode, content: content});
}

function toplevel_update_file(name, content) {
    toplevel_files.set(name, content);
    toplevel_post({type: "update_file", name: name, content: content});
}

function toplevel_create_file(name, content) {
    toplevel_files.set(name, content);
    toplevel_post({type: "create_file", name: name, content: content});
}

function toplevel_clear() {
    document.getElementById("output").innerHTML = "";
}

function toplevel_reset() {
    toplevel_clear();
    toplevel_post({type: "reset"});
}

/**
 * Kill the running worker (e.g. stuck in an infinite loop) and start a fresh one
 */
function toplevel_stop() {
    toplevel_worker.terminate();
    spawn_toplevel_worker();
    send_toplevel_init();
    toplevel_output_append(make_span("stderr",
        "Interrupted: the OCaml interpreter was restarted, previous definitions are lost\n"));
}

var executecallback = {
    execute: toplevel_execute,
    create_file: toplevel_create_file,
    update_file: toplevel_update_file,
    update: toplevel_update_file,
};

var toplevelcallback = {
    setup: function () { toplevel_post({type: "reset"}); },
    clear: toplevel_clear,
    reset: toplevel_reset,
    stop: toplevel_stop,
};


// History of the input textbox (same storage format as the toplevels running on the page)

let toplevel_history = {
    data: [""],
    idx: 0,
    save: function () {
        try {
            localStorage.setItem("history", JSON.stringify([0, ...this.data]));
        } catch (e) {}
    },
    setup: function () {
        try {
            let a = JSON.parse(localStorage.getItem("history"));
            if (Array.isArray(a) && a[0] === 0 && a.length > 1) {
                this.data = a.slice(1);
                this.idx = this.data.length - 1;
            }
        } catch (e) {}
    },
    push: function (text) {
        let len = this.data.length;
        if (text !== "") {
            if (len === 1) {
                this.data = [text, ""];
                this.save();
            } else if (text !== this.data[len - 2]) {
                this.data.push("");
                this.data[this.data.length - 2] = text;
                this.save();
            }
        }
        this.idx = this.data.length - 1;
    },
    current: function (text) {
        this.data[this.idx] = text;
    },
    previous: function (textbox) {
        if (this.idx > 0) textbox.value = this.data[--this.idx];
    },
    next: function (textbox) {
        if (this.idx < this.data.length - 1) textbox.value = this.data[++this.idx];
    },
};


// Input textbox

/**
 * List of [start, end] offsets of each line of s
 */
function line_bounds(s) {
    let lines = [];
    let start = 0;
    let pos;
    while ((pos = s.indexOf("\n", start)) !== -1) {
        lines.push([start, pos]);
        start = pos + 1;
    }
    lines.push([start, s.length]);
    return lines;
}

function line_of_offset(lines, c) {
    return lines.findIndex(([, up]) => up >= c);
}

function request_indent(textbox) {
    let text = textbox.value;
    let lines = line_bounds(text);
    let c1 = textbox.selectionStart, c2 = textbox.selectionEnd;
    let line1 = line_of_offset(lines, c1), line2 = line_of_offset(lines, c2);
    toplevel_indent_request++;
    toplevel_post({type: "indent", id: toplevel_indent_request, text: text, line1: line1, line2: line2});
    textbox.pending_indent = {id: toplevel_indent_request, text: text, c1, c2, line1, line2, lines};
}

function apply_indent(m) {
    let textbox = document.getElementById("userinput");
    let req = textbox.pending_indent;
    // Ignore the result if the text changed in the meantime
    if (!req || req.id !== m.id || textbox.value !== req.text) return;
    textbox.value = m.text;
    let lines = line_bounds(m.text);
    let [lo1, up1] = lines[req.line1], [lo2, up2] = lines[req.line2];
    let n1 = Math.max(req.c1 + up1 - req.lines[req.line1][1], lo1);
    let n2 = Math.max(req.c2 + up2 - req.lines[req.line2][1], lo2);
    textbox.setSelectionRange(n1, n2);
    textbox.focus();
}

function resize_toplevel_input() {
    let container = document.getElementById("toplevel-container");
    let textbox = document.getElementById("userinput");
    setTimeout(function () {
        textbox.style.height = "auto";
        textbox.style.height = Math.max(18, textbox.scrollHeight) + "px";
        container.scrollTop = container.scrollHeight;
    }, 0);
}

function setup_toplevel_input() {
    let textbox = document.getElementById("userinput");

    let execute = function () {
        let content = textbox.value.trim();
        toplevel_history.push(content);
        textbox.value = "";
        toplevel_execute("toplevel", content);
        resize_toplevel_input();
    };
    let history_up = function (e) {
        let txt = textbox.value;
        let pos = textbox.selectionStart - 1;
        if (pos >= 0 && txt.lastIndexOf("\n", pos) !== -1) return true;
        toplevel_history.current(txt);
        toplevel_history.previous(textbox);
        e.preventDefault();
        return false;
    };
    let history_down = function (e) {
        let txt = textbox.value;
        let pos = textbox.selectionStart;
        if (txt.length !== pos && txt.indexOf("\n", pos) !== -1) return true;
        toplevel_history.current(txt);
        toplevel_history.next(textbox);
        e.preventDefault();
        return false;
    };

    textbox.addEventListener("keyup", resize_toplevel_input);
    textbox.addEventListener("change", resize_toplevel_input);
    textbox.addEventListener("keydown", function (e) {
        let meta = e.ctrlKey || e.altKey || e.metaKey;
        switch (e.keyCode) {
            case 13:
                if (meta || e.shiftKey) {
                    resize_toplevel_input();
                } else {
                    execute();
                    e.preventDefault();
                }
                break;
            case 9:
                // Tab indents, except in an empty input or just after Escape: then it moves the
                // focus (keyboard users must be able to leave the input, as in the editor)
                if (textbox.value.trim() === "" || Date.now() - toplevel_escape_time < 2000) break;
                request_indent(textbox);
                e.preventDefault();
                break;
            case 27:
                toplevel_escape_time = Date.now();
                break;
            case 75:
                if (meta) {
                    toplevel_clear();
                    e.preventDefault();
                }
                break;
            case 76:
                if (meta) {
                    toplevel_reset();
                    e.preventDefault();
                }
                break;
            case 38:
                history_up(e);
                break;
            case 40:
                history_down(e);
                break;
        }
    });

    toplevel_history.setup();
    textbox.value = "";
    resize_toplevel_input();
    textbox.focus();
}
