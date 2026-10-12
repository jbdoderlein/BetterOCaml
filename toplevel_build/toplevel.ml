(* BetterOCaml toplevel, running inside a Web Worker.
   The page (src/js/toplevel_client.js) owns the DOM: this file only evaluates
   OCaml phrases and posts messages describing what to display. *)

open Js_of_ocaml
open Js_of_ocaml_toplevel
open Lwt

(* Messages to the page *)

let post (fields : (string * Js.Unsafe.any) array) = Worker.post_message (Js.Unsafe.obj fields)
let str s = Js.Unsafe.inject (Js.string s)
let int n = Js.Unsafe.inject n

(* Global variables *)

let sharp_chan = open_out "/dev/null0"
let sharp_ppf = Format.formatter_of_out_channel sharp_chan
let caml_chan = open_out "/dev/null1"
let caml_ppf = Format.formatter_of_out_channel caml_chan
let binsharp_chan = open_out "/dev/null2"
let binsharp_ppf = Format.formatter_of_out_channel binsharp_chan
let consolecaml_chan = open_out "/dev/null3"
let consolecaml_ppf = Format.formatter_of_out_channel consolecaml_chan
let bincaml_chan = open_out "/dev/null3"
let bincaml_ppf = Format.formatter_of_out_channel bincaml_chan

(* Base URL of the page, sent by the page in the "init" message *)
let base_url = ref ""

(* Custom modules *)

module Ocp_indent = struct
  let _ = Approx_lexer.enable_extension "lwt"

  let indent s in_lines =
    let output =
      { IndentPrinter.debug = false
      ; config = IndentConfig.default
      ; in_lines
      ; indent_empty = true
      ; adaptive = true
      ; kind = IndentPrinter.Print (fun s acc -> acc ^ s)
      }
    in
    let stream = Nstream.of_string s in
    IndentPrinter.proceed output stream IndentBlock.empty ""
end

