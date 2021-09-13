// REGEX
const COMMENT_REGEX = new RegExp(/[(][*][\s\S]*?[*][)][\s]*/g);
const CODE_SEPARATOR_REGEX = new RegExp(/[\S][\s\S]*?(;;)/g);
const VARIABLE_1_REGEX = new RegExp(/((let rec \w+)|(let \w+)|(and \w+))/g);
const VARIABLE_2_REGEX = new RegExp(/(let )|(rec )|(and )/g);

// HTML Elements
const wrapper = document.getElementsByClassName("nav-wrapper")[0];
const files = document.getElementById("editor-files");
const mobile_sidenav = document.getElementById("mobile-sidenav");
const buttons =document.getElementById("menu-button");

var MOBILE = false;
var MODULE_HINT = {
    'Base': [
        "and", "as", "assert", "asr", "begin", "class", "constraint", "decr", "Division_by_zero", "do", "done", "downto", "else", "end", "epsilon_float", "exception", "external", "Failure", "failwith", "false", "for", "fst", "function", "functor", "if", "in", "include", "incr", "inherit", "initializer", "Invalid_argument", "land", "lazy", "let", "lor", "lsl", "lsr", "lxor", "match", "max_float", "max_int", "method", "min_float", "min_int", "mod", "module", "mutable", "new", "nonrec", "not", "object", "of", "open", "or", "Out_of_memory", "private", "raise", "rec", "ref", "sig", "snd", "struct", "then", "to", "true", "try", "type", "val", "virtual", "when", "while", "with", "prerr_endline", "print_int", "print_float", "print_string", "print_endline", "print_newline", "int_of_float", "float_of_int", "int_of_string", "float_of_string", "bool_of_string", "string_of_int", "string_of_float", "string_of_bool", "int_of_char", "char_of_int", "sqrt", "max", "min", "exp", "log", "log10", "cos", "acos", "sin", "asin", "tan", "atan", "atan2", "hypot", "cosh", "sinh", "tanh", "floor", "ceil", "truncate", "abs_float", "abs",
    ],
    'Array': [
        "length", "get", "set", "make", "create", "create_float", "make_float", "init", "make_matrix", "create_matrix", "append", "sub", "concat", "copy", "fill", "blit", "to_list", "of_list", "iter", "iteri", "map", "mapi", "fold_left", "fold_right", "iter2", "map2", "for_all", "exists", "mem", "memq", "sort", "stable_sort", "fast_sort"
    ],
    'Graphics': [
        "open_graph", "close_graph", "width", "height", "size_x", "size_y", "clear_graph", "set_window_title", "resize_window", "plot", "plots", "moveto", "rmoveto", "lineto", "rlineto", "draw_circle", "fill_circle", "set_color", "set_line_width", "rgb", "background", "foreground", "black", "white", "red", "green", "blue", "yellow", "cyan", "magenta", "point_color", "current_x", "current_y", "current_point", "curveto", "draw_rect", "fill_rect", "draw_poly_line", "draw_poly", "fill_poly", "draw_segments", "draw_arc", "fill_arc", "draw_ellipse", "fill_ellipse", "draw_char", "draw_string", "set_text_size", "text_size"
    ],
    'List': [
        "length", "compare_lengths", "compare_length_with", "cons", "hd", "tl", "nth", "nth_opt", "rev", "init", "append", "rev_append", "concat", "flatten", "iter", "iteri", "map", "mapi", "rev_map", "fold_left", "fold_right", "iter2", "map2", "rev_map2", "fold_left2", "fold_right2", "for_all", "exists", "for_all2", "exists2", "mem", "memq", "find", "find_opt", "filter", "find_all", "partition", "assoc", "assoc_opt", "assq", "assq_opt", "mem_assoc", "mem_assq", "remove_assoc", "remove_assq", "split", "combine", "sort", "stable_sort", "fast_sort", "sort_uniq", "merge"
    ],
    'Num': [
        "zero_big_int", "unit_big_int", "minus_big_int", "abs_big_int", "add_big_int", "succ_big_int", "add_int_big_int", "sub_big_int", "pred_big_int", "mult_big_int", "mult_int_big_int", "square_big_int", "sqrt_big_int", "quomod_big_int", "div_big_int", "mod_big_int", "gcd_big_int", "power", "power_big", "power_int_positive_int", "power_big_int_positive_int", "power_int_positive_big_int", "power_big_int_positive_big_int", "sign_big_int", "compare_big_int", "eq_big_int", "le_big_int", "ge_big_int", "lt_big_int", "gt_big_int", "max_big_int", "min_big_int", "num_digits_big_int", "string_of_big_int", "big_int_of_string", "big_int_of_int", "is_int_big_int", "int_of_big_int", "big_int_of_int32", "big_int_of_nativeint", "big_int_of_int64", "int32_of_big_int", "nativeint_of_big_int", "int64_of_big_int", "float_of_big_int", "and_big_int", "or_big_int", "xor_big_int", "shift_left_big_int", "shift_right_big_int", "shift_right_towards_zero_big_int", "extract_big_int"
    ],
    'Random': [
        "init", "full_init", "self_init", "bits", "int", "int32", "nativeint", "int64", "float", "bool", "get_state", "set_state"
    ],
    'Random.State': [
        "t", "make", "make_self_init", "copy", "bits", "int", "int32", "nativeint", "int64", "float", "bool"
    ],
    'Sys': [
        "time", "os_type", "unix", "win32", "word_size", "int_size", "big_endian", "max_string_length", "max_array_length", "max_floatarray_length", "ocaml_version"
    ],
    'Z': [
        "zero", "one", "minus_one", "of_int", "of_int32", "of_int64", "of_nativeint", "of_float", "of_string", "of_substring", "of_string_base", "of_substring_base", "succ", "pred", "abs", "neg", "add", "sub", "mul", "div", "rem", "div_rem", "cdiv", "fdiv", "ediv_rem", "ediv", "erem", "divexact", "logand", "logor", "logxor", "lognot", "shift_left", "shift_right", "shift_right_trunc", "numbits", "trailing_zeros", "testbit", "popcount", "hamdist", "to_int", "to_int32", "to_int64", "to_nativeint", "to_float", "to_string", "format", "fits_int", "fits_int32", "fits_int64", "fits_nativeint", "print", "output", "sprint", "bprint", "pp_print", "compare", "equal", "leq", "geq", "lt", "gt", "sign", "min", "max", "is_even", "is_odd", "hash", "gcd", "gcdext", "lcm", "powm", "powm_sec", "invert", "probab_prime", "nextprime", "pow", "sqrt", "sqrt_rem", "root", "perfect_power", "perfect_square", "log2", "log2up", "size", "extract", "signed_extract", "to_bits", "of_bits", "version"
    ],
}

