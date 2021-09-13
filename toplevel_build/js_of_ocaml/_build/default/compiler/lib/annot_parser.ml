
module MenhirBasics = struct
  
  exception Error
  
  type token = 
    | TWeakdef
    | TVersion
    | TVNum of (
# 22 "annot_parser.mly"
      (string)
# 13 "annot_parser.ml"
  )
    | TSemi
    | TRequires
    | TProvides
    | TOTHER of (
# 24 "annot_parser.mly"
      (string)
# 21 "annot_parser.ml"
  )
    | TIf
    | TIdent of (
# 22 "annot_parser.mly"
      (string)
# 27 "annot_parser.ml"
  )
    | TComma
    | TBang
    | TA_Shallow
    | TA_Pure
    | TA_Object_literal
    | TA_Mutator
    | TA_Mutable
    | TA_Const
    | RPARENT
    | LT
    | LPARENT
    | LE
    | GT
    | GE
    | EQ
    | EOL
    | EOF
  
end

include MenhirBasics

let _eRR =
  MenhirBasics.Error

type _menhir_env = {
  _menhir_lexer: Lexing.lexbuf -> token;
  _menhir_lexbuf: Lexing.lexbuf;
  _menhir_token: token;
  mutable _menhir_error: bool
}

and _menhir_state = 
  | MenhirState53
  | MenhirState50
  | MenhirState46
  | MenhirState44
  | MenhirState35
  | MenhirState24
  | MenhirState22
  | MenhirState20
  | MenhirState14
  | MenhirState10
  | MenhirState3

let rec _menhir_goto_separated_nonempty_list_TComma_arg_annot_ : _menhir_env -> 'ttv_tail -> _menhir_state -> 'tv_separated_nonempty_list_TComma_arg_annot_ -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    match _menhir_s with
    | MenhirState35 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv207) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_separated_nonempty_list_TComma_arg_annot_) = _v in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv205) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let ((x : 'tv_separated_nonempty_list_TComma_arg_annot_) : 'tv_separated_nonempty_list_TComma_arg_annot_) = _v in
        ((let _v : 'tv_loption_separated_nonempty_list_TComma_arg_annot__ = 
# 144 "<standard.mly>"
    ( x )
# 89 "annot_parser.ml"
         in
        _menhir_goto_loption_separated_nonempty_list_TComma_arg_annot__ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv206)) : 'freshtv208)
    | MenhirState44 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv211 * _menhir_state * 'tv_arg_annot)) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_separated_nonempty_list_TComma_arg_annot_) = _v in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv209 * _menhir_state * 'tv_arg_annot)) = Obj.magic _menhir_stack in
        let (_ : _menhir_state) = _menhir_s in
        let ((xs : 'tv_separated_nonempty_list_TComma_arg_annot_) : 'tv_separated_nonempty_list_TComma_arg_annot_) = _v in
        ((let (_menhir_stack, _menhir_s, (x : 'tv_arg_annot)) = _menhir_stack in
        let _v : 'tv_separated_nonempty_list_TComma_arg_annot_ = 
# 243 "<standard.mly>"
    ( x :: xs )
# 105 "annot_parser.ml"
         in
        _menhir_goto_separated_nonempty_list_TComma_arg_annot_ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv210)) : 'freshtv212)
    | _ ->
        _menhir_fail ()

and _menhir_goto_separated_nonempty_list_TComma_version_ : _menhir_env -> 'ttv_tail -> _menhir_state -> 'tv_separated_nonempty_list_TComma_version_ -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    let _menhir_stack = (_menhir_stack, _menhir_s, _v) in
    match _menhir_s with
    | MenhirState10 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv201 * _menhir_state * 'tv_version)) * _menhir_state * 'tv_separated_nonempty_list_TComma_version_) = Obj.magic _menhir_stack in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv199 * _menhir_state * 'tv_version)) * _menhir_state * 'tv_separated_nonempty_list_TComma_version_) = Obj.magic _menhir_stack in
        ((let ((_menhir_stack, _menhir_s, (x : 'tv_version)), _, (xs : 'tv_separated_nonempty_list_TComma_version_)) = _menhir_stack in
        let _v : 'tv_separated_nonempty_list_TComma_version_ = 
# 243 "<standard.mly>"
    ( x :: xs )
# 124 "annot_parser.ml"
         in
        _menhir_goto_separated_nonempty_list_TComma_version_ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv200)) : 'freshtv202)
    | MenhirState3 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv203)) * _menhir_state * 'tv_separated_nonempty_list_TComma_version_) = Obj.magic _menhir_stack in
        ((assert (not _menhir_env._menhir_error);
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | EOF ->
            _menhir_run17 _menhir_env (Obj.magic _menhir_stack) MenhirState14
        | EOL ->
            _menhir_run16 _menhir_env (Obj.magic _menhir_stack) MenhirState14
        | TOTHER _v ->
            _menhir_run15 _menhir_env (Obj.magic _menhir_stack) MenhirState14 _v
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState14) : 'freshtv204)
    | _ ->
        _menhir_fail ()

and _menhir_goto_arg_annot : _menhir_env -> 'ttv_tail -> _menhir_state -> 'tv_arg_annot -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    let _menhir_stack = (_menhir_stack, _menhir_s, _v) in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv197 * _menhir_state * 'tv_arg_annot) = Obj.magic _menhir_stack in
    ((assert (not _menhir_env._menhir_error);
    let _tok = _menhir_env._menhir_token in
    match _tok with
    | TComma ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv191 * _menhir_state * 'tv_arg_annot) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TA_Const ->
            _menhir_run39 _menhir_env (Obj.magic _menhir_stack) MenhirState44
        | TA_Mutable ->
            _menhir_run38 _menhir_env (Obj.magic _menhir_stack) MenhirState44
        | TA_Object_literal ->
            _menhir_run37 _menhir_env (Obj.magic _menhir_stack) MenhirState44
        | TA_Shallow ->
            _menhir_run36 _menhir_env (Obj.magic _menhir_stack) MenhirState44
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState44) : 'freshtv192)
    | RPARENT ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv193 * _menhir_state * 'tv_arg_annot) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, (x : 'tv_arg_annot)) = _menhir_stack in
        let _v : 'tv_separated_nonempty_list_TComma_arg_annot_ = 
