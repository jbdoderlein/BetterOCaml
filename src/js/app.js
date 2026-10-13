/**
 * Page setup: first editor, settings, loading screen, autosave, file loading.
 */

init_local_storage();
var editors = {};
var resize_bar;
new_editor();

// The "mod" key of the shortcuts help
document.documentElement.style.setProperty('--shortcut_system',
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '"Cmd"' : '"Ctrl"');

// Theme, layout and zoom saved in the settings
change_configuration('betterocaml-theme', localStorage.getItem("betterocaml-theme") || "material", editors);
resize_bar = new Resizer(document.getElementById('resizer'), 'H');
change_resize_bar(resize_bar, localStorage.getItem("betterocaml-resize-bar") || "H");
window.matchMedia("(max-width: 600px)").addEventListener("change", () => {
    change_resize_bar(resize_bar, localStorage.getItem("betterocaml-resize-bar") || "H");
});
document.documentElement.style.setProperty('--editor-font-size', localStorage.getItem("betterocaml-text-editor") || "1.2em");
document.documentElement.style.setProperty('--toplevel-font-size', localStorage.getItem("betterocaml-text-toplevel") || "1.2em");


// With many files, the mouse wheel scrolls the tabs sideways
document.getElementById('editor-tabs').addEventListener('wheel', e => {
    if (e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // Trackpad: already horizontal
    e.currentTarget.scrollLeft += e.deltaY;
    e.preventDefault();
}, {passive: false});


// Settings dialog

let theme_select = document.getElementById('theme-select');
theme_select.value = localStorage.getItem('betterocaml-theme') || 'material';
theme_select.addEventListener('change', e => change_configuration('betterocaml-theme', e.target.value, editors));

let layout_select = document.getElementById('layout-select');
layout_select.value = localStorage.getItem('betterocaml-resize-bar') || 'H';
layout_select.addEventListener('change', e => change_resize_bar(resize_bar, e.target.value));

for (const [id, setting, value] of [
    ['autocomplete-checkbox', 'betterocaml-autocomplete', () => localStorage.getItem('betterocaml-autocomplete') === "true"],
    ['merlin-checkbox', 'betterocaml-merlin', merlin_enabled],
    ['merlin-hover-checkbox', 'betterocaml-merlin-hover', merlin_hover_enabled],
]) {
    let checkbox = document.getElementById(id);
    checkbox.checked = value();
    checkbox.addEventListener('change', () => change_configuration(setting, checkbox.checked, editors));
}

// Dialogs close when clicking outside of them
for (const dialog of document.querySelectorAll('dialog')) {
    dialog.addEventListener('click', e => {
        if (e.target === dialog) dialog.close();
    });
}

document.getElementById('saveas-form').addEventListener('submit', e => {
    if (e.submitter && e.submitter.value === 'save') name_and_save(editors[current_editor()]);
});


// Toplevel

// Clicking the empty part of the toplevel focuses its input
document.getElementById("toplevel-container").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) document.getElementById('userinput').focus();
});

// Loading screen: hidden once the toplevel has printed its banner
let loader_observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeName === 'SPAN' && node.classList.contains("stdout")) {
                document.getElementById('loader-wrapper').classList.add("fade-out");
                loader_observer.disconnect();
                return;
            }
        }
    }
});
loader_observer.observe(document.getElementById('output'), {childList: true});

document.getElementById("loader-wrapper").addEventListener("animationend", function () {
    this.hidden = true;
    if (autosave_number() > 0) {
        if (confirm("Some files were saved automatically during your last session, do you want to restore them?")) {
            restore_editors();
            remove_editor(0);
        }
        clear_autosave();
    }
});


// Files

document.getElementById('file-upload').addEventListener('change', readSingleFile, false);

// Do not lose unsaved files when leaving the page
window.addEventListener('beforeunload', function (e) {
    let unsaved = Object.values(editors).filter(editor => !editor.is_saved);
    if (unsaved.length > 0) {
        for (const editor of unsaved) autosave_editor(editor.id);
        e.preventDefault();
        e.returnValue = "";
    }
});

/**
 * Name of a file loaded from a URL: the file name of the URL if it is a .ml file,
 * else the name in a first line comment "(* name.ml *)", else "imported.ml"
 */
function file_name_of_url(url, contents) {
    let name = new URL(url, window.location.href).pathname.split('/').pop();
    if (name && name.endsWith('.ml')) return name;
    let match = contents.split('\n')[0].trim().match(/^\(\*\s*(.+?)\s*\*\)$/);
    return match ? match[1] : 'imported.ml';
}

// Open the file given in the URL (?load=https://...)
let load_from_url = params.get("load");
if (load_from_url) {
    fetch(load_from_url)
        .then(response => {
            if (!response.ok) throw new Error(response.status + " " + response.statusText);
            return response.text();
        })
        .then(contents => open_contents(file_name_of_url(load_from_url, contents), contents))
        .catch(error => alert("Could not load " + load_from_url + ": " + error.message));
}


// Offline use
window.addEventListener("load", function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js').catch(error => {
            console.log("Service Worker registration failed", error);
        });
    }
});
