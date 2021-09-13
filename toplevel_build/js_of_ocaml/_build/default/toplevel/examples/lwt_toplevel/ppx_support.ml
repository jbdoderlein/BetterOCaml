# 1 "toplevel/examples/lwt_toplevel/ppx_support.enabled.ml"
let init () = Ast_mapper.register "js_of_ocaml" (fun _ -> Ppx_js.mapper)
