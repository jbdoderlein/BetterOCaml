function clearScreen() {
    document.getElementById('output').innerHTML = '';

    let caretPosition = Measurement.caretPos(document.activeElement);
    let select = document.getElementById("prediction");
    select.style.top = caretPosition.top + 15 + 'px';
    if (select.offsetHeight + caretPosition.top + 15 > window.innerHeight)
        select.style.top = caretPosition.top - select.offsetHeight + 'px';
}

document.addEventListener("keydown", function (e) {
    if (((window.navigator.platform.match("Mac") ? e.metaKey : 0) || e.ctrlKey) && e.keyCode == 83) {
        e.preventDefault();
        save();
    }
}, false);

function save() {
    text = "";
    let sharp = document.getElementById("output").getElementsByClassName("sharp");
    for (let i = 0; i < sharp.length; i++) {
        text += sharp[i].textContent;
    }
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "ocaml.ml");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

let ext = ['.ml', '.oml', '.txt'];

function openFile(e) {
    let files = document.getElementById('file-input').files;
    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < ext.length; j++) {
            if (files[i].name.endsWith(ext[j])) {
                readFile(files[i]);
                break;
            }
        }
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(e) {
    e.preventDefault();
    console.log(e);
    let files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < ext.length; j++) {
            if (files[i].name.endsWith(ext[j])) {
                readFile(files[i], e.x);
                break;
            }
        }
    }
}

function readFile(file, x) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function () {
        if (2 * x > window.innerWidth) parse(reader.result);
        else {
            document.getElementById("editor").value = "(* " + file.name + " *)\n\n" + reader.result;
        }
    }
}
