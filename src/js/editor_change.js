const COMMENT_REGEX = new RegExp(/[(][*][\s\S]*?[*][)][\s]*/g);
const CODE_SEPARATOR_REGEX = new RegExp(/[\S][\s\S]*?(;;)/g);
const VARIABLE_1_REGEX = new RegExp(/((let rec \w+)|(let \w+)|(and \w+))/g);
const VARIABLE_2_REGEX = new RegExp(/(let )|(rec )|(and )/g);

const wrapper = document.getElementsByClassName("nav-wrapper")[0];
const files = document.getElementById("editor-files");
const mobile_sidenav = document.getElementById("mobile-sidenav");
const buttons =document.getElementById("menu-button");


var MOBILE = false;


function parse(str) {
    let cmd = str.split(';;\n');
    for (let i = 0; i < cmd.length; i++) {
        if (!cmd[i].endsWith(';;')) cmd[i] += ';;';
        executecallback.execute("toplevel", cmd[i]);
    }
}

function reset_ocaml() {
    document.getElementById('output').innerHTML = '';
    toplevelcallback.setup();
}

function changefontsize(id, a) {
    let newsize = String(parseFloat(document.getElementById(id).style.fontSize.slice(0, -2)) * a) + "em";
    document.getElementById(id).style.fontSize = newsize;
    localStorage.setItem("betterocaml-text-"+id, newsize)
}

let clean_content = function (content) {
    return content.replace(COMMENT_REGEX, '').match(CODE_SEPARATOR_REGEX)
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
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function readSingleFile(e, editor) {
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

    };
    reader.readAsText(file);
    return false;
}


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