if (compare_versions(version, "4.07.0") >= 0) {
    MODULE_HINT["Array"].push(...["to_seq", "to_seqi", "of_seq"]);
    MODULE_HINT["List"].push(...["to_seq", "of_seq"]);
}
if (compare_versions(version, "4.08.0") >= 0) {
    MODULE_HINT["Bool"] = ["not", "compare", "equal", "to_int", "to_float", "to_string"];
    MODULE_HINT["List"].push(...["filter_map"]);
}
if (compare_versions(version, "4.10.0") >= 0) {
    MODULE_HINT["List"].push(...["concat_map", "find_map"]);
}
if (compare_versions(version, "4.11.0") >= 0) {
    MODULE_HINT["Array"].push(...["for_all2", "exists2"]);
    MODULE_HINT["List"].push(...["fold_left_map", "filteri"]);
}
if (compare_versions(version, "4.12.0") >= 0) {
    MODULE_HINT["List"].push(...["equal", "compare", "partition_map"]);
}

// Add module names to autocomplete
MODULE_HINT["Base"].push(...Object.keys(MODULE_HINT).slice(1));

/**
* Compare two OCaml versions
* This function assumes that all versions have the format x.y.z
* @param {string} version A
* @param {string} version B
* @return {number} 1 if A > B, -1 if A < B, 0 if A == B
*/
function compare_versions(a, b) {
    let a_components = a.split(".");
    let b_components = b.split(".");
    for (let i = 0; i < a_components.length; i++) {
        if (parseInt(a_components[i]) > parseInt(b_components[i])) return 1;
        if (parseInt(a_components[i]) < parseInt(b_components[i])) return -1;
    }
    return 0;
}


/**
 * Change font size of editor or toplevel, and apply the changes in memory.
 * @param {string} type - The font to change (editor or toplevel)
 * @param {number} change - The change to apply
 * @return {void} Nothing
 */
