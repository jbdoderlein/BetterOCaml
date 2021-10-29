open Js_of_ocaml
open Js_of_ocaml_tyxml
open Js_of_ocaml_toplevel
open Lwt

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

module Indent = struct
  let textarea (textbox : Dom_html.textAreaElement Js.t) : unit =
    let rec loop s acc (i, pos') =
      try
        let pos = String.index_from s pos' '\n' in
        loop s ((i, (pos', pos)) :: acc) (succ i, succ pos)
      with _ -> List.rev ((i, (pos', String.length s)) :: acc)
    in
    let rec find (l : (int * (int * int)) list) c =
      match l with
      | [] -> assert false
      | (i, (lo, up)) :: _ when up >= c -> c, i, lo, up
      | (_, (_lo, _up)) :: rem -> find rem c
    in
    let v = textbox##.value in
    let pos =
      let c1 = textbox##.selectionStart and c2 = textbox##.selectionEnd in
      if Js.Opt.test (Js.Opt.return c1) && Js.Opt.test (Js.Opt.return c2)
      then
        let l = loop (Js.to_string v) [] (0, 0) in
        Some (find l c1, find l c2)
      else None
    in
    let f =
      match pos with
      | None -> fun _ -> true
      | Some ((_c1, line1, _lo1, _up1), (_c2, line2, _lo2, _up2)) ->
          fun l -> l >= line1 + 1 && l <= line2 + 1
    in
    let v = Ocp_indent.indent (Js.to_string v) f in
    textbox##.value := Js.string v;
    match pos with
    | Some ((c1, line1, _lo1, up1), (c2, line2, _lo2, up2)) ->
        let l = loop v [] (0, 0) in
        let lo1'', up1'' = List.assoc line1 l in
        let lo2'', up2'' = List.assoc line2 l in
        let n1 = max (c1 + up1'' - up1) lo1'' in
        let n2 = max (c2 + up2'' - up2) lo2'' in
        let () = (Obj.magic textbox)##setSelectionRange n1 n2 in
        textbox##focus;
        ()
    | None -> ()
end

module Colorize = struct
  let text ~a_class:cl s = Tyxml_js.Html.(span ~a:[ a_class [ cl ] ] [ txt s ])
  
  let ocaml ~a_class:cl s =
    let tks = Higlo.parse ~lang:"ocaml" s in
    let span' cl s = Tyxml_js.Html.(span ~a:[ a_class [ cl ] ] [ txt s ]) in
    let make_span = function
      | Higlo.Bcomment s -> span' "comment" s
      | Higlo.Constant s -> span' "constant" s
      | Higlo.Directive s -> span' "directive" s
      | Higlo.Escape s -> span' "escape" s
      | Higlo.Id s -> span' "id" s
      | Higlo.Keyword (level, s) -> span' (Printf.sprintf "kw%d" level) s
      | Higlo.Lcomment s -> span' "comment" s
      | Higlo.Numeric s -> span' "numeric" s
      | Higlo.String s -> span' "string" s
      | Higlo.Symbol (level, s) -> span' (Printf.sprintf "sym%d" level) s
      | Higlo.Text s -> span' "text" s
    in
    Tyxml_js.Html.(div ~a:[ a_class [ cl ] ] (List.map make_span tks))
    
  let highlight (`Pos from_) to_ e =
    let _ =
      List.fold_left
        (fun pos e ->
          match Js.Opt.to_option (Dom_html.CoerceTo.element e) with
          | None -> pos
          | Some e ->
              let size = Js.Opt.case e##.textContent (fun () -> 0) (fun t -> t##.length) in
              if pos + size > from_ && (to_ = `Last || `Pos pos < to_)
              then e##.classList##add (Js.string "errorloc");
              pos + size)
        0
        (Dom.list_of_nodeList e##.childNodes)
    in
    ()
end

module Ppx_support = struct
  let init () = Ast_mapper.register "js_of_ocaml" (fun _ -> Ppx_js.mapper)
end

module Version = struct
  type t = int list
  
  let from_string v = List.map int_of_string (String.split_on_char '.' v)
  
  let rec comp v v' = match v, v' with
    | [], [] -> 0
    | [], y::_ -> compare 0 y
    | x::_, [] -> compare x 0
    | x::xs, y::ys -> (
        match compare x y with
        | 0 -> comp xs ys
        | n -> n)
  
  let current = from_string Sys.ocaml_version
end

module History = struct
  let data = ref [| "" |]
  
  let idx = ref 0
  
  let get_storage () =
    match Js.Optdef.to_option Dom_html.window##.localStorage with
    | exception _ -> raise Not_found
    | None -> raise Not_found
    | Some t -> t
  
  let set_storage () =
    try
      let s = get_storage () in
      let str = Json.output !data in
      s##setItem (Js.string "history") str
    with Not_found -> ()
  
  let setup () =
    try
      let s = get_storage () in
      match Js.Opt.to_option (s##getItem (Js.string "history")) with
      | None -> raise Not_found
      | Some s ->
          let a = Json.unsafe_input s in
          data := a;
          idx := Array.length a - 1
    with _ -> ()
  
  let push text =
    let _ = match Array.length !data, text with
     | _, "" -> ()
     | 1, text -> if text <> "" then data := [| text ; "" |]; set_storage ();
     | _, text -> if text <> !data.(Array.length !data - 2) then
        data := Array.append !data [| "" |];
        !data.(Array.length !data - 2) <- text;
        set_storage ();
    in idx := Array.length !data - 1
  
  let current text = !data.(!idx) <- text
  
  let previous textbox =
    if !idx > 0
    then (
      decr idx;
      textbox##.value := Js.string !data.(!idx))
  
  let next textbox =
    if !idx < Array.length !data - 1
    then (
      incr idx;
      textbox##.value := Js.string !data.(!idx))
end


(* General functions *)

let by_id s = Dom_html.getElementById s

let by_id_coerce s f = Js.Opt.get (f (Dom_html.getElementById s)) (fun () -> raise Not_found)

let do_by_id s f = try f (Dom_html.getElementById s) with Not_found -> ()

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
  let url = scheme ^ suffix in
  let filename = Filename.concat prefix suffix in
  Lwt.async (fun () -> load_resource_aux filename url);
  Some ""

let setup_pseudo_fs () =
  Sys_js.mount ~path:"/dev/" (fun ~prefix:_ ~path:_ -> None);
  Sys_js.mount ~path:"/http/" (load_resource "http://");
  Sys_js.mount ~path:"/https/" (load_resource "https://");
  Sys_js.mount ~path:"/ftp/" (load_resource "ftp://");
  Sys_js.mount ~path:"/home/" (load_resource "filesys/")

let exec' s =
  let res : bool = JsooTop.use Format.std_formatter s in
  if not res then Format.eprintf "error while evaluating %s@." s

let setup_toplevel () =
  JsooTop.initialize ();
  Sys.interactive := false;
  if Version.comp Version.current [ 4; 07 ] >= 0 then exec' "open Stdlib";
  exec' "module Lwt_main = \n\
           struct\n\
           let run t = match Lwt.state t with\n\
             | Lwt.Return x -> x\n\
             | Lwt.Fail e -> raise e\n\
             | Lwt.Sleep -> failwith \"Lwt_main.run: thread didn't return\"\n\
         end";
  exec' "print_string (\"        OCaml version \" ^ Sys.ocaml_version);;";
  exec' "#enable \"pretty\";;";
  exec' "#disable \"shortvar\";;";
  exec' "#directory \"/static\";;";
  exec' "module Num = Big_int_Z;;";
  Ppx_support.init ();
  let[@alert "-deprecated"] new_directive n k = Hashtbl.add Toploop.directive_table n k in
    new_directive
    "load_js"
    (Toploop.Directive_string (fun name -> Js.Unsafe.global##load_script_ name));
  Sys.interactive := true;
  ()

let clear_toplevel () =
  (by_id "output")##.innerHTML := Js.string "";
  ()

let reset_toplevel () =
  (by_id "output")##.innerHTML := Js.string "";
  setup_toplevel ();
  ()

let resize ~container ~textbox () =
  Lwt.pause ()
  >>= fun () ->
  textbox##.style##.height := Js.string "auto";
  textbox##.style##.height
  := Js.string (Printf.sprintf "%dpx" (max 18 textbox##.scrollHeight));
  container##.scrollTop := container##.scrollHeight;
  Lwt.return ()

let setup_printers () =
  exec' "let _print_error fmt e = Format.pp_print_string fmt (Js_of_ocaml.Js.string_of_error e)";
  Topdirs.dir_install_printer Format.std_formatter Longident.(Lident "_print_error");
  exec' "let _print_unit fmt (_ : 'a) : 'a = Format.pp_print_string fmt \"()\"";
  Topdirs.dir_install_printer Format.std_formatter Longident.(Lident "_print_unit")

let rec iter_on_sharp ~f x =
  Js.Opt.iter (Dom_html.CoerceTo.element x) (fun e ->
      if Js.to_bool (e##.classList##contains (Js.string "sharp")) then f e);
  match Js.Opt.to_option x##.nextSibling with
  | None -> ()
  | Some n -> iter_on_sharp ~f n

let current_position = ref 0

let highlight_location loc =
  let x = ref 0 in
  let output = by_id "output" in
  let first =
    Js.Opt.get (output##.childNodes##item !current_position) (fun _ -> assert false)
  in
  iter_on_sharp first ~f:(fun e ->
      incr x;
      let _file1, line1, col1 = Location.get_pos_info loc.Location.loc_start in
      let _file2, line2, col2 = Location.get_pos_info loc.Location.loc_end in
      if !x >= line1 && !x <= line2
      then
        let from_ = if !x = line1 then `Pos col1 else `Pos 0 in
        let to_ = if !x = line2 then `Pos col2 else `Last in
        Colorize.highlight from_ to_ e)

let append colorize output cl s =
  Dom.appendChild output (Tyxml_js.To_dom.of_element (colorize ~a_class:cl s))

let append_to_console s =
  Firebug.console##log (Js.string s)

let sanitize_command cmd = 
  let len = String.length cmd in
    if try cmd <> "" && cmd.[len - 1] <> ';' && cmd.[len - 2] <> ';'
      with _ -> true
    then cmd ^ ";;"
    else if try cmd <> "" && cmd.[len - 1] = ';' && cmd.[len - 2] <> ';'
      with _ -> true
    then cmd ^ ";"
    else cmd

let execute_callback mode content =
  let content' = sanitize_command content in
  match mode with
    |"internal" -> JsooTop.execute true ~pp_code:binsharp_ppf ~highlight_location bincaml_ppf content'
    |"console" -> JsooTop.execute true ~pp_code:binsharp_ppf ~highlight_location consolecaml_ppf content'
    |"toplevel" -> JsooTop.execute true ~pp_code:sharp_ppf ~highlight_location caml_ppf content';
    |_ -> ()

let run _ =
  let container = by_id "toplevel-container" in
  let output = by_id "output" in
  let textbox : 'a Js.t = by_id_coerce "userinput" Dom_html.CoerceTo.textarea in
  let execute () =
    let content = Js.to_string textbox##.value##trim in
    current_position := output##.childNodes##.length;
    History.push content;
    textbox##.value := Js.string "";
    execute_callback "toplevel" content;
    resize ~container ~textbox () >>= fun () -> container##.scrollTop := container##.scrollHeight;
    Lwt.return_unit
  in
  let history_down _e =
    let txt = Js.to_string textbox##.value in
    let pos = textbox##.selectionStart in
    try
      if String.length txt = pos then raise Not_found;
      let _ = String.index_from txt pos '\n' in
      Js._true
    with Not_found ->
      History.current txt;
      History.next textbox;
      Js._false
  in
  let history_up _e =
    let txt = Js.to_string textbox##.value in
    let pos = textbox##.selectionStart - 1 in
    try
      if pos < 0 then raise Not_found;
      let _ = String.rindex_from txt pos '\n' in
      Js._true
    with Not_found ->
      History.current txt;
      History.previous textbox;
      Js._false
  in
  let meta e =
    let b = Js.to_bool in
    b e##.ctrlKey || b e##.altKey || b e##.metaKey
  in
  let shift e = Js.to_bool e##.shiftKey in
  (* setup handlers *)
  textbox##.onkeyup :=
    Dom_html.handler (fun _ ->
        Lwt.async (resize ~container ~textbox);
        Js._true);
  textbox##.onchange :=
    Dom_html.handler (fun _ ->
        Lwt.async (resize ~container ~textbox);
        Js._true);
  textbox##.onkeydown :=
    Dom_html.handler (fun e ->
        match e##.keyCode with
        | 13 when not (meta e || shift e) ->
            Lwt.async execute;
            Js._false
        | 13 ->
            Lwt.async (resize ~container ~textbox);
            Js._true
        | 09 ->
            Indent.textarea textbox;
            Js._false
        | 75 when meta e ->
            clear_toplevel ();
            Js._false
        | 76 when meta e ->
            reset_toplevel ();
            Js._false
        | 38 -> history_up e
        | 40 -> history_down e
        | _ -> Js._true);
  (Lwt.async_exception_hook :=
     fun exc ->
       Format.eprintf "exc during Lwt.async: %s@." (Printexc.to_string exc);
       match exc with
       | Js.Error e -> Firebug.console##log e##.stack
       | _ -> ());
  Lwt.async (fun () ->
      resize ~container ~textbox ()
      >>= fun () ->
      textbox##focus;
      Lwt.return_unit);
  Sys_js.set_channel_flusher caml_chan (append Colorize.ocaml output "caml");
  Sys_js.set_channel_flusher sharp_chan (append Colorize.ocaml output "sharp");
  Sys_js.set_channel_flusher stdout (append Colorize.text output "stdout");
  Sys_js.set_channel_flusher stderr (append Colorize.text output "stderr");
  Sys_js.set_channel_flusher consolecaml_chan append_to_console;
  let readline () =
    Js.Opt.case
      (Dom_html.window##prompt (Js.string "The toplevel expects inputs:") (Js.string ""))
      (fun () -> "\n")
      (fun s -> Js.to_string s ^ "\n")
  in
  Sys_js.set_channel_filler stdin readline;
  setup_pseudo_fs ();
  setup_toplevel ();
  setup_printers ();
  History.setup ();
  textbox##.value := Js.string ""


(* Init and create callbacks *)

let _ =
  Dom_html.window##.onload :=
    Dom_html.handler (fun _ -> run (); Js._false);
  
  (* Add callbacks *)
  Js.Unsafe.global##.executecallback := (object%js
      val execute = Js.wrap_meth_callback
          (fun _ mode content -> execute_callback (Js.to_string mode) (Js.to_string content))
      val create_file = Js.wrap_meth_callback
          (fun _ name content -> Sys_js.create_file ~name:(Js.to_string name) ~content:(Js.to_string content))
      val update_file = Js.wrap_meth_callback
          (fun _ name content -> Sys_js.update_file ~name:(Js.to_string name) ~content:(Js.to_string content))
    end);
  Js.Unsafe.global##.toplevelcallback := (object%js
      val setup = Js.wrap_meth_callback
          (fun () -> setup_toplevel ())
      val clear = Js.wrap_meth_callback
          (fun () -> clear_toplevel ())
      val reset = Js.wrap_meth_callback
          (fun () -> reset_toplevel ())
    end);
