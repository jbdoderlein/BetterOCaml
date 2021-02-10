

function parse(str, editor) {
    textarea = document.getElementById('userinput');
    cmd = str.split(';;\n');
    const ke = new KeyboardEvent("keydown", {bubbles: true, cancelable: true, keyCode: 13});
    for (let i = 0; i < cmd.length; i++) {
        if (!cmd[i].endsWith(';;')) cmd[i] += ';;';
        textarea.value = cmd[i];
        textarea.dispatchEvent(ke);
    }
    setTimeout(function () {
        editor.focus();
    }, 5);
}

function changefontsize(id, a) {
    document.getElementById(id).style.fontSize = String(parseFloat(document.getElementById(id).style.fontSize.slice(0, -2)) * a) + "em";
}