module Colorize = struct
  let lexeme = Sedlexing.Utf8.lexeme;;

  let binary = [%sedlex.regexp? "0b", Plus('0' | '1'), Star('0' | '1' | '_')]
  let octal = [%sedlex.regexp? "0o", Plus('0'..'7'), Star('0'..'7' | '_')]
  let decimal = [%sedlex.regexp? Plus('0'..'9'), Star('0'..'9' | '_'), Opt('.'), Star('0'..'9' | '_')]
  let hexadecimal = [%sedlex.regexp? "0x", Plus('0'..'9' | 'A'..'F' | 'a'..'f'), Star('0'..'9' | 'A'..'F' | 'a'..'f' | '_')]
  let scientific = [%sedlex.regexp? Plus(decimal), ('e' | 'E'), Opt('+' | '-'), Plus('0'..'9' | '_')]

  let numeric = [%sedlex.regexp? binary | octal | decimal | hexadecimal | scientific]

  let boolean = [%sedlex.regexp? "true" | "false"]
  let echar = [%sedlex.regexp? 't' | 'b' | 'n' | 'r' | 'f' | '\\' | '"' | '\'']

  let escaped_char = [%sedlex.regexp? '\\', echar]
  let string = [%sedlex.regexp? '"', Star(Compl(0x22) | escaped_char),'"']
  let char = [%sedlex.regexp? "'", (Compl(0x27) | escaped_char), "'"]

  let space = [%sedlex.regexp? Plus(' ' | '\n' | '\t' | '\r') ]

  let capchar = [%sedlex.regexp? 'A'..'Z']
  let lowchar = [%sedlex.regexp? 'a'..'z']
  let idchar = [%sedlex.regexp? lowchar | capchar | '0'..'9' | '_']

  let modname = [%sedlex.regexp? capchar, Star(idchar)]

  let comment = [%sedlex.regexp? "(*", (Star(Compl(0x2A) | ('*', Compl(')')))), "*)"]

  let id = [%sedlex.regexp? ('_' | lowchar), Star(idchar)]
  let cap_id = [%sedlex.regexp? capchar, id]
  let attr_id = [%sedlex.regexp? (id | cap_id), Star('.', Plus(id | cap_id))]

  let percent_id = [%sedlex.regexp? '%', attr_id]

  let decl_kw = [%sedlex.regexp? "and" | "class" | "constraint" | "exception" | "external" | "let" | "fun" | "function" | "functor" | "in" | "include" | "inherit" | "initializer" | "method" | "module" | "mutable" | "nonrec" | "of" | "open" | "private" | "rec" | "type" | "val" | "virtual"]

  let expr_kw = [%sedlex.regexp? "asr" | "do" | "else" | "for" | "if" | "while" | "as" | "assert" | "begin" | "do" | "done" | "downto" | "else" | "end" | "for" | "if" | "land" | "lazy" | "lor" | "lsl" | "lsr" | "lxor" | "match" | "mod" | "new" | "object" | "or" | "ref" | "sig" | "struct" | "then" | "to" | "try" | "when" | "while" | "with" | "#"]

  let type_kw = [%sedlex.regexp? "bool" | "int" | "string" | "list" | "array" | "float" | "char" | "unit"]

  let lwt_kw = [%sedlex.regexp? "lwt" | "raise_lwt" | ">>=" | ">>" | "=<<" | "for_lwt" | "assert_lwt" | "match_lwt" | "while_lwt"]
  let label = [%sedlex.regexp? '~', id]

  let directive = [%sedlex.regexp? Opt('\n', Opt('\r')), '#', lowchar, Star(idchar)]

  (* List of (css class, text) tokens, turned into spans by the page *)
  let tokens s =
    let lexbuf = Sedlexing.Utf8.from_string s in
    let rec iter acc = match%sedlex lexbuf with
      | eof -> List.rev acc
      | space -> iter (("text", lexeme lexbuf) :: acc)
      | numeric -> iter (("numeric", lexeme lexbuf) :: acc)
      | boolean -> iter (("constant", lexeme lexbuf) :: acc)
      | directive -> iter (("directive", lexeme lexbuf) :: acc)
      | decl_kw -> iter (("kw0", lexeme lexbuf) :: acc)
      | expr_kw -> iter (("kw1", lexeme lexbuf) :: acc)
      | modname -> iter (("kw2", lexeme lexbuf) :: acc)
      | type_kw -> iter (("kw3", lexeme lexbuf) :: acc)
      | percent_id -> iter (("kw5", lexeme lexbuf) :: acc)
      | lwt_kw -> iter (("kw10", lexeme lexbuf) :: acc)
      | label -> iter (("kw4", lexeme lexbuf) :: acc)
      | id -> iter (("id", lexeme lexbuf) :: acc)
      | string -> iter (("string", lexeme lexbuf) :: acc)
      | char -> iter (("string", lexeme lexbuf) :: acc)
      | comment -> iter (("comment", lexeme lexbuf) :: acc)
      | any -> iter (("text", lexeme lexbuf) :: acc)
      | _ -> failwith "Invalid lexer state"
    in
    iter []
end

module Ppx_support = struct
  let init () = Ast_mapper.register "js_of_ocaml" (fun _ -> Ppx_js.mapper)
end

module Version = struct
  let from_string v = List.map int_of_string (String.split_on_char '.' v)

  let rec comp v v' = match v, v' with
    | [], [] -> 0
    | [], y::ys -> if y = 0 then comp [] ys else -1
    | x::xs, [] -> if x = 0 then comp xs [] else 1
    | x::xs, y::ys -> if x = y then comp xs ys else compare x y

  let current = from_string Sys.ocaml_version
end


(* Output *)

let append_text cl (s:string) =
  let s = if String.length s > 0 then s else "empty output" in
  post [| "type", str "text"; "cls", str cl; "text", str s |]

let append_ocaml cl (s:string) =
  let s = if String.length s > 0 then s else "empty output" in
  let tokens =
    Colorize.tokens s
    |> List.map (fun (c, t) -> Js.array [| Js.string c; Js.string t |])
    |> Array.of_list
    |> Js.array
  in
  post [| "type", str "ocaml"; "cls", str cl; "tokens", Js.Unsafe.inject tokens |]

