#!/bin/bash
# Builds the merlin worker used by the editor, and copies it with the .cmi files of the
# libraries available in the toplevel into src/merlin/.
# Use the same OCaml version as the default toplevel (.cmi files depend on it):
#   opam install merlin-lib js_of_ocaml js_of_ocaml-ppx graphics zarith zarith_stubs_js js_of_ocaml-lwt
#   ./build.sh
set -e
cd "$(dirname "$0")"
OUT=../src/merlin

dune build --profile release ./merlin_worker.bc.js
mkdir -p "$OUT/cmis"
rm -f "$OUT"/cmis/*.cmi "$OUT"/cmis/*.cmti
cp -f _build/default/merlin_worker.bc.js "$OUT/merlin_worker.js"
chmod 644 "$OUT/merlin_worker.js"

# Libraries visible in the toplevel (see export.txt in toplevel_build/dune), and the
# libraries their interfaces refer to
LIB=$(ocamlfind printconf destdir)
STDLIB=$(ocamlfind ocamlc -where)
cp -f "$STDLIB"/*.cmi "$STDLIB"/*.cmti "$STDLIB"/str/*.cmi "$STDLIB"/str/*.cmti "$OUT/cmis/"
for lib in graphics zarith js_of_ocaml js_of_ocaml-lwt js_of_ocaml-lwt/graphics lwt; do
    cp -f "$LIB/$lib"/*.cmi "$OUT/cmis/"
done
# Documentation (.cmti) only for the libraries users call directly
for lib in graphics zarith js_of_ocaml-lwt/graphics; do
    cp -f "$LIB/$lib"/*.cmti "$OUT/cmis/" 2>/dev/null || true
done
# Not usable in the browser toplevel
rm -f "$OUT"/cmis/{unix,unixLabels,thread,event,mutex,condition,semaphore,dynlink}*.cm{i,ti}
chmod 644 "$OUT"/cmis/*

echo "merlin worker: $(du -h "$OUT/merlin_worker.js" | cut -f1), $(ls "$OUT"/cmis/*.cmi | wc -l) cmi and $(ls "$OUT"/cmis/*.cmti | wc -l) cmti files ($(du -sh "$OUT/cmis" | cut -f1))"
echo "OCaml version of the .cmi files: $(ocamlfind ocamlc -version)"
