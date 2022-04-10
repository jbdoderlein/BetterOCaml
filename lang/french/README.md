# BetterOCaml
[![Website betterocaml.ml](https://img.shields.io/website-up-down-green-red/https/betterocaml.ml.svg?style=flat-square)](https://betterocaml.ml/)
[![GitHub license](https://img.shields.io/github/license/jbdoderlein/betterocaml?style=flat-square)](https://github.com/jbdoderlein/betterocaml/blob/master/LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/jbdoderlein/BetterOCaml?style=flat-square)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)](https://GitHub.com/jbdoderlein/BetterOCaml/graphs/commit-activity)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)
[![CI](https://github.com/jbdoderlein/BetterOCaml/actions/workflows/toplevel_ci.yml/badge.svg?branch=master)](https://github.com/jbdoderlein/BetterOCaml/actions/workflows/toplevel_ci.yml)
[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=0077b6">](https://github.com/SamKirkland/FTP-Deploy-Action)
[![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg?style=flat-square)](https://github.com/Naereen/badges)

<p style="font-style: italic"> Langage : 
  <a href="https://github.com/jbdoderlein/BetterOCaml#betterocaml">English</a> |
  <span>Français</span>
  </p>

Un IDE web efficace, intuitif et multiplateforme pour le langage [OCaml](https://www.ocaml.org/) (récent : v4.14.0), avec votre code interprété et exécuté dans votre navigateur ! (aucun serveur n'est nécessaire !)

## Installation / Utilisation

L'IDE est hébergé [ici](https://betterocaml/), <https://BetterOCaml.ml/>, mais vous pouvez héberger votre propre version en copiant simplement les fichiers du répertoire `src/` sur votre hôte (sur un dossier de votre ordinateur portable, ou un dossier de votre serveur web, voir <http://ocaml.besson.link/> pour un exemple).

C'est un site *purement statique* : une fois que votre navigateur aura téléchargé les fichiers du serveur (environ 35 Mo), il exécutera le code OCaml dans son moteur javascript, sans rien envoyer à un serveur distant !
Vos données sont sécurisées, et ce site n'utilise aucun cookie de service tiers :no_good_man: :cookie:.

Sans installer aucun logiciel sur votre ordinateur portable ou votre smartphone, utilisez [cet éditeur web](https://BetterOCaml.ml/) pour accéder à un REPL OCaml complet et à un éditeur de texte, avec coloration syntaxique, autocomplétion, un support complet de la syntaxe OCaml récente et de [toute la bibliothèque standard](https://caml.inria.fr/pub/docs/manual-ocaml/libref/) (sauf les modules `Graphics`, `Unix` et la fonction `Sys.command`), et des fichiers multiples que vous pouvez sauvegarder ou charger depuis votre ordinateur.

## Comment utiliser ?

![BetterOCaml usage gif](https://user-images.githubusercontent.com/10222041/117338097-75d6a880-ae9e-11eb-9a69-63c39bd8fd4a.gif)

L'éditeur est composé de 3 parties, comme le montre cette capture d'écran :
- ** Navbar ** : c'est ici que vous pouvez basculer entre plusieurs fichiers. Vous pouvez ajouter, exécuter, sauvegarder, charger du code dans l'éditeur et accéder aux paramètres; ;
- ** Editor** : vous pouvez taper du code ici et l'exécuter avec `Ctrl+Enter`. Chaque instruction OCaml doit être terminée par `;;`, et les [toplevel directives](https://caml.inria.fr/pub/docs/manual-ocaml/toplevel.html#s%3Atoplevel-directives) ne sont *pas* supportées ;
- ** Output & Console** : c'est la sortie d'OCaml, montrant les valeurs et les messages imprimés dans `sdtout`, vous pouvez aussi taper une commande ici (après le signe `# `), et taper `Enter`.

### :art: Thème

Vous pouvez choisir le thème dans les paramètres, dans le coin supérieur droit. Votre préférence devrait être utilisée la prochaine fois que vous revenez sur l'éditeur.
Il existe actuellement trois thèmes (deux thèmes sombres, "default" et "Monokai", et un thème clair, "MDN").

Si vous avez des suggestions pour un nouveau thème, [ouvrir une issue](https://github.com/jbdoderlein/BetterOCaml/issues/new) :+1: !

## :sparkles: Utiliser hors ligne ?
### :computer: Sur un ordinateur portable ou de bureau
- Si vous visitez la page Web de [l'éditeur](https://BetterOCaml.ml/) à l'aide de votre navigateur préféré, et si tout fonctionne bien, vous pouvez ajouter le lien à vos :star: "favoris", et plus tard, si vous ouvrez le lien direct, il devrait fonctionner et charger BetterOCaml... même si votre navigateur est hors ligne !
- Cela ne peut fonctionner que si vous ne nettoyez pas ou ne supprimez pas le cache de votre navigateur, mais cela devrait fonctionner même si vous éteignez et rallumez votre ordinateur portable !

- Nous avons [récemment](https://github.com/jbdoderlein/BetterOCaml/issues/12) [ajouté](https://github.com/jbdoderlein/BetterOCaml/issues/13) le support pour un [manifeste d'application](https://github.com/jbdoderlein/BetterOCaml/blob/master/src/manifest.json) et des [travailleurs de service](https://github.com/jbdoderlein/BetterOCaml/blob/master/src/serviceWorker.js), donc cette application web est maintenant une *application web progressive* (PWA), qui peut être installée sur votre ordinateur portable et utilisée plus tard, même si vous êtes hors ligne ! Après avoir été installée, l'application devrait apparaître dans votre menu d'application global (elle fonctionne sous Chromium à la fois sur Windows et Ubuntu).

> Si vous ne pouvez pas l'installer en tant que PWA, [@Naereen](https://GitHub.com/Naereen) recommande d'essayer [WebCatalog](https://webcatalog.app/), une application de bureau multiplateforme (pour UNIX, Windows et Mac OS), et vous pouvez ensuite l'utiliser pour "installer" [l'éditeur BetterOCaml](https://BetterOCaml.ml), avec son interpréteur OCaml intégré (bien sûr), en tant qu'application de bureau "native". Il apparaît alors dans le menu de votre système, et il fonctionne hors ligne ! Voir [ce tutoriel de 1:30min en vidéo](https://github.com/jbdoderlein/BetterOCaml/issues/6#issuecomment-780269129).

### :phone: Sur un smartphone
- Il fonctionne également très bien sur un smartphone équipé d'un système d'exploitation et d'un navigateur récents, :ok_hand: l'application devrait être "responsive" et vous pouvez passer à une disposition verticale dans les paramètres si votre écran est trop étroit.
- Le chargement du toplevel OCaml peut prendre quelques secondes sur un réseau mobile 3G/4G ou :snail: un réseau Wifi lent : il fait plus de 30 Mo, car il inclut toute la [bibliothèque standard OCaml](https://caml.inria.fr/pub/docs/manual-ocaml/libref/) !
- La *Progressive Web App* peut être installée sur votre smartphone : il devrait y avoir un petit bouton + près de la barre d'adresse, ou une option "Install it" dans le menu. Une fois que vous l'avez installée, il devrait y avoir une icône sur l'écran d'accueil (mais pas dans le menu des applications) qui lance l'application en mode pleine taille (comme un navigateur, mais sans barre d'adresse). Cela [fonctionne bien](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Developer_guide/Installing#what_browsers_support_installation) sur Chrom(e|ium) et Firefox mobile sur Android, au moins.
- Si vous pensez que ce n'est pas suffisant et que le site Web devrait être intégré à une application native iOS/Android, veuillez voter :+1: sur [cette question](https://github.com/jbdoderlein/BetterOCaml/issues/14).

## :zap: PWA

BetterOCaml est une Progressive Web App entièrement installable.

[!performance des pwa](https://betterocaml.ml/pwa_performance_2503.svg)](https://pagespeed-insights.herokuapp.com/?url=https://betterocaml.ml)
## Version de OCaml
Vous pouvez changer la version de OCaml avec l'url : `https://betterocaml.ml/?version=4.11.0`

Available version : `4.06.0`,`4.06.1`,`4.07.0`,`4.07.1`,`4.08.0`,`4.08.0`,`4.08.1`,`4.09.0`,`4.09.1`,`4.10.0`,`4.10.1`,`4.10.2`,`4.11.0`,`4.11.1`,`4.11.2`,`4.12.0`,`4.12.1`,`4.13.0`,`4.13.1`

Vous pouvez également compiler le toplevel avec la version de votre choix en utilisant [le script de compilation](https://github.com/jbdoderlein/BetterOCaml/blob/master/toplevel_build/BUILD.md#how-to-build-the-betterocaml-toplevel).
## A propos de ce projet

### :hammer_and_wrench: Dépendances
BetterOCaml est réalisé avec ces outils open-source :
- [js_of_ocaml](https://ocsigen.org/js_of_ocaml/3.7.0/manual/overview) v3.7.0 : compile le toplevel OCaml en javascript ;
- [Materialize](https://materializecss.com/) : framework CSS et javascript ;
- [Codemirror](https://codemirror.net/) : éditeur de code javascript.

### Contribuer ?
Les pull requests sont les bienvenues. Pour les changements majeurs, veuillez [ouvrir d'abord une issue](https://github.com/jbdoderlein/BetterOCaml/issues/new) pour discuter de ce que vous souhaitez changer.

### :sos: Besoin d'aide ?
Si quelque chose ne va pas ou si vous rencontrez une issue lors de l'utilisation de BetterOCaml, veuillez [ouvrir une issue en premier] (https://github.com/jbdoderlein/BetterOCaml/issues/new) (vous devez d'abord [créer un compte GitHub] (https://github.com/join)).

### :scroll: Licence
Ce projet est diffusé publiquement selon les termes de la licence [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).

### Auteurs
Ce projet a été initié et est maintenu par [@jbdoderlein](https://github.com/jbdoderlein/), avec l'aide et les contributions de quelques [autres personnes](https://github.com/jbdoderlein/BetterOCaml/graphs/contributors).