# 241 "<standard.mly>"
    ( [ x ] )
# 179 "annot_parser.ml"
         in
        _menhir_goto_separated_nonempty_list_TComma_arg_annot_ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv194)
    | _ ->
        assert (not _menhir_env._menhir_error);
        _menhir_env._menhir_error <- true;
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv195 * _menhir_state * 'tv_arg_annot) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv196)) : 'freshtv198)

and _menhir_fail : unit -> 'a =
  fun () ->
    Printf.fprintf stderr "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

and _menhir_goto_op : _menhir_env -> 'ttv_tail -> _menhir_state -> 'tv_op -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    let _menhir_stack = (_menhir_stack, _menhir_s, _v) in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv189 * _menhir_state * 'tv_op) = Obj.magic _menhir_stack in
    ((assert (not _menhir_env._menhir_error);
    let _tok = _menhir_env._menhir_token in
    match _tok with
    | TVNum _v ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv185 * _menhir_state * 'tv_op) = Obj.magic _menhir_stack in
        let (_v : (
# 22 "annot_parser.mly"
      (string)
# 209 "annot_parser.ml"
        )) = _v in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv183 * _menhir_state * 'tv_op) = Obj.magic _menhir_stack in
        let ((_2 : (
# 22 "annot_parser.mly"
      (string)
# 217 "annot_parser.ml"
        )) : (
# 22 "annot_parser.mly"
      (string)
# 221 "annot_parser.ml"
        )) = _v in
        ((let (_menhir_stack, _menhir_s, (_1 : 'tv_op)) = _menhir_stack in
        let _v : 'tv_version = 
# 66 "annot_parser.mly"
             ( _1,_2 )
# 227 "annot_parser.ml"
         in
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv181) = _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_version) = _v in
        ((let _menhir_stack = (_menhir_stack, _menhir_s, _v) in
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv179 * _menhir_state * 'tv_version) = Obj.magic _menhir_stack in
        ((assert (not _menhir_env._menhir_error);
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TComma ->
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv173 * _menhir_state * 'tv_version) = Obj.magic _menhir_stack in
            ((let _menhir_env = _menhir_discard _menhir_env in
            let _tok = _menhir_env._menhir_token in
            match _tok with
            | EQ ->
                _menhir_run8 _menhir_env (Obj.magic _menhir_stack) MenhirState10
            | GE ->
                _menhir_run7 _menhir_env (Obj.magic _menhir_stack) MenhirState10
            | GT ->
                _menhir_run6 _menhir_env (Obj.magic _menhir_stack) MenhirState10
            | LE ->
                _menhir_run5 _menhir_env (Obj.magic _menhir_stack) MenhirState10
            | LT ->
                _menhir_run4 _menhir_env (Obj.magic _menhir_stack) MenhirState10
            | _ ->
                assert (not _menhir_env._menhir_error);
                _menhir_env._menhir_error <- true;
                _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState10) : 'freshtv174)
        | EOF | EOL | TOTHER _ ->
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv175 * _menhir_state * 'tv_version) = Obj.magic _menhir_stack in
            ((let (_menhir_stack, _menhir_s, (x : 'tv_version)) = _menhir_stack in
            let _v : 'tv_separated_nonempty_list_TComma_version_ = 
# 241 "<standard.mly>"
    ( [ x ] )
# 266 "annot_parser.ml"
             in
            _menhir_goto_separated_nonempty_list_TComma_version_ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv176)
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv177 * _menhir_state * 'tv_version) = Obj.magic _menhir_stack in
            ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
            _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv178)) : 'freshtv180)) : 'freshtv182)) : 'freshtv184)) : 'freshtv186)
    | _ ->
        assert (not _menhir_env._menhir_error);
        _menhir_env._menhir_error <- true;
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv187 * _menhir_state * 'tv_op) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv188)) : 'freshtv190)

and _menhir_goto_separated_nonempty_list_TComma_TIdent_ : _menhir_env -> 'ttv_tail -> _menhir_state -> 'tv_separated_nonempty_list_TComma_TIdent_ -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    let _menhir_stack = (_menhir_stack, _menhir_s, _v) in
    match _menhir_s with
    | MenhirState22 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv169 * _menhir_state * (
# 22 "annot_parser.mly"
      (string)
# 293 "annot_parser.ml"
        ))) * _menhir_state * 'tv_separated_nonempty_list_TComma_TIdent_) = Obj.magic _menhir_stack in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv167 * _menhir_state * (
# 22 "annot_parser.mly"
      (string)
# 299 "annot_parser.ml"
        ))) * _menhir_state * 'tv_separated_nonempty_list_TComma_TIdent_) = Obj.magic _menhir_stack in
        ((let ((_menhir_stack, _menhir_s, (x : (
# 22 "annot_parser.mly"
      (string)
# 304 "annot_parser.ml"
        ))), _, (xs : 'tv_separated_nonempty_list_TComma_TIdent_)) = _menhir_stack in
        let _v : 'tv_separated_nonempty_list_TComma_TIdent_ = 
# 243 "<standard.mly>"
    ( x :: xs )
# 309 "annot_parser.ml"
         in
        _menhir_goto_separated_nonempty_list_TComma_TIdent_ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv168)) : 'freshtv170)
    | MenhirState20 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv171)) * _menhir_state * 'tv_separated_nonempty_list_TComma_TIdent_) = Obj.magic _menhir_stack in
        ((assert (not _menhir_env._menhir_error);
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | EOF ->
            _menhir_run17 _menhir_env (Obj.magic _menhir_stack) MenhirState24
        | EOL ->
            _menhir_run16 _menhir_env (Obj.magic _menhir_stack) MenhirState24
        | TOTHER _v ->
            _menhir_run15 _menhir_env (Obj.magic _menhir_stack) MenhirState24 _v
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState24) : 'freshtv172)
    | _ ->
        _menhir_fail ()

and _menhir_goto_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__ : _menhir_env -> 'ttv_tail -> 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__ -> 'ttv_return =
  fun _menhir_env _menhir_stack _v ->
    let _menhir_stack = (_menhir_stack, _v) in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : (((('freshtv165)) * (
# 22 "annot_parser.mly"
      (string)
# 338 "annot_parser.ml"
    )) * 'tv_option_prim_annot_) * 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__) = Obj.magic _menhir_stack in
    ((assert (not _menhir_env._menhir_error);
    let _tok = _menhir_env._menhir_token in
    match _tok with
    | EOF ->
        _menhir_run17 _menhir_env (Obj.magic _menhir_stack) MenhirState46
    | EOL ->
        _menhir_run16 _menhir_env (Obj.magic _menhir_stack) MenhirState46
    | TOTHER _v ->
        _menhir_run15 _menhir_env (Obj.magic _menhir_stack) MenhirState46 _v
    | _ ->
        assert (not _menhir_env._menhir_error);
        _menhir_env._menhir_error <- true;
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState46) : 'freshtv166)

and _menhir_goto_loption_separated_nonempty_list_TComma_arg_annot__ : _menhir_env -> 'ttv_tail -> _menhir_state -> 'tv_loption_separated_nonempty_list_TComma_arg_annot__ -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    let _menhir_stack = (_menhir_stack, _menhir_s, _v) in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : ('freshtv163) * _menhir_state * 'tv_loption_separated_nonempty_list_TComma_arg_annot__) = Obj.magic _menhir_stack in
    ((assert (not _menhir_env._menhir_error);
    let _tok = _menhir_env._menhir_token in
    match _tok with
    | RPARENT ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv159) * _menhir_state * 'tv_loption_separated_nonempty_list_TComma_arg_annot__) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv157) * _menhir_state * 'tv_loption_separated_nonempty_list_TComma_arg_annot__) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _, (xs : 'tv_loption_separated_nonempty_list_TComma_arg_annot__)) = _menhir_stack in
        let _v : 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__ = let x =
          let x = 
# 232 "<standard.mly>"
    ( xs )
# 373 "annot_parser.ml"
           in
          
# 200 "<standard.mly>"
    ( x )
# 378 "annot_parser.ml"
          
        in
        
# 116 "<standard.mly>"
    ( Some x )
# 384 "annot_parser.ml"
         in
        _menhir_goto_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__ _menhir_env _menhir_stack _v) : 'freshtv158)) : 'freshtv160)
    | _ ->
        assert (not _menhir_env._menhir_error);
        _menhir_env._menhir_error <- true;
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv161) * _menhir_state * 'tv_loption_separated_nonempty_list_TComma_arg_annot__) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv162)) : 'freshtv164)

and _menhir_run36 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv155) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_arg_annot = 
# 54 "annot_parser.mly"
               ( `Shallow_const)
# 404 "annot_parser.ml"
     in
    _menhir_goto_arg_annot _menhir_env _menhir_stack _menhir_s _v) : 'freshtv156)

and _menhir_run37 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv153) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_arg_annot = 
# 55 "annot_parser.mly"
                      ( `Object_literal)
# 417 "annot_parser.ml"
     in
    _menhir_goto_arg_annot _menhir_env _menhir_stack _menhir_s _v) : 'freshtv154)

