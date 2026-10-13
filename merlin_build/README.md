# Merlin in the editor

The editor gets completion, the type and documentation under the mouse, errors and
go to definition (F12 or Ctrl-click) from [Merlin](https://github.com/ocaml/merlin),
compiled to JavaScript with js_of_ocaml and running in a Web Worker. The page side is
`src/js/editor_merlin.js`.

- `merlin_worker.ml`: the worker. It answers `complete`, `type`, `document`, `locate` and
  `errors` requests, with positions in JavaScript string units (it converts from/to the
  UTF-8 offsets of merlin). Before the editor content, it adds the definitions of the
  toplevel prelude (`Num`, `Graph`) and aliases for the libraries of the toplevel
  (`Graphics`, `Z`...), which merlin could not complete otherwise.
- `merlin_jsoo.ml`: loading of `.cmi` files over HTTP and merlin pipeline, vendored from
  [merlin-js](https://github.com/voodoos/merlin-js) (MIT license), with small changes.
- `merlin_stubs.js`: JavaScript versions of merlin's file system primitives.

`build.sh` builds the worker and copies it, with the `.cmi` (types) and `.cmti`
(documentation) files of the libraries available in the toplevel, into `src/merlin/`.
These files are downloaded by the page only when merlin needs them.

## Build

`src/merlin/` is built and committed by the CI (`.github/workflows/toplevel_ci_push.yml`),
in the same opam switch as the toplevel, so that the `.cmi` files match its OCaml version.
Do not commit it by hand.

To try the editor locally, build it in an opam switch of the toplevel OCaml version:

```sh
opam install merlin-lib js_of_ocaml js_of_ocaml-ppx graphics zarith zarith_stubs_js js_of_ocaml-lwt
./build.sh
```
