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
    if ($(window).width() < 600){
        parse(clean_content(beforecur).slice(-1)[0]); // Remove comments
    }
    else{
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
    ;
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
        editors[next] = create_editor(id = next, name = file.name, theme=theme);
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
            editors[next] = create_editor(id = next, name = file.name, theme=theme);
            editors[next].setValue(contents)

        };
        reader.readAsText(file);
        return false;
    }
}

function create_editor(id, name, theme='material') {
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
            "Shift-Cmd-Enter": exec_all
        }
    });
    editor.id = id
    editor.name = name
    editor.is_saved = true
    editor.current_marker = editor.markText({line: 0}, {line: 0}, {css: "color: #fe4"});
    editor.on("cursorActivity", cursor_activity);
    editor.on('drop', editor_drop);
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


