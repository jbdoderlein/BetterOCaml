// REGEX
const COMMENT_REGEX = new RegExp(/[(][*][\s\S]*?[*][)][\s]*/g);
const CODE_SEPARATOR_REGEX = new RegExp(/[\S][\s\S]*?(;;)/g);
const VARIABLE_1_REGEX = new RegExp(/((let rec \w+)|(let \w+)|(and \w+))/g);
const VARIABLE_2_REGEX = new RegExp(/(let )|(rec )|(and )/g);

var MODULE_HINT = {
    'Base': [
        "and", "as", "assert", "asr", "begin", "class", "constraint", "decr", "Division_by_zero", "do", "done", "downto", "else", "end", "epsilon_float", "exception", "external", "Failure", "failwith", "false", "for", "fst", "function", "functor", "if", "in", "include", "incr", "inherit", "initializer", "Invalid_argument", "land", "lazy", "let", "lor", "lsl", "lsr", "lxor", "match", "max_float", "max_int", "method", "min_float", "min_int", "mod", "module", "mutable", "new", "nonrec", "not", "object", "of", "open", "or", "Out_of_memory", "private", "raise", "rec", "ref", "sig", "snd", "struct", "then", "to", "true", "try", "type", "val", "virtual", "when", "while", "with", "prerr_endline", "print_int", "print_float", "print_string", "print_endline", "print_newline", "int_of_float", "float_of_int", "int_of_string", "float_of_string", "bool_of_string", "string_of_int", "string_of_float", "string_of_bool", "int_of_char", "char_of_int", "sqrt", "max", "min", "exp", "log", "log10", "cos", "acos", "sin", "asin", "tan", "atan", "atan2", "hypot", "cosh", "sinh", "tanh", "floor", "ceil", "truncate", "abs_float", "abs",
    ],
    'LargeFile': [
        "seek_out", "pos_out", "out_channel_length", "seek_in", "pos_in", "in_channel_length"
    ],
    'Arg': [
        "parse", "parse_dynamic", "parse_argv", "parse_argv_dynamic", "parse_and_expand_argv_dynamic", "parse_expand", "usage", "usage_string", "align", "current", "read_arg", "read_arg0", "write_arg", "write_arg0"
    ],
    'Array': [
        "length", "get", "set", "make", "create", "create_float", "make_float", "init", "make_matrix", "create_matrix", "append", "concat", "sub", "copy", "fill", "blit", "to_list", "of_list", "iter", "iteri", "map", "mapi", "fold_left", "fold_right", "iter2", "map2", "for_all", "exists", "mem", "memq", "sort", "stable_sort", "fast_sort"
    ],
    'ArrayLabels': [
        "length", "get", "set", "make", "create", "create_float", "make_float", "init", "make_matrix", "create_matrix", "append", "concat", "sub", "copy", "fill", "blit", "to_list", "of_list", "iter", "iteri", "map", "mapi", "fold_left", "fold_right", "iter2", "map2", "for_all", "exists", "mem", "memq", "sort", "stable_sort", "fast_sort"
    ],
    'Atomic': [
        "make", "get", "set", "exchange", "compare_and_set", "fetch_and_add", "incr", "decr"
    ],
    'Bigarray': [
        "float32", "float64", "complex32", "complex64", "int8_signed", "int8_unsigned", "int16_signed", "int16_unsigned", "int", "int32", "int64", "nativeint", "char", "kind_size_in_bytes", "c_layout", "fortran_layout", "genarray_of_array0", "genarray_of_array1", "genarray_of_array2", "genarray_of_array3", "array0_of_genarray", "array1_of_genarray", "array2_of_genarray", "array3_of_genarray", "reshape", "reshape_0", "reshape_1", "reshape_2", "reshape_3"
    ],
    'Bool': [
        "not", "(&&)", "(||)", "equal", "compare", "to_int", "to_float", "to_string"
    ],
    'Buffer': [
        "create", "contents", "to_bytes", "sub", "blit", "nth", "length", "clear", "reset", "output_buffer", "truncate", "add_char", "add_utf_8_uchar", "add_utf_16le_uchar", "add_utf_16be_uchar", "add_string", "add_bytes", "add_substring", "add_subbytes", "add_substitute", "add_buffer", "add_channel"
    ],
    'Bytes': [
        "length", "get", "set", "create", "make", "init", "empty", "copy", "of_string", "to_string", "sub", "sub_string", "extend", "fill", "blit", "blit_string", "concat", "cat", "iter", "iteri", "map", "mapi", "trim", "escaped", "index", "index_opt", "rindex", "rindex_opt", "index_from", "index_from_opt", "rindex_from", "rindex_from_opt", "contains", "contains_from", "rcontains_from", "uppercase", "lowercase", "capitalize", "uncapitalize", "uppercase_ascii", "lowercase_ascii", "capitalize_ascii", "uncapitalize_ascii", "compare", "equal", "unsafe_to_string", "unsafe_of_string"
    ],
    'BytesLabels': [
        "length", "get", "set", "create", "make", "init", "empty", "copy", "of_string", "to_string", "sub", "sub_string", "extend", "fill", "blit", "blit_string", "concat", "cat", "iter", "iteri", "map", "mapi", "trim", "escaped", "index", "index_opt", "rindex", "rindex_opt", "index_from", "index_from_opt", "rindex_from", "rindex_from_opt", "contains", "contains_from", "rcontains_from", "uppercase", "lowercase", "capitalize", "uncapitalize", "uppercase_ascii", "lowercase_ascii", "capitalize_ascii", "uncapitalize_ascii", "compare", "equal", "unsafe_to_string", "unsafe_of_string"
    ],
    'Callback': [
        "register", "register_exception"
    ],
    'Char': [
        "code", "chr", "escaped", "lowercase", "uppercase", "lowercase_ascii", "uppercase_ascii", "compare", "equal"
    ],
    'Complex': [
        "zero", "one", "i", "neg", "conj", "add", "sub", "mul", "inv", "div", "sqrt", "norm2", "norm", "arg", "polar", "exp", "log", "pow"
    ],
    'Digest': [
        "compare", "equal", "string", "bytes", "substring", "subbytes", "channel", "file", "output", "input", "to_hex", "from_hex"
    ],
    'Either': [
        "left", "right", "is_left", "is_right", "find_left", "find_right", "map_left", "map_right", "map", "fold", "iter", "for_all", "equal", "compare"
    ],
    'Ephemeron': [
        
    ],
    'Filename': [
        "current_dir_name", "parent_dir_name", "dir_sep", "concat", "is_relative", "is_implicit", "check_suffix", "chop_suffix", "extension", "remove_extension", "chop_extension", "basename", "dirname", "temp_file", "open_temp_file", "get_temp_dir_name", "set_temp_dir_name", "temp_dir_name", "quote"
    ],
    'Float': [
        "neg", "add", "sub", "mul", "div", "rem", "abs", "infinity", "neg_infinity", "nan", "pi", "max_float", "min_float", "epsilon", "of_int", "to_int", "of_string", "of_string_opt", "to_string", "classify_float", "pow", "sqrt", "exp", "log", "log10", "expm1", "log1p", "cos", "sin", "tan", "acos", "asin", "atan", "atan2", "hypot", "cosh", "sinh", "tanh", "ceil", "floor", "copy_sign", "frexp", "ldexp", "modf", "compare", "equal", "hash"
    ],
    'Format': [
        "pp_open_box", "open_box", "pp_close_box", "close_box", "pp_open_hbox", "open_hbox", "pp_open_vbox", "open_vbox", "pp_open_hvbox", "open_hvbox", "pp_open_hovbox", "open_hovbox", "pp_print_string", "print_string", "pp_print_as", "print_as", "pp_print_int", "print_int", "pp_print_float", "print_float", "pp_print_char", "print_char", "pp_print_bool", "print_bool", "pp_print_space", "print_space", "pp_print_cut", "print_cut", "pp_print_break", "print_break", "pp_print_custom_break", "pp_force_newline", "force_newline", "pp_print_if_newline", "print_if_newline", "pp_print_flush", "print_flush", "pp_print_newline", "print_newline", "pp_set_margin", "set_margin", "pp_get_margin", "get_margin", "pp_set_max_indent", "set_max_indent", "pp_get_max_indent", "get_max_indent", "check_geometry", "pp_set_geometry", "set_geometry", "pp_safe_set_geometry", "safe_set_geometry", "pp_update_geometry", "update_geometry", "pp_get_geometry", "get_geometry", "pp_set_max_boxes", "set_max_boxes", "pp_get_max_boxes", "get_max_boxes", "pp_over_max_boxes", "over_max_boxes", "pp_open_tbox", "open_tbox", "pp_close_tbox", "close_tbox", "pp_set_tab", "set_tab", "pp_print_tab", "print_tab", "pp_print_tbreak", "print_tbreak", "pp_set_ellipsis_text", "set_ellipsis_text", "pp_get_ellipsis_text", "get_ellipsis_text", "pp_open_stag", "open_stag", "pp_close_stag", "close_stag", "pp_set_tags", "set_tags", "pp_set_print_tags", "set_print_tags", "pp_set_mark_tags", "set_mark_tags", "pp_get_print_tags", "get_print_tags", "pp_get_mark_tags", "get_mark_tags", "pp_set_formatter_out_channel", "set_formatter_out_channel", "pp_set_formatter_output_functions", "set_formatter_output_functions", "pp_get_formatter_output_functions", "get_formatter_output_functions", "pp_set_formatter_out_functions", "set_formatter_out_functions", "pp_get_formatter_out_functions", "get_formatter_out_functions", "pp_set_formatter_stag_functions", "set_formatter_stag_functions", "pp_get_formatter_stag_functions", "get_formatter_stag_functions", "formatter_of_out_channel", "std_formatter", "err_formatter", "formatter_of_buffer", "stdbuf", "str_formatter", "flush_str_formatter", "make_formatter", "formatter_of_out_functions", "make_symbolic_output_buffer", "clear_symbolic_output_buffer", "get_symbolic_output_buffer", "flush_symbolic_output_buffer", "add_symbolic_output_item", "formatter_of_symbolic_output_buffer", "pp_print_list", "pp_print_seq", "pp_print_text", "pp_print_option", "pp_print_result", "pp_print_either", "fprintf", "printf", "eprintf", "sprintf", "asprintf", "dprintf", "ifprintf", "kfprintf", "kdprintf", "ikfprintf", "ksprintf", "kasprintf", "bprintf", "kprintf", "set_all_formatter_output_functions", "get_all_formatter_output_functions", "pp_set_all_formatter_output_functions", "pp_get_all_formatter_output_functions", "pp_open_tag", "open_tag", "pp_close_tag", "close_tag", "pp_set_formatter_tag_functions", "set_formatter_tag_functions", "pp_get_formatter_tag_functions", "get_formatter_tag_functions"
    ],
    'Fun': [
        "id", "const", "flip", "negate", "protect"
    ],
    'Gc': [
        "stat", "quick_stat", "counters", "minor_words", "get", "set", "minor", "major_slice", "major", "full_major", "compact", "print_stat", "allocated_bytes", "get_minor_free", "get_bucket", "get_credit", "huge_fallback_count", "finalise", "finalise_last", "finalise_release", "create_alarm", "delete_alarm", "eventlog_pause", "eventlog_resume"
    ],
    'Genlex': [
        "make_lexer"
    ],
    'Hashtbl': [
        "create", "clear", "reset", "copy", "add", "find", "find_opt", "find_all", "mem", "remove", "replace", "iter", "filter_map_inplace", "fold", "length", "randomize", "is_randomized", "stats", "hash", "seeded_hash", "hash_param", "seeded_hash_param"
    ],
    'Int': [
        "zero", "one", "minus_one", "neg", "add", "sub", "mul", "div", "rem", "succ", "pred", "abs", "max_int", "min_int", "logand", "logor", "logxor", "lognot", "shift_left", "shift_right", "shift_right_logical", "equal", "compare", "to_float", "of_float", "to_string"
    ],
    'Int32': [
        "zero", "one", "minus_one", "neg", "add", "sub", "mul", "div", "rem", "succ", "pred", "abs", "max_int", "min_int", "logand", "logor", "logxor", "lognot", "shift_left", "shift_right", "shift_right_logical", "of_int", "to_int", "of_float", "to_float", "of_string", "of_string_opt", "to_string", "bits_of_float", "float_of_bits", "compare", "equal"
    ],
    'Int64': [
        "zero", "one", "minus_one", "neg", "add", "sub", "mul", "div", "rem", "succ", "pred", "abs", "max_int", "min_int", "logand", "logor", "logxor", "lognot", "shift_left", "shift_right", "shift_right_logical", "of_int", "to_int", "of_float", "to_float", "of_int32", "to_int32", "of_nativeint", "to_nativeint", "of_string", "of_string_opt", "to_string", "bits_of_float", "float_of_bits", "compare", "equal"
    ],
    'Lazy': [
        "force", "is_val", "from_val", "from_fun", "force_val", "lazy_from_fun", "lazy_from_val", "lazy_is_val"
    ],
    'Lexing': [
        "dummy_pos", "from_channel", "from_string", "from_function", "with_positions", "lexeme", "lexeme_char", "lexeme_start", "lexeme_end", "lexeme_start_p", "lexeme_end_p", "new_line", "flush_input"
    ],
    'List': [
        "length", "compare_lengths", "compare_length_with", "cons", "hd", "tl", "nth", "nth_opt", "rev", "init", "append", "rev_append", "concat", "flatten", "iter", "iteri", "map", "mapi", "rev_map", "fold_left", "fold_right", "iter2", "map2", "rev_map2", "fold_left2", "fold_right2", "for_all", "exists", "for_all2", "exists2", "mem", "memq", "find", "find_opt", "filter", "find_all", "partition", "assoc", "assoc_opt", "assq", "assq_opt", "mem_assoc", "mem_assq", "remove_assoc", "remove_assq", "split", "combine", "sort", "stable_sort", "fast_sort", "sort_uniq", "merge"
    ],
    'ListLabels': [
        "length", "compare_lengths", "compare_length_with", "cons", "hd", "tl", "nth", "nth_opt", "rev", "init", "append", "rev_append", "concat", "flatten", "iter", "iteri", "map", "mapi", "rev_map", "fold_left", "fold_right", "iter2", "map2", "rev_map2", "fold_left2", "fold_right2", "for_all", "exists", "for_all2", "exists2", "mem", "memq", "find", "find_opt", "filter", "find_all", "partition", "assoc", "assoc_opt", "assq", "assq_opt", "mem_assoc", "mem_assq", "remove_assoc", "remove_assq", "split", "combine", "sort", "stable_sort", "fast_sort", "sort_uniq", "merge"
    ],
    'Map': [
        
    ],
    'Marshal': [
        "to_channel", "to_bytes", "to_string", "to_buffer", "from_channel", "from_bytes", "from_string", "header_size", "data_size", "total_size"
    ],
    'MoreLabels': [
        
    ],
    'Nativeint': [
        "zero", "one", "minus_one", "neg", "add", "sub", "mul", "div", "rem", "succ", "pred", "abs", "size", "max_int", "min_int", "logand", "logor", "logxor", "lognot", "shift_left", "shift_right", "shift_right_logical", "of_int", "to_int", "of_float", "to_float", "of_int32", "to_int32", "of_string", "of_string_opt", "to_string", "compare", "equal"
    ],
    'Obj': [
        "repr", "obj", "magic", "is_block", "is_int", "tag", "size", "reachable_words", "field", "set_field", "set_tag", "double_field", "set_double_field", "raw_field", "set_raw_field", "new_block", "dup", "truncate", "add_offset", "with_tag", "first_non_constant_constructor_tag", "last_non_constant_constructor_tag", "lazy_tag", "closure_tag", "object_tag", "infix_tag", "forward_tag", "no_scan_tag", "abstract_tag", "string_tag", "double_tag", "double_array_tag", "custom_tag", "final_tag", "int_tag", "out_of_heap_tag", "unaligned_tag", "extension_constructor", "extension_name", "extension_id", "marshal", "unmarshal"
    ],
    'Oo': [
        "copy", "id"
    ],
    'Option': [
        "none", "some", "value", "get", "bind", "join", "map", "fold", "iter", "is_none", "is_some", "equal", "compare", "to_result", "to_list", "to_seq"
    ],
    'Parsing': [
        "symbol_start", "symbol_end", "rhs_start", "rhs_end", "symbol_start_pos", "symbol_end_pos", "rhs_start_pos", "rhs_end_pos", "clear_parser", "set_trace"
    ],
    'Pervasives': [
        
    ],
    'Printexc': [
        "to_string", "print", "catch", "print_backtrace", "get_backtrace", "record_backtrace", "backtrace_status", "register_printer", "get_raw_backtrace", "print_raw_backtrace", "raw_backtrace_to_string", "raise_with_backtrace", "get_callstack", "set_uncaught_exception_handler", "backtrace_slots", "raw_backtrace_length", "get_raw_backtrace_slot", "convert_raw_backtrace_slot", "get_raw_backtrace_next_slot", "exn_slot_id", "exn_slot_name"
    ],
    'Printf': [
        "fprintf", "printf", "eprintf", "sprintf", "bprintf", "ifprintf", "kfprintf", "ikfprintf", "ksprintf", "kbprintf", "kprintf"
    ],
    'Queue': [
        "create", "add", "push", "take", "pop", "peek", "top", "clear", "copy", "is_empty", "length", "iter", "fold", "transfer"
    ],
    'Random': [
        "init", "self_init", "bits", "int", "full_int", "int32", "nativeint", "int64", "float", "bool", "get_state", "set_state"
    ],
    'Result': [
        "ok", "error", "value", "get_ok", "get_error", "bind", "join", "map", "map_error", "fold", "iter", "iter_error", "is_ok", "is_error", "equal", "compare", "to_option", "to_list", "to_seq"
    ],
    'Scanf': [
        "bscanf", "sscanf", "scanf", "kscanf", "ksscanf", "bscanf_format", "sscanf_format", "format_from_string", "unescaped", "fscanf", "kfscanf"
    ],
    'Seq': [
        "empty", "return", "map", "filter", "filter_map", "flat_map", "fold_left", "iter"
    ],
    'Set': [
        
    ],
    'Stack': [
        "create", "push", "pop", "top", "clear", "copy", "is_empty", "length", "iter", "fold"
    ],
    'StdLabels': [
        
    ],
    'Stream': [
        "from", "of_list", "of_string", "of_bytes", "of_channel", "iter", "next", "empty", "peek", "junk", "count", "npeek"
    ],
    'String': [
        "make", "init", "length", "get", "concat", "equal", "compare", "contains_from", "rcontains_from", "contains", "sub", "split_on_char", "map", "mapi", "trim", "escaped", "uppercase_ascii", "lowercase_ascii", "capitalize_ascii", "uncapitalize_ascii", "iter", "iteri", "index_from", "index_from_opt", "rindex_from", "rindex_from_opt", "index", "index_opt", "rindex", "rindex_opt", "create", "set", "blit", "copy", "fill", "uppercase", "lowercase", "capitalize", "uncapitalize"
    ],
    'StringLabels': [
        "make", "init", "length", "get", "concat", "equal", "compare", "contains_from", "rcontains_from", "contains", "sub", "split_on_char", "map", "mapi", "trim", "escaped", "uppercase_ascii", "lowercase_ascii", "capitalize_ascii", "uncapitalize_ascii", "iter", "iteri", "index_from", "index_from_opt", "rindex_from", "rindex_from_opt", "index", "index_opt", "rindex", "rindex_opt", "create", "set", "blit", "copy", "fill", "uppercase", "lowercase", "capitalize", "uncapitalize"
    ],
    'Sys': [
        "argv", "executable_name", "file_exists", "is_directory", "remove", "rename", "getenv", "getenv_opt", "command", "time", "chdir", "getcwd", "readdir", "interactive", "os_type", "backend_type", "unix", "win32", "cygwin", "word_size", "int_size", "big_endian", "max_string_length", "max_array_length", "max_floatarray_length", "runtime_variant", "runtime_parameters", "signal", "set_signal", "sigabrt", "sigalrm", "sigfpe", "sighup", "sigill", "sigint", "sigkill", "sigpipe", "sigquit", "sigsegv", "sigterm", "sigusr1", "sigusr2", "sigchld", "sigcont", "sigstop", "sigtstp", "sigttin", "sigttou", "sigvtalrm", "sigprof", "sigbus", "sigpoll", "sigsys", "sigtrap", "sigurg", "sigxcpu", "sigxfsz", "catch_break", "ocaml_version", "enable_runtime_warnings", "runtime_warnings_enabled", "opaque_identity"
    ],
    'Uchar': [
        "min", "max", "bom", "rep", "succ", "pred", "is_valid", "of_int", "to_int", "is_char", "of_char", "to_char", "equal", "compare", "hash"
    ],
    'Unit': [
        "equal", "compare", "to_string"
    ],
    'Weak': [
        "create", "length", "set", "get", "get_copy", "check", "fill", "blit"
    ],
    
    'Graphics': [
        "open_graph", "close_graph", "width", "height", "size_x", "size_y", "clear_graph", "set_window_title", "resize_window", "plot", "plots", "moveto", "rmoveto", "lineto", "rlineto", "draw_circle", "fill_circle", "set_color", "set_line_width", "rgb", "background", "foreground", "black", "white", "red", "green", "blue", "yellow", "cyan", "magenta", "point_color", "current_x", "current_y", "current_point", "curveto", "draw_rect", "fill_rect", "draw_poly_line", "draw_poly", "fill_poly", "draw_segments", "draw_arc", "fill_arc", "draw_ellipse", "fill_ellipse", "draw_char", "draw_string", "set_text_size", "text_size"
    ],
    'Num': [
        "zero_big_int", "unit_big_int", "minus_big_int", "abs_big_int", "add_big_int", "succ_big_int", "add_int_big_int", "sub_big_int", "pred_big_int", "mult_big_int", "mult_int_big_int", "square_big_int", "sqrt_big_int", "quomod_big_int", "div_big_int", "mod_big_int", "gcd_big_int", "power", "power_big", "power_int_positive_int", "power_big_int_positive_int", "power_int_positive_big_int", "power_big_int_positive_big_int", "sign_big_int", "compare_big_int", "eq_big_int", "le_big_int", "ge_big_int", "lt_big_int", "gt_big_int", "max_big_int", "min_big_int", "num_digits_big_int", "string_of_big_int", "big_int_of_string", "big_int_of_int", "is_int_big_int", "int_of_big_int", "big_int_of_int32", "big_int_of_nativeint", "big_int_of_int64", "int32_of_big_int", "nativeint_of_big_int", "int64_of_big_int", "float_of_big_int", "and_big_int", "or_big_int", "xor_big_int", "shift_left_big_int", "shift_right_big_int", "shift_right_towards_zero_big_int", "extract_big_int"
    ],
    'Z': [
        "zero", "one", "minus_one", "of_int", "of_int32", "of_int64", "of_nativeint", "of_float", "of_string", "of_substring", "of_string_base", "of_substring_base", "succ", "pred", "abs", "neg", "add", "sub", "mul", "div", "rem", "div_rem", "cdiv", "fdiv", "ediv_rem", "ediv", "erem", "divexact", "logand", "logor", "logxor", "lognot", "shift_left", "shift_right", "shift_right_trunc", "numbits", "trailing_zeros", "testbit", "popcount", "hamdist", "to_int", "to_int32", "to_int64", "to_nativeint", "to_float", "to_string", "format", "fits_int", "fits_int32", "fits_int64", "fits_nativeint", "print", "output", "sprint", "bprint", "pp_print", "compare", "equal", "leq", "geq", "lt", "gt", "sign", "min", "max", "is_even", "is_odd", "hash", "gcd", "gcdext", "lcm", "powm", "powm_sec", "invert", "probab_prime", "nextprime", "pow", "sqrt", "sqrt_rem", "root", "perfect_power", "perfect_square", "log2", "log2up", "size", "extract", "signed_extract", "to_bits", "of_bits", "version"
    ],
}