function change_font_size(type, change) {
    let r = document.querySelector(':root')
    let value = parseFloat(r.style.getPropertyValue('--'+type+"-font-size").slice(0, -2)) + change;
    r.style.setProperty('--'+type+'-font-size', value + "em");
    if (type=='editor'){ // If editor, need to change the hint font size
        r.style.setProperty('--hint-font-size', (value*0.8) + "em");
    }
    localStorage.setItem("betterocaml-text-"+type, value + "em")
}

/**
 * Clean code before execution or processing (remove comments and split command)
 * @param {string} content - Code to clean
 * @return {string[]} - List that contains all codes to execute
 */
let clean_content = function (content) {
    return content.replace(COMMENT_REGEX, '').match(CODE_SEPARATOR_REGEX)
}

/**
 * Auto scroll down output interpreter
 */
function autoscroll_output() {
    let container = document.getElementById("toplevel-container");
    container.scrollTop = container.scrollHeight;
}

/**
 * Get the last line of the actual command (useful to highlight code)
 * @param {CodeMirror} instance - CodeMirror instance
 * @return {number} The last line number
 */
let line_with_last = function (instance) {
    for (let i = instance.getCursor().line; i < instance.lineCount(); i ++) {
        if (instance.getLine(i).includes(";;")) return i;
    }
    return -1;
}

/**
 * Execute the last command in the editor
 * @param {CodeMirror} instance - CodeMirror instance
 * @return {void} Nothing
 */
let exec_last = function (instance) {
    autosave_editor(instance.id);
    let last_line = line_with_last(instance);
    if (last_line == -1) return;
    let beforecur = instance.getRange({line: 0, ch: 0}, {line: last_line});
    let all = clean_content(instance.getValue());
    let command = clean_content(beforecur).slice(-1)[0];
    let indice = all.indexOf(command);
    if (indice<all.length-1) {
        let next =  all[indice+1];
        let sc = instance.getSearchCursor(next);
        sc.find();
        instance.setCursor(sc.pos.to);
    }
    executecallback.execute("toplevel", command);
    autoscroll_output();
};

/**
 * Execute all the code in the editor
 * @param {CodeMirror} instance - CodeMirror instance
 * @return {void} Nothing
 */
let exec_all = function (instance) {
    autosave_editor(instance.id)
    let commands = clean_content(instance.getValue());
    for (let commandsKey in commands) {
//        setTimeout(function () {
            executecallback.execute("toplevel", commands[commandsKey]);
//        }, 200);
    }
    autoscroll_output();
    update_pfs(instance);
};

/**
 * Calculate the cursor of the code to highlight
 * @param {CodeMirror} instance - CodeMirror instance
 * @return {*} CodeMirror cursor
 */
let calculate_highlight = function (instance) {
    let execselected;
    try {
        execselected = instance.getRange({line: 0, ch: 0}, {line: line_with_last(instance)})
            .match(CODE_SEPARATOR_REGEX).slice(-1)[0] // Get last sentence
    } catch (e) {
        execselected = "";
    }
    let cursor = instance.getSearchCursor(execselected)
    cursor.find();
    return cursor;
};

/**
 * Trigger saving process
 * @param {CodeMirror} instance - CodeMirror instance
 * @return {void} Nothing
 */
function save(instance) {
    if (instance.name == "untitled.ml") {
        M.Modal.getInstance(document.getElementById('saveas')).open()
    } else {
        program_save(instance);
    }
}

/**
 * Attribute a name and save file
 * @param {CodeMirror} instance - CodeMirror instance
 * @return {void} Nothing
 */