let append_to_console s = post [| "type", str "console"; "text", str s |]

(* The page highlights the location in the phrase echoed since the last "begin" *)
let highlight_location loc =
  let _file1, line1, col1 = Location.get_pos_info loc.Location.loc_start in
  let _file2, line2, col2 = Location.get_pos_info loc.Location.loc_end in
  post [| "type", str "highlight";
          "line1", int line1; "col1", int col1; "line2", int line2; "col2", int col2 |]


(* Standard input: the worker cannot call window.prompt, so it asks the page and
   blocks on a SharedArrayBuffer until the answer is written. This needs a
   cross-origin isolated page; without it, stdin is at end of file. *)

let stdin_buffer : Js.Unsafe.any option ref = ref None

let read_stdin_shared : Js.Unsafe.any -> Js.js_string Js.t = Js.Unsafe.js_expr {|
  (function (sab) {
    var ctrl = new Int32Array(sab, 0, 2);
    Atomics.store(ctrl, 0, 0);
    postMessage({ type: "stdin" });
    Atomics.wait(ctrl, 0, 0);
    var bytes = new Uint8Array(ctrl[1]);
    bytes.set(new Uint8Array(sab, 8, ctrl[1]));
    return new TextDecoder().decode(bytes);
  })
|}

let readline () =
  match !stdin_buffer with
  | Some sab -> Js.to_string (read_stdin_shared sab)
  | None ->
    append_text "stderr" "Reading from stdin is not available in this browser setup (the page is not cross-origin isolated)";
    ""


(* Graphics.open_graph opens a popup window with globalThis.open, which does not
   exist in a worker: give it a fake window whose canvas is the page's Graphics
   canvas, and ask the page to show it. *)

let install_open_graph : Js.Unsafe.any -> unit = Js.Unsafe.js_expr {|
  (function (canvas) {
    globalThis.open = function () {
      postMessage({ type: "graphics_open" });
      var doc = {
        createElement: function () { return canvas; },
        body: { style: {}, appendChild: function () {} }
      };
      Object.defineProperty(doc, "title", {
        set: function (title) { postMessage({ type: "graphics_title", title: title }); }
      });
      return { document: doc };
    };
  })
|}


(* General functions *)

(* load file using a synchronous XMLHttpRequest *)
let load_resource_aux filename url =
  Js_of_ocaml_lwt.XmlHttpRequest.perform_raw ~response_type:XmlHttpRequest.ArrayBuffer url
  >|= fun frame ->
  if frame.Js_of_ocaml_lwt.XmlHttpRequest.code = 200
  then
    Js.Opt.case
      frame.Js_of_ocaml_lwt.XmlHttpRequest.content
      (fun () -> Printf.eprintf "Could not load %s\n" filename)
      (fun b ->
        Sys_js.update_file ~name:filename ~content:(Typed_array.String.of_arrayBuffer b))
  else ()

let load_resource scheme ~prefix ~path:suffix =
  let url = scheme () ^ suffix in
  let filename = Filename.concat prefix suffix in
  Lwt.async (fun () -> load_resource_aux filename url);
  Some ""

let setup_pseudo_fs () =
  Sys_js.mount ~path:"/dev/" (fun ~prefix:_ ~path:_ -> None);
  Sys_js.mount ~path:"/http/" (load_resource (fun () -> "http://"));
  Sys_js.mount ~path:"/https/" (load_resource (fun () -> "https://"));
  Sys_js.mount ~path:"/ftp/" (load_resource (fun () -> "ftp://"));
  Sys_js.mount ~path:"/home/" (load_resource (fun () -> !base_url ^ "filesys/"))

let exec' s =
  let res : bool = JsooTop.use Format.std_formatter s in
  if not res then Format.eprintf "error while evaluating %s@." s