if (compare_versions(version, "4.07.0") >= 0) {
    MODULE_HINT["Array"].push(...["to_seq", "to_seqi", "of_seq"]);
    MODULE_HINT["ArrayLabels"].push(...["to_seq", "to_seqi", "of_seq"]);
    MODULE_HINT["ArrayLabels"].push(...["to_seq", "to_seqi", "add_seq", "of_seq"]);
    MODULE_HINT["Bytes"].push(...["to_seq", "to_seqi", "of_seq"]);
    MODULE_HINT["BytesLabels"].push(...["to_seq", "to_seqi", "of_seq"]);
    MODULE_HINT["Hashtbl"].push(...["to_seq", "to_seq_keys", "to_seq_values", "add_seq", "replace_seq", "of_seq"]);
    MODULE_HINT["List"].push(...["to_seq", "of_seq"]);
    MODULE_HINT["ListLabels"].push(...["to_seq", "of_seq"]);
    MODULE_HINT["Queue"].push(...["to_seq", "add_seq", "of_seq"]);
    MODULE_HINT["Stack"].push(...["to_seq", "add_seq", "of_seq"]);
    MODULE_HINT["String"].push(...["to_seq", "to_seqi", "of_seq"]);
    MODULE_HINT["StringLabels"].push(...["to_seq", "to_seqi", "of_seq"]);
}
if (compare_versions(version, "4.08.0") >= 0) {
    MODULE_HINT["Buffer"].push(...["add_uint8", "add_int8", "add_uint16_ne", "add_uint16_be", "add_uint16_le", "add_int16_ne", "add_int16_be", "add_int16_le", "add_int32_ne", "add_int32_be", "add_int32_le", "add_int64_ne", "add_int64_be", "add_int64_le"]);
    MODULE_HINT["Bytes"].push(...["get_uint8", "get_int8", "get_uint16_ne", "get_uint16_be", "get_uint16_le", "get_int16_ne", "get_int16_be", "get_int16_le", "get_int32_ne", "get_int32_be", "get_int32_le", "get_int64_ne", "get_int64_be", "get_int64_le", "set_uint8", "set_int8", "set_uint16_ne", "set_uint16_be", "set_uint16_le", "set_int16_ne", "set_int16_be", "set_int16_le", "set_int32_ne", "set_int32_be", "set_int32_le", "set_int64_ne", "set_int64_be", "set_int64_le"]);
    MODULE_HINT["BytesLabels"].push(...["get_uint8", "get_int8", "get_uint16_ne", "get_uint16_be", "get_uint16_le", "get_int16_ne", "get_int16_be", "get_int16_le", "get_int32_ne", "get_int32_be", "get_int32_le", "get_int64_ne", "get_int64_be", "get_int64_le", "set_uint8", "set_int8", "set_uint16_ne", "set_uint16_be", "set_uint16_le", "set_int16_ne", "set_int16_be", "set_int16_le", "set_int32_ne", "set_int32_be", "set_int32_le", "set_int64_ne", "set_int64_be", "set_int64_le"]);
    MODULE_HINT["Filename"].push(...["chop_suffix_opt"]);
    MODULE_HINT["Float"].push(...["zero", "one", "minus_one", "fma", "succ", "pred", "is_finite", "is_infinite", "is_nan", "is_integer", "trunc", "round", "next_after", "sign_bit", "min", "max", "min_max", "min_num", "max_num", "min_max_num"]);
    MODULE_HINT["Int32"].push(...["unsigned_div", "unsigned_rem", "unsigned_to_int", "unsigned_compare"]);
    MODULE_HINT["Int64"].push(...["unsigned_div", "unsigned_rem", "unsigned_to_int", "unsigned_compare"]);
    MODULE_HINT["List"].push(...["filter_map"]);
    MODULE_HINT["ListLabels"].push(...["filter_map"]);
    MODULE_HINT["Nativeint"].push(...["unsigned_div", "unsigned_rem", "unsigned_to_int", "unsigned_compare"]);
    MODULE_HINT["Queue"].push(...["take_opt", "peek_opt"]);
    MODULE_HINT["Stack"].push(...["pop_opt", "top_opt"]);
}
if (compare_versions(version, "4.09.0") >= 0) {
    MODULE_HINT["Printexc"].push(...["to_string_default", "use_printers"]);
}
if (compare_versions(version, "4.10.0") >= 0) {
    MODULE_HINT["Filename"].push(...["null", "quote_command"]);
    MODULE_HINT["List"].push(...["concat_map", "find_map"]);
    MODULE_HINT["ListLabels"].push(...["concat_map", "find_map"]);
}
if (compare_versions(version, "4.11.0") >= 0) {
    MODULE_HINT["Array"].push(...["for_all2", "exists2"]);
    MODULE_HINT["ArrayLabels"].push(...["for_all2", "exists2"]);
    MODULE_HINT["Lexing"].push(...["set_position", "set_filename"]);
    MODULE_HINT["List"].push(...["fold_left_map", "filteri"]);
    MODULE_HINT["ListLabels"].push(...["fold_left_map", "filteri"]);
    MODULE_HINT["Printexc"].push(...["default_uncaught_exception_handler"]);
    MODULE_HINT["Printf"].push(...["ibprintf", "ikbprintf"]);
    MODULE_HINT["Seq"].push(...["cons", "append", "unfold"]);
}
if (compare_versions(version, "4.12.0") >= 0) {
    MODULE_HINT["Hashtbl"].push(...["rebuild"]);
    MODULE_HINT["List"].push(...["equal", "compare", "partition_map"]);
    MODULE_HINT["ListLabels"].push(...["equal", "compare", "partition_map"]);
    MODULE_HINT["Printexc"].push(...["raw_backtrace_entries", "backtrace_slots_of_raw_entry"]);
}
if (compare_versions(version, "4.13.0") >= 0) {
    MODULE_HINT["Array"].push(...["fold_left_map", "find_opt", "find_map", "split", "combine"]);
    MODULE_HINT["ArrayLabels"].push(...["fold_left_map", "find_opt", "find_map", "split", "combine"]);
    MODULE_HINT["Bytes"].push(...["fold_left", "fold_right", "for_all", "exists", "starts_with", "ends_with", "split_on_char"]);
    MODULE_HINT["BytesLabels"].push(...["fold_left", "fold_right", "for_all", "exists", "starts_with", "ends_with", "split_on_char"]);
    MODULE_HINT["Float"].push(...["cbrt", "exp2", "log2", "acosh", "asinh", "atanh", "erf", "erc"]);
    MODULE_HINT["Format"].push(...["pp_print_bytes", "print_bytes"]);
    MODULE_HINT["Int"].push(...["min", "max"]);
    MODULE_HINT["Int32"].push(...["min", "max"]);
    MODULE_HINT["Int64"].push(...["min", "max"]);
    MODULE_HINT["Lazy"].push(...["map", "map_val"]);
    MODULE_HINT["Nativeint"].push(...["min", "max"]);
    MODULE_HINT["Random"].push(...["full_int"]);
    MODULE_HINT["Seq"].push(...["concat", "concat_map"]);
    MODULE_HINT["String"].push(...["empty", "of_bytes", "to_bytes", "cat", "starts_with", "ends_with", "fold_left", "fold_right", "for_all", "exists", "get_uint8", "get_int8", "get_uint16_ne", "get_uint16_be", "get_uint16_le", "get_int16_ne", "get_int16_be", "get_int16_le", "get_int32_ne", "get_int32_be", "get_int32_le", "get_int64_ne", "get_int64_be", "get_int64_le"]);
    MODULE_HINT["StringLabels"].push(...["empty", "of_bytes", "to_bytes", "cat", "starts_with", "ends_with", "fold_left", "fold_right", "for_all", "exists", "get_uint8", "get_int8", "get_uint16_ne", "get_uint16_be", "get_uint16_le", "get_int16_ne", "get_int16_be", "get_int16_le", "get_int32_ne", "get_int32_be", "get_int32_le", "get_int64_ne", "get_int64_be", "get_int64_le"]);
    MODULE_HINT["Sys"].push(...["mkdir", "rmdir"]);
}