function name_and_save(instance) {
    let potential_filename = document.getElementById('saveas_text').value;
    let fileNameToSaveAs = "untitled.ml";
    if (potential_filename !== "") {
        if (potential_filename.substr(-3, 3) == ".ml") {
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

/**
 * Save the file (create a download object)
 * @param {CodeMirror} instance - CodeMirror instance
 * @return {void} Nothing
 */
let program_save = function (instance) {
    let textToWrite = instance.getValue()

    //var textToWrite = textToWrite.replace(/\n/g, "\r\n");
    let textFileAsBlob = new Blob([textToWrite], {type: 'text/x-ocaml'});

    // filename to save as
    let fileNameToSaveAs = instance.name;

    let downloadLink = document.createElement("a");
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
    localStorage.removeItem("betterocaml-autosave-"+instance.id)
    update_pfs(instance)
}

/**
 * Destroy the element on event
 * @param event
 */
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

/**
 * Create a new editor with the file in e
 * @param e - The file
 * @return {boolean}
 */
function readSingleFile(e) {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
        let contents = e.target.result;
        let next = Math.max(...Object.keys(editors).map(x => +x)) + 1;
        editors[next] = create_editor(id = next, name = file.name);
        editors[next].setValue(contents)
        update_pfs(editors[next]);

    };
    reader.readAsText(file);
    return false;
}

/**
 * CodeMirror editor function : Highlight text on change
 * @param {CodeMirror} instance - CodeMirror instance
 * @param changeObj - CodeMirror change status
 */
function cursor_activity(instance, changeObj) {
    let cursor = calculate_highlight(instance);
    if (!(cursor.from() == undefined)) {
        instance.current_marker.clear();
        instance.current_marker = instance.markText(from = cursor.from(), to = cursor.to(), options = {
            className: "code-highlight"
        });
    }
    instance.is_saved = false;
}

/**
 * CodeMirror editor function : new editor on drop
 * @param data
 * @param e
 * @return {boolean}
 */
function editor_drop(data, e) {
    let file;
    let files;
    // Check if files were dropped
    files = e.dataTransfer.files;
    if (files.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        file = files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            let next = Math.max(...Object.keys(editors).map(x => +x)) + 1;
            editors[next] = create_editor(next, file.name);
            editors[next].setValue(contents)
            update_pfs(editors[next]);

        };
        reader.readAsText(file);
        return false;
    }
}

/**
 * Sort the elements of the list which started with prefix
 * @param {string[]} l - the list to sort
 * @param {string} w - the prefix
 * @return {string[]} sorted list
 */
let includer = function (l, w) {
    let r = [];
    for (var i = 0; i < l.length; i++) {
        if (l[i].startsWith(w)) {
            r.push(l[i]);
        }
    }
    return r;
}

/**
 * CodeMirror editor function : Generate the hint/autocomplete suggestion
 * @param {CodeMirror} cm - CodeMirror instance
 * @param option
 * @return {Promise<unknown>}
 */
function hint_prediction(cm, option) {
    return new Promise(function (accept) {
        setTimeout(function () {
            // Get theword before the cursor position
            var cursor = cm.getCursor(), line = cm.getLine(cursor.line)
            var start = cursor.ch, end = cursor.ch
            while (start && /\w/.test(line.charAt(start - 1))) --start
            while (end < line.length && /\w/.test(line.charAt(end))) ++end
            var word = line.slice(start, end)
            if (/\./.test(line.charAt(start - 1))) { // Special module case
                let nstart = start - 1;
                while (nstart && /\w/.test(line.charAt(nstart - 1))) --nstart
                let module = line.slice(nstart, start - 1);
                if (MODULE_HINT.hasOwnProperty(module)) {
                    if (word.length == 0) {
                        return accept({
                            list: MODULE_HINT[module],
                            from: CodeMirror.Pos(cursor.line, start),
                            to: CodeMirror.Pos(cursor.line, end)
                        })
                    } else if (!MODULE_HINT[module].includes(word)) {
                        return accept({
                            list: includer(MODULE_HINT[module], word),
                            from: CodeMirror.Pos(cursor.line, start),
                            to: CodeMirror.Pos(cursor.line, end)
                        })
                    }
                }
            }
            // Magic formula to remove comment and find all variables
            let variables = [...new Set(
                (cm.getValue()
                    .replace(COMMENT_REGEX, '')
                    .match(VARIABLE_1_REGEX) || []
                ).map(x=>x.replace(VARIABLE_2_REGEX, ""))
            )];

            let possibilities = variables.concat(cm.hint_list["Base"]);
            let correspondance = includer(possibilities, word);
            if (word.length !== 0 && correspondance.length !== 0 && !possibilities.includes(word)) {
                return accept({
                    list: correspondance.slice(0, 5),
                    from: CodeMirror.Pos(cursor.line, start),
                    to: CodeMirror.Pos(cursor.line, end)
                })
            }
            return accept(null)
        }, 200)
    })
}

/**
 * Create the editor instance
 * @param id - Editor id
 * @param name - Editor name
 * @return {CodeMirror} Editor instance
 */
function create_editor(id, name) {
    if (MOBILE){
        var $tabs = $('#mobile-sidenav');
    }
    else {
        var $tabs = $('#editor-files');
    }
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
        theme: localStorage.getItem("betterocaml-theme")||"material",
        mode: 'text/x-ocaml',
        extraKeys: {
            "Ctrl-Enter": exec_last,
            "Cmd-Enter": exec_last,
            "Shift-Ctrl-Enter": exec_all,
            "Shift-Cmd-Enter": exec_all,
            "Ctrl-Space": "autocomplete",
            "Cmd-Space": "autocomplete",
            "Alt-F": "findPersistent",
            "Ctrl-S": save,
            "Cmd-S": save
        },
        hintOptions: {hint: hint_prediction}
    });
    editor.id = id
    editor.name = name
    editor.is_saved = true
    editor.ext_autocomplete = localStorage.getItem("betterocaml-autocomplete") == "true"
    editor.hint_list = MODULE_HINT
    editor.current_marker = editor.markText({line: 0}, {line: 0}, {css: "color: #fe4"});
    editor.on("cursorActivity", cursor_activity);
    editor.on('drop', editor_drop);
    editor.on("keyup", function (cm, event) {
        if (cm.ext_autocomplete && // Only trigger if jetbrain style autocompletion is activated
            !cm.state.completionActive && /*Enables keyboard navigation in autocomplete list*/
            event.keyCode !== 13) {        /*Enter - do not open autocomplete list just after item has been selected in it*/
            CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
        }
    });
    $tabs.tabs().tabs('select', 'editor_tab_' + String(id));
    return editor
}

