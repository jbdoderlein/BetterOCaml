
    let max_prediction = 8;
    let separators = /[ \.,;\n()"'\/-]/;

    let wordlistDefault = ["and", "as", "assert", "asr", "begin", "class", "constraint", "decr", "Division_by_zero", "do", "done", "downto", "else", "end", "epsilon_float", "exception", "external", "Failure", "failwith", "false", "for", "fst", "function", "functor", "if", "in", "include", "incr", "inherit", "initializer", "land", "lazy", "let", "lor", "lsl", "lsr", "lxor", "match", "max_float", "max_int", "method", "min_float", "min_int", "mod", "module", "mutable", "new", "nonrec", "not", "object", "of", "open", "or", "Out_of_memory", "private", "raise", "rec", "ref", "sig", "snd", "struct", "then", "to", "true", "try", "type", "val", "virtual", "when", "while", "with", "print_int", "print_float", "print_string", "print_endline", "print_newline", "int_of_float", "float_of_int", "int_of_string", "float_of_string", "bool_of_string", "string_of_int", "string_of_float", "string_of_bool", "int_of_char", "char_of_int", "sqrt", "max", "min", "exp", "log", "log10", "cos", "acos", "sin", "asin", "tan", "atan", "atan2", "hypot", "cosh", "sinh", "tanh", "floor", "ceil", "truncate", "abs_float", "abs"];
    let wordlistModules = ["Sys", "Array", "Random", "List", "Graphics"];
    let wordlistSys = ["time", "unix", "win32", "word_size", "int_size", "max_string_length", "max_array_length", "ocaml_version"];
    let wordlistArray = ["make", "make_matrix", "append", "concat", "copy", "fill", "map", "exists", "mem", "sort", "length", "get", "set", "sub"];
    let wordlistRandom = ["init", "int", "float", "bool"];
    let wordlistList = ["hd", "tl", "concat", "mem", "filter", "exists", "iter", "map", "nth", "rev", "sort"];
    let wordlistGraphics = ["open_graph", "close_graph", "width", "height", "size_x", "size_y", "clear_graph", "set_window_title", "resize_window", "plot", "plots", "moveto", "rmoveto", "lineto", "rlineto", "draw_circle", "fill_circle", "set_color", "set_line_width", "rgb", "background", "foreground", "black", "white", "red", "green", "blue", "yellow", "cyan", "magenta", "point_color", "current_x", "current_y", "current_point", "curveto", "draw_rect", "fill_rect", "draw_poly_line", "draw_poly", "fill_poly", "draw_segments", "draw_arc", "fill_arc", "draw_ellipse", "fill_ellipse", "draw_char", "draw_string", "set_text_size", "text_size"];

    let wordlist = wordlistDefault.concat(wordlistModules);
    wordlist.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));


    function help() {
    txt = "ctrl+k to reset\n";
    txt += "ctrl+l to clear screen\n";
    txt += "ctrl+s to save file\n";
    txt += "ctrl+o to open file\n";
    txt += "ctrl+h to open help\n";
    txt += "ctrl+suppr delete selected prediction\n";
    txt += "left/right arrow to cycle through prediction\n";
    txt += "tab to validate prediction\n";
    txt += "esc to hide prediction\n"
    txt += "shift+enter for new line";
    alert(txt);
}


    function getCursorPos(input) {
    return input.selectionStart;
}

    function reverse(str) {
    return str.split("").reverse().join("");
}

    function handleArrow(way) {
    let select = document.getElementById("prediction");
    option_count = select.childElementCount;
    let pos = select.selectedIndex;
    pos += (way == 'left') ? -1 : 1;
    if (pos < 0) pos = option_count - 1;
    if (pos == option_count) pos = 0;
    select.selectedIndex = pos;
}

    function distinct(value, index, self) {
    return self.indexOf(value) === index;
}

    function concatModule(word) {
    switch (word) {
    case "Graphics":
    wordlist = wordlist.concat(wordlistGraphics);
    break;
    case "List":
    wordlist = wordlist.concat(wordlistList);
    break;
    case "Array":
    wordlist = wordlist.concat(wordlistArray);
    break;
    case "Random":
    wordlist = wordlist.concat(wordlistRandom);
    break;
    case "Sys":
    wordlist = wordlist.concat(wordlistSys);
    break;
}
}

    function appendWordlist(word) {
    concatModule(word);
    if (word.length > 1 && !wordlist.includes(word)) {
    wordlist.push(word);
}
    wordlist = Array.from(new Set(wordlist));
    wordlist.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
}

    function getPreviousWord(key) {
    let word, initial_pos, text;
    if (key == 13) {
    let sharp = document.getElementById("output").getElementsByClassName("sharp");
    text = sharp[sharp.length - 1].textContent;
    initial_pos = text.length - 3;
} else {
    let textarea = document.activeElement;
    text = textarea.value;
    initial_pos = getCursorPos(textarea);
    if (initial_pos > 0) initial_pos --;
}
    let pos = initial_pos;
    while (pos) if (separators.test(text[--pos])) break;
    word = text.slice(pos + (pos > 0), initial_pos);
    return word;
}

    function replacePrediction() {
    let select = document.getElementById("prediction");
    let textarea = document.activeElement;
    replacement = wordlist[select.options[select.selectedIndex].name];

    concatModule(replacement);
    wordlist = Array.from(new Set(wordlist));
    wordlist.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));

    let initial_pos = getCursorPos(textarea);
    let pos = initial_pos;
    let text = textarea.value;
    while (pos) if (separators.test(text[--pos])) break;

    if (pos) textarea.value = text.slice(0, pos + 1) + replacement + text.slice(initial_pos);
    else textarea.value = text.slice(0, pos) + replacement + text.slice(initial_pos);

    setCursorPos(textarea, (pos > 0) + pos + replacement.length);
}

    function setCursorPos(element, pos) {
    element.selectionStart = pos;
    element.selectionEnd = pos;
}

    function removeFromWordlist() {
    let select = document.getElementById("prediction");
    wordlist.splice(select.options[select.selectedIndex].name, 1);
    currentWord();
}

    document.getElementById("toplevel-container").onscroll = function() {
    let caretPosition = Measurement.caretPos(document.getElementById("userinput"));
    let select = document.getElementById("prediction");
    select.style.top = caretPosition.top + 15 + 'px';

    if (select.offsetHeight + caretPosition.top + 15 > window.innerHeight)
    select.style.top = caretPosition.top - select.offsetHeight + 'px';
};
    document.getElementById("editor").onscroll = function() {
    let caretPosition = Measurement.caretPos(document.activeElement);
    let select = document.getElementById("prediction");
    select.style.top = caretPosition.top + 15 + 'px';

    if (select.offsetHeight + caretPosition.top + 15 > window.innerHeight)
    select.style.top = caretPosition.top - select.offsetHeight + 'px';
};

    document.getElementById("prediction").addEventListener("click", function() {
    document.getElementById("prediction").style.display = "none";
    replacePrediction();
    document.getElementById("userinput").focus();
});

    document.onkeydown = function(e) {
    if (document.getElementById("prediction").style.display != "none") {
    if (e.keyCode == 9) {
    e.preventDefault();
    document.getElementById("prediction").style.display = "none";
    replacePrediction();
} else if (e.keyCode == 27 || e.keyCode == 13) {
    document.getElementById("prediction").style.display = "none";
} else if (e.keyCode == 37) {
    e.preventDefault();
    handleArrow('left');
} else if (e.keyCode == 39) {
    e.preventDefault();
    handleArrow('right');
}
} else {
    if (e.keyCode == 9) {
    e.preventDefault();
    currentWord();
    if (document.getElementById("prediction").options.length < 2) {
    document.getElementById("prediction").style.display = "none";
}
}
}

    if (e.keyCode == 13) appendWordlist(getPreviousWord(13));

    if ((window.navigator.platform.match("Mac") ? e.metaKey : 0) || e.ctrlKey) {
    switch (e.keyCode) {
    case 8: // ctrl + suppr
    e.preventDefault();
    removeFromWordlist();
    break;
    case 72: // ctrl + h
    e.preventDefault();
    help();
    break;
    case 75: // ctrl + k
    e.preventDefault();
    wordlist = wordlistDefault.concat(wordlistModules);
    let caretPosition = Measurement.caretPos(document.activeElement);
    let select = document.getElementById("prediction");
    select.style.top = caretPosition.top + 15 + 'px';
    if (select.offsetHeight + caretPosition.top + 15 > window.innerHeight)
    select.style.top = caretPosition.top - select.offsetHeight + 'px';
    break;
    case 76: // ctrl + l
    e.preventDefault();
    clearScreen();
    break;
    case 79: // ctrl + o
    e.preventDefault();
    document.getElementById('file-input').click();
    break;
    case 82: // ctrl + r
    e.preventDefault();
    if (document.getElementById("editor").matches(":focus")) runEditor();
    break;
}
}
};

    ////////

    Measurement = new function() {
    this.caretPos = function(textarea, mode) {
        var targetElement = textarea;
        if (typeof jQuery != 'undefined') {
            if (textarea instanceof jQuery) {
                targetElement = textarea.get(0);
            }
        }
        // HTML Sanitizer
        var escapeHTML = function (s) {
            var obj = document.createElement('pre');
            obj[typeof obj.textContent != 'undefined' ? 'textContent' : 'innerText'] = s;
            return obj.innerHTML;
        };

        // Get caret character position.
        var getCaretPosition = function (element) {
            var CaretPos = 0;
            var startpos = -1;
            var endpos = -1;
            if (document.selection) {
                // IE Support(not yet)
                var docRange = document.selection.createRange();
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(element);

                var range = textRange.duplicate();
                range.setEndPoint('EndToStart', docRange);
                startpos = range.text.length;

                var range = textRange.duplicate();
                range.setEndPoint('EndToEnd', docRange);
                endpos = range.text.length;
            } else if (element.selectionStart || element.selectionStart == '0') {
                // Firefox support
                startpos = element.selectionStart;
                endpos = element.selectionEnd;
            }
            return {start: startpos, end: endpos};
        };

        // Get element css style.
        var getStyle = function (element) {
            var style = element.currentStyle || document.defaultView.getComputedStyle(element, '');
            return style;
        };

        // Get element absolute position
        var getElementPosition = function (element) {
            // Get scroll amount.
            var html = document.documentElement;
            var body = document.body;
            var scrollLeft = (body.scrollLeft || html.scrollLeft);
            var scrollTop  = (body.scrollTop || html.scrollTop);

            // Adjust "IE 2px bugfix" and scroll amount.
            var rect = element.getBoundingClientRect();
            var left = rect.left - html.clientLeft + scrollLeft;
            var top = rect.top - html.clientTop + scrollTop;
            var right = rect.right - html.clientLeft + scrollLeft;
            var bottom = rect.bottom - html.clientTop + scrollTop;
            return {left: parseInt(left), top: parseInt(top),
                right: parseInt(right), bottom:parseInt(bottom)};
        };

        /***************************\
         * Main function start here! *
         \***************************/

        var undefined;
        var salt = "salt.akiroom.com";
        var textAreaPosition = getElementPosition(targetElement);
        var dummyName = targetElement.id + "_dummy";
        var dummyTextArea = document.getElementById(dummyName);
        if (!dummyTextArea) {
            // Generate dummy textarea.
            dummyTextArea = document.createElement("div");
            dummyTextArea.id = dummyName;
            var textAreaStyle = getStyle(targetElement)
            dummyTextArea.style.cssText = textAreaStyle.cssText;

            // Fix for browser differece.
            var isWordWrap = false;
            if (targetElement.wrap == "off") {
                // chrome, firefox wordwrap=off
                dummyTextArea.style.overflow = "auto";
                dummyTextArea.style.whiteSpace = "pre";
                isWordWrap = false;
            } else if (targetElement.wrap == undefined) {
                if (textAreaStyle.wordWrap == "break-word")
                    // safari, wordwrap=on
                    isWordWrap = true;
                else
                    // safari, wordwrap=off
                    isWordWrap = false;
            } else {
                // firefox wordwrap=on
                dummyTextArea.style.overflowY = "auto";
                isWordWrap = true;
            }
            dummyTextArea.style.visibility = 'hidden';
            dummyTextArea.style.position = 'absolute';
            dummyTextArea.style.top = '0px';
            dummyTextArea.style.left = '0px';

            // Firefox Support
            dummyTextArea.style.width = textAreaStyle.width;
            dummyTextArea.style.height = textAreaStyle.height;
            dummyTextArea.style.fontSize = textAreaStyle.fontSize;
            dummyTextArea.style.maxWidth = textAreaStyle.width;
            dummyTextArea.style.backgroundColor = textAreaStyle.backgroundColor;
            dummyTextArea.style.fontFamily = textAreaStyle.fontFamily;
            dummyTextArea.style.padding = textAreaStyle.padding;
            dummyTextArea.style.paddingTop = textAreaStyle.paddingTop;
            dummyTextArea.style.paddingRight = textAreaStyle.paddingRight;
            dummyTextArea.style.paddingBottom = textAreaStyle.paddingBottom;
            dummyTextArea.style.paddingLeft = textAreaStyle.paddingLeft;


            targetElement.parentNode.appendChild(dummyTextArea);
        }

        // Set scroll amount to dummy textarea.
        dummyTextArea.scrollLeft = targetElement.scrollLeft;
        dummyTextArea.scrollTop = targetElement.scrollTop;

        // Set code strings.
        var codeStr = targetElement.value;

        // Get caret character position.
        var selPos = getCaretPosition(targetElement);
        var leftText = codeStr.slice(0, selPos.start);
        var selText = codeStr.slice(selPos.start, selPos.end);
        var rightText = codeStr.slice(selPos.end, codeStr.length);
        if (selText == '') selText = "a";

        // Set keyed text.
        var processText = function (text) {
            // Get array of [Character reference] or [Character] or [NewLine].
            var m = escapeHTML(text).match(/((&amp;|&lt;|&gt;|&#34;|&#39;)|.|\n)/g);
            if (m)
                return m.join('<wbr>').replace(/\n/g, '<br>');
            else
                return '';
        };

        // Set calculation text for in dummy text area.
        dummyTextArea.innerHTML = (processText(leftText) +
            '<wbr><span id="' + dummyName + '_i">' + processText(selText) + '</span><wbr>' +
            processText(rightText));

        // Get caret absolutely pixel position.
        var dummyTextAreaPos = getElementPosition(dummyTextArea);
        var caretPos = getElementPosition(document.getElementById(dummyName+"_i"));
        switch (mode) {
            case 'self':
                // Return absolutely pixel position - (0,0) is most top-left of TEXTAREA.
                return {left: caretPos.left-dummyTextAreaPos.left, top: caretPos.top-dummyTextAreaPos.top};
            case 'body':
            case 'screen':
            case 'stage':
            case 'page':
            default:
                // Return absolutely pixel position - (0,0) is most top-left of PAGE.
                return {left: textAreaPosition.left+caretPos.left-dummyTextAreaPos.left, top: textAreaPosition.top+caretPos.top-dummyTextAreaPos.top};
        }
    };
};

    ////////

    function currentWord() {
    let select = document.getElementById("prediction");
    let textarea = document.activeElement;

    let initial_pos = getCursorPos(textarea);
    let pos = initial_pos;
    let text = textarea.value;
    let word = "";
    while (pos) {
    pos --;
    if (separators.test(text[pos])) break;
    word += text[pos];
}
    word = reverse(word);
    select.innerHTML = "";
    let count = 0;
    for (let i = 0; i < wordlist.length && count < max_prediction; i ++) {
    if (word && wordlist[i].toLowerCase().startsWith(word.toLowerCase())) {
    let option = document.createElement("option");
    option.text = wordlist[i];
    option.id = "option-" + count;
    option.name = i;
    if (count == 0) option.selected = true;
    select.appendChild(option);
    count ++;
}
}

    if (word == "") appendWordlist(getPreviousWord(0));

    if (count > 0) {
    if (count == 1 && word == wordlist[select.options[0].name]) {
    select.style.display = "none";
    // concatModule(word);
} else {
    textarea.value = "";
    let linecount = (text.slice(0, pos+1).match(/\n/g) || []).length;
    for (let i = 0; i < linecount; i ++) textarea.value += '\n';
    let start = 0;
    for (let c = 0; c < linecount; start ++) if (text[start] == '\n') c ++;
    textarea.value += text.slice(start, pos) + ' ';

    if (pos > start) setCursorPos(textarea, textarea.value.length);
    else setCursorPos(textarea, textarea.value.length - 1);

    let caretPosition = Measurement.caretPos(textarea);
    textarea.value = text;
    setCursorPos(textarea, initial_pos);

    select.style.left = caretPosition.left + 'px';
    select.style.top = caretPosition.top + 15 + 'px';

    select.size = Math.min(count, max_prediction);
    select.style.display = "inline";
    select.style.width = 'auto';
    select.style.width = Math.max(75, select.offsetWidth) + 'px';
    if (select.offsetHeight + caretPosition.top + 15 > window.innerHeight)
    select.style.top = caretPosition.top - select.offsetHeight + 'px';
}
} else {
    select.style.display = "none";
}
}

    document.activeElement.addEventListener('input', function () {
    currentWord();
});