// Add module names to autocomplete
MODULE_HINT["Base"].push(...Object.keys(MODULE_HINT).slice(1));

/**
* Compare two OCaml versions
* This function assumes that all versions have the format x.y.z
* @param {string} version A
* @param {string} version B
* @return {number} 1 if A > B, -1 if A < B, 0 if A == B
*/
function compare_versions(a, b) {
    let a_components = a.split(".");
    let b_components = b.split(".");
    for (let i = 0; i < a_components.length; i++) {
        if (parseInt(a_components[i]) > parseInt(b_components[i])) return 1;
        if (parseInt(a_components[i]) < parseInt(b_components[i])) return -1;
    }
    return 0;
}


/**
 * Change font size of editor or toplevel, and apply the changes in memory.
 * @param {string} type - The font to change (editor or toplevel)
 * @param {number} change - The change to apply
 * @return {void} Nothing
 */
function change_font_size(type, change) {
    let r = document.querySelector(':root')
    let value = parseFloat(r.style.getPropertyValue('--'+type+"-font-size").slice(0, -2)) + change;
    r.style.setProperty('--'+type+'-font-size', value + "em");
    if (type=='editor'){ // If editor, need to change the hint font size
        r.style.setProperty('--hint-font-size', (value*0.8) + "em");
    }
    localStorage.setItem("betterocaml-text-"+type, value + "em")
}