/**
 * Get the focused editor id in editors list
 * @return {number} focused editor id
 */
function current_editor() {
    var actual_instance, actual_id
    if (MOBILE){
        actual_instance = M.Tabs.getInstance(document.getElementById('mobile-sidenav'));
    }
    else {
        actual_instance = M.Tabs.getInstance(document.getElementById('editor-files'));
    }
    try {
        actual_id = actual_instance.$tabLinks[actual_instance.index].href.match(/editor_tab_[0-9]+/g)[0].substr(11)
    }
    catch (e){
        actual_id = Math.max(...Object.keys(editors).map(x => +x))
    }
    return actual_id;
}

/**
 * Delete the editor instance
 * @param id - editor id in editors list
 */
function delete_editor(id) {
    if (MOBILE){
        var $tabs = $('#mobile-sidenav');
    }
    else {
        var $tabs = $('#editor-files');
    }
    localStorage.removeItem("betterocaml-autosave-"+id)
    $tabs.children().removeAttr('style');
    $tabs.children().remove('#li_tab_' + String(id));
    $("#editorCollection").children().remove('#editor_tab_' + String(id)); // codebox
    $tabs.tabs();
}

/**
 * Select the editor
 * @param id - editor id in editors list
 */
function select_editor(id) {
    if (MOBILE){
        let instance = M.Tabs.getInstance(document.getElementById('mobile-sidenav'));
        instance.select('editor_tab_' + String(id));
        setTimeout(function () {
            document.querySelector('a[href="#editor_tab_' + String(id) + '"]').click();
        }, 5);
    }
    else {
        let instance = M.Tabs.getInstance(document.getElementById('editor-files'));
        instance.select('editor_tab_' + String(id));
        setTimeout(function () {
            document.querySelector('a[href="#editor_tab_' + String(id) + '"]').click();
        }, 5);
    }

}

/**
 * Change the name of an editor tab
 * @param id - editor id in editors list
 * @param name - new name
 */
function change_name(id, name) {
    let ele = document.querySelector('a[href="#editor_tab_' + String(id) + '"]');
    ele.innerHTML = name + ele.innerHTML.substr(-79);
}

/**
 * Change the orientation of the resize bar
 * @param resize_obj
 * @param {string} type - type to change (H or V)
 */
function change_resize_bar(resize_obj, type) {
    resize_obj.resizer.type = type;
    resize_obj.resizer.node.setAttribute('data-resizer-type', type);
    if (type=="H"){
        document.getElementsByClassName("horizontal")[0].style.flexDirection = "row";
    }
    else{
        document.getElementsByClassName("horizontal")[0].style.flexDirection = "column";
    }
    localStorage.setItem("betterocaml-resize-bar", type);
}

/**
 * Remove the editor instance
 * @param id
 */
function remove_editor(id) {
    if (Object.keys(editors).length > 1) {
        let cur = current_editor();
        if (! editors[id].is_saved){
            if (!confirm("Document non sauvegardé, voulez vous continuer ?")){
                return
            }
        }
        delete editors[id];
        delete_editor(id);
        if (id == cur) {
            select_editor(Math.max(...Object.keys(editors).map(x => +x)));
        }
        else {
            select_editor(cur);
        }
    }
}

// Configuration

/**
 * Change a configuration element
 * @param name - configuration name
 * @param value - new value
 * @param editors - editors list
 */