and _menhir_run38 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv151) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_arg_annot = 
# 56 "annot_parser.mly"
               ( `Mutable)
# 430 "annot_parser.ml"
     in
    _menhir_goto_arg_annot _menhir_env _menhir_stack _menhir_s _v) : 'freshtv152)

and _menhir_run39 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv149) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_arg_annot = 
# 53 "annot_parser.mly"
             ( `Const )
# 443 "annot_parser.ml"
     in
    _menhir_goto_arg_annot _menhir_env _menhir_stack _menhir_s _v) : 'freshtv150)

and _menhir_goto_endline : _menhir_env -> 'ttv_tail -> _menhir_state -> 'tv_endline -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    match _menhir_s with
    | MenhirState14 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv131)) * _menhir_state * 'tv_separated_nonempty_list_TComma_version_) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_endline) = _v in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv129)) * _menhir_state * 'tv_separated_nonempty_list_TComma_version_) = Obj.magic _menhir_stack in
        let (_ : _menhir_state) = _menhir_s in
        let (_ : 'tv_endline) = _v in
        ((let (_menhir_stack, _, (l : 'tv_separated_nonempty_list_TComma_version_)) = _menhir_stack in
        let _v : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 463 "annot_parser.ml"
        ) = 
# 40 "annot_parser.mly"
    ( `Version (None,l) )
# 467 "annot_parser.ml"
         in
        _menhir_goto_annot _menhir_env _menhir_stack _v) : 'freshtv130)) : 'freshtv132)
    | MenhirState24 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv135)) * _menhir_state * 'tv_separated_nonempty_list_TComma_TIdent_) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_endline) = _v in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv133)) * _menhir_state * 'tv_separated_nonempty_list_TComma_TIdent_) = Obj.magic _menhir_stack in
        let (_ : _menhir_state) = _menhir_s in
        let (_ : 'tv_endline) = _v in
        ((let (_menhir_stack, _, (l : 'tv_separated_nonempty_list_TComma_TIdent_)) = _menhir_stack in
        let _v : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 483 "annot_parser.ml"
        ) = 
# 38 "annot_parser.mly"
    ( `Requires (None,l) )
# 487 "annot_parser.ml"
         in
        _menhir_goto_annot _menhir_env _menhir_stack _v) : 'freshtv134)) : 'freshtv136)
    | MenhirState46 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (((('freshtv139)) * (
# 22 "annot_parser.mly"
      (string)
# 495 "annot_parser.ml"
        )) * 'tv_option_prim_annot_) * 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_endline) = _v in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (((('freshtv137)) * (
# 22 "annot_parser.mly"
      (string)
# 503 "annot_parser.ml"
        )) * 'tv_option_prim_annot_) * 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__) = Obj.magic _menhir_stack in
        let (_ : _menhir_state) = _menhir_s in
        let (_ : 'tv_endline) = _v in
        ((let (((_menhir_stack, (id : (
# 22 "annot_parser.mly"
      (string)
# 510 "annot_parser.ml"
        ))), (opt : 'tv_option_prim_annot_)), (args : 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__)) = _menhir_stack in
        let _v : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 515 "annot_parser.ml"
        ) = 
# 36 "annot_parser.mly"
    ( `Provides (None,id,(match opt with None -> `Mutator | Some k -> k),args) )
# 519 "annot_parser.ml"
         in
        _menhir_goto_annot _menhir_env _menhir_stack _v) : 'freshtv138)) : 'freshtv140)
    | MenhirState50 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv143)) * (
# 22 "annot_parser.mly"
      (string)
# 527 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_endline) = _v in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv141)) * (
# 22 "annot_parser.mly"
      (string)
# 535 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        let (_ : _menhir_state) = _menhir_s in
        let (_ : 'tv_endline) = _v in
        ((let (_menhir_stack, (name : (
# 22 "annot_parser.mly"
      (string)
# 542 "annot_parser.ml"
        ))) = _menhir_stack in
        let _v : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 547 "annot_parser.ml"
        ) = 
# 43 "annot_parser.mly"
    ( `If (None,name) )
# 551 "annot_parser.ml"
         in
        _menhir_goto_annot _menhir_env _menhir_stack _v) : 'freshtv142)) : 'freshtv144)
    | MenhirState53 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ((('freshtv147))) * (
# 22 "annot_parser.mly"
      (string)
# 559 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        let (_menhir_s : _menhir_state) = _menhir_s in
        let (_v : 'tv_endline) = _v in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ((('freshtv145))) * (
# 22 "annot_parser.mly"
      (string)
# 567 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        let (_ : _menhir_state) = _menhir_s in
        let (_ : 'tv_endline) = _v in
        ((let (_menhir_stack, (name : (
# 22 "annot_parser.mly"
      (string)
# 574 "annot_parser.ml"
        ))) = _menhir_stack in
        let _v : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 579 "annot_parser.ml"
        ) = 
# 45 "annot_parser.mly"
                           ( `Ifnot (None,name) )
# 583 "annot_parser.ml"
         in
        _menhir_goto_annot _menhir_env _menhir_stack _v) : 'freshtv146)) : 'freshtv148)
    | _ ->
        _menhir_fail ()

and _menhir_goto_annot : _menhir_env -> 'ttv_tail -> (
# 28 "annot_parser.mly"
      (Primitive.t)
# 592 "annot_parser.ml"
) -> 'ttv_return =
  fun _menhir_env _menhir_stack _v ->
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv127) = Obj.magic _menhir_stack in
    let (_v : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 600 "annot_parser.ml"
    )) = _v in
    ((let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv125) = Obj.magic _menhir_stack in
    let ((_1 : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 607 "annot_parser.ml"
    )) : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 611 "annot_parser.ml"
    )) = _v in
    (Obj.magic _1 : 'freshtv126)) : 'freshtv128)

