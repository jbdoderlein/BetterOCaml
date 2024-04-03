# BetterOCaml
[![GitHub license](https://img.shields.io/github/license/jbdoderlein/betterocaml?style=flat-square)](https://github.com/jbdoderlein/betterocaml/blob/master/LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/jbdoderlein/BetterOCaml?style=flat-square)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)](https://GitHub.com/jbdoderlein/BetterOCaml/graphs/commit-activity)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)
[![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg?style=flat-square)](https://github.com/Naereen/badges)
<p style="font-style: italic"> Language : 
  <span>English</span> |
  <a href="https://github.com/jbdoderlein/BetterOCaml/tree/master/lang/french#betterocaml">Français</a>
  </p>

An efficient, intuitive and cross-platform web IDE for the [OCaml](https://www.ocaml.org/) language (recent: v5.1.0), with your code interpreted and running in your browser! (no server is needed!)

## Installation / Usage

The IDE is hosted [here](https://jbdoderlein.github.io/BetterOCaml), <https://jbdoderlein.github.io/BetterOCaml>, but you can host your own version by simply copying the files from the `src/` directory on your host (on a folder of your laptop, or a folder of your web-server, see <http://ocaml.besson.link/> for an example).

It is a *purely static website*: once your browser downloads the files from the server (about 7 MB), it will run the OCaml code in its javascript engine, without sending anything to a distant server!
Your data is secure, and this website does not use any third party service cookie :no_good_man: :cookie:.

Without installing any software on your laptop or smartphone, use [this web-based editor](https://jbdoderlein.github.io/BetterOCaml) to access to a complete OCaml REPL and text editor, with syntax highlighting, autocompletion, a full support of recent OCaml syntax and [the entire standard library](https://caml.inria.fr/pub/docs/manual-ocaml/libref/) (except for `Graphics`, `Unix` modules and `Sys.command` function), and multiple-files that you can save to or load from your computer.

## How to use ?

![BetterOCaml usage gif](https://user-images.githubusercontent.com/10222041/117338097-75d6a880-ae9e-11eb-9a69-63c39bd8fd4a.gif)

The editor is made of 3 parts, as seen in this screenshot:
- ** Navbar ** : this is where you can switch between multiple files. You can add, execute, save, load code in the editor and access to settings;;
- ** Editor** : you can type code here and execute with `Ctrl+Enter`. Each OCaml statement must be finished with `;;`, and [toplevel directives](https://caml.inria.fr/pub/docs/manual-ocaml/toplevel.html#s%3Atoplevel-directives) are *not* supported;
- ** Output & Console** : this the output of OCaml, showing values and messages printed to `sdtout`, you can also type command here (after the `# ` sign), and type `Enter`.

### :art: Theme

You can choose the theme in the settings, in the top right corner. Your preference should be used the next time you come back on the editor.
There are currently three themes (two dark themes, "default" and "Monokai", and a light one, "MDN").

If you have any suggestion for a new theme, [open an issue](https://github.com/jbdoderlein/BetterOCaml/issues/new) :+1: !

## :sparkles: Use offline?
### :computer: On a laptop or desktop
- If you visit [the editor](https://jbdoderlein.github.io/BetterOCaml) webpage using your favorite browser, and if it works fine, you can add the link to your :star: "favorites", and then later on, if you open the direct link, it should work and load back BetterOCaml... even if your browser is offline!
- This can only work if you don't clean-up or delete the cache of your browser, but it should work even if you turn-off and turn-on again your laptop!

- We [recently](https://github.com/jbdoderlein/BetterOCaml/issues/12) [added](https://github.com/jbdoderlein/BetterOCaml/issues/13) support for an [app manifest](https://github.com/jbdoderlein/BetterOCaml/blob/master/src/manifest.json) and [service workers](https://github.com/jbdoderlein/BetterOCaml/blob/master/src/serviceWorker.js), so this web app is now a *Progressive Web App* (PWA), which can be installed on your laptop and used later on, even if you're offline! After being intalled, the app should appear in your global application menu (it works on Chromium on both Windows and Ubuntu).

> If you can't install it as a PWA, [@Naereen](https://GitHub.com/Naereen) recommends trying [WebCatalog](https://webcatalog.app/), a multi-platform desktop app (for \*NIX, Windows and Mac OS), and you can then use it to "install" [the BetterOCaml editor](https://jbdoderlein.github.io/BetterOCaml), along with its integrated OCaml interpreter (of course), as a "native" desktop app. It then appears in the menu of your system, and it works offline! See [this 1:30min tutorial in video](https://github.com/jbdoderlein/BetterOCaml/issues/6#issuecomment-780269129).

### :phone: On a smartphone
- It also works fine on smartphone running any recent OS and browser, :ok_hand: and the app should be "responsive" and you can switch to a vertical layout in the settings if your screen is too narrow.
- Loading the OCaml toplevel can take a few seconds on a mobile 3G/4G or :snail: slow Wifi networks: it's over 30 Mb, as it includes all of [OCaml standard library](https://caml.inria.fr/pub/docs/manual-ocaml/libref/)!
- The *Progressive Web App* can be installed on your smartphone: there should be a small + button near the address bar, or a "Install it" option in the menu. Once you install it, there should be an icon in the home screen (but not in the app menu) that launches the app in full size mode (like a browser, but no address bar). It [works fine](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Developer_guide/Installing#what_browsers_support_installation) on Chrom(e|ium) and Firefox mobile on Android, at least.
- If you think that this is not enough, and that the website should be bundled as a native iOS/Android app, please vote :+1: on [this issue](https://github.com/jbdoderlein/BetterOCaml/issues/14).

## :zap: PWA

BetterOCaml is a fully installable Progressive Web App

[![pwa performance](https://betterocaml.ml/pwa_performance_2503.svg)](https://pagespeed-insights.herokuapp.com/?url=https://betterocaml.ml)

## OCaml version

You can change the OCaml version with the url : `https://link-to-betterocaml/?version=4.11.0`

<https://jbdoderlein.github.io/BetterOCaml> offers `5.1.1`, `5.1.0` and `4.14.0`

You can also compile the toplevel with any version you want using [the compilation script](https://github.com/jbdoderlein/BetterOCaml/blob/master/toplevel_build/BUILD.md#how-to-build-the-betterocaml-toplevel).

Available version : `4.06.0`,`4.06.1`,`4.07.0`,`4.07.1`,`4.08.0`,`4.08.0`,`4.08.1`,`4.09.0`,`4.09.1`,`4.10.0`,`4.10.1`,`4.10.2`,`4.11.0`,`4.11.1`,`4.11.2`,`4.12.0`,`4.12.1`,`4.13.0`,`4.13.1`,`4.14.0`, `4.14.1`, `5.1.0`, `5.1.1`

*The dune configuration is now modified to work with Dune>3.0 and Ocaml 5.0, to compile for OCaml<5.0, use [this commit](https://github.com/jbdoderlein/BetterOCaml/commit/7e3f428305a3410d0212c1dbe15610170d9f76ed)*

##  About this project

### :hammer_and_wrench: Dependencies
BetterOCaml is made with these open-source tools:
- [js_of_ocaml](https://ocsigen.org/js_of_ocaml/3.7.0/manual/overview) v3.7.0 : compile the OCaml toplevel to javascript;
- [Materialize](https://materializecss.com/) : CSS and javascript framework;
- [Codemirror](https://codemirror.net/) : javascript code editor.

### Contributing?
Pull requests are welcome. For major changes, please [open an issue first](https://github.com/jbdoderlein/BetterOCaml/issues/new) to discuss what you would like to change.

### :sos: Need help?
If something is wrong or if you encounter any issue when using BetterOCaml, please [open an issue first](https://github.com/jbdoderlein/BetterOCaml/issues/new) (you have [to create a GitHub account](https://github.com/join) first).

### :scroll: License
This project is released publicly under the terms of the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) license.

### Authors
This project was initiated and is maintained by [@jbdoderlein](https://github.com/jbdoderlein/), with help and contributions from a few [other people](https://github.com/jbdoderlein/BetterOCaml/graphs/contributors).

