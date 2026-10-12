# How to build the BetterOCaml Toplevel

**Warning** : The dune configuration is now modified to work with Dune>3.0 and Ocaml 5.0, to compile for OCaml<5.0, use [this commit](https://github.com/jbdoderlein/BetterOCaml/commit/7e3f428305a3410d0212c1dbe15610170d9f76ed)

With the tool created by math-gout, you can easily compile the
OCaml toplevel used in BetterOCaml.
## Clone repository
Create a new directory and clone BetterOcaml repository :  
`git clone https://github.com/jbdoderlein/BetterOCaml`
## Install opam
You need to install opam on your device : [here are the instructions depending on your distribution](https://opam.ocaml.org/doc/Install.html)
## Run script
Move in the `toplevel_build` directory :  
`cd BetterOCaml/toplevel_build`  
Run the compile script with the version you want to compile :  
`./compile.sh 4.13.0`  
To enable OCaml 5 effect handlers (`Effect.Deep`, `Effect.Shallow`) in the toplevel :  
`./compile.sh --effects cps 5.3.0`  
Effects are disabled by default because they make the generated file bigger and the code slower.
`double-translation` is also accepted (faster code, but an even bigger file).  
To build several variants of the same version, add a suffix to the output file name :  
`./compile.sh -k --effects double-translation 5.5.1` then `./compile.sh --suffix -noeffects 5.5.1`  
gives `toplevel-5.5.1.js` and `toplevel-5.5.1-noeffects.js`, loaded with `?version=5.5.1-noeffects`.  
To get help on the options provided by the compile script :  
`./compile.sh --help`

## Use the new compiled file
To use the new compiled toplevel, copy the file 
from `/toplevel_build/builds/` to `/src/toplevels/`

The toplevel runs in a Web Worker, so code that loops forever can be stopped
without freezing the page. `toplevel.ml` only evaluates code and sends messages;
the page side is `src/js/toplevel_client.js`. Builds made before this change run
directly on the page instead: when adding a new build to `/src/toplevels/`, add its
version to `worker_versions` in `src/index.html`.