var MODULE_HINT = {
    'Base': [
        "and", "as", "assert", "asr", "begin", "class", "constraint", "decr", "Division_by_zero", "do",
        "done", "downto", "else", "end", "epsilon_float", "exception", "external", "Failure", "failwith",
        "false", "for", "fst", "function", "functor", "if", "in", "include", "incr", "inherit", "initializer",
        "land", "lazy", "let", "lor", "lsl", "lsr", "lxor", "match", "max_float", "max_int", "method",
        "min_float", "min_int", "mod", "module", "mutable", "new", "nonrec", "not", "object", "of", "open",
        "or", "Out_of_memory", "private", "raise", "rec", "ref", "sig", "snd", "struct", "then", "to", "true",
        "try", "type", "val", "virtual", "when", "while", "with", "prerr_endline", "print_int", "print_float", "print_string",
        "print_endline", "print_newline", "int_of_float", "float_of_int", "int_of_string", "float_of_string", "bool_of_string",
        "string_of_int", "string_of_float", "string_of_bool", "int_of_char", "char_of_int", "sqrt", "max", "min", "exp", "log",
        "log10", "cos", "acos", "sin", "asin", "tan", "atan", "atan2", "hypot", "cosh", "sinh", "tanh", "floor", "ceil",
        "truncate", "abs_float", "abs",
        "Sys", "Array", "Random", "List", "Graphics"
    ],
    'Sys': ["time", "unix", "win32", "word_size", "int_size", "max_string_length", "max_array_length", "ocaml_version"],
    'Array': ["make", "make_matrix", "append", "concat", "copy", "fill", "map", "exists", "mem", "sort", "length", "get", "set", "sub"],
    'Random': ["init", "int", "float", "bool"],
    'List': ["hd", "tl", "concat", "mem", "filter", "exists", "iter", "map", "nth", "rev", "sort"],
    'Graphics': [
        "open_graph", "close_graph", "width", "height", "size_x", "size_y", "clear_graph", "set_window_title",
        "resize_window", "plot", "plots", "moveto", "rmoveto", "lineto", "rlineto", "draw_circle", "fill_circle",
        "set_color", "set_line_width", "rgb", "background", "foreground", "black", "white", "red", "green", "blue",
        "yellow", "cyan", "magenta", "point_color", "current_x", "current_y", "current_point", "curveto", "draw_rect",
        "fill_rect", "draw_poly_line", "draw_poly", "fill_poly", "draw_segments", "draw_arc", "fill_arc", "draw_ellipse",
        "fill_ellipse", "draw_char", "draw_string", "set_text_size", "text_size"],
}


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
                    } else {
                        if (!MODULE_HINT[module].includes(word)) {
                            return accept({
                                list: includer(MODULE_HINT[module], word),
                                from: CodeMirror.Pos(cursor.line, start),
                                to: CodeMirror.Pos(cursor.line, end)
                            })
                        }
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
            "Alt-F": "findPersistent"
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

function actual_editor() {
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

function delete_editor(id) {
    if (MOBILE){
        var $tabs = $('#mobile-sidenav');
    }
    else {
        var $tabs = $('#editor-files');
    }

    $tabs.children().removeAttr('style');
    $tabs.children().remove('#li_tab_' + String(id));
    $("#editorCollection").children().remove('#editor_tab_' + String(id)); // codebox
    $tabs.tabs();
}

function select_editor(id) {
    if (MOBILE){
        let instance = M.Tabs.getInstance(document.getElementById('mobile-sidenav'));
        instance.select('editor_tab_' + String(id));
        setTimeout(function () {
            document.querySelector('a[href="#editor_tab_' + String(id) + '"]').click();
        }, 5);
    }
    else {
        console.log('select : ', id)
        let instance = M.Tabs.getInstance(document.getElementById('editor-files'));
        instance.select('editor_tab_' + String(id));
        setTimeout(function () {
            document.querySelector('a[href="#editor_tab_' + String(id) + '"]').click();
        }, 5);
    }

}

function change_name(id, name) {
    let ele = document.querySelector('a[href="#editor_tab_' + String(id) + '"]');
    ele.innerHTML = name + ele.innerHTML.substr(-79);
}

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


function remove_editor(id) {
    if (Object.keys(editors).length > 1) {
        let act = actual_editor();
        if (! editors[id].is_saved){
            if (!confirm("Document non sauvegardé, voulez vous continuer ?")){
                return
            }
        }
        delete editors[id];
        delete_editor(id);
        if (id==act){
            select_editor(Math.max(...Object.keys(editors).map(x => +x)));
        }
        else{
            select_editor(act)
        }
    }
}

// Configuration


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


//Education
function test_result(command,result) {
    if (!command.endsWith(';;')) command += ';;';
    executecallback.execute("console", command);
    return console.logs==result;
}

function test_exercice(id) {
    let exo = current_course["exercises"].find(o => o.id === id);
    let success = true;
    for (var k in exo["test"]) {
        if (exo["test"].hasOwnProperty(k) & success) {
            if(!test_result(k,exo["test"][k])){
                success = false;
            }
        }
    }
    if (success){
        M.toast({html: 'Exercice '+id+' réussi !'});
        document.getElementById("icon_ex_"+id).classList.add("finished")
    }
    else{
        M.toast({html: 'Exercice '+id+' faux'});
    }
}

function readCoursesFile(e) {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
        let contents = e.target.result;
        let result = JSON.parse(contents);
        load_courses(result);

    };
    reader.readAsText(file);
    return false;
}

function loadJSCourseFile(path) {
    $.getJSON("course/"+path, function(json) {
        load_courses(json);
    });
}

function load_courses(json){
    current_course = json;
    let $pdiv = $('#box_education')
    let loaddiv = document.getElementsByClassName("education-loading")[0]
    loaddiv.style.display = "none"
    // Generate exercice
    let exercises = "";
    for (let i = 0; i < json["exercises"].length; i++) {
        let examples = "";
        for (var k in json["exercises"][i]["example"]) {
            if (json["exercises"][i]["example"].hasOwnProperty(k)) {
                examples+='<pre class="pre-example">'
                    + k
                    + '</pre> renvoie <pre class="pre-example">'
                    + json["exercises"][i]["example"][k]
                    + '</pre><br>'
            }
        }
        exercises += '<div class="col s12"><div class="card"><div class="card card-header"><span class="card-title"><span id="icon_ex_'
            + json["exercises"][i]["id"]
            + '" class="exercice-number">'
            + json["exercises"][i]["id"] + '</span>' + json["exercises"][i]["name"]
            + '</span><a class="btn-floating right test-button" onclick="test_exercice('
            + json["exercises"][i]["id"]
            + ')"><i class="material-icons">play_arrow</i></a></div><div class="card-content"><p><h6>Enoncé : </h6>'
            + json["exercises"][i]["content"]
            + '<h6>Type : </h6><pre class="pre-example">'
            + json["exercises"][i]["type"]
            + '</pre><h6>Exemples : </h6>'
            + examples
            + '</p></div></div></div>'
    }
    // Combine all
    let base =
        '<div class="education content"><a class="btn-floating btn-small waves-effect waves-light zoom-button close-educ-button right" onclick="close_courses()"><i class="material-icons">close</i></a><h3 class="center-align">'
        + json['name']
        + '</h3> <div class="education-exercice"><div class="row">'
        + exercises
        + '</div></div></div>'
    $pdiv.append(base);
    MathJax.typeset();
}

function close_courses() {
    let loaddiv = document.getElementsByClassName("education-loading")[0]
    loaddiv.style.display = "block"
    document.getElementsByClassName("education")[0].remove()
    current_course = undefined;
}
