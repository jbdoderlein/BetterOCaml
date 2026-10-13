(* Vendored from merlin-js (https://github.com/voodoos/merlin-js, MIT license),
   src/merlin_jsoo/merlin_jsoo.ml at commit a7367198d332f153ed27de2136d3c6a4af8e206f, with BetterOCaml changes: no log for every
   signature load, cache of missing .cmi files.
   Copyright (c) 2023 Ulysse Gérard. *)

open Merlin_utils
open Std
open Js_of_ocaml
open Merlin_kernel
open Ocaml_typing

let stdlib_path = "/static/cmis"
let log s = ignore (Console.console##log (Js.string s))

(* === CMI loading === *)

type cmaybe = Cmi of Cmi_format.cmi_infos | Url of string

let cmi_store : (string, cmaybe) Hashtbl.t = Hashtbl.create 128

let sync_get url =
  let x = XmlHttpRequest.create () in
  x##.responseType := Js.string "arraybuffer";
  x##_open (Js.string "GET") (Js.string url) Js._false;
  x##send Js.null;
  match x##.status with
  | 200 ->
      Js.Opt.case
        (File.CoerceTo.arrayBuffer x##.response)
        (fun () ->
          log "Failed to receive file";
          None)
        (fun b -> Some (Typed_array.String.of_arrayBuffer b))
  | _ -> None

let filename_of_module unit_name =
  Printf.sprintf "%s.cmi" (String.uncapitalize_ascii unit_name)

type header = Misc.modname * Ocaml_typing.Types.signature_item list

let read_cmi_from_string s =
  let open Cmi_format in
  match String.chop_prefix ~prefix:Config.cmi_magic_number s with
  | None ->
      log "Wrong magic number";
      None
  | Some rest ->
      let rest = String.to_bytes rest in
      let (cmi_name, cmi_sign) : header = Marshal.from_bytes rest 0 in
      let offset = Marshal.header_size + Marshal.data_size rest 0 in
      let cmi_crcs : Misc.crcs = Marshal.from_bytes rest offset in
      let offset =
        offset + Marshal.header_size + Marshal.data_size rest offset
      in
      let cmi_flags : Cmi_format.pers_flags list =
        Marshal.from_bytes rest offset
      in
      Some { cmi_name; cmi_sign; cmi_crcs; cmi_flags }

let cmi_load_urls : string list ref = ref [ "stdlib/" ]

let persistent_sig_loader_aux ~allow_hidden:_ ~unit_name =
  let open Persistent_env.Persistent_signature in
  match Hashtbl.find_opt cmi_store unit_name with
  | Some (Cmi infos) ->
      Some { filename = unit_name; cmi = infos; visibility = Visible }
  | Some (Url url) ->
      Option.bind (sync_get url) ~f:read_cmi_from_string
      |> Option.map ~f:(fun cmi ->
          Hashtbl.replace cmi_store unit_name (Cmi cmi);
          { filename = unit_name; cmi; visibility = Visible })
  | None ->
      List.find_mapi !cmi_load_urls ~f:(fun _ url ->
          let filename = filename_of_module unit_name in
          let url = Filename.concat url filename in
          Option.bind (sync_get url) ~f:read_cmi_from_string
          |> Option.map ~f:(fun cmi ->
              Hashtbl.replace cmi_store unit_name (Cmi cmi);
              { filename = unit_name; cmi; visibility = Visible }))

(* BetterOCaml addition: remember the modules without a .cmi file, so that an unknown
   module name in the editor does not cause a request for each merlin query *)
let missing_cmis : (string, unit) Hashtbl.t = Hashtbl.create 16

let persistent_sig_loader ~allow_hidden ~unit_name =
  if Hashtbl.mem missing_cmis unit_name then None
  else
    let result = persistent_sig_loader_aux ~allow_hidden ~unit_name in
    (match result with None -> Hashtbl.replace missing_cmis unit_name () | Some _ -> ());
    result

let add_static_cmis cmis =
  List.iter cmis ~f:(fun (name, content) ->
      let cmi_infos = read_cmi_from_string content in
      Option.iter cmi_infos ~f:(fun cmi_infos ->
          Hashtbl.replace cmi_store name (Cmi cmi_infos)))

let add_dynamic_cmis ~url ~toplevel_modules =
  List.iter toplevel_modules ~f:(fun name ->
      let filename = filename_of_module name in
      let full_url = Filename.concat url filename in
      Hashtbl.replace cmi_store name (Url full_url))

let init () = Persistent_env.Persistent_signature.load := persistent_sig_loader

(* === Merlin pipeline === *)

let config =
  let initial = Mconfig.initial in
  { initial with merlin = { initial.merlin with stdlib = Some stdlib_path } }

let make_pipeline source = Mpipeline.make config source

let dispatch source query =
  let pipeline = make_pipeline source in
  Mpipeline.with_pipeline pipeline (fun () ->
      Query_commands.dispatch pipeline query)

(* === Completion prefix extraction === *)

module Completion = struct
  let rfindi =
    let rec loop s ~f i =
      if i < 0 then None
      else if f (String.unsafe_get s i) then Some i
      else loop s ~f (i - 1)
    in
    fun ?from s ~f ->
      let from =
        let len = String.length s in
        match from with
        | None -> len - 1
        | Some i ->
            if i > len - 1 then raise @@ Invalid_argument "rfindi: invalid from"
            else i
      in
      loop s ~f from

  let lsplit2 s ~on =
    match String.index_opt s on with
    | None -> None
    | Some i ->
        let open String in
        Some (sub s ~pos:0 ~len:i, sub s ~pos:(i + 1) ~len:(length s - i - 1))

  (** @see <https://ocaml.org/manual/lex.html> reference *)
  let prefix_of_position ?(short_path = false) source position =
    match Msource.text source with
    | "" -> ""
    | text ->
        let from =
          let (`Offset index) = Msource.get_offset source position in
          min (String.length text - 1) (index - 1)
        in
        let pos =
          let should_terminate = ref false in
          let has_seen_dot = ref false in
          let is_prefix_char c =
            if !should_terminate then false
            else
              match c with
              | 'a' .. 'z'
              | 'A' .. 'Z'
              | '0' .. '9'
              | '\'' | '_' | '$' | '&' | '*' | '+' | '-' | '/' | '=' | '>' | '@'
              | '^' | '!' | '?' | '%' | '<' | ':' | '~' | '#' ->
                  true
              | '`' ->
                  if !has_seen_dot then false
                  else (
                    should_terminate := true;
                    true)
              | '.' ->
                  has_seen_dot := true;
                  not short_path
              | _ -> false
          in
          rfindi text ~from ~f:(fun c -> not (is_prefix_char c))
        in
        let pos = match pos with None -> 0 | Some pos -> pos + 1 in
        let len = from - pos + 1 in
        let reconstructed_prefix = String.sub text ~pos ~len in
        if
          String.is_prefixed ~by:"~" reconstructed_prefix
          || String.is_prefixed ~by:"?" reconstructed_prefix
        then
          match lsplit2 reconstructed_prefix ~on:':' with
          | Some (_, s) -> s
          | None -> reconstructed_prefix
        else reconstructed_prefix
end