/**
 * Clean code before execution or processing (remove comments and split command)
 * @param {string} content - Code to clean
 * @return {string[]} - List that contains all codes to execute
 */
let clean_content = function (content) {
    return content.replace(COMMENT_REGEX, '').match(CODE_SEPARATOR_REGEX)
}

/**
 * Auto scroll down output interpreter
 */
function autoscroll_output() {
    let container = document.getElementById("toplevel-container");
    container.scrollTop = container.scrollHeight;
}

// From https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

/**
 * Execute the command under the cursor, and move the cursor to the next one
 * @param {OCamlEditor} instance - Editor
 * @return {void} Nothing
 */
let exec_last = function (instance) {
    autosave_editor(instance.id);
    let state = instance.view.state;
    let last_line = phrase_end_line(state);
    if (last_line === null) return;
    let beforecur = state.sliceDoc(0, last_line.to);
    let aftercur = state.sliceDoc(last_line.to);
    let command = clean_content(beforecur).slice(-1)[0];
    let allAfter = clean_content(aftercur);
    if (allAfter!=null && allAfter.length>0) {
        let possibleNext = [...aftercur.matchAll(escapeRegExp(allAfter[0]))];
        if (possibleNext.length>0) {
            let pos = possibleNext[0].index + beforecur.length + allAfter[0].length;
            instance.view.dispatch({selection: {anchor: pos}, scrollIntoView: true});
        }
    }
    executecallback.execute("toplevel", command);
    autoscroll_output();
};