and _menhir_run4 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv123) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_op = 
# 60 "annot_parser.mly"
       ((<))
# 624 "annot_parser.ml"
     in
    _menhir_goto_op _menhir_env _menhir_stack _menhir_s _v) : 'freshtv124)

and _menhir_run5 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv121) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_op = 
# 59 "annot_parser.mly"
       ((<=))
# 637 "annot_parser.ml"
     in
    _menhir_goto_op _menhir_env _menhir_stack _menhir_s _v) : 'freshtv122)

and _menhir_run6 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv119) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_op = 
# 61 "annot_parser.mly"
       ((>))
# 650 "annot_parser.ml"
     in
    _menhir_goto_op _menhir_env _menhir_stack _menhir_s _v) : 'freshtv120)

and _menhir_run7 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv117) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_op = 
# 62 "annot_parser.mly"
       ((>=))
# 663 "annot_parser.ml"
     in
    _menhir_goto_op _menhir_env _menhir_stack _menhir_s _v) : 'freshtv118)

and _menhir_run8 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let _menhir_env = _menhir_discard _menhir_env in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv115) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_op = 
# 63 "annot_parser.mly"
       ((=))
# 676 "annot_parser.ml"
     in
    _menhir_goto_op _menhir_env _menhir_stack _menhir_s _v) : 'freshtv116)

