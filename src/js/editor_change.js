function parse(str, editor) {
    textarea = document.getElementById('userinput');
    cmd = str.split(';;\n');
    const ke = new KeyboardEvent("keydown", {bubbles: true, cancelable: true, keyCode: 13});
    for (let i = 0; i < cmd.length; i++) {
        if (!cmd[i].endsWith(';;')) cmd[i] += ';;';
        textarea.value = cmd[i];
        textarea.dispatchEvent(ke);
    }
    if (editor != null) {
        setTimeout(function () {
            editor.focus();
        }, 5);
    }
}

function reset_ocaml() {
    document.getElementById('output').innerHTML = ''
    textarea = document.getElementById('userinput');
    const ke = new KeyboardEvent("keydown", {bubbles: true, cancelable: true, ctrlKey: true, keyCode: 75});
    textarea.dispatchEvent(ke);
}

function changefontsize(id, a) {
    document.getElementById(id).style.fontSize = String(parseFloat(document.getElementById(id).style.fontSize.slice(0, -2)) * a) + "em";
}

let clean_content = function (content) {
    return content.replace(/[(][*][\s\S]*?[*][)][\s]*/g, '').match(/[\S][\s\S]*?(;;)/g)
}
let line_with_last = function (instance) {
    let i = instance.getCursor().line
    while (!instance.getLine(i).includes(";;")) {
        i++;
    }
    return i
}

let exec_last = function (instance) {
    let beforecur = instance.getRange({line: 0, ch: 0}, {line: line_with_last(instance)});
    if ($(window).width() < 600) {
        parse(clean_content(beforecur).slice(-1)[0]); // Remove comments
    } else {
        parse(clean_content(beforecur).slice(-1)[0], instance); // Remove comments
    }

};
let exec_all = function (instance) {
    let commands = clean_content(instance.getValue());
    for (let commandsKey in commands) {
        setTimeout(function () {
            parse(commands[commandsKey])
        }, 200);
    }
};
let calculate_highlight = function (instance) {
    try {
        var execselected = instance.getRange({line: 0, ch: 0}, {line: line_with_last(instance)})
            .match(/[\S][\s\S]*?(;;)/g).slice(-1)[0] // Get last sentence
    } catch (e) {
        var execselected = "";
    }
    let cursor = instance.getSearchCursor(execselected)
    cursor.find();
    return cursor;
};

function save(instance) {
    if (instance.name == "untitled.ml") {
        M.Modal.getInstance(document.getElementById('saveas')).open()
    } else {
        program_save(instance);
    }

}

function name_and_save(instance) {
    let potential_filename = document.getElementById('saveas_text').value;
    let fileNameToSaveAs = "untitled.ml";
    if (potential_filename !== "") {
        if (potential_filename.substr(-3, 3) === ".ml") {
            fileNameToSaveAs = potential_filename
        } else {
            fileNameToSaveAs = potential_filename + ".ml"
        }
    }
    instance.name = fileNameToSaveAs;
    change_name(instance.id, fileNameToSaveAs);
    document.getElementById('saveas_text').value = "";

    program_save(instance);
}

let program_save = function (instance) {
    var textToWrite = instance.getValue()

    //var textToWrite = textToWrite.replace(/\n/g, "\r\n");
    var textFileAsBlob = new Blob([textToWrite], {type: 'text/x-ocaml'});

    // filename to save as
    var fileNameToSaveAs = instance.name;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;

// hidden link title name
    downloadLink.innerHTML = "LINKTITLE";

    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    M.toast({html: 'File saved'})
    instance.is_saved = true;
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function readSingleFile(e, editor) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        let next = Math.max(...Object.keys(editors).map(x => +x)) + 1;
        let theme = editors[Math.min(...Object.keys(editors).map(x => +x))].getOption('theme')
        editors[next] = create_editor(id = next, name = file.name, theme = theme);
        editors[next].setValue(contents)

    };
    reader.readAsText(file);
    return false;
}