/**
 * Execute all the code in the editor
 * @param {OCamlEditor} instance - Editor
 * @return {void} Nothing
 */
let exec_all = function (instance) {
    autosave_editor(instance.id)
    let commands = clean_content(instance.getValue());
    for (let commandsKey in commands) {
//        setTimeout(function () {
            executecallback.execute("toplevel", commands[commandsKey]);
//        }, 200);
    }
    autoscroll_output();
    update_pfs(instance);
};

/**
 * Save the file, asking for a name if it has none yet
 * @param {OCamlEditor} instance - Editor
 * @return {void} Nothing
 */
function save(instance) {
    if (instance.name == "untitled.ml") {
        document.getElementById('saveas').showModal();
    } else {
        program_save(instance);
    }
}

/**
 * Save the file with the name typed in the "Save as" dialog
 * @param {OCamlEditor} instance - Editor
 * @return {void} Nothing
 */
function name_and_save(instance) {
    let name = document.getElementById('saveas_text').value.trim();
    if (name === "") name = "untitled.ml";
    else if (!name.endsWith(".ml")) name += ".ml";
    instance.name = name;
    change_name(instance.id, name);
    document.getElementById('saveas_text').value = "";
    program_save(instance);
}

/**
 * Save the file (download it)
 * @param {OCamlEditor} instance - Editor
 * @return {void} Nothing
 */