and _menhir_run21 : _menhir_env -> 'ttv_tail -> _menhir_state -> (
# 22 "annot_parser.mly"
      (string)
# 683 "annot_parser.ml"
) -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    let _menhir_stack = (_menhir_stack, _menhir_s, _v) in
    let _menhir_env = _menhir_discard _menhir_env in
    let _tok = _menhir_env._menhir_token in
    match _tok with
    | TComma ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv109 * _menhir_state * (
# 22 "annot_parser.mly"
      (string)
# 695 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TIdent _v ->
            _menhir_run21 _menhir_env (Obj.magic _menhir_stack) MenhirState22 _v
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState22) : 'freshtv110)
    | EOF | EOL | TOTHER _ ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv111 * _menhir_state * (
# 22 "annot_parser.mly"
      (string)
# 711 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, (x : (
# 22 "annot_parser.mly"
      (string)
# 716 "annot_parser.ml"
        ))) = _menhir_stack in
        let _v : 'tv_separated_nonempty_list_TComma_TIdent_ = 
# 241 "<standard.mly>"
    ( [ x ] )
# 721 "annot_parser.ml"
         in
        _menhir_goto_separated_nonempty_list_TComma_TIdent_ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv112)
    | _ ->
        assert (not _menhir_env._menhir_error);
        _menhir_env._menhir_error <- true;
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv113 * _menhir_state * (
# 22 "annot_parser.mly"
      (string)
# 731 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv114)

and _menhir_goto_option_prim_annot_ : _menhir_env -> 'ttv_tail -> 'tv_option_prim_annot_ -> 'ttv_return =
  fun _menhir_env _menhir_stack _v ->
    let _menhir_stack = (_menhir_stack, _v) in
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : ((('freshtv107)) * (
# 22 "annot_parser.mly"
      (string)
# 743 "annot_parser.ml"
    )) * 'tv_option_prim_annot_) = Obj.magic _menhir_stack in
    ((assert (not _menhir_env._menhir_error);
    let _tok = _menhir_env._menhir_token in
    match _tok with
    | LPARENT ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv101) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TA_Const ->
            _menhir_run39 _menhir_env (Obj.magic _menhir_stack) MenhirState35
        | TA_Mutable ->
            _menhir_run38 _menhir_env (Obj.magic _menhir_stack) MenhirState35
        | TA_Object_literal ->
            _menhir_run37 _menhir_env (Obj.magic _menhir_stack) MenhirState35
        | TA_Shallow ->
            _menhir_run36 _menhir_env (Obj.magic _menhir_stack) MenhirState35
        | RPARENT ->
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv99) = Obj.magic _menhir_stack in
            let (_menhir_s : _menhir_state) = MenhirState35 in
            ((let _v : 'tv_loption_separated_nonempty_list_TComma_arg_annot__ = 
# 142 "<standard.mly>"
    ( [] )
# 769 "annot_parser.ml"
             in
            _menhir_goto_loption_separated_nonempty_list_TComma_arg_annot__ _menhir_env _menhir_stack _menhir_s _v) : 'freshtv100)
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState35) : 'freshtv102)
    | EOF | EOL | TOTHER _ ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv103) = Obj.magic _menhir_stack in
        ((let _v : 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__ = 
# 114 "<standard.mly>"
    ( None )
# 782 "annot_parser.ml"
         in
        _menhir_goto_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__ _menhir_env _menhir_stack _v) : 'freshtv104)
    | _ ->
        assert (not _menhir_env._menhir_error);
        _menhir_env._menhir_error <- true;
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ((('freshtv105)) * (
# 22 "annot_parser.mly"
      (string)
# 792 "annot_parser.ml"
        )) * 'tv_option_prim_annot_) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv106)) : 'freshtv108)

and _menhir_goto_prim_annot : _menhir_env -> 'ttv_tail -> 'tv_prim_annot -> 'ttv_return =
  fun _menhir_env _menhir_stack _v ->
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv97) = Obj.magic _menhir_stack in
    let (_v : 'tv_prim_annot) = _v in
    ((let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv95) = Obj.magic _menhir_stack in
    let ((x : 'tv_prim_annot) : 'tv_prim_annot) = _v in
    ((let _v : 'tv_option_prim_annot_ = 
# 116 "<standard.mly>"
    ( Some x )
# 807 "annot_parser.ml"
     in
    _menhir_goto_option_prim_annot_ _menhir_env _menhir_stack _v) : 'freshtv96)) : 'freshtv98)

and _menhir_errorcase : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    match _menhir_s with
    | MenhirState53 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ((('freshtv73))) * (
# 22 "annot_parser.mly"
      (string)
# 819 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv74)
    | MenhirState50 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv75)) * (
# 22 "annot_parser.mly"
      (string)
# 827 "annot_parser.ml"
        )) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv76)
    | MenhirState46 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (((('freshtv77)) * (
# 22 "annot_parser.mly"
      (string)
# 835 "annot_parser.ml"
        )) * 'tv_option_prim_annot_) * 'tv_option_delimited_LPARENT_separated_list_TComma_arg_annot__RPARENT__) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv78)
    | MenhirState44 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv79 * _menhir_state * 'tv_arg_annot)) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv80)
    | MenhirState35 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv81) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv82)
    | MenhirState24 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv83)) * _menhir_state * 'tv_separated_nonempty_list_TComma_TIdent_) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv84)
    | MenhirState22 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv85 * _menhir_state * (
# 22 "annot_parser.mly"
      (string)
# 857 "annot_parser.ml"
        ))) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv86)
    | MenhirState20 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv87)) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv88)
    | MenhirState14 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : (('freshtv89)) * _menhir_state * 'tv_separated_nonempty_list_TComma_version_) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv90)
    | MenhirState10 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv91 * _menhir_state * 'tv_version)) = Obj.magic _menhir_stack in
        ((let (_menhir_stack, _menhir_s, _) = _menhir_stack in
        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) _menhir_s) : 'freshtv92)
    | MenhirState3 ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : ('freshtv93)) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv94)

and _menhir_run15 : _menhir_env -> 'ttv_tail -> _menhir_state -> (
# 24 "annot_parser.mly"
      (string)
# 883 "annot_parser.ml"
) -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s _v ->
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv71) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    let ((_1 : (
# 24 "annot_parser.mly"
      (string)
# 892 "annot_parser.ml"
    )) : (
# 24 "annot_parser.mly"
      (string)
# 896 "annot_parser.ml"
    )) = _v in
    ((let _v : 'tv_endline = 
# 71 "annot_parser.mly"
           ( failwith _1  )
# 901 "annot_parser.ml"
     in
    _menhir_goto_endline _menhir_env _menhir_stack _menhir_s _v) : 'freshtv72)

and _menhir_run16 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv69) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_endline = 
# 69 "annot_parser.mly"
        ( () )
