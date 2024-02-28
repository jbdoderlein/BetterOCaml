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
To get help on the options provided by the compile script :  
`./compile.sh --help`

## Use the new compiled file
To use the new compiled toplevel, copy the file 
from `/toplevel_build/builds/` to `/src/toplevels/`