function change_configuration(name, value, editors) {
    localStorage.setItem(name, value);
    switch (name) {
        case 'betterocaml-theme':
            let href = document.getElementById('css_theme').href;
            document.getElementById('css_theme').href = href.replace(/[^\/]+$/g, '') + value + ".css"
            for (let i in editors) {
                editors[i].setOption("theme", value);
            }
            break;
        case 'betterocaml-autocomplete':
            for (let i in editors) {
                editors[i].ext_autocomplete = Boolean(value);
            }
            break;
        default:
            console.log("no config");
    }

}

/**
 * Local storage init
 */
function init_local_storage() {
    let initial_parameter = {
        'betterocaml-theme': "material",
        'betterocaml-autocomplete' : "true",
        'betterocaml-text-box_1' : "1.2em",
        'betterocaml-text-box_2' : "1.2em",
        'betterocaml-resize-bar' : "H",
    }
    for (const [key, value] of Object.entries(initial_parameter)) {
        if (localStorage.getItem(key) == null){
            localStorage.setItem(key,value);
        }
    }

}

/**
 * Setup custom files navbar for mobile devices
 */
function navbar_resize() {
    files.style.width = ((wrapper.offsetWidth - buttons.offsetWidth - 5)) + "px";
    if (!MOBILE && window.innerWidth<=600){
        MOBILE = true;
        // Change add button to mobile sidenav
        let mobile_button = document.getElementById("flexible-mobile-button");
        mobile_button.children[0].children[0].innerText = "menu";
        mobile_button.children[0].setAttribute("href", "#");
        mobile_button.children[0].removeAttribute("onclick");
        mobile_button.children[0].setAttribute("data-target", "mobile-sidenav");
        mobile_button.children[0].setAttribute("class", "sidenav-trigger");
        // transfer tabs to sidenav
        [...files.children].map(function (li){
            mobile_sidenav.appendChild(li)
        });
        $('.mobile-tabs').tabs();

    }
    if (MOBILE && window.innerWidth>600){
        MOBILE = false;
        // Change mobile sidenav button to add
        let mobile_button = document.getElementById("flexible-mobile-button");
        mobile_button.children[0].children[0].innerText = "add";
        mobile_button.children[0].removeAttribute("href");
        mobile_button.children[0].setAttribute("onclick", "editors[Math.max(...Object.keys(editors).map(x => +x))+1] = create_editor(id = Math.max(...Object.keys(editors).map(x => +x))+1, name = 'untitled.ml', theme= editors[Math.min(...Object.keys(editors).map(x => +x))].getOption('theme'));");
        mobile_button.children[0].removeAttribute("data-target");
        mobile_button.children[0].removeAttribute("class");
        // transfer tabs to navbar
        [...mobile_sidenav.children].map(function (li){
            if (li.id !== "add_tab"){
                files.appendChild(li)
            }
        });
        $('.normal-tabs').tabs();

    }
}

// Autosave

/**
 * Save editor content in local storage
 * @param editor_id
 */
function autosave_editor(editor_id) {
    content = {name:editors[editor_id].name, text: editors[editor_id].getValue()}
    localStorage.setItem("betterocaml-autosave-"+editor_id, JSON.stringify(content))
}

/**
 * Clear autosaved elements
 */
function clear_autosave() {
    for (const [key, _] of Object.entries(localStorage)) {
        if (key.split("-").slice(-2,-1)[0] === "autosave"){
            localStorage.removeItem(key)
        }
    }
}

/**
 * Get the number of file autosaved in local storage
 * @return {number} autosave number
 */
function autosave_number() {
    let nb = 0
    for (const [key, _] of Object.entries(localStorage)) {
        if (key.split("-").slice(-2,-1)[0] === "autosave"){
            nb+=1
        }
    }
    return nb
}

/**
 * Restore autosaved editor in the actual session
 */
function restore_editors() {
    for (const [key, value] of Object.entries(localStorage).reverse()) {
        if (key.split("-").slice(-2,-1)[0] === "autosave"){
            let editor_value = JSON.parse(value)
            let next = Math.max(...Object.keys(editors).map(x => +x)) + 1;
            editors[next] = create_editor(id = next, name = editor_value.name);
            editors[next].setValue(editor_value.text);
            update_pfs(editors[next]);
        }
    }
}


function update_pfs(editor) {
    executecallback.update(editor.name, editor.getValue())
    executecallback.execute("internal", "#directory \"/static\""); // Register files
}