let program_save = function (instance) {
    let blob = new Blob([instance.getValue()], {type: 'text/x-ocaml'});
    let link = document.createElement("a");
    link.download = instance.name;
    link.href = URL.createObjectURL(blob);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    show_toast('File saved');
    instance.is_saved = true;
    localStorage.removeItem("betterocaml-autosave-" + instance.id);
    update_pfs(instance);
}

/**
 * Open a file in a new editor, replacing the first editor if it is still empty
 * @param {string} name - File name
 * @param {string} contents - File contents
 * @return {OCamlEditor} The new editor
 */
function open_contents(name, contents) {
    let ids = Object.keys(editors);
    let first = editors[ids[0]];
    let replace = ids.length === 1 && first.name === "untitled.ml" && first.getValue() === "";
    let editor = new_editor(name);
    editor.setValue(contents);
    editor.is_saved = true;
    update_pfs(editor);
    if (replace) remove_editor(first.id);
    return editor;
}

/**
 * Open a file in a new editor
 * @param {File} file - The file
 */
function open_file(file) {
    let reader = new FileReader();
    reader.onload = e => open_contents(file.name, e.target.result);
    reader.readAsText(file);
}

/**
 * File input handler: open the chosen file
 * @param e - Change event
 */
function readSingleFile(e) {
    let file = e.target.files[0];
    if (file) open_file(file);
    e.target.value = ""; // The same file can be opened again
}