let setup_toplevel () =
  JsooTop.initialize ();
  Sys.interactive := false;
  if Version.comp Version.current [ 4; 07 ] >= 0 then exec' "open Stdlib";
  exec' "print_string (\"        OCaml version \" ^ Sys.ocaml_version);;";
  exec' "#enable \"pretty\";;";
  exec' "#disable \"shortvar\";;";
  exec' "#directory \"/static\";;";
  exec' "module Num = Big_int_Z;;";
  exec' "module Graph = Graphics_js;;";
  Ppx_support.init ();
  let[@alert "-deprecated"] new_directive n k = Hashtbl.add Toploop.directive_table n k in
    new_directive
    "load_js"
    (Toploop.Directive_string (fun name -> Worker.import_scripts [ name ]));
  Sys.interactive := true;
  flush stdout;
  ()

let sanitize_command cmd =
  let len = String.length cmd in
    if try cmd <> "" && cmd.[len - 1] <> ';' && cmd.[len - 2] <> ';'
      with _ -> true
    then cmd ^ ";;"
    else if try cmd <> "" && cmd.[len - 1] = ';' && cmd.[len - 2] <> ';'
      with _ -> true
    then cmd ^ ";"
    else cmd

let default_print_out_phrase = !Toploop.print_out_phrase

let print_out_phrase ppf p =
  match p with
    | Outcometree.Ophr_exception(exn, _) ->
      append_text "stderr" (Format.sprintf "Runtime exception : \n%s" (Printexc.to_string exn))
    | _ -> default_print_out_phrase ppf p

let () = Toploop.print_out_phrase := print_out_phrase

let execute_callback mode content =
  post [| "type", str "begin" |];
  let content' = sanitize_command content in
  (match mode with
    |"internal" -> JsooTop.execute true ~pp_code:binsharp_ppf ~highlight_location bincaml_ppf content'
    |"console" -> JsooTop.execute true ~pp_code:binsharp_ppf ~highlight_location consolecaml_ppf content'
    |"toplevel" -> JsooTop.execute true ~pp_code:sharp_ppf ~highlight_location caml_ppf content';
    |_ -> ());
  flush stdout;
  flush stderr;
  post [| "type", str "done" |]

let indent id text line1 line2 =
  let in_lines =
    if line1 < 0 then fun _ -> true
    else fun l -> l >= line1 + 1 && l <= line2 + 1
  in
  post [| "type", str "indent"; "id", int id; "text", str (Ocp_indent.indent text in_lines) |]


(* Messages from the page *)

let on_message (m : Js.Unsafe.any) =
  let field k = Js.Unsafe.get m (Js.string k) in
  let sfield k = Js.to_string (field k) in
  match sfield "type" with
  | "init" ->
    base_url := sfield "base";
    Js.Optdef.iter (field "canvas") (fun canvas ->
      (* An OffscreenCanvas has the same drawing API as a canvas element *)
      Graphics_js.open_canvas (Js.Unsafe.coerce canvas);
      install_open_graph canvas);
    Js.Optdef.iter (field "stdin") (fun sab -> stdin_buffer := Some sab)
  | "execute" -> execute_callback (sfield "mode") (sfield "content")
  | "create_file" -> Sys_js.create_file ~name:(sfield "name") ~content:(sfield "content")
  | "update_file" -> Sys_js.update_file ~name:(sfield "name") ~content:(sfield "content")
  | "reset" -> setup_toplevel ()
  | "indent" -> indent (field "id") (sfield "text") (field "line1") (field "line2")
  | _ -> ()

let () =
  (Lwt.async_exception_hook :=
     fun exc ->
       Format.eprintf "exc during Lwt.async: %s@." (Printexc.to_string exc);
       match exc with
        | Js_error.Exn e -> let e = Js_error.to_error e in Console.console##log e##.stack
        | _ -> ());
  Sys_js.set_channel_flusher caml_chan (append_ocaml "caml");
  Sys_js.set_channel_flusher sharp_chan (append_ocaml "sharp");
  Sys_js.set_channel_flusher stdout (append_text "stdout");
  Sys_js.set_channel_flusher stderr (append_text "stderr");
  Sys_js.set_channel_flusher consolecaml_chan append_to_console;
  Sys_js.set_channel_filler stdin readline;
  setup_pseudo_fs ();
  setup_toplevel ();
  Worker.set_onmessage on_message
