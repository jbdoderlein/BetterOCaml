[![Website betterocaml.ml](https://img.shields.io/website-up-down-green-red/https/betterocaml.ml.svg)](https://betterocaml.ml/)
[![GitHub license](https://img.shields.io/github/license/jbdo99/betterocaml)](https://github.com/jbdo99/betterocaml/blob/master/LICENSE)
![Compatibility](https://img.shields.io/badge/browser-chrome--firefox--edge-green)
# BetterOCaml

An efficient, intuitive and cross-platform web Ocaml IDE 

## Installation / Usage

The IDE is hosted [here](https://betterocaml/editor) but you can host a your own version by simply copy files from `src` directory on your host

## How to use ?

![editor](https://user-images.githubusercontent.com/10222041/108104039-1204c680-708b-11eb-8054-58f7f9e5fe28.png)

The editor is made of 4 parts : 
 - **1 Controls** : with these button you can add, execute, save and load code in the editor and access to settings
 - **2 Tabs** : This is where you can switch between multiple files
 - **3 Editor** : You can type code here and execute with ctrl+enter
 - **4 Output & Console** : This the output of ocaml, you can also type command here
## Theme
You can choose the theme in the settings in the top right corner
If you have any suggestion for theme, open an issue :)

## Library
Betterocaml is made with :
- [js_of_ocaml](https://ocsigen.org/js_of_ocaml/3.7.0/manual/overview) : compile ocaml to js
- [Materialize](https://materializecss.com/) : CSS ans js framework
- [Codemirror](https://codemirror.net/) : js code editor

## Use offline?
### On a laptop or desktop
- If you visit [the editor](https://BetterOCaml.ml/editor) webpage using your favorite browser, and if it works fine, you can add the link to your :star: "favorites", and then later on, if you open the direct link, it should work and load back BetterOCaml... even if your browser is offline!
- This can only work if you don't clean-up or delete the cache of your browser, but it should work even if you turn-off and turn-on again your laptop!

- If you want a nicer user experience, [@Naereen](https://GitHub.com/Naereen) recommends trying [WebCatalog](https://webcatalog.app/), a multi-platform desktop app (for \*NIX, Windows and Mac OS), and you can then use it to "install" [the BetterOCaml editor](https://BetterOCaml.ml/editor), along with its integrated OCaml interpreter (of course), as a "native" desktop app. It then appears in the menu of your system, and it works offline! See [this 1:30min tutorial in video](https://github.com/jbdo99/BetterOCaml/issues/6#issuecomment-780269129)

### On a smartphone
- It should also work, but the support could be improved (or the website could be bundled as a iOS/Android app!).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