/**
 * Editor drop handler : new editor with the dropped file
 * @param e - Drop event
 * @return {boolean} true if a file was dropped
 */
function editor_drop(e) {
    if (e.dataTransfer.files.length === 0) return false;
    e.preventDefault();
    e.stopPropagation();
    open_file(e.dataTransfer.files[0]);
    return true;
}

/**
 * Sort the elements of the list which started with prefix
 * @param {string[]} l - the list to sort
 * @param {string} w - the prefix
 * @return {string[]} sorted list
 */
let includer = function (l, w) {
    let r = [];
    for (var i = 0; i < l.length; i++) {
        if (l[i].startsWith(w)) {
            r.push(l[i]);
        }
    }
    return r;
}

// Editor tabs

let current_editor_id = null;

/**
 * Create an editor in a new tab, with the next free id
 * @param {string} name - File name
 * @return {OCamlEditor} The new editor, also in the editors list
 */
function new_editor(name = "untitled.ml") {
    let ids = Object.keys(editors).map(x => +x);
    let id = ids.length > 0 ? Math.max(...ids) + 1 : 0;
    editors[id] = create_editor(id, name);
    select_editor(id);
    return editors[id];
}

/**
 * Create the editor instance and its tab
 * @param id - Editor id
 * @param name - Editor name
 * @return {OCamlEditor} Editor instance
 */
function create_editor(id, name) {
    let tab = document.createElement("div");
    tab.id = "tab_" + id;
    tab.className = "tab";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "editor_tab_" + id);
    tab.tabIndex = 0;
    let label = document.createElement("span");
    label.className = "tab-name";
    label.textContent = name;
    let close = document.createElement("button");
    close.type = "button";
    close.className = "tab-close";
    close.setAttribute("aria-label", "Close " + name);
    close.innerHTML = '<i class="material-icons" aria-hidden="true">close</i>';
    close.addEventListener("click", e => {
        e.stopPropagation();
        remove_editor(id);
    });
    tab.append(label, close);
    tab.addEventListener("click", () => select_editor(id));
    tab.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select_editor(id);
        }
    });
    document.getElementById("editor-tabs").appendChild(tab);

    let pane = document.createElement("div");
    pane.id = "editor_tab_" + id;
    pane.className = "code-box";
    pane.setAttribute("role", "tabpanel");
    pane.hidden = true;
    document.getElementById("editorCollection").appendChild(pane);

    return new OCamlEditor(id, name, pane);
}

