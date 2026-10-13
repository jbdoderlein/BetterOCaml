// CodeMirror 6 modules used by src/js/editor_change.js, bundled into src/js/codemirror6.js
// as the global `CM` (see README.md in this folder).

export {EditorState, StateField, StateEffect, Prec, Compartment, EditorSelection} from "@codemirror/state";
export {
    EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars,
    drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine,
    Decoration, hoverTooltip, showTooltip
} from "@codemirror/view";
export {linter, lintGutter, lintKeymap, forceLinting, setDiagnostics} from "@codemirror/lint";
export {
    defaultKeymap, history, historyKeymap, indentMore, indentLess, deleteCharBackward,
    insertTab
} from "@codemirror/commands";
export {
    StreamLanguage, indentUnit, syntaxHighlighting, HighlightStyle, bracketMatching,
    indentOnInput, foldGutter, foldKeymap
} from "@codemirror/language";
export {searchKeymap, highlightSelectionMatches, openSearchPanel, gotoLine} from "@codemirror/search";
export {
    autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap, startCompletion
} from "@codemirror/autocomplete";
export {tags} from "@lezer/highlight";
export {oCaml} from "@codemirror/legacy-modes/mode/mllike";
