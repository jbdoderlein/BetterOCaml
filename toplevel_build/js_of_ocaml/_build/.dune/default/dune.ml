module Jbuild_plugin : sig
(** API for jbuild plugins *)

(* CR-someday amokhov: rename to [dune_plugin]. *)

module V1 : sig
  (** Current build context *)
  val context : string

  (** OCaml version for the current build context. It might not be the same as
      [Sys.ocaml_version] *)
  val ocaml_version : string

  (** Output of [ocamlc -config] for this context *)
  val ocamlc_config : (string * string) list

  (** [send s] send [s] to Dune. [s] should be the contents of a [dune] file
      following the specification described in the manual. *)
  val send : string -> unit

  (** Execute a command and read its output *)
  val run_and_read_lines : string -> string list
end

end = struct

let () =
  Hashtbl.add Toploop.directive_table "require"
    (Toploop.Directive_string ignore);
  Hashtbl.add Toploop.directive_table "use"
    (Toploop.Directive_string
       (fun _ ->
         failwith "#use is not allowed inside a dune file in OCaml syntax"));
  Hashtbl.add Toploop.directive_table "use_mod"
    (Toploop.Directive_string
       (fun _ ->
         failwith "#use is not allowed inside a dune file in OCaml syntax"))

module V1 = struct
  let context = "default"
        let ocaml_version = "4.12.0"
        let send_target = "_build/.dune/default/dune"
        let ocamlc_config = [ "version"                   , "4.12.0"
      ; "standard_library_default"  , "/root/.opam/4.12.0/lib/ocaml"
      ; "standard_library"          , "/root/.opam/4.12.0/lib/ocaml"
      ; "standard_runtime"          , "the_standard_runtime_variable_was_deleted"
      ; "ccomp_type"                , "cc"
      ; "c_compiler"                , "gcc"
      ; "ocamlc_cflags"             , "-O2 -fno-strict-aliasing -fwrapv -fPIC"
      ; "ocamlc_cppflags"           , "-D_FILE_OFFSET_BITS=64 -D_REENTRANT"
      ; "ocamlopt_cflags"           , "-O2 -fno-strict-aliasing -fwrapv -fPIC"
      ; "ocamlopt_cppflags"         , "-D_FILE_OFFSET_BITS=64 -D_REENTRANT"
      ; "bytecomp_c_compiler"       , "gcc -O2 -fno-strict-aliasing -fwrapv -fPIC -D_FILE_OFFSET_BITS=64 -D_REENTRANT"
      ; "bytecomp_c_libraries"      , "-lm -ldl -lpthread"
      ; "native_c_compiler"         , "gcc -O2 -fno-strict-aliasing -fwrapv -fPIC -D_FILE_OFFSET_BITS=64 -D_REENTRANT"
      ; "native_c_libraries"        , "-lm -ldl"
      ; "cc_profile"                , ""
      ; "architecture"              , "amd64"
      ; "model"                     , "default"
      ; "int_size"                  , "63"
      ; "word_size"                 , "64"
      ; "system"                    , "linux"
      ; "asm"                       , "as"
      ; "asm_cfi_supported"         , "true"
      ; "with_frame_pointers"       , "false"
      ; "ext_exe"                   , ""
      ; "ext_obj"                   , ".o"
      ; "ext_asm"                   , ".s"
      ; "ext_lib"                   , ".a"
      ; "ext_dll"                   , ".so"
      ; "os_type"                   , "Unix"
      ; "default_executable_name"   , "a.out"
      ; "systhread_supported"       , "true"
      ; "host"                      , "x86_64-pc-linux-gnu"
      ; "target"                    , "x86_64-pc-linux-gnu"
      ; "profiling"                 , "false"
      ; "flambda"                   , "false"
      ; "spacetime"                 , "false"
      ; "safe_string"               , "true"
      ; "exec_magic_number"         , "Caml1999X029"
      ; "cmi_magic_number"          , "Caml1999I029"
      ; "cmo_magic_number"          , "Caml1999O029"
      ; "cma_magic_number"          , "Caml1999A029"
      ; "cmx_magic_number"          , "Caml1999Y029"
      ; "cmxa_magic_number"         , "Caml1999Z029"
      ; "ast_impl_magic_number"     , "Caml1999M029"
      ; "ast_intf_magic_number"     , "Caml1999N029"
      ; "cmxs_magic_number"         , "Caml1999D029"
      ; "cmt_magic_number"          , "Caml1999T029"
      ; "natdynlink_supported"      , "true"
      ; "supports_shared_libraries" , "true"
      ; "windows_unicode"           , "false" ]
        

  let send s =
    let oc = open_out_bin send_target in
    output_string oc s;
    close_out oc

  let run_and_read_lines cmd =
    let tmp_fname = Filename.temp_file "dune" ".output" in
    at_exit (fun () -> Sys.remove tmp_fname);
    let n =
      Printf.ksprintf Sys.command "%s > %s" cmd (Filename.quote tmp_fname)
    in
    let rec loop ic acc =
      match input_line ic with
      | exception End_of_file ->
        close_in ic;
        List.rev acc
      | line -> loop ic (line :: acc)
    in
    let output = loop (open_in tmp_fname) [] in
    if n = 0 then
      output
    else
      Printf.ksprintf failwith
        "Command failed: %%s\nExit code: %%d\nOutput:\n%%s" cmd n
        (String.concat "\n" output)
end

end
# 1 "dune"
(* -*- tuareg -*- *)
open StdLabels
open Jbuild_plugin.V1

let split_on_char ~sep s =
  let r = ref [] in
  let j = ref (String.length s) in
  for i = String.length s - 1 downto 0 do
    if String.unsafe_get s i = sep
    then (
      r := String.sub s ~pos:(i + 1) ~len:(!j - i - 1) :: !r;
      j := i )
  done;
  String.sub s ~pos:0 ~len:!j :: !r

let git_version =
  if not (try Sys.is_directory ".git" with _ -> false)
  then ""
  else
    match run_and_read_lines "git log -n1 --pretty=format:%h" with
    | version :: _ -> version
    | [] -> ""

let version =
  let ic = open_in "VERSION" in
  let version = input_line ic in
  close_in ic; version

let extra_warnings =
  let v = split_on_char ~sep:'.' ocaml_version in
  if v < ["4"; "03"] then "-45" else ""

let () =
  send
  @@ Printf.sprintf
       {|

(env
 (dev
  (flags
   (:standard -w +a-4-40-41-42-44-48-58-66%s))))

(rule
  (targets version.ml.in)
  (action (with-stdout-to %%{targets}
           (echo "let s = \"%s\"\nlet git_version = \"%s\""))))
|}
       extra_warnings
       version
       git_version