/**
 * Get the id of the editor shown
 * @return {number} focused editor id
 */
function current_editor() {
    return current_editor_id;
}

/**
 * Show the editor
 * @param id - editor id in editors list
 */
function select_editor(id) {
    current_editor_id = id;
    for (const tab of document.querySelectorAll("#editor-tabs .tab")) {
        let selected = tab.id === "tab_" + id;
        tab.setAttribute("aria-selected", String(selected));
        if (selected) tab.scrollIntoView({block: "nearest", inline: "nearest"});
    }
    for (const pane of document.querySelectorAll("#editorCollection .code-box")) {
        pane.hidden = pane.id !== "editor_tab_" + id;
    }
    if (editors[id]) editors[id].view.requestMeasure();
}

/**
 * Remove the tab and the editor of the page
 * @param id - editor id in editors list
 */
function delete_editor(id) {
    localStorage.removeItem("betterocaml-autosave-" + id);
    document.getElementById("tab_" + id).remove();
    document.getElementById("editor_tab_" + id).remove();
}

/**
 * Change the name of an editor tab
 * @param id - editor id in editors list
 * @param name - new name
 */
function change_name(id, name) {
    let tab = document.getElementById("tab_" + id);
    tab.querySelector(".tab-name").textContent = name;
    tab.querySelector(".tab-close").setAttribute("aria-label", "Close " + name);
}

/**
 * Change the layout: editor and toplevel side by side (H) or one below the other (V).
 * Small screens always use V, without changing the saved setting.
 * @param resize_obj
 * @param {string} type - type to change (H or V)
 */
function change_resize_bar(resize_obj, type) {
    localStorage.setItem("betterocaml-resize-bar", type);
    if (window.matchMedia("(max-width: 600px)").matches) type = "V";
    resize_obj.resizer.type = type;
    resize_obj.resizer.node.setAttribute('data-resizer-type', type);
    document.getElementById("workspace").classList.toggle("stacked", type === "V");
}

/**
 * Close an editor (the last one stays)
 * @param id
 */
function remove_editor(id) {
    if (Object.keys(editors).length <= 1) return;
    if (!editors[id].is_saved && !confirm(editors[id].name + " is not saved, close it anyway?")) return;
    delete editors[id];
    delete_editor(id);
    if (id == current_editor_id) {
        select_editor(Math.max(...Object.keys(editors).map(x => +x)));
    }
}

// Configuration

/**
 * Change a configuration element
 * @param name - configuration name
 * @param value - new value
 * @param editors - editors list
 */
function change_configuration(name, value, editors) {
    localStorage.setItem(name, value);
    switch (name) {
        case 'betterocaml-theme':
            let href = document.getElementById('css_theme').href;
            // The editors use the colors of this file, nothing else to update
            document.getElementById('css_theme').href = href.replace(/[^\/]+$/g, '') + value + ".css"
            break;
        case 'betterocaml-autocomplete':
            for (let i in editors) {
                editors[i].ext_autocomplete = Boolean(value);
            }
            break;
        case 'betterocaml-merlin':
            if (value) start_merlin();
            else stop_merlin();
            break;
        case 'betterocaml-merlin-hover':
            // Read by the hover tooltip each time
            break;
        default:
            console.log("no config");
    }

}

/**
 * Local storage init
 */
function init_local_storage() {
    let initial_parameter = {
        'betterocaml-theme': "material",
        'betterocaml-autocomplete' : "true",
        'betterocaml-merlin' : "true",
        'betterocaml-merlin-hover' : "true",
        'betterocaml-text-box_1' : "1.2em",
        'betterocaml-text-box_2' : "1.2em",
        'betterocaml-resize-bar' : "H",
    }
    for (const [key, value] of Object.entries(initial_parameter)) {
        if (localStorage.getItem(key) == null){
            localStorage.setItem(key,value);
        }
    }

}

/**
 * Show a short message at the bottom of the page
 * @param {string} text - Message
 */
function show_toast(text) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
    document.getElementById("toasts").appendChild(toast);
    setTimeout(() => toast.classList.add("toast-hide"), 3000);
    setTimeout(() => toast.remove(), 3500);
}

// Autosave

/**
 * Save editor content in local storage
 * @param editor_id
 */
function autosave_editor(editor_id) {
    let content = {name: editors[editor_id].name, text: editors[editor_id].getValue()};
    localStorage.setItem("betterocaml-autosave-" + editor_id, JSON.stringify(content));
}

/**
 * Clear autosaved elements
 */
function clear_autosave() {
    for (const [key, _] of Object.entries(localStorage)) {
        if (key.split("-").slice(-2,-1)[0] === "autosave"){
            localStorage.removeItem(key)
        }
    }
}

/**
 * Get the number of file autosaved in local storage
 * @return {number} autosave number
 */
function autosave_number() {
    let nb = 0
    for (const [key, _] of Object.entries(localStorage)) {
        if (key.split("-").slice(-2,-1)[0] === "autosave"){
            nb+=1
        }
    }
    return nb
}

/**
 * Restore autosaved editor in the actual session
 */
function restore_editors() {
    for (const [key, value] of Object.entries(localStorage).reverse()) {
        if (key.split("-").slice(-2,-1)[0] === "autosave"){
            let editor_value = JSON.parse(value);
            let editor = new_editor(editor_value.name);
            editor.setValue(editor_value.text);
            update_pfs(editor);
        }
    }
}


function update_pfs(editor) {
    executecallback.update(editor.name, editor.getValue())
    executecallback.execute("internal", "#directory \"/static\""); // Register files
}