# 913 "annot_parser.ml"
     in
    _menhir_goto_endline _menhir_env _menhir_stack _menhir_s _v) : 'freshtv70)

and _menhir_run17 : _menhir_env -> 'ttv_tail -> _menhir_state -> 'ttv_return =
  fun _menhir_env _menhir_stack _menhir_s ->
    let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv67) = Obj.magic _menhir_stack in
    let (_menhir_s : _menhir_state) = _menhir_s in
    ((let _v : 'tv_endline = 
# 70 "annot_parser.mly"
        ( () )
# 925 "annot_parser.ml"
     in
    _menhir_goto_endline _menhir_env _menhir_stack _menhir_s _v) : 'freshtv68)

and _menhir_discard : _menhir_env -> _menhir_env =
  fun _menhir_env ->
    let lexer = _menhir_env._menhir_lexer in
    let lexbuf = _menhir_env._menhir_lexbuf in
    let _tok = lexer lexbuf in
    {
      _menhir_lexer = lexer;
      _menhir_lexbuf = lexbuf;
      _menhir_token = _tok;
      _menhir_error = false;
    }

and annot : (Lexing.lexbuf -> token) -> Lexing.lexbuf -> (
# 28 "annot_parser.mly"
      (Primitive.t)
# 944 "annot_parser.ml"
) =
  fun lexer lexbuf ->
    let _menhir_env = {
      _menhir_lexer = lexer;
      _menhir_lexbuf = lexbuf;
      _menhir_token = Obj.magic ();
      _menhir_error = false;
    } in
    Obj.magic (let (_menhir_env : _menhir_env) = _menhir_env in
    let (_menhir_stack : 'freshtv65) = ((), _menhir_env._menhir_lexbuf.Lexing.lex_curr_p) in
    ((let _menhir_env = _menhir_discard _menhir_env in
    let _tok = _menhir_env._menhir_token in
    match _tok with
    | TIf ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv15) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TSemi ->
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv11) = Obj.magic _menhir_stack in
            ((let _menhir_env = _menhir_discard _menhir_env in
            let _tok = _menhir_env._menhir_token in
            match _tok with
            | TBang ->
                let (_menhir_env : _menhir_env) = _menhir_env in
                let (_menhir_stack : ('freshtv5)) = Obj.magic _menhir_stack in
                ((let _menhir_env = _menhir_discard _menhir_env in
                let _tok = _menhir_env._menhir_token in
                match _tok with
                | TIdent _v ->
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : (('freshtv1))) = Obj.magic _menhir_stack in
                    let (_v : (
# 22 "annot_parser.mly"
      (string)
# 982 "annot_parser.ml"
                    )) = _v in
                    ((let _menhir_stack = (_menhir_stack, _v) in
                    let _menhir_env = _menhir_discard _menhir_env in
                    let _tok = _menhir_env._menhir_token in
                    match _tok with
                    | EOF ->
                        _menhir_run17 _menhir_env (Obj.magic _menhir_stack) MenhirState53
                    | EOL ->
                        _menhir_run16 _menhir_env (Obj.magic _menhir_stack) MenhirState53
                    | TOTHER _v ->
                        _menhir_run15 _menhir_env (Obj.magic _menhir_stack) MenhirState53 _v
                    | _ ->
                        assert (not _menhir_env._menhir_error);
                        _menhir_env._menhir_error <- true;
                        _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState53) : 'freshtv2)
                | _ ->
                    assert (not _menhir_env._menhir_error);
                    _menhir_env._menhir_error <- true;
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : (('freshtv3))) = Obj.magic _menhir_stack in
                    (raise _eRR : 'freshtv4)) : 'freshtv6)
            | TIdent _v ->
                let (_menhir_env : _menhir_env) = _menhir_env in
                let (_menhir_stack : ('freshtv7)) = Obj.magic _menhir_stack in
                let (_v : (
# 22 "annot_parser.mly"
      (string)
# 1010 "annot_parser.ml"
                )) = _v in
                ((let _menhir_stack = (_menhir_stack, _v) in
                let _menhir_env = _menhir_discard _menhir_env in
                let _tok = _menhir_env._menhir_token in
                match _tok with
                | EOF ->
                    _menhir_run17 _menhir_env (Obj.magic _menhir_stack) MenhirState50
                | EOL ->
                    _menhir_run16 _menhir_env (Obj.magic _menhir_stack) MenhirState50
                | TOTHER _v ->
                    _menhir_run15 _menhir_env (Obj.magic _menhir_stack) MenhirState50 _v
                | _ ->
                    assert (not _menhir_env._menhir_error);
                    _menhir_env._menhir_error <- true;
                    _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState50) : 'freshtv8)
            | _ ->
                assert (not _menhir_env._menhir_error);
                _menhir_env._menhir_error <- true;
                let (_menhir_env : _menhir_env) = _menhir_env in
                let (_menhir_stack : ('freshtv9)) = Obj.magic _menhir_stack in
                (raise _eRR : 'freshtv10)) : 'freshtv12)
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv13) = Obj.magic _menhir_stack in
            (raise _eRR : 'freshtv14)) : 'freshtv16)
    | TProvides ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv45) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TSemi ->
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv41) = Obj.magic _menhir_stack in
            ((let _menhir_env = _menhir_discard _menhir_env in
            let _tok = _menhir_env._menhir_token in
            match _tok with
            | TIdent _v ->
                let (_menhir_env : _menhir_env) = _menhir_env in
                let (_menhir_stack : ('freshtv37)) = Obj.magic _menhir_stack in
                let (_v : (
# 22 "annot_parser.mly"
      (string)
# 1056 "annot_parser.ml"
                )) = _v in
                ((let _menhir_stack = (_menhir_stack, _v) in
                let _menhir_env = _menhir_discard _menhir_env in
                let _tok = _menhir_env._menhir_token in
                match _tok with
                | TA_Const ->
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv19) = Obj.magic _menhir_stack in
                    ((let _menhir_env = _menhir_discard _menhir_env in
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv17) = Obj.magic _menhir_stack in
                    ((let _v : 'tv_prim_annot = 
# 48 "annot_parser.mly"
             (`Pure)
# 1071 "annot_parser.ml"
                     in
                    _menhir_goto_prim_annot _menhir_env _menhir_stack _v) : 'freshtv18)) : 'freshtv20)
                | TA_Mutable ->
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv23) = Obj.magic _menhir_stack in
                    ((let _menhir_env = _menhir_discard _menhir_env in
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv21) = Obj.magic _menhir_stack in
                    ((let _v : 'tv_prim_annot = 
# 49 "annot_parser.mly"
               (`Mutable)
# 1083 "annot_parser.ml"
                     in
                    _menhir_goto_prim_annot _menhir_env _menhir_stack _v) : 'freshtv22)) : 'freshtv24)
                | TA_Mutator ->
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv27) = Obj.magic _menhir_stack in
                    ((let _menhir_env = _menhir_discard _menhir_env in
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv25) = Obj.magic _menhir_stack in
                    ((let _v : 'tv_prim_annot = 
# 50 "annot_parser.mly"
               (`Mutator)
# 1095 "annot_parser.ml"
                     in
                    _menhir_goto_prim_annot _menhir_env _menhir_stack _v) : 'freshtv26)) : 'freshtv28)
                | TA_Pure ->
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv31) = Obj.magic _menhir_stack in
                    ((let _menhir_env = _menhir_discard _menhir_env in
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv29) = Obj.magic _menhir_stack in
                    ((let _v : 'tv_prim_annot = 
# 47 "annot_parser.mly"
            (`Pure)
# 1107 "annot_parser.ml"
                     in
                    _menhir_goto_prim_annot _menhir_env _menhir_stack _v) : 'freshtv30)) : 'freshtv32)
                | EOF | EOL | LPARENT | TOTHER _ ->
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : 'freshtv33) = Obj.magic _menhir_stack in
                    ((let _v : 'tv_option_prim_annot_ = 
# 114 "<standard.mly>"
    ( None )
# 1116 "annot_parser.ml"
                     in
                    _menhir_goto_option_prim_annot_ _menhir_env _menhir_stack _v) : 'freshtv34)
                | _ ->
                    assert (not _menhir_env._menhir_error);
                    _menhir_env._menhir_error <- true;
                    let (_menhir_env : _menhir_env) = _menhir_env in
                    let (_menhir_stack : (('freshtv35)) * (
# 22 "annot_parser.mly"
      (string)
# 1126 "annot_parser.ml"
                    )) = Obj.magic _menhir_stack in
                    (raise _eRR : 'freshtv36)) : 'freshtv38)
            | _ ->
                assert (not _menhir_env._menhir_error);
                _menhir_env._menhir_error <- true;
                let (_menhir_env : _menhir_env) = _menhir_env in
                let (_menhir_stack : ('freshtv39)) = Obj.magic _menhir_stack in
                (raise _eRR : 'freshtv40)) : 'freshtv42)
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv43) = Obj.magic _menhir_stack in
            (raise _eRR : 'freshtv44)) : 'freshtv46)
    | TRequires ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv51) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TSemi ->
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv47) = Obj.magic _menhir_stack in
            ((let _menhir_env = _menhir_discard _menhir_env in
            let _tok = _menhir_env._menhir_token in
            match _tok with
            | TIdent _v ->
                _menhir_run21 _menhir_env (Obj.magic _menhir_stack) MenhirState20 _v
            | _ ->
                assert (not _menhir_env._menhir_error);
                _menhir_env._menhir_error <- true;
                _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState20) : 'freshtv48)
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv49) = Obj.magic _menhir_stack in
            (raise _eRR : 'freshtv50)) : 'freshtv52)
    | TVersion ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv57) = Obj.magic _menhir_stack in
        ((let _menhir_env = _menhir_discard _menhir_env in
        let _tok = _menhir_env._menhir_token in
        match _tok with
        | TSemi ->
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv53) = Obj.magic _menhir_stack in
            ((let _menhir_env = _menhir_discard _menhir_env in
            let _tok = _menhir_env._menhir_token in
            match _tok with
            | EQ ->
                _menhir_run8 _menhir_env (Obj.magic _menhir_stack) MenhirState3
            | GE ->
                _menhir_run7 _menhir_env (Obj.magic _menhir_stack) MenhirState3
            | GT ->
                _menhir_run6 _menhir_env (Obj.magic _menhir_stack) MenhirState3
            | LE ->
                _menhir_run5 _menhir_env (Obj.magic _menhir_stack) MenhirState3
            | LT ->
                _menhir_run4 _menhir_env (Obj.magic _menhir_stack) MenhirState3
            | _ ->
                assert (not _menhir_env._menhir_error);
                _menhir_env._menhir_error <- true;
                _menhir_errorcase _menhir_env (Obj.magic _menhir_stack) MenhirState3) : 'freshtv54)
        | _ ->
            assert (not _menhir_env._menhir_error);
            _menhir_env._menhir_error <- true;
            let (_menhir_env : _menhir_env) = _menhir_env in
            let (_menhir_stack : 'freshtv55) = Obj.magic _menhir_stack in
            (raise _eRR : 'freshtv56)) : 'freshtv58)
    | TWeakdef ->
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv61) = Obj.magic _menhir_stack in
        ((let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv59) = Obj.magic _menhir_stack in
        ((let _v : (
# 28 "annot_parser.mly"
      (Primitive.t)
# 1205 "annot_parser.ml"
        ) = 
# 41 "annot_parser.mly"
             ( `Weakdef None )
# 1209 "annot_parser.ml"
         in
        _menhir_goto_annot _menhir_env _menhir_stack _v) : 'freshtv60)) : 'freshtv62)
    | _ ->
        assert (not _menhir_env._menhir_error);
        _menhir_env._menhir_error <- true;
        let (_menhir_env : _menhir_env) = _menhir_env in
        let (_menhir_stack : 'freshtv63) = Obj.magic _menhir_stack in
        (raise _eRR : 'freshtv64)) : 'freshtv66))

# 269 "<standard.mly>"
  

# 1222 "annot_parser.ml"