function change_theme(name, editors) {
    let href = document.getElementById('css_theme').href;
    document.getElementById('css_theme').href = href.replace(/[^\/]+$/g, '') + name + ".css"
    for (let i in editors) {
        editors[i].setOption("theme", name);
    }
    setCookie("theme", name, 30)
    M.toast({html: 'Theme loaded'})
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function autoload_theme() {
    var theme = getCookie("theme");
    if (theme != "") {
        change_theme(theme)
    } else {
        change_theme('material')
    }
}

function cursor_activity(instance, changeObj) {
    let cursor = calculate_highlight(instance);
    if (!(cursor.from() === undefined)) {
        instance.current_marker.clear();
        instance.current_marker = instance.markText(from = cursor.from(), to = cursor.to(), options = {
            className: "code-highlight"
        });
    }
    instance.is_saved = false;
}

function editor_drop(data, e) {
    var file;
    var files;
    // Check if files were dropped
    files = e.dataTransfer.files;
    if (files.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        file = files[0];
        console.log(file);
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            let next = Math.max(...Object.keys(editors).map(x => +x)) + 1;
            let theme = editors[Math.min(...Object.keys(editors).map(x => +x))].getOption('theme')
            editors[next] = create_editor(id = next, name = file.name, theme = theme);
            editors[next].setValue(contents)

        };
        reader.readAsText(file);
        return false;
    }
}

let includer = function (l, w) {
    let r = [];
    for (var i = 0; i < l.length; i++) {
        if (l[i].startsWith(w)) {
            r.push(l[i]);
        }
    }
    return r;
}




function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var MODULE_HINT = {
    'Base': [
        "and", "as", "assert", "asr", "begin", "class", "constraint", "decr", "Division_by_zero", "do",
        "done", "downto", "else", "end", "epsilon_float", "exception", "external", "Failure", "failwith",
        "false", "for", "fst", "function", "functor", "if", "in", "include", "incr", "inherit", "initializer",
        "land", "lazy", "let", "lor", "lsl", "lsr", "lxor", "match", "max_float", "max_int", "method",
        "min_float", "min_int", "mod", "module", "mutable", "new", "nonrec", "not", "object", "of", "open",
        "or", "Out_of_memory", "private", "raise", "rec", "ref", "sig", "snd", "struct", "then", "to", "true",
        "try", "type", "val", "virtual", "when", "while", "with", "print_int", "print_float", "print_string",
        "print_endline", "print_newline", "int_of_float", "float_of_int", "int_of_string", "float_of_string", "bool_of_string",
        "string_of_int", "string_of_float", "string_of_bool", "int_of_char", "char_of_int", "sqrt", "max", "min", "exp", "log",
        "log10", "cos", "acos", "sin", "asin", "tan", "atan", "atan2", "hypot", "cosh", "sinh", "tanh", "floor", "ceil",
        "truncate", "abs_float", "abs",
        "Sys", "Array", "Random", "List", "Graphics"
    ],
    'Sys': ["time", "unix", "win32", "word_size", "int_size", "max_string_length", "max_array_length", "ocaml_version"],
    'Array' : ["make", "make_matrix", "append", "concat", "copy", "fill", "map", "exists", "mem", "sort", "length", "get", "set", "sub"],
    'Random' : ["init", "int", "float", "bool"],
    'List' : ["hd", "tl", "concat", "mem", "filter", "exists", "iter", "map", "nth", "rev", "sort"],
    'Graphics' : [
        "open_graph", "close_graph", "width", "height", "size_x", "size_y", "clear_graph", "set_window_title",
        "resize_window", "plot", "plots", "moveto", "rmoveto", "lineto", "rlineto", "draw_circle", "fill_circle",
        "set_color", "set_line_width", "rgb", "background", "foreground", "black", "white", "red", "green", "blue",
        "yellow", "cyan", "magenta", "point_color", "current_x", "current_y", "current_point", "curveto", "draw_rect",
        "fill_rect", "draw_poly_line", "draw_poly", "fill_poly", "draw_segments", "draw_arc", "fill_arc", "draw_ellipse",
        "fill_ellipse", "draw_char", "draw_string", "set_text_size", "text_size"],
    'Variable': []
}

function autocompletion_update(cm, change) {
    if (change["text"] == " ") {
        var cursor = cm.getCursor(), line = cm.getLine(cursor.line)
        var start = cursor.ch, end = cursor.ch
        while (start && /\w/.test(line.charAt(start - 1))) --start
        while (end < line.length && /\w/.test(line.charAt(end))) ++end
        var word = line.slice(start, end).toLowerCase()
        if (word.length > 0 && !isNumeric(word) && !cm.hint_list["Base"].includes(word) && !cm.hint_list["Variable"].includes(word)) {
            cm.hint_list["Variable"].unshift(word);
        }
    }
}

