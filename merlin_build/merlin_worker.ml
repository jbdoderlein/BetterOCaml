(* Merlin running in a Web Worker, for the BetterOCaml editor (src/js/editor_merlin.js).

   Messages from the page: { id; type = "complete" | "type" | "errors"; source; offset }
   where source is the editor content and offset a position in it, in JavaScript string
   units (UTF-16). Answers: { id; result } or { id; error }, with positions in the same
   units. Merlin itself works on the UTF-8 bytes of the source. *)

open Js_of_ocaml
module Location = Ocaml_parsing.Location
module Msource = Merlin_kernel.Msource

(* Definitions made by the toplevel before any user code (see toplevel_build/toplevel.ml),
   and the libraries available in the toplevel: merlin only completes the modules it knows
   of, and in the browser it cannot list the library directories to find them. Module
   aliases are lazy: the .cmi files are only loaded when the module is used. *)
let prelude =
  String.concat ""
    (List.map
       (fun m -> Printf.sprintf "module %s = %s\n" m m)
       [ "Graphics"; "Graphics_js"; "Str"; "Z"; "Q"; "Big_int_Z" ])
  ^ "module Num = Big_int_Z\nmodule Graph = Graphics_js\n"

let prelude_len = String.length prelude

(* Toplevel directives (#use, #load...) are not valid in a .ml file: blank them,
   keeping every offset unchanged *)
let blank_directives source =
  String.split_on_char '\n' source
  |> List.map (fun line ->
         let trimmed = String.trim line in
         if trimmed <> "" && trimmed.[0] = '#' then String.make (String.length line) ' '
         else line)
  |> String.concat "\n"

type request = {
  js_source : Js.js_string Js.t;
  user : string; (* UTF-8 editor content *)
  msource : Msource.t; (* prelude + user content given to merlin *)
}

let request_of_message m =
  let js_source : Js.js_string Js.t = Js.Unsafe.get m "source" in
  let user = Js.to_string js_source in
  { js_source; user; msource = Msource.make (prelude ^ blank_directives user) }

(* Editor offset (UTF-16) -> merlin position *)
let position r (offset : int) =
  let bytes = String.length (Js.to_string (r.js_source##substring 0 offset)) in
  `Offset (prelude_len + bytes)

(* Merlin byte offset -> editor offset (UTF-16), None inside the prelude *)
let editor_offset r merlin_offset =
  let b = merlin_offset - prelude_len in
  if b < 0 then None
  else
    let b = min b (String.length r.user) in
    Some (Js.string (String.sub r.user 0 b))##.length

let obj fields = Js.Unsafe.obj fields
let str s = Js.Unsafe.inject (Js.string s)
let int n = Js.Unsafe.inject n

let range r (loc : Location.t) =
  match
    (editor_offset r loc.loc_start.pos_cnum, editor_offset r loc.loc_end.pos_cnum)
  with
  | Some from, Some to_ -> Some (from, to_)
  | _ -> None

let kind_name = function
  | `Value -> "value"
  | `Constructor -> "constructor"
  | `Variant -> "variant"
  | `Label -> "label"
  | `Module -> "module"
  | `Modtype -> "modtype"
  | `Type -> "type"
  | `MethodCall -> "method"
  | `Keyword -> "keyword"

let complete r offset =
  let pos = position r offset in
  let prefix = Merlin_jsoo.Completion.prefix_of_position r.msource pos in
  if prefix = "" then Js.Unsafe.inject Js.null
  else
    let (`Offset to_) = Msource.get_offset r.msource pos in
    let short = Merlin_jsoo.Completion.prefix_of_position ~short_path:true r.msource pos in
    let from = to_ - String.length short in
    let query = Query_protocol.Complete_prefix (prefix, pos, [], true, true) in
    let compl = Merlin_jsoo.dispatch r.msource query in
    let options =
      List.map
        (fun (e : Query_protocol.Compl.entry) ->
          obj
            [| ("label", str e.name); ("kind", str (kind_name e.kind)); ("detail", str e.desc);
               ("info", str e.info) |])
        compl.entries
    in
    match (editor_offset r from, editor_offset r to_) with
    | Some from, Some to_ ->
      Js.Unsafe.inject
        (obj [| ("from", int from); ("to", int to_); ("options", Js.Unsafe.inject (Js.array (Array.of_list options))) |])
    | _ -> Js.Unsafe.inject Js.null

(* Types of the expressions around the offset, innermost first *)
let type_at r offset =
  let query = Query_protocol.Type_enclosing (None, position r offset, None) in
  Merlin_jsoo.dispatch r.msource query
  |> List.filter_map (fun (loc, typ, _) ->
         match (typ, range r loc) with
         | `String typ, Some (from, to_) ->
           Some (obj [| ("from", int from); ("to", int to_); ("type", str typ) |])
         | _ -> None)
  |> Array.of_list |> Js.array |> Js.Unsafe.inject

(* Documentation comment of the identifier at the offset *)
let document r offset =
  match Merlin_jsoo.dispatch r.msource (Query_protocol.Document (None, position r offset)) with
  | `Found doc -> str doc
  | _ -> Js.Unsafe.inject Js.null

(* Definition of the identifier at the offset: { offset } in the editor, or { file } for
   the libraries (their sources are not available) *)
let locate r offset =
  let query = Query_protocol.Locate (None, `MLI, position r offset) in
  let buffer = Merlin_jsoo.config.query.filename in
  match Merlin_jsoo.dispatch r.msource query with
  | `Found ((None as file), pos) | `Found ((Some _ as file), pos)
    when Option.fold ~none:true ~some:(fun f -> Filename.basename f = buffer) file -> (
    match editor_offset r pos.Lexing.pos_cnum with
    | Some offset -> Js.Unsafe.inject (obj [| ("offset", int offset) |])
    | None -> Js.Unsafe.inject (obj [| ("file", str "BetterOCaml") |]))
  | `Found (Some file, _) -> Js.Unsafe.inject (obj [| ("file", str (Filename.basename file)) |])
  | `File_not_found message -> Js.Unsafe.inject (obj [| ("library", str message) |])
  | _ -> Js.Unsafe.inject Js.null

let errors r =
  let query = Query_protocol.Errors { lexing = true; parsing = true; typing = true } in
  Merlin_jsoo.dispatch r.msource query
  |> List.filter_map (fun (error : Location.error) ->
         let severity =
           match error.kind with
           | Location.Report_error | Report_warning_as_error _ | Report_alert_as_error _ -> "error"
           | Report_warning _ | Report_alert _ -> "warning"
         in
         let message = Format.asprintf "@[%a@]" Location.print_main error |> String.trim in
         Option.map
           (fun (from, to_) ->
             obj [| ("from", int from); ("to", int to_); ("severity", str severity); ("message", str message) |])
           (range r (Location.loc_of_report error)))
  |> Array.of_list |> Js.array |> Js.Unsafe.inject

let on_message m =
  let id : int = Js.Unsafe.get m "id" in
  let answer =
    try
      let r = request_of_message m in
      let offset : int = Js.Unsafe.get m "offset" in
      let result =
        match Js.to_string (Js.Unsafe.get m "type") with
        | "complete" -> complete r offset
        | "type" -> type_at r offset
        | "errors" -> errors r
        | "document" -> document r offset
        | "locate" -> locate r offset
        | t -> failwith ("unknown request " ^ t)
      in
      [| ("id", int id); ("result", result) |]
    with e -> [| ("id", int id); ("error", str (Printexc.to_string e)) |]
  in
  Worker.post_message (obj answer)

let () =
  Merlin_jsoo.init ();
  (* .cmi files are next to this script, in cmis/ *)
  Merlin_jsoo.cmi_load_urls := [ "cmis/" ];
  (* Merlin reads the documentation from .cmti files in its standard library directory:
     download them from cmis/ the first time they are needed *)
  Sys_js.mount ~path:(Merlin_jsoo.stdlib_path ^ "/") (fun ~prefix:_ ~path ->
      if Filename.check_suffix path ".cmti" then Merlin_jsoo.sync_get ("cmis/" ^ path) else None);
  Worker.set_onmessage on_message;
  Worker.post_message (obj [| ("type", str "ready") |])
