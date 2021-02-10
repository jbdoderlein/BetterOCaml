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
    parse(clean_content(beforecur).slice(-1)[0], instance); // Remove comments
};
let exec_all = function (instance) {
    parse(instance.getValue().replace(/[(][*][\s\S]*?[*][)][\s]*/g, ''), instance);
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

let program_save = function (instance) {
    var textToWrite = instance.getValue()

    //var textToWrite = textToWrite.replace(/\n/g, "\r\n");
    var textFileAsBlob = new Blob([textToWrite], {type: 'text/plain'});

    // filename to save as
    let potential_filename = document.getElementById('saveas_text').value;
    var fileNameToSaveAs = "no_name.ml";
    if (potential_filename !== "") {
        if (potential_filename.substr(-3, 3) === ".ml") {
            fileNameToSaveAs = potential_filename
        } else {
            fileNameToSaveAs = potential_filename + ".ml"
        }
    }

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
    let confirmation = get_confirm();
    if (confirmation) {
        reader.onload = function (e) {
            var contents = e.target.result;
            editor.setValue(contents);
        };
        reader.readAsText(file);
        M.toast({html: 'File loaded'})
    } else {
        M.toast({html: 'File not loaded'})
    }
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

function get_confirm(editor) {
    if (editor.getValue() != "") {
        return confirm("Charger ce document effacera celui sur votre écran.\nVoulez vous continuer ?");
    } else {
        return true
    }
}

function create_editor(id) {
    let editor = CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        dragDrop: true,
        matchBrackets: true,
        readOnly: false,
        theme: 'material',
        mode: 'text/x-ocaml',
        extraKeys: {
            "Ctrl-Enter": exec_last,
            "Cmd-Enter": exec_last,
            "Shift-Ctrl-Enter": exec_all,
            "Shift-Cmd-Enter": exec_all
        }
    });
    editor.current_marker = editor.markText({line: 0}, {line: 0}, {css: "color: #fe4"});

    editor.on("cursorActivity", function (instance, changeObj) {
        let cursor = calculate_highlight(instance);
        if (!(cursor.from() === undefined)) {
            instance.current_marker.clear();
            instance.current_marker = instance.markText(from = cursor.from(), to = cursor.to(), options = {
                className: "code-highlight"
            });
        }
    });

    editor.on('drop', function (data, e) {
        var file;
        var files;
        // Check if files were dropped
        files = e.dataTransfer.files;
        if (files.length > 0) {
            e.preventDefault();
            e.stopPropagation();
            file = files[0];
            var reader = new FileReader();
            let confirmation = get_confirm(editor);
            if (confirmation) {
                reader.onload = function (e) {
                    var contents = e.target.result;
                    editor.setValue(contents);
                };
                reader.readAsText(file);
                M.toast({html: 'File loaded'})
            } else {
                M.toast({html: 'File not loaded'})
            }
            return false;
        }
    });
    return editor
}

function actual_editor(editors) {
    return editors[document.getElementById('editor-files').M_Tabs.index]
}