function hint_prediction(cm, option) {
    return new Promise(function (accept) {
        setTimeout(function () {
            var cursor = cm.getCursor(), line = cm.getLine(cursor.line)
            var start = cursor.ch, end = cursor.ch
            while (start && /\w/.test(line.charAt(start - 1))) --start
            while (end < line.length && /\w/.test(line.charAt(end))) ++end
            var word = line.slice(start, end)
            if (/\./.test(line.charAt(start - 1))) {
                let nstart = start - 1;
                while (nstart && /\w/.test(line.charAt(nstart - 1))) --nstart
                let module = line.slice(nstart, start - 1);
                if (MODULE_HINT.hasOwnProperty(module)) {
                    console.log(word)
                    if (word.length==0){
                        return accept({
                            list: MODULE_HINT[module],
                            from: CodeMirror.Pos(cursor.line, start),
                            to: CodeMirror.Pos(cursor.line, end)
                        })
                    }
                    else {
                        return accept({
                            list: includer(MODULE_HINT[module], word),
                            from: CodeMirror.Pos(cursor.line, start),
                            to: CodeMirror.Pos(cursor.line, end)
                        })
                    }
                }
            }
            let correspondance = includer(cm.hint_list["Variable"].concat(cm.hint_list["Base"]), word);
            if (word.length != 0 && correspondance.length != 0) {
                return accept({
                    list: correspondance.slice(0, 5),
                    from: CodeMirror.Pos(cursor.line, start),
                    to: CodeMirror.Pos(cursor.line, end)
                })
            }
            return accept(null)
        }, 100)
    })
}

function create_editor(id, name, theme = 'material') {
    var $tabs = $('#editor-files');
    $tabs.children().removeAttr('style');

    $tabs.append("<li id='li_tab_" + String(id) + "' class='tab col s3 onglet'><a href='#editor_tab_" + String(id) + "'>" + name + "<i class='material-icons center mini-icon' onclick='remove_editor(" + String(id) + ")'>close</i></a></li>");
    $("#editorCollection").append("<div id='editor_tab_" + String(id) + "' class='col s12 blue code-box'><textarea name='editor_" + String(id) + "' id='editor_" + String(id) + "' class='materialize-textarea'></textarea></div>");

    let editor = CodeMirror.fromTextArea(document.getElementById("editor_" + String(id)), {
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        dragDrop: true,
        matchBrackets: true,
        readOnly: false,
        theme: theme,
        mode: 'text/x-ocaml',
        extraKeys: {
            "Ctrl-Enter": exec_last,
            "Cmd-Enter": exec_last,
            "Shift-Ctrl-Enter": exec_all,
            "Shift-Cmd-Enter": exec_all,
            "Ctrl-Space": "autocomplete",
            "Cmd-Space": "autocomplete"
        },
        hintOptions: {hint: hint_prediction}
    });
    editor.id = id
    editor.name = name
    editor.is_saved = true
    editor.hint_list = MODULE_HINT
    editor.current_marker = editor.markText({line: 0}, {line: 0}, {css: "color: #fe4"});
    editor.on("cursorActivity", cursor_activity);
    editor.on('drop', editor_drop);
    editor.on("beforeChange", autocompletion_update);
    $tabs.tabs().tabs('select', 'editor_tab_' + String(id));
    return editor
}

function actual_editor() {
    let instance = M.Tabs.getInstance(document.getElementById('editor-files'));
    return instance.$tabLinks[instance.index].href.match(/editor_tab_[0-9]+/g)[0].substr(11);
}

function delete_editor(id) {
    var $tabs = $('#editor-files');
    $tabs.children().removeAttr('style');
    $tabs.children().remove('#li_tab_' + String(id));
    $("#editorCollection").children().remove('#editor_tab_' + String(id));
    $tabs.tabs();
}

function select_editor(id) {
    let instance = M.Tabs.getInstance(document.getElementById('editor-files'));
    instance.select('editor_tab_' + String(id));
    setTimeout(function () {
        document.querySelector('a[href="#editor_tab_' + String(id) + '"]').click();
    }, 5);
}

function change_name(id, name) {
    let ele = document.querySelector('a[href="#editor_tab_' + String(id) + '"]');
    ele.innerHTML = name + ele.innerHTML.substr(-79);
}


