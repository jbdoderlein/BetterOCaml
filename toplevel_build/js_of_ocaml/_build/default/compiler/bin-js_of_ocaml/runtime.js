//# 1 "+array.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Array

//Provides: caml_array_sub mutable
function caml_array_sub (a, i, len) {
  var a2 = new Array(len+1);
  a2[0]=0;
  for(var i2 = 1, i1= i+1; i2 <= len; i2++,i1++ ){
    a2[i2]=a[i1];
  }
  return a2;
}

//Provides: caml_array_append mutable
function caml_array_append(a1, a2) {
  var l1 = a1.length, l2 = a2.length;
  var l = l1+l2-1
  var a = new Array(l);
  a[0] = 0;
  var i = 1,j = 1;
  for(;i<l1;i++) a[i]=a1[i];
  for(;i<l;i++,j++) a[i]=a2[j];
  return a;
}

//Provides: caml_array_concat mutable
function caml_array_concat(l) {
  var a = [0];
  while (l !== 0) {
    var b = l[1];
    for (var i = 1; i < b.length; i++) a.push(b[i]);
    l = l[2];
  }
  return a;
}

//Provides: caml_array_blit
function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for (var j = 1; j <= len; j++) a2[i2 + j] = a1[i1 + j];
  } else {
    for (var j = len; j >= 1; j--) a2[i2 + j] = a1[i1 + j];
  };
  return 0;
}

//Provides: caml_floatarray_blit
function caml_floatarray_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for (var j = 1; j <= len; j++) a2[i2 + j] = a1[i1 + j];
  } else {
    for (var j = len; j >= 1; j--) a2[i2 + j] = a1[i1 + j];
  };
  return 0;
}

///////////// Pervasive
//Provides: caml_array_set (mutable, const, const)
//Requires: caml_array_bound_error
function caml_array_set (array, index, newval) {
  if ((index < 0) || (index >= array.length - 1)) caml_array_bound_error();
  array[index+1]=newval; return 0;
}

//Provides: caml_array_get mutable (const, const)
//Requires: caml_array_bound_error
function caml_array_get (array, index) {
  if ((index < 0) || (index >= array.length - 1)) caml_array_bound_error();
  return array[index+1];
}

//Provides: caml_array_fill
function caml_array_fill(array, ofs, len, v){
  for(var i = 0; i < len; i++){
    array[ofs+i+1] = v;
  }
  return 0;
}

//Provides: caml_check_bound (const, const)
//Requires: caml_array_bound_error
function caml_check_bound (array, index) {
  if (index >>> 0 >= array.length - 1) caml_array_bound_error();
  return array;
}

//Provides: caml_make_vect const (const, const)
//Requires: caml_array_bound_error
function caml_make_vect (len, init) {
  if (len < 0) caml_array_bound_error();
  var len = len + 1 | 0;
  var b = new Array(len);
  b[0]=0;
  for (var i = 1; i < len; i++) b[i] = init;
  return b;
}

//Provides: caml_make_float_vect const (const)
//Requires: caml_array_bound_error
function caml_make_float_vect(len){
  if (len < 0) caml_array_bound_error();
  var len = len + 1 | 0;
  var b = new Array(len);
  b[0]=254;
  for (var i = 1; i < len; i++) b[i] = 0;
  return b
}
//Provides: caml_floatarray_create const (const)
//Requires: caml_array_bound_error
function caml_floatarray_create(len){
  if (len < 0) caml_array_bound_error();
  var len = len + 1 | 0;
  var b = new Array(len);
  b[0]=254;
  for (var i = 1; i < len; i++) b[i] = 0;
  return b
}

//# 1 "+backtrace.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_ml_debug_info_status const
function caml_ml_debug_info_status () { return 0; }
//Provides: caml_backtrace_status const
function caml_backtrace_status () { return 0; }
//Provides: caml_get_exception_backtrace const
function caml_get_exception_backtrace () { return 0; }
//Provides: caml_get_exception_raw_backtrace const
function caml_get_exception_raw_backtrace () { return [0]; }
//Provides: caml_record_backtrace
function caml_record_backtrace () { return 0; }
//Provides: caml_convert_raw_backtrace const
function caml_convert_raw_backtrace () { return [0]; }
//Provides: caml_raw_backtrace_length
function caml_raw_backtrace_length() { return 0; }
//Provides: caml_raw_backtrace_next_slot
function caml_raw_backtrace_next_slot() { return 0 }
//Provides: caml_raw_backtrace_slot
//Requires: caml_invalid_argument
function caml_raw_backtrace_slot () {
  caml_invalid_argument("Printexc.get_raw_backtrace_slot: index out of bounds");
}
//Provides: caml_restore_raw_backtrace
function caml_restore_raw_backtrace(exn, bt) { return 0 }
//Provides: caml_get_current_callstack const
function caml_get_current_callstack () { return [0]; }

//Provides: caml_convert_raw_backtrace_slot
//Requires: caml_failwith
function caml_convert_raw_backtrace_slot(){
  caml_failwith("caml_convert_raw_backtrace_slot");
}

//# 1 "+bigarray.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2014 Jérôme Vouillon, Hugo Heuzard, Andy Ray
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
//
// Bigarray.
//
// - all bigarray types including Int64 and Complex.
// - fortran + c layouts
// - sub/slice/reshape
// - retain fast path for 1d array access

//Provides: caml_ba_init const
function caml_ba_init() {
  return 0;
}

//Provides: caml_ba_get_size
//Requires: caml_invalid_argument
function caml_ba_get_size(dims) {
  var n_dims = dims.length;
  var size = 1;
  for (var i = 0; i < n_dims; i++) {
    if (dims[i] < 0)
      caml_invalid_argument("Bigarray.create: negative dimension");
    size = size * dims[i];
  }
  return size;
}

//Provides: caml_ba_get_size_per_element
function caml_ba_get_size_per_element(kind){
  switch(kind){
  case 7: case 10: case 11: return 2;
  default: return 1;
  }
}

//Provides: caml_ba_create_buffer
//Requires: caml_ba_get_size_per_element
//Requires: caml_invalid_argument
function caml_ba_create_buffer(kind, size){
  var g = joo_global_object;
  var view;
  switch(kind){
  case 0:  view = g.Float32Array; break;
  case 1:  view = g.Float64Array; break;
  case 2:  view = g.Int8Array; break;
  case 3:  view = g.Uint8Array; break;
  case 4:  view = g.Int16Array; break;
  case 5:  view = g.Uint16Array; break;
  case 6:  view = g.Int32Array; break;
  case 7:  view = g.Int32Array; break;
  case 8:  view = g.Int32Array; break;
  case 9:  view = g.Int32Array; break;
  case 10: view = g.Float32Array; break;
  case 11: view = g.Float64Array; break;
  case 12: view = g.Uint8Array; break;
  }
  if (!view) caml_invalid_argument("Bigarray.create: unsupported kind");
  var data = new view(size * caml_ba_get_size_per_element(kind));
  return data;
}

//Provides: caml_ba_custom_name
//Version: < 4.11
var caml_ba_custom_name = "_bigarray"

//Provides: caml_ba_custom_name
//Version: >= 4.11
var caml_ba_custom_name = "_bigarr02"

//Provides: Ml_Bigarray
//Requires: caml_array_bound_error, caml_invalid_argument, caml_ba_custom_name
//Requires: caml_int64_create_lo_hi, caml_int64_hi32, caml_int64_lo32
function Ml_Bigarray (kind, layout, dims, buffer) {

  this.kind   = kind ;
  this.layout = layout;
  this.dims   = dims;
  this.data = buffer;
}

Ml_Bigarray.prototype.caml_custom = caml_ba_custom_name;

Ml_Bigarray.prototype.offset = function (arg) {
  var ofs = 0;
  if(typeof arg === "number") arg = [arg];
  if (! (arg instanceof Array)) caml_invalid_argument("bigarray.js: invalid offset");
  if (this.dims.length != arg.length)
    caml_invalid_argument("Bigarray.get/set: bad number of dimensions");
  if(this.layout == 0 /* c_layout */) {
    for (var i = 0; i < this.dims.length; i++) {
      if (arg[i] < 0 || arg[i] >= this.dims[i])
        caml_array_bound_error();
      ofs = (ofs * this.dims[i]) + arg[i];
    }
  } else {
    for (var i = this.dims.length - 1; i >= 0; i--) {
      if (arg[i] < 1 || arg[i] > this.dims[i]){
        caml_array_bound_error();
      }
      ofs = (ofs * this.dims[i]) + (arg[i] - 1);
    }
  }
  return ofs;
}

Ml_Bigarray.prototype.get = function (ofs) {
  switch(this.kind){
  case 7:
    // Int64
    var l = this.data[ofs * 2 + 0];
    var h = this.data[ofs * 2 + 1];
    return caml_int64_create_lo_hi(l,h);
  case 10: case 11:
    // Complex32, Complex64
    var r = this.data[ofs * 2 + 0];
    var i = this.data[ofs * 2 + 1];
    return [254, r, i];
  default:
    return this.data[ofs]
  }
}

Ml_Bigarray.prototype.set = function (ofs,v) {
  switch(this.kind){
  case 7:
    // Int64
    this.data[ofs * 2 + 0] = caml_int64_lo32(v);
    this.data[ofs * 2 + 1] = caml_int64_hi32(v);
    break;
  case 10: case 11:
    // Complex32, Complex64
    this.data[ofs * 2 + 0] = v[1];
    this.data[ofs * 2 + 1] = v[2];
    break;
  default:
    this.data[ofs] = v;
    break;
  }
  return 0
}


Ml_Bigarray.prototype.fill = function (v) {
  switch(this.kind){
  case 7:
    // Int64
    var a = caml_int64_lo32(v);
    var b = caml_int64_hi32(v);
    if(a == b){
      this.data.fill(a);
    }
    else {
      for(var i = 0; i<this.data.length; i++){
        this.data[i] = (i%2 == 0) ? a : b;
      }
    }
    break;
  case 10: case 11:
    // Complex32, Complex64
    var im = v[1];
    var re = v[2];
    if(im == re){
      this.data.fill(im);
    }
    else {
      for(var i = 0; i<this.data.length; i++){
        this.data[i] = (i%2 == 0) ? im : re;
      }
    }
    break;
  default:
    this.data.fill(v);
    break;
  }
}


Ml_Bigarray.prototype.compare = function (b, total) {
  if (this.layout != b.layout || this.kind != b.kind) {
    var k1 = this.kind | (this.layout << 8);
    var k2 =    b.kind | (b.layout << 8);
    return k2 - k1;
  }
  if (this.dims.length != b.dims.length) {
    return b.dims.length - this.dims.length;
  }
  for (var i = 0; i < this.dims.length; i++)
    if (this.dims[i] != b.dims[i])
      return (this.dims[i] < b.dims[i]) ? -1 : 1;
  switch (this.kind) {
  case 0:
  case 1:
  case 10:
  case 11:
    // Floats
    var x, y;
    for (var i = 0; i < this.data.length; i++) {
      x = this.data[i];
      y = b.data[i];
      if (x < y)
        return -1;
      if (x > y)
        return 1;
      if (x != y) {
        if (!total) return NaN;
        if (x == x) return 1;
        if (y == y) return -1;
      }
    }
    break;
  case 7:
    // Int64
    for (var i = 0; i < this.data.length; i+=2) {
      // Check highest bits first
      if (this.data[i+1] < b.data[i+1])
        return -1;
      if (this.data[i+1] > b.data[i+1])
        return 1;
      if ((this.data[i] >>> 0) < (b.data[i] >>> 0))
        return -1;
      if ((this.data[i] >>> 0) > (b.data[i] >>> 0))
        return 1;
    }
    break;
  case 2:
  case 3:
  case 4:
  case 5:
  case 6:
  case 8:
  case 9:
  case 12:
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i] < b.data[i])
        return -1;
      if (this.data[i] > b.data[i])
        return 1;
    }
    break;
  }
  return 0;
}

//Provides: Ml_Bigarray_c_1_1
//Requires: Ml_Bigarray, caml_array_bound_error, caml_invalid_argument
function Ml_Bigarray_c_1_1(kind, layout, dims, buffer) {
  this.kind   = kind ;
  this.layout = layout;
  this.dims   = dims;
  this.data   = buffer;
}

Ml_Bigarray_c_1_1.prototype = new Ml_Bigarray()
Ml_Bigarray_c_1_1.prototype.offset = function (arg) {
  if(typeof arg !== "number"){
    if((arg instanceof Array) && arg.length == 1)
      arg = arg[0];
    else caml_invalid_argument("Ml_Bigarray_c_1_1.offset");
  }
  if (arg < 0 || arg >= this.dims[0])
    caml_array_bound_error();
  return arg;
}

Ml_Bigarray_c_1_1.prototype.get = function (ofs) {
  return this.data[ofs];
}

Ml_Bigarray_c_1_1.prototype.set = function (ofs,v) {
  this.data[ofs] = v;
  return 0
}

Ml_Bigarray_c_1_1.prototype.fill = function (v) {
  this.data.fill(v);
  return 0
}

//Provides: caml_ba_compare
function caml_ba_compare(a,b,total){
  return a.compare(b,total)
}

//Provides: caml_ba_create_unsafe
//Requires: Ml_Bigarray, Ml_Bigarray_c_1_1, caml_ba_get_size, caml_ba_get_size_per_element
//Requires: caml_invalid_argument
function caml_ba_create_unsafe(kind, layout, dims, data){
  var size_per_element = caml_ba_get_size_per_element(kind);
  if(caml_ba_get_size(dims) * size_per_element != data.length) {
    caml_invalid_argument("length doesn't match dims");
  }
  if(layout == 0 && // c_layout
     dims.length == 1 && // Array1
     size_per_element == 1) // 1-to-1 mapping
    return new Ml_Bigarray_c_1_1(kind, layout, dims, data);
  return new Ml_Bigarray(kind, layout, dims, data);

}


//Provides: caml_ba_create
//Requires: caml_js_from_array
//Requires: caml_ba_get_size, caml_ba_create_unsafe
//Requires: caml_ba_create_buffer
function caml_ba_create(kind, layout, dims_ml) {
  var dims = caml_js_from_array(dims_ml);
  var data = caml_ba_create_buffer(kind, caml_ba_get_size(dims));
  return caml_ba_create_unsafe(kind, layout, dims, data);
}

//Provides: caml_ba_change_layout
//Requires: caml_ba_create_unsafe
function caml_ba_change_layout(ba, layout) {
  if(ba.layout == layout) return ba;
  var new_dims = []
  for(var i = 0; i < ba.dims.length; i++) new_dims[i] = ba.dims[ba.dims.length - i - 1];
  return caml_ba_create_unsafe(ba.kind, layout, new_dims, ba.data);
}

//Provides: caml_ba_kind
function caml_ba_kind(ba) {
  return ba.kind;
}

//Provides: caml_ba_layout
function caml_ba_layout(ba) {
  return ba.layout;
}

//Provides: caml_ba_num_dims
function caml_ba_num_dims(ba) {
  return ba.dims.length;
}

//Provides: caml_ba_dim
//Requires: caml_invalid_argument
function caml_ba_dim(ba, i) {
  if (i < 0 || i >= ba.dims.length)
    caml_invalid_argument("Bigarray.dim");
  return ba.dims[i];
}

//Provides: caml_ba_dim_1
//Requires: caml_ba_dim
function caml_ba_dim_1(ba) {
  return caml_ba_dim(ba, 0);
}

//Provides: caml_ba_dim_2
//Requires: caml_ba_dim
function caml_ba_dim_2(ba) {
  return caml_ba_dim(ba, 1);
}

//Provides: caml_ba_dim_3
//Requires: caml_ba_dim
function caml_ba_dim_3(ba) {
  return caml_ba_dim(ba, 2);
}

//Provides: caml_ba_get_generic
//Requires: caml_js_from_array
function caml_ba_get_generic(ba, i) {
  var ofs = ba.offset(caml_js_from_array(i));
  return ba.get(ofs);
}

//Provides: caml_ba_uint8_get16
//Requires: caml_array_bound_error
function caml_ba_uint8_get16(ba, i0) {
  var ofs = ba.offset(i0);
  if(ofs + 1 >= ba.data.length) caml_array_bound_error();
  var b1 = ba.get(ofs);
  var b2 = ba.get(ofs + 1);
  return (b1 | (b2 << 8));
}

//Provides: caml_ba_uint8_get32
//Requires: caml_array_bound_error
function caml_ba_uint8_get32(ba, i0) {
  var ofs = ba.offset(i0);
  if(ofs + 3 >= ba.data.length) caml_array_bound_error();
  var b1 = ba.get(ofs+0);
  var b2 = ba.get(ofs+1);
  var b3 = ba.get(ofs+2);
  var b4 = ba.get(ofs+3);
  return ( (b1 << 0)  |
           (b2 << 8)  |
           (b3 << 16) |
           (b4 << 24) );
}

//Provides: caml_ba_uint8_get64
//Requires: caml_array_bound_error, caml_int64_of_bytes
function caml_ba_uint8_get64(ba, i0) {
  var ofs = ba.offset(i0);
  if(ofs + 7 >= ba.data.length) caml_array_bound_error();
  var b1 = ba.get(ofs+0);
  var b2 = ba.get(ofs+1);
  var b3 = ba.get(ofs+2);
  var b4 = ba.get(ofs+3);
  var b5 = ba.get(ofs+4);
  var b6 = ba.get(ofs+5);
  var b7 = ba.get(ofs+6);
  var b8 = ba.get(ofs+7);
  return caml_int64_of_bytes([b8,b7,b6,b5,b4,b3,b2,b1]);
}

//Provides: caml_ba_get_1
function caml_ba_get_1(ba, i0) {
  return ba.get(ba.offset(i0));
}

//Provides: caml_ba_get_2
function caml_ba_get_2(ba, i0, i1) {
  return ba.get(ba.offset([i0,i1]));
}

//Provides: caml_ba_get_3
function caml_ba_get_3(ba, i0, i1, i2) {
  return ba.get(ba.offset([i0,i1,i2]));
}

//Provides: caml_ba_set_generic
//Requires: caml_js_from_array
function caml_ba_set_generic(ba, i, v) {
  ba.set(ba.offset(caml_js_from_array(i)), v);
  return 0
}

//Provides: caml_ba_uint8_set16
//Requires: caml_array_bound_error
function caml_ba_uint8_set16(ba, i0, v) {
  var ofs = ba.offset(i0);
  if(ofs + 1 >= ba.data.length) caml_array_bound_error();
  ba.set(ofs+0,  v        & 0xff);
  ba.set(ofs+1, (v >>> 8) & 0xff);
  return 0;
}

//Provides: caml_ba_uint8_set32
//Requires: caml_array_bound_error
function caml_ba_uint8_set32(ba, i0, v) {
  var ofs = ba.offset(i0);
  if(ofs + 3 >= ba.data.length) caml_array_bound_error();
  ba.set(ofs+0,  v         & 0xff);
  ba.set(ofs+1, (v >>> 8)  & 0xff);
  ba.set(ofs+2, (v >>> 16) & 0xff);
  ba.set(ofs+3, (v >>> 24) & 0xff);
  return 0;
}

//Provides: caml_ba_uint8_set64
//Requires: caml_array_bound_error, caml_int64_to_bytes
function caml_ba_uint8_set64(ba, i0, v) {
  var ofs = ba.offset(i0);
  if(ofs + 7 >= ba.data.length) caml_array_bound_error();
  var v = caml_int64_to_bytes(v);
  for(var i = 0; i < 8; i++) ba.set(ofs+i, v[7-i])
  return 0;
}

//Provides: caml_ba_set_1
function caml_ba_set_1(ba, i0, v) {
  ba.set(ba.offset(i0), v);
  return 0
}

//Provides: caml_ba_set_2
function caml_ba_set_2(ba, i0, i1, v) {
  ba.set(ba.offset([i0,i1]), v);
  return 0;
}

//Provides: caml_ba_set_3
function caml_ba_set_3(ba, i0, i1, i2, v) {
  ba.set(ba.offset([i0,i1,i2]), v);
  return 0;
}

//Provides: caml_ba_fill
function caml_ba_fill(ba, v) {
  ba.fill(v);
  return 0;
}

//Provides: caml_ba_blit
//Requires: caml_invalid_argument
function caml_ba_blit(src, dst) {
  if (dst.dims.length != src.dims.length)
    caml_invalid_argument("Bigarray.blit: dimension mismatch");
  for (var i = 0; i < dst.dims.length; i++)
    if (dst.dims[i] != src.dims[i])
      caml_invalid_argument("Bigarray.blit: dimension mismatch");
  dst.data.set(src.data);
  return 0;
}

//Provides: caml_ba_sub
//Requires: caml_invalid_argument, caml_ba_create_unsafe, caml_ba_get_size
//Requires: caml_ba_get_size_per_element
function caml_ba_sub(ba, ofs, len) {
  var changed_dim;
  var mul = 1;
  if (ba.layout == 0) {
    for (var i = 1; i < ba.dims.length; i++)
      mul = mul * ba.dims[i];
    changed_dim = 0;
  } else {
    for (var i = 0; i < (ba.dims.length - 1); i++)
      mul = mul * ba.dims[i];
    changed_dim = ba.dims.length - 1;
    ofs = ofs - 1;
  }
  if (ofs < 0 || len < 0 || (ofs + len) > ba.dims[changed_dim]){
    caml_invalid_argument("Bigarray.sub: bad sub-array");
  }
  var new_dims = [];
  for (var i = 0; i < ba.dims.length; i++)
    new_dims[i] = ba.dims[i];
  new_dims[changed_dim] = len;
  mul *= caml_ba_get_size_per_element(ba.kind);
  var new_data = ba.data.subarray(ofs * mul, (ofs + len) * mul);
  return caml_ba_create_unsafe(ba.kind, ba.layout, new_dims, new_data);
}

//Provides: caml_ba_slice
//Requires: caml_js_from_array, caml_ba_create_unsafe, caml_invalid_argument, caml_ba_get_size
//Requires: caml_ba_get_size_per_element
function caml_ba_slice(ba, vind) {
  vind = caml_js_from_array(vind);
  var num_inds = vind.length;
  var index = [];
  var sub_dims = [];
  var ofs;

  if (num_inds > ba.dims.length)
    caml_invalid_argument("Bigarray.slice: too many indices");

  // Compute offset and check bounds
  if (ba.layout == 0) {
    for (var i = 0; i < num_inds; i++)
      index[i] = vind[i];
    for (; i < ba.dims.length; i++)
      index[i] = 0;
    sub_dims = ba.dims.slice(num_inds);
  } else {
    for (var i = 0; i < num_inds; i++)
      index[ba.dims.length - num_inds + i] = vind[i];
    for (var i = 0; i < ba.dims.length - num_inds; i++)
      index[i] = 1;
    sub_dims = ba.dims.slice(0, ba.dims.length - num_inds);
  }
  ofs = ba.offset(index);
  var size = caml_ba_get_size(sub_dims);
  var size_per_element = caml_ba_get_size_per_element(ba.kind);
  var new_data = ba.data.subarray(ofs * size_per_element, (ofs + size) * size_per_element);
  return caml_ba_create_unsafe(ba.kind, ba.layout, sub_dims, new_data);
}

//Provides: caml_ba_reshape
//Requires: caml_js_from_array, caml_invalid_argument, caml_ba_create_unsafe, caml_ba_get_size
function caml_ba_reshape(ba, vind) {
  vind = caml_js_from_array(vind);
  var new_dim = [];
  var num_dims = vind.length;

  if (num_dims < 0 || num_dims > 16){
    caml_invalid_argument("Bigarray.reshape: bad number of dimensions");
  }
  var num_elts = 1;
  for (var i = 0; i < num_dims; i++) {
    new_dim[i] = vind[i];
    if (new_dim[i] < 0)
      caml_invalid_argument("Bigarray.reshape: negative dimension");
    num_elts = num_elts * new_dim[i];
  }

  var size = caml_ba_get_size(ba.dims);
  // Check that sizes agree
  if (num_elts != size)
    caml_invalid_argument("Bigarray.reshape: size mismatch");
  return caml_ba_create_unsafe(ba.kind, ba.layout, new_dim, ba.data);
}

//Provides: caml_ba_serialize
//Requires: caml_int64_bits_of_float, caml_int64_to_bytes
//Requires: caml_int32_bits_of_float
function caml_ba_serialize(writer, ba, sz) {
  writer.write(32, ba.dims.length);
  writer.write(32, (ba.kind | (ba.layout << 8)));
  if(ba.caml_custom == "_bigarr02")
    for(var i = 0; i < ba.dims.length; i++) {
      if(ba.dims[i] < 0xffff)
        writer.write(16, ba.dims[i]);
      else {
        writer.write(16, 0xffff);
        writer.write(32, 0);
        writer.write(32, ba.dims[i]);
      }
    }
  else
    for(var i = 0; i < ba.dims.length; i++) writer.write(32,ba.dims[i])
  switch(ba.kind){
  case 2:  //Int8Array
  case 3:  //Uint8Array
  case 12: //Uint8Array
    for(var i = 0; i < ba.data.length; i++){
      writer.write(8, ba.data[i]);
    }
    break;
  case 4:  // Int16Array
  case 5:  // Uint16Array
    for(var i = 0; i < ba.data.length; i++){
      writer.write(16, ba.data[i]);
    }
    break;
  case 6:  // Int32Array (int32)
    for(var i = 0; i < ba.data.length; i++){
      writer.write(32, ba.data[i]);
    }
    break;
  case 8:  // Int32Array (int)
  case 9:  // Int32Array (nativeint)
    writer.write(8,0);
    for(var i = 0; i < ba.data.length; i++){
      writer.write(32, ba.data[i]);
    }
    break;
  case 7:  // Int32Array (int64)
    for(var i = 0; i < ba.data.length / 2; i++){
      var b = caml_int64_to_bytes(ba.get(i));
      for (var j = 0; j < 8; j++) writer.write (8, b[j]);
    }
    break;
  case 1:  // Float64Array
    for(var i = 0; i < ba.data.length; i++){
      var b = caml_int64_to_bytes(caml_int64_bits_of_float(ba.get(i)));
      for (var j = 0; j < 8; j++) writer.write (8, b[j]);
    }
    break;
  case 0:  // Float32Array
    for(var i = 0; i < ba.data.length; i++){
      var b = caml_int32_bits_of_float(ba.get(i));
      writer.write(32, b);
    }
    break;
  case 10: // Float32Array (complex32)
    for(var i = 0; i < ba.data.length / 2; i++){
      var j = ba.get(i);
      writer.write(32, caml_int32_bits_of_float(j[1]));
      writer.write(32, caml_int32_bits_of_float(j[2]));
    }
    break;
  case 11: // Float64Array (complex64)
    for(var i = 0; i < ba.data.length / 2; i++){
      var complex = ba.get(i);
      var b = caml_int64_to_bytes(caml_int64_bits_of_float(complex[1]));
      for (var j = 0; j < 8; j++) writer.write (8, b[j]);
      var b = caml_int64_to_bytes(caml_int64_bits_of_float(complex[2]));
      for (var j = 0; j < 8; j++) writer.write (8, b[j]);
    }
    break;
  }
  sz[0] = (4 + ba.dims.length) * 4;
  sz[1] = (4 + ba.dims.length) * 8;
}

//Provides: caml_ba_deserialize
//Requires: caml_ba_create_unsafe, caml_failwith
//Requires: caml_ba_get_size
//Requires: caml_int64_of_bytes, caml_int64_float_of_bits
//Requires: caml_int32_float_of_bits
//Requires: caml_ba_create_buffer
function caml_ba_deserialize(reader, sz, name){
  var num_dims = reader.read32s();
  if (num_dims < 0 || num_dims > 16)
    caml_failwith("input_value: wrong number of bigarray dimensions");
  var tag = reader.read32s();
  var kind = tag & 0xff
  var layout = (tag >> 8) & 1;
  var dims = []
  if(name == "_bigarr02")
    for (var i = 0; i < num_dims; i++) {
      var size_dim = reader.read16u();
      if(size_dim == 0xffff){
        var size_dim_hi = reader.read32u();
        var size_dim_lo = reader.read32u();
        if(size_dim_hi != 0)
          caml_failwith("input_value: bigarray dimension overflow in 32bit");
        size_dim = size_dim_lo;
      }
      dims.push(size_dim);
    }
  else
    for (var i = 0; i < num_dims; i++) dims.push(reader.read32u());
  var size = caml_ba_get_size(dims);
  var data = caml_ba_create_buffer(kind, size);
  var ba = caml_ba_create_unsafe(kind, layout, dims, data);
  switch(kind){
  case 2:  //Int8Array
    for(var i = 0; i < size; i++){
      data[i] = reader.read8s();
    }
    break;
  case 3:  //Uint8Array
  case 12: //Uint8Array
    for(var i = 0; i < size; i++){
      data[i] = reader.read8u();
    }
    break;
  case 4:  // Int16Array
    for(var i = 0; i < size; i++){
      data[i] = reader.read16s();
    }
    break;
  case 5:  // Uint16Array
    for(var i = 0; i < size; i++){
      data[i] = reader.read16u();
    }
    break;
  case 6:  // Int32Array (int32)
    for(var i = 0; i < size; i++){
      data[i] = reader.read32s();
    }
    break;
  case 8:  // Int32Array (int)
  case 9:  // Int32Array (nativeint)
    var sixty = reader.read8u();
    if(sixty) caml_failwith("input_value: cannot read bigarray with 64-bit OCaml ints");
    for(var i = 0; i < size; i++){
      data[i] = reader.read32s();
    }
    break;
  case 7: // (int64)
    var t = new Array(8);;
    for(var i = 0; i < size; i++){
      for (var j = 0;j < 8;j++) t[j] = reader.read8u();
      var int64 = caml_int64_of_bytes(t);
      ba.set(i,int64);
    }
    break;
  case 1:  // Float64Array
    var t = new Array(8);;
    for(var i = 0; i < size; i++){
      for (var j = 0;j < 8;j++) t[j] = reader.read8u();
      var f = caml_int64_float_of_bits(caml_int64_of_bytes(t));
      ba.set(i,f);
    }
    break;
  case 0:  // Float32Array
    for(var i = 0; i < size; i++){
      var f = caml_int32_float_of_bits(reader.read32s());
      ba.set(i,f);
    }
    break;
  case 10: // Float32Array (complex32)
    for(var i = 0; i < size; i++){
      var re = caml_int32_float_of_bits(reader.read32s());
      var im = caml_int32_float_of_bits(reader.read32s());
      ba.set(i,[254,re,im]);
    }
    break;
  case 11: // Float64Array (complex64)
    var t = new Array(8);;
    for(var i = 0; i < size; i++){
      for (var j = 0;j < 8;j++) t[j] = reader.read8u();
      var re = caml_int64_float_of_bits(caml_int64_of_bytes(t));
      for (var j = 0;j < 8;j++) t[j] = reader.read8u();
      var im = caml_int64_float_of_bits(caml_int64_of_bytes(t));
      ba.set(i,[254,re,im]);
    }
    break
  }
  sz[0] = (4 + num_dims) * 4;
  return caml_ba_create_unsafe(kind, layout, dims, data);
}

//Deprecated
//Provides: caml_ba_create_from
//Requires: caml_ba_create_unsafe, caml_invalid_argument, caml_ba_get_size_per_element
function caml_ba_create_from(data1, data2, jstyp, kind, layout, dims){
  if(data2 || caml_ba_get_size_per_element(kind) == 2){
    caml_invalid_argument("caml_ba_create_from: use return caml_ba_create_unsafe");
  }
  return caml_ba_create_unsafe(kind, layout, dims, data1);
}

//Provides: caml_ba_hash const
//Requires: caml_ba_get_size, caml_hash_mix_int, caml_hash_mix_float
function caml_ba_hash(ba){
  var num_elts = caml_ba_get_size(ba.dims);
  var h = 0;
  switch(ba.kind){
  case 2:  //Int8Array
  case 3:  //Uint8Array
  case 12: //Uint8Array
    if(num_elts > 256) num_elts = 256;
    var w = 0, i =0;
    for(i = 0; i + 4 <= ba.data.length; i+=4){
      w = ba.data[i+0] | (ba.data[i+1] << 8) | (ba.data[i+2] << 16) | (ba.data[i+3] << 24);
      h = caml_hash_mix_int(h,w);
    }
    w = 0;
    switch (num_elts & 3) {
    case 3: w  = ba.data[i+2] << 16;    /* fallthrough */
    case 2: w |= ba.data[i+1] << 8;     /* fallthrough */
    case 1: w |= ba.data[i+0];
      h = caml_hash_mix_int(h, w);
    }
    break;
  case 4:  // Int16Array
  case 5:  // Uint16Array
    if(num_elts > 128) num_elts = 128;
    var w = 0, i =0;
    for(i = 0; i + 2 <= ba.data.length; i+=2){
      w = ba.data[i+0] | (ba.data[i+1] << 16);
      h = caml_hash_mix_int(h,w);
    }
    if ((num_elts & 1) != 0)
      h = caml_hash_mix_int(h, ba.data[i]);
    break;
  case 6:  // Int32Array (int32)
    if (num_elts > 64) num_elts = 64;
    for (var i = 0; i < num_elts; i++) h = caml_hash_mix_int(h, ba.data[i]);
    break;
  case 8:  // Int32Array (int)
  case 9:  // Int32Array (nativeint)
    if (num_elts > 64) num_elts = 64;
    for (var i = 0; i < num_elts; i++) h = caml_hash_mix_int(h, ba.data[i]);
    break;
  case 7:  // Int32Array (int64)
    if (num_elts > 32) num_elts = 32;
    num_elts *= 2
    for (var i = 0; i < num_elts; i++) {
      h = caml_hash_mix_int(h, ba.data[i]);
    }
    break;
  case 10: // Float32Array (complex32)
    num_elts *=2; /* fallthrough */
  case 0:  // Float32Array
    if (num_elts > 64) num_elts = 64;
    for (var i = 0; i < num_elts; i++) h = caml_hash_mix_float(h, ba.data[i]);
    break;
  case 11: // Float64Array (complex64)
    num_elts *=2; /* fallthrough */
  case 1:  // Float64Array
    if (num_elts > 32) num_elts = 32;
    for (var i = 0; i < num_elts; i++) h = caml_hash_mix_float(h, ba.data[i]);
    break;
  }
  return h;
}

//Provides: caml_ba_to_typed_array mutable
function caml_ba_to_typed_array(ba){
  return ba.data;
}

//Provides: caml_ba_kind_of_typed_array mutable
//Requires: caml_invalid_argument
function caml_ba_kind_of_typed_array(ta){
  var g = joo_global_object;
  var kind;
  if (ta instanceof g.Float32Array) kind = 0;
  else if (ta instanceof g.Float64Array) kind = 1;
  else if (ta instanceof g.Int8Array) kind = 2;
  else if (ta instanceof g.Uint8Array) kind = 3;
  else if (ta instanceof g.Int16Array) kind = 4;
  else if (ta instanceof g.Uint16Array) kind = 5;
  else if (ta instanceof g.Int32Array) kind = 6;
  else if (ta instanceof g.Uint32Array) kind = 6;
  else caml_invalid_argument("caml_ba_kind_of_typed_array: unsupported kind");
  return kind;
}

//Provides: caml_ba_from_typed_array mutable
//Requires: caml_ba_kind_of_typed_array
//Requires: caml_ba_create_unsafe
function caml_ba_from_typed_array(ta){
  var kind = caml_ba_kind_of_typed_array(ta);
  return caml_ba_create_unsafe(kind, 0, [ta.length], ta);
}

//# 1 "+bigstring.js"
///////// BIGSTRING

//Provides: caml_hash_mix_bigstring
//Requires: caml_hash_mix_bytes_arr
function caml_hash_mix_bigstring(h, bs) {
  return caml_hash_mix_bytes_arr(h,bs.data);
}

//Provides: bigstring_to_array_buffer mutable
function bigstring_to_array_buffer(bs) {
  return bs.data.buffer
}

//Provides: bigstring_to_typed_array mutable
function bigstring_to_typed_array(bs) {
  return bs.data
}

//Provides: bigstring_of_array_buffer mutable
//Requires: caml_ba_create_unsafe
function bigstring_of_array_buffer(ab) {
  var ta = new joo_global_object.Uint8Array(ab);
  return caml_ba_create_unsafe(12, 0, [ta.length], ta);
}

//Provides: bigstring_of_typed_array mutable
//Requires: caml_ba_create_unsafe
function bigstring_of_typed_array(ba) {
  var ta = new joo_global_object.Uint8Array(ba.buffer, ba.byteOffset, ba.length * ba.BYTES_PER_ELEMENT);
  return caml_ba_create_unsafe(12, 0, [ta.length], ta);
}

//Provides: caml_bigstring_memcmp
//Requires: caml_ba_get_1
function caml_bigstring_memcmp(s1, pos1, s2, pos2, len){
  for (var i = 0; i < len; i++) {
    var a = caml_ba_get_1(s1,pos1 + i);
    var b = caml_ba_get_1(s2,pos2 + i);
    if (a < b) return -1;
    if (a > b) return 1;
  }
  return 0;
}

//Provides: caml_bigstring_blit_ba_to_ba
//Requires: caml_invalid_argument, caml_array_bound_error
function caml_bigstring_blit_ba_to_ba(ba1, pos1, ba2, pos2, len){
  if(12 != ba1.kind)
    caml_invalid_argument("caml_bigstring_blit_ba_to_ba: kind mismatch");
  if(12 != ba2.kind)
    caml_invalid_argument("caml_bigstring_blit_ba_to_ba: kind mismatch");
  if(len == 0) return 0;
  var ofs1 = ba1.offset(pos1);
  var ofs2 = ba2.offset(pos2);
  if(ofs1 + len > ba1.data.length){
    caml_array_bound_error();
  }
  if(ofs2 + len > ba2.data.length){
    caml_array_bound_error();
  }
  var slice = ba1.data.subarray(ofs1,ofs1+len);
  ba2.data.set(slice,pos2);
  return 0
}

//Provides: caml_bigstring_blit_string_to_ba
//Requires: caml_invalid_argument, caml_array_bound_error, caml_array_of_string
//Requires: caml_ml_string_length
function caml_bigstring_blit_string_to_ba(str1, pos1, ba2, pos2, len){
  if(12 != ba2.kind)
    caml_invalid_argument("caml_bigstring_blit_string_to_ba: kind mismatch");
  if(len == 0) return 0;
  var ofs2 = ba2.offset(pos2);
  if(pos1 + len > caml_ml_string_length(str1)) {
    caml_array_bound_error();
  }
  if(ofs2 + len > ba2.data.length) {
    caml_array_bound_error();
  }
  var slice = caml_array_of_string(str1).slice(pos1,pos1 + len);
  ba2.data.set(slice,ofs2);
  return 0
}

//Provides: caml_bigstring_blit_bytes_to_ba
//Requires: caml_invalid_argument, caml_array_bound_error, caml_array_of_bytes
//Requires: caml_ml_bytes_length
function caml_bigstring_blit_bytes_to_ba(str1, pos1, ba2, pos2, len){
  if(12 != ba2.kind)
    caml_invalid_argument("caml_bigstring_blit_string_to_ba: kind mismatch");
  if(len == 0) return 0;
  var ofs2 = ba2.offset(pos2);
  if(pos1 + len > caml_ml_bytes_length(str1)) {
    caml_array_bound_error();
  }
  if(ofs2 + len > ba2.data.length) {
    caml_array_bound_error();
  }
  var slice = caml_array_of_bytes(str1).slice(pos1,pos1 + len);
  ba2.data.set(slice,ofs2);
  return 0
}

//Provides: caml_bigstring_blit_ba_to_bytes
//Requires: caml_invalid_argument, caml_array_bound_error
//Requires: caml_blit_bytes, caml_bytes_of_array
//Requires: caml_ml_bytes_length
function caml_bigstring_blit_ba_to_bytes(ba1, pos1, bytes2, pos2, len){
  if(12 != ba1.kind)
    caml_invalid_argument("caml_bigstring_blit_string_to_ba: kind mismatch");
  if(len == 0) return 0;
  var ofs1 = ba1.offset(pos1);
  if(ofs1 + len > ba1.data.length){
    caml_array_bound_error();
  }
  if(pos2 + len > caml_ml_bytes_length(bytes2)){
    caml_array_bound_error();
  }
  var slice = ba1.data.slice(ofs1, ofs1+len);
  caml_blit_bytes(caml_bytes_of_array(slice), 0, bytes2, pos2, len);
  return 0
}

//# 1 "+bigstring-cstruct.js"
//The following are defined in Cstruct
//There are just provided here for compatibility reasons

//Provides: caml_blit_bigstring_to_bigstring
//Requires: caml_bigstring_blit_ba_to_ba
//Weakdef
var caml_blit_bigstring_to_bigstring = caml_bigstring_blit_ba_to_ba
//Provides: caml_blit_bigstring_to_string
//Requires: caml_bigstring_blit_ba_to_bytes
//Weakdef
var caml_blit_bigstring_to_string = caml_bigstring_blit_ba_to_bytes
//Provides: caml_blit_string_to_bigstring
//Requires: caml_bigstring_blit_string_to_ba
//Weakdef
var caml_blit_string_to_bigstring = caml_bigstring_blit_string_to_ba

//# 1 "+compare.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_compare_val_tag
//Requires: caml_is_ml_string, caml_is_ml_bytes
function caml_compare_val_tag(a){
  if (typeof a === "number") return 1000; // int_tag (we use it for all numbers)
  else if (caml_is_ml_bytes(a)) return 252; // string_tag
  else if (caml_is_ml_string(a)) return 1252; // ocaml string (if different from bytes)
  else if (a instanceof Array && a[0] === (a[0]>>>0) && a[0] <= 255) {
    // Look like an ocaml block
    var tag = a[0] | 0;
    // ignore double_array_tag because we cannot accurately set
    // this tag when we create an array of float.
    return (tag == 254)?0:tag
  }
  else if (a instanceof String) return 12520; // javascript string, like string_tag (252)
  else if (typeof a == "string") return 12520; // javascript string, like string_tag (252)
  else if (a instanceof Number) return 1000; // int_tag (we use it for all numbers)
  else if (a && a.caml_custom) return 1255; // like custom_tag (255)
  else if (a && a.compare) return 1256; // like custom_tag (255)
  else if (typeof a == "function") return 1247; // like closure_tag (247)
  else if (typeof a == "symbol") return 1251;
  return 1001; //out_of_heap_tag
}

//Provides: caml_compare_val_get_custom
//Requires: caml_custom_ops
function caml_compare_val_get_custom(a){
  return caml_custom_ops[a.caml_custom] && caml_custom_ops[a.caml_custom].compare;
}

//Provides: caml_compare_val_number_custom
//Requires: caml_compare_val_get_custom
function caml_compare_val_number_custom(num, custom, swap, total) {
  var comp = caml_compare_val_get_custom(custom);
  if(comp) {
    var x = (swap > 0)?comp(custom,num,total):comp(num,custom,total);
    if(total && x != x) return swap; // total && nan
    if(+x != +x) return +x; // nan
    if((x | 0) != 0) return (x | 0); // !nan
  }
  return swap
}

//Provides: caml_compare_val (const, const, const)
//Requires: caml_int_compare, caml_string_compare, caml_bytes_compare
//Requires: caml_invalid_argument, caml_compare_val_get_custom, caml_compare_val_tag
//Requires: caml_compare_val_number_custom
//Requires: caml_jsbytes_of_string
function caml_compare_val (a, b, total) {
  var stack = [];
  for(;;) {
    if (!(total && a === b)) {
      var tag_a = caml_compare_val_tag(a);
      // forward_tag ?
      if(tag_a == 250) { a = a[1]; continue }

      var tag_b = caml_compare_val_tag(b);
      // forward_tag ?
      if(tag_b == 250) { b = b[1]; continue }

      // tags are different
      if(tag_a !== tag_b) {
        if(tag_a == 1000) {
          if(tag_b == 1255) { //immediate can compare against custom
            return caml_compare_val_number_custom(a, b, -1, total);
          }
          return -1
        }
        if(tag_b == 1000) {
          if(tag_a == 1255) { //immediate can compare against custom
            return caml_compare_val_number_custom(b, a, 1, total);
          }
          return 1
        }
        return (tag_a < tag_b)?-1:1;
      }
      switch(tag_a){
        // 246: Lazy_tag handled bellow
      case 247: // Closure_tag
        // Cannot happen
        caml_invalid_argument("compare: functional value");
        break
      case 248: // Object
        var x = caml_int_compare(a[2], b[2]);
        if (x != 0) return (x | 0);
        break;
      case 249: // Infix
        // Cannot happen
        caml_invalid_argument("compare: functional value");
        break
      case 250: // Forward tag
        // Cannot happen, handled above
        caml_invalid_argument("equal: got Forward_tag, should not happen");
        break;
      case 251: //Abstract
        caml_invalid_argument("equal: abstract value");
        break;
      case 252: // OCaml bytes
        if (a !== b) {
          var x = caml_bytes_compare(a, b);
          if (x != 0) return (x | 0);
        };
        break;
      case 253: // Double_tag
        // Cannot happen
        caml_invalid_argument("equal: got Double_tag, should not happen");
        break;
      case 254: // Double_array_tag
        // Cannot happen, handled above
        caml_invalid_argument("equal: got Double_array_tag, should not happen");
        break
      case 255: // Custom_tag
        caml_invalid_argument("equal: got Custom_tag, should not happen");
        break;
      case 1247: // Function
        caml_invalid_argument("compare: functional value");
        break;
      case 1255: // Custom
        var comp = caml_compare_val_get_custom(a);
        if(comp != caml_compare_val_get_custom(b)){
          return (a.caml_custom<b.caml_custom)?-1:1;
        }
        if(!comp)
          caml_invalid_argument("compare: abstract value");
        var x = comp(a,b,total);
        if(x != x){ // Protect against invalid UNORDERED
          return total?-1:x;
        }
        if(x !== (x|0)){ // Protect against invalid return value
          return -1
        }
        if (x != 0) return (x | 0);
        break;
      case 1256: // compare function
        var x = a.compare(b,total);
        if(x != x) { // Protect against invalid UNORDERED
          return total?-1:x;
        }
        if(x !== (x|0)){ // Protect against invalid return value
          return -1
        }
        if (x != 0) return (x | 0);
        break;
      case 1000: // Number
        a = +a;
        b = +b;
        if (a < b) return -1;
        if (a > b) return 1;
        if (a != b) {
          if (!total) return NaN;
          if (a == a) return 1;
          if (b == b) return -1;
        }
        break;
      case 1001: // The rest
        // Here we can be in the following cases:
        // 1. JavaScript primitive types
        // 2. JavaScript object that can be coerced to primitive types
        // 3. JavaScript object than cannot be coerced to primitive types
        //
        // (3) will raise a [TypeError]
        // (2) will coerce to primitive types using [valueOf] or [toString]
        // (2) and (3), after eventual coercion
        // - if a and b are strings, apply lexicographic comparison
        // - if a or b are not strings, convert a and b to number
        //   and apply standard comparison
        //
        // Exception: `!=` will not coerce/convert if both a and b are objects
        if (a < b) return -1;
        if (a > b) return 1;
        if (a != b) {
          if (!total) return NaN;
          if (a == a) return 1;
          if (b == b) return -1;
        }
        break;
      case 1251: // JavaScript Symbol, no ordering.
        if(a !== b) {
          if (!total) return NaN;
          return 1;
        }
        break;
      case 1252: // ocaml strings
        var a = caml_jsbytes_of_string(a);
        var b = caml_jsbytes_of_string(b);
        if(a !== b) {
          if(a < b) return -1;
          if(a > b) return 1;
        }
        break;
      case 12520: // javascript strings
        var a = a.toString();
        var b = b.toString();
        if(a !== b) {
          if(a < b) return -1;
          if(a > b) return 1;
        }
        break;
      case 246: // Lazy_tag
      case 254: // Double_array
      default: // Block with other tag
        if (a.length != b.length) return (a.length < b.length)?-1:1;
        if (a.length > 1) stack.push(a, b, 1);
        break;
      }
    }
    if (stack.length == 0) return 0;
    var i = stack.pop();
    b = stack.pop();
    a = stack.pop();
    if (i + 1 < a.length) stack.push(a, b, i + 1);
    a = a[i];
    b = b[i];
  }
}
//Provides: caml_compare (const, const)
//Requires: caml_compare_val
function caml_compare (a, b) { return caml_compare_val (a, b, true); }
//Provides: caml_int_compare mutable (const, const)
function caml_int_compare (a, b) {
  if (a < b) return (-1); if (a == b) return 0; return 1;
}
//Provides: caml_equal mutable (const, const)
//Requires: caml_compare_val
function caml_equal (x, y) { return +(caml_compare_val(x,y,false) == 0); }
//Provides: caml_notequal mutable (const, const)
//Requires: caml_compare_val
function caml_notequal (x, y) { return +(caml_compare_val(x,y,false) != 0); }
//Provides: caml_greaterequal mutable (const, const)
//Requires: caml_compare_val
function caml_greaterequal (x, y) { return +(caml_compare_val(x,y,false) >= 0); }
//Provides: caml_greaterthan mutable (const, const)
//Requires: caml_compare_val
function caml_greaterthan (x, y) { return +(caml_compare_val(x,y,false) > 0); }
//Provides: caml_lessequal mutable (const, const)
//Requires: caml_compare_val
function caml_lessequal (x, y) { return +(caml_compare_val(x,y,false) <= 0); }
//Provides: caml_lessthan mutable (const, const)
//Requires: caml_compare_val
function caml_lessthan (x, y) { return +(caml_compare_val(x,y,false) < 0); }

//# 1 "+fail.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Raise exception

//Provides: caml_raise_constant (const)
function caml_raise_constant (tag) { throw tag; }

//Provides: caml_return_exn_constant (const)
function caml_return_exn_constant (tag) { return tag; }

//Provides: caml_raise_with_arg (const, const)
function caml_raise_with_arg (tag, arg) { throw [0, tag, arg]; }

//Provides: caml_raise_with_string (const, const)
//Requires: caml_raise_with_arg, caml_string_of_jsbytes
function caml_raise_with_string (tag, msg) {
  caml_raise_with_arg (tag, caml_string_of_jsbytes(msg));
}

//Provides: caml_failwith (const)
//Requires: caml_raise_with_string, caml_global_data
function caml_failwith (msg) {
  caml_raise_with_string(caml_global_data.Failure, msg);
}


//Provides: caml_invalid_argument (const)
//Requires: caml_raise_with_string, caml_global_data
function caml_invalid_argument (msg) {
  caml_raise_with_string(caml_global_data.Invalid_argument, msg);
}

//Provides: caml_raise_end_of_file
//Requires: caml_raise_constant, caml_global_data
function caml_raise_end_of_file () {
  caml_raise_constant(caml_global_data.End_of_file);
}

//Provides: caml_raise_zero_divide
//Requires: caml_raise_constant, caml_global_data
function caml_raise_zero_divide () {
  caml_raise_constant(caml_global_data.Division_by_zero);
}

//Provides: caml_raise_not_found
//Requires: caml_raise_constant, caml_global_data
function caml_raise_not_found () {
  caml_raise_constant(caml_global_data.Not_found); }


//Provides: caml_array_bound_error
//Requires: caml_invalid_argument
function caml_array_bound_error () {
  caml_invalid_argument("index out of bounds");
}

//# 1 "+format.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Format

//Provides: caml_parse_format
//Requires: caml_jsbytes_of_string, caml_invalid_argument
function caml_parse_format (fmt) {
  fmt = caml_jsbytes_of_string(fmt);
  var len = fmt.length;
  if (len > 31) caml_invalid_argument("format_int: format too long");
  var f =
      { justify:'+', signstyle:'-', filler:' ', alternate:false,
        base:0, signedconv:false, width:0, uppercase:false,
        sign:1, prec:-1, conv:'f' };
  for (var i = 0; i < len; i++) {
    var c = fmt.charAt(i);
    switch (c) {
    case '-':
      f.justify = '-'; break;
    case '+': case ' ':
      f.signstyle = c; break;
    case '0':
      f.filler = '0'; break;
    case '#':
      f.alternate = true; break;
    case '1': case '2': case '3': case '4': case '5':
    case '6': case '7': case '8': case '9':
      f.width = 0;
      while (c=fmt.charCodeAt(i) - 48, c >= 0 && c <= 9) {
        f.width = f.width * 10 + c; i++
      }
      i--;
      break;
    case '.':
      f.prec = 0;
      i++;
      while (c=fmt.charCodeAt(i) - 48, c >= 0 && c <= 9) {
        f.prec = f.prec * 10 + c; i++
      }
      i--;
    case 'd': case 'i':
      f.signedconv = true; /* fallthrough */
    case 'u':
      f.base = 10; break;
    case 'x':
      f.base = 16; break;
    case 'X':
      f.base = 16; f.uppercase = true; break;
    case 'o':
      f.base = 8; break;
    case 'e': case 'f': case 'g':
      f.signedconv = true; f.conv = c; break;
    case 'E': case 'F': case 'G':
      f.signedconv = true; f.uppercase = true;
      f.conv = c.toLowerCase (); break;
    }
  }
  return f;
}

//Provides: caml_finish_formatting
//Requires: caml_string_of_jsbytes
function caml_finish_formatting(f, rawbuffer) {
  if (f.uppercase) rawbuffer = rawbuffer.toUpperCase();
  var len = rawbuffer.length;
  /* Adjust len to reflect additional chars (sign, etc) */
  if (f.signedconv && (f.sign < 0 || f.signstyle != '-')) len++;
  if (f.alternate) {
    if (f.base == 8) len += 1;
    if (f.base == 16) len += 2;
  }
  /* Do the formatting */
  var buffer = "";
  if (f.justify == '+' && f.filler == ' ')
    for (var i = len; i < f.width; i++) buffer += ' ';
  if (f.signedconv) {
    if (f.sign < 0) buffer += '-';
    else if (f.signstyle != '-') buffer += f.signstyle;
  }
  if (f.alternate && f.base == 8) buffer += '0';
  if (f.alternate && f.base == 16) buffer += "0x";
  if (f.justify == '+' && f.filler == '0')
    for (var i = len; i < f.width; i++) buffer += '0';
  buffer += rawbuffer;
  if (f.justify == '-')
    for (var i = len; i < f.width; i++) buffer += ' ';
  return caml_string_of_jsbytes(buffer);
}

//# 1 "+fs.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2014 Jérôme Vouillon, Hugo Heuzard
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Dummy filesystem

//Provides: caml_current_dir
if(joo_global_object.process && joo_global_object.process.cwd)
  var caml_current_dir = joo_global_object.process.cwd().replace(/\\/g,'/');
else
  var caml_current_dir =  "/static";
if(caml_current_dir.slice(-1) !== "/") caml_current_dir += "/"

//Provides: caml_root
//Requires: caml_current_dir
var caml_root = caml_current_dir.match(/[^\/]*\//)[0];


//Provides: MlFile
function MlFile(){  }

//Provides: caml_make_path
//Requires: caml_current_dir
//Requires: caml_jsstring_of_string
function caml_make_path (name) {
  name=caml_jsstring_of_string(name);
  if(name.charCodeAt(0) != 47)
    name = caml_current_dir + name;
  var comp = name.split("/");
  var ncomp = []
  for(var i = 0; i<comp.length; i++){
    switch(comp[i]){
    case "..": if(ncomp.length>1) ncomp.pop(); break;
    case ".": break;
    case "": if(ncomp.length == 0) ncomp.push(""); break;
    default: ncomp.push(comp[i]);break
    }
  }
  ncomp.orig = name;
  return ncomp;
}

//Provides:jsoo_mount_point
//Requires: MlFakeDevice, MlNodeDevice, caml_root, fs_node_supported
var jsoo_mount_point = []
if (fs_node_supported()) {
  jsoo_mount_point.push({path:caml_root,device:new MlNodeDevice(caml_root)});
} else {
  jsoo_mount_point.push({path:caml_root,device:new MlFakeDevice(caml_root)});
}
jsoo_mount_point.push({path:caml_root+"static/", device:new MlFakeDevice(caml_root+"static/")});

//Provides:caml_list_mount_point
//Requires: jsoo_mount_point, caml_string_of_jsbytes
function caml_list_mount_point(){
  var prev = 0
  for(var i = 0; i < jsoo_mount_point.length; i++){
    var old = prev;
    prev = [0, caml_string_of_jsbytes(jsoo_mount_point[i].path), old]
  }
  return prev;
}

//Provides: resolve_fs_device
//Requires: caml_make_path, jsoo_mount_point
function resolve_fs_device(name){
  var path = caml_make_path(name);
  var name = path.join("/");
  var name_slash = name + "/";
  var res;
  for(var i = 0; i < jsoo_mount_point.length; i++) {
    var m = jsoo_mount_point[i];
    if(name_slash.search(m.path) == 0
       && (!res || res.path.length < m.path.length))
      res = {path:m.path,device:m.device,rest:name.substring(m.path.length,name.length)};
  }
  return res;
}

//Provides: caml_mount_autoload
//Requires: MlFakeDevice, caml_make_path, jsoo_mount_point
function caml_mount_autoload(name,f){
  var path = caml_make_path(name);
  var name = path.join("/") + "/";
  jsoo_mount_point.push({path:name,device:new MlFakeDevice(name,f)})
  return 0;
}

//Provides: caml_unmount
//Requires: jsoo_mount_point, caml_make_path
function caml_unmount(name){
  var path = caml_make_path(name);
  var name = path.join("/") + "/";
  var idx = -1;
  for(var i = 0; i < jsoo_mount_point.length; i++)
    if(jsoo_mount_point[i].path == name) idx = i;
  if(idx > -1) jsoo_mount_point.splice(idx,1);
  return 0
}

//Provides: caml_sys_getcwd
//Requires: caml_current_dir, caml_string_of_jsbytes
function caml_sys_getcwd() {
  return caml_string_of_jsbytes(caml_current_dir);
}

//Provides: caml_sys_chdir
//Requires: caml_current_dir, caml_raise_no_such_file, resolve_fs_device
function caml_sys_chdir(dir) {
  var root = resolve_fs_device(dir);
  if(root.device.exists(root.rest)) {
    if(root.rest) caml_current_dir = root.path + root.rest + "/";
    else caml_current_dir = root.path;
    return 0;
  }
  else {
    caml_raise_no_such_file(dir);
  }
}

//Provides: caml_raise_no_such_file
//Requires: caml_raise_sys_error
//Requires: caml_jsbytes_of_string
function caml_raise_no_such_file(name){
  name = caml_jsbytes_of_string(name);
  caml_raise_sys_error (name + ": No such file or directory");
}

//Provides: caml_raise_not_a_dir
//Requires: caml_raise_sys_error
//Requires: caml_jsbytes_of_string
function caml_raise_not_a_dir(name){
  name = caml_jsbytes_of_string(name);
  caml_raise_sys_error (name + ": Not a directory");
}

//Provides: caml_sys_file_exists
//Requires: resolve_fs_device
function caml_sys_file_exists (name) {
  var root = resolve_fs_device(name);
  return root.device.exists(root.rest);
}

//Provides: caml_sys_read_directory
//Requires: caml_string_of_jsbytes
//Requires: caml_raise_not_a_dir, resolve_fs_device
function caml_sys_read_directory(name){
  var root = resolve_fs_device(name);
  var a = root.device.readdir(root.rest);
  var l = new Array(a.length + 1);
  l[0] = 0;
  for(var i=0;i<a.length;i++)
    l[i+1] = caml_string_of_jsbytes(a[i]);
  return l;
}

//Provides: caml_sys_remove
//Requires: caml_raise_no_such_file, resolve_fs_device
function caml_sys_remove(name){
  var root = resolve_fs_device(name);
  var ok = root.device.unlink(root.rest);
  if(ok == 0) caml_raise_no_such_file(name);
  return 0;
}

//Provides: caml_sys_is_directory
//Requires: resolve_fs_device
function caml_sys_is_directory(name){
  var root = resolve_fs_device(name);
  var a = root.device.is_dir(root.rest);
  return a?1:0;
}

//Provides: caml_sys_rename
//Requires: caml_failwith, resolve_fs_device
function caml_sys_rename(o,n){
  var o_root = resolve_fs_device(o);
  var n_root = resolve_fs_device(n);
  if(o_root.device != n_root.device)
    caml_failwith("caml_sys_rename: cannot move file between two filesystem");
  if(!o_root.device.rename)
    caml_failwith("caml_sys_rename: no implemented");
  o_root.device.rename(o_root.rest, n_root.rest);
}


//Provides: caml_ba_map_file
//Requires: caml_failwith
function caml_ba_map_file(vfd, kind, layout, shared, dims, pos) {
  // var data = caml_global_data.fds[vfd];
  caml_failwith("caml_ba_map_file not implemented");
}

//Provides: caml_ba_map_file_bytecode
//Requires: caml_ba_map_file
function caml_ba_map_file_bytecode(argv,argn){
  return caml_ba_map_file(argv[0],argv[1],argv[2],argv[3],argv[4],argv[5]);
}

//Provides: caml_create_file_extern
function caml_create_file_extern(name,content){
  if(joo_global_object.caml_create_file)
    joo_global_object.caml_create_file(name,content);
  else {
    if(!joo_global_object.caml_fs_tmp) joo_global_object.caml_fs_tmp = [];
    joo_global_object.caml_fs_tmp.push({name:name,content:content});
  }
  return 0;
}

//Provides: caml_fs_init
//Requires: caml_create_file
function caml_fs_init (){
  var tmp=joo_global_object.caml_fs_tmp
  if(tmp){
    for(var i = 0; i < tmp.length; i++){
      caml_create_file(tmp[i].name,tmp[i].content);
    }
  }
  joo_global_object.caml_create_file = caml_create_file;
  joo_global_object.caml_fs_tmp = [];
  return 0;
}

//Provides: caml_create_file
//Requires: caml_failwith, resolve_fs_device, caml_string_of_jsbytes
function caml_create_file(name,content) {
  var name = (typeof name == "string")?caml_string_of_jsbytes(name):name;
  var content = (typeof content == "string")?caml_string_of_jsbytes(content):content;
  var root = resolve_fs_device(name);
  if(! root.device.register) caml_failwith("cannot register file");
  root.device.register(root.rest,content);
  return 0;
}

//Provides: caml_read_file_content
//Requires: resolve_fs_device, caml_raise_no_such_file, caml_create_bytes, caml_string_of_bytes
//Requires: caml_string_of_jsbytes
function caml_read_file_content (name) {
  var name = (typeof name == "string")?caml_string_of_jsbytes(name):name;
  var root = resolve_fs_device(name);
  if(root.device.exists(root.rest)) {
    var file = root.device.open(root.rest,{rdonly:1});
    var len  = file.length();
    var buf  = caml_create_bytes(len);
    file.read(0,buf,0,len);
    return caml_string_of_bytes(buf)
  }
  caml_raise_no_such_file(name);
}

//# 1 "+fs_fake.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2014 Jérôme Vouillon, Hugo Heuzard
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: MlFakeDevice
//Requires: MlFakeFile, caml_create_bytes
//Requires: caml_raise_sys_error, caml_raise_no_such_file
//Requires: caml_string_of_jsbytes, caml_string_of_jsstring
//Requires: caml_bytes_of_array, caml_bytes_of_string, caml_bytes_of_jsbytes
//Requires: caml_is_ml_bytes, caml_is_ml_string
function MlFakeDevice (root, f) {
  this.content={};
  this.root = root;
  this.lookupFun = f;
}
MlFakeDevice.prototype.nm = function(name) {
  return (this.root + name);
}
MlFakeDevice.prototype.lookup = function(name) {
  if(!this.content[name] && this.lookupFun) {
    var res = this.lookupFun(caml_string_of_jsbytes(this.root), caml_string_of_jsbytes(name));
    if(res !== 0) this.content[name]=new MlFakeFile(caml_bytes_of_string(res[1]));
  }
}
MlFakeDevice.prototype.exists = function(name) {
  // The root of the device exists
  if(name == "") return 1;
  // Check if a directory exists
  var name_slash = (name + "/");
  var r = new RegExp("^" + name_slash);
  for(var n in this.content) {
    if (n.match(r)) return 1
  }
  // Check if a file exists
  this.lookup(name);
  return this.content[name]?1:0;
}
MlFakeDevice.prototype.readdir = function(name) {
  var name_slash = (name == "")?"":(name + "/");
  var r = new RegExp("^" + name_slash + "([^/]*)");
  var seen = {}
  var a = [];
  for(var n in this.content) {
    var m = n.match(r);
    if(m && !seen[m[1]]) {seen[m[1]] = true; a.push(m[1])}
  }
  return a;
}
MlFakeDevice.prototype.is_dir = function(name) {
  var name_slash = (name == "")?"":(name + "/");
  var r = new RegExp("^" + name_slash + "([^/]*)");
  var a = [];
  for(var n in this.content) {
    var m = n.match(r);
    if(m) return 1
  }
  return 0
}
MlFakeDevice.prototype.unlink = function(name) {
  var ok = this.content[name]?true:false;
  delete this.content[name];
  return ok;
}
MlFakeDevice.prototype.open = function(name, f) {
  if(f.rdonly && f.wronly)
    caml_raise_sys_error(this.nm(name) + " : flags Open_rdonly and Open_wronly are not compatible");
  if(f.text && f.binary)
    caml_raise_sys_error(this.nm(name) + " : flags Open_text and Open_binary are not compatible");
  this.lookup(name);
  if (this.content[name]) {
    if (this.is_dir(name)) caml_raise_sys_error(this.nm(name) + " : is a directory");
    if (f.create && f.excl) caml_raise_sys_error(this.nm(name) + " : file already exists");
    var file = this.content[name];
    if(f.truncate) file.truncate();
    return file;
  } else if (f.create) {
    this.content[name] = new MlFakeFile(caml_create_bytes(0));
    return this.content[name];
  } else {
    caml_raise_no_such_file (this.nm(name));
  }
}

MlFakeDevice.prototype.register= function (name,content){
  if(this.content[name]) caml_raise_sys_error(this.nm(name) + " : file already exists");
  if(caml_is_ml_bytes(content))
    this.content[name] = new MlFakeFile(content);
  if(caml_is_ml_string(content))
    this.content[name] = new MlFakeFile(caml_bytes_of_string(content));
  else if(content instanceof Array)
    this.content[name] = new MlFakeFile(caml_bytes_of_array(content));
  else if(typeof content === "string")
    this.content[name] = new MlFakeFile(caml_bytes_of_jsbytes(content));
  else if(content.toString) {
    var bytes = caml_bytes_of_string(caml_string_of_jsstring(content.toString()));
    this.content[name] = new MlFakeFile(bytes);
  }
  else caml_raise_sys_error(this.nm(name) + " : registering file with invalid content type");
}

MlFakeDevice.prototype.constructor = MlFakeDevice

//Provides: MlFakeFile
//Requires: MlFile
//Requires: caml_create_bytes, caml_ml_bytes_length, caml_blit_bytes, caml_blit_string
//Requires: caml_bytes_get
function MlFakeFile(content){
  this.data = content;
}
MlFakeFile.prototype = new MlFile ();
MlFakeFile.prototype.truncate = function(len){
  var old = this.data;
  this.data = caml_create_bytes(len|0);
  caml_blit_bytes(old, 0, this.data, 0, len);
}
MlFakeFile.prototype.length = function () {
  return caml_ml_bytes_length(this.data);
}
MlFakeFile.prototype.write = function(offset,buf,pos,len){
  var clen = this.length();
  if(offset + len >= clen) {
    var new_str = caml_create_bytes(offset + len);
    var old_data = this.data;
    this.data = new_str;
    caml_blit_bytes(old_data, 0, this.data, 0, clen);
  }
  caml_blit_string(buf, pos, this.data, offset, len);
  return 0
}
MlFakeFile.prototype.read = function(offset,buf,pos,len){
  var clen = this.length();
  caml_blit_bytes(this.data, offset, buf, pos, len);
  return 0
}
MlFakeFile.prototype.read_one = function(offset){
  return caml_bytes_get(this.data, offset);
}
MlFakeFile.prototype.close = function(){

}
MlFakeFile.prototype.constructor = MlFakeFile

//# 1 "+fs_node.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2014 Jérôme Vouillon, Hugo Heuzard
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: fs_node_supported
function fs_node_supported () {
  return (
    typeof joo_global_object.process !== 'undefined'
      && typeof joo_global_object.process.versions !== 'undefined'
      && typeof joo_global_object.process.versions.node !== 'undefined'
      && joo_global_object.process.platform !== "browser")
}


//Provides: MlNodeDevice
//Requires: MlNodeFile, caml_raise_sys_error
function MlNodeDevice(root) {
  this.fs = require('fs');
  this.root = root;
}
MlNodeDevice.prototype.nm = function(name) {
  return (this.root + name);
}
MlNodeDevice.prototype.exists = function(name) {
  try {
    return this.fs.existsSync(this.nm(name))?1:0;
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}
MlNodeDevice.prototype.readdir = function(name) {
  try {
    return this.fs.readdirSync(this.nm(name));
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}
MlNodeDevice.prototype.is_dir = function(name) {
  try {
    return this.fs.statSync(this.nm(name)).isDirectory()?1:0;
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}
MlNodeDevice.prototype.unlink = function(name) {
  try {
    var b = this.fs.existsSync(this.nm(name))?1:0;
    this.fs.unlinkSync(this.nm(name));
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
  return b
}
MlNodeDevice.prototype.open = function(name, f) {
  var consts = require('constants');
  var res = 0;
  for(var key in f){
    switch(key){
    case "rdonly"  : res |= consts.O_RDONLY; break;
    case "wronly"  : res |= consts.O_WRONLY; break;
    case "append"  :
      res |= consts.O_WRONLY | consts.O_APPEND;
      break;
    case "create"   : res |= consts.O_CREAT;    break;
    case "truncate" : res |= consts.O_TRUNC;    break;
    case "excl"     : res |= consts.O_EXCL;     break;
    case "binary"   : res |= consts.O_BINARY;   break;
    case "text"     : res |= consts.O_TEXT;     break;
    case "nonblock" : res |= consts.O_NONBLOCK; break;
    }
  }
  try {
    var fd = this.fs.openSync(this.nm(name), res);
    return new MlNodeFile(fd);
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}

MlNodeDevice.prototype.rename = function(o,n) {
  try {
    this.fs.renameSync(this.nm(o), this.nm(n));
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}

MlNodeDevice.prototype.constructor = MlNodeDevice

//Provides: MlNodeFile
//Requires: MlFile, caml_array_of_string, caml_array_of_bytes, caml_bytes_set, caml_raise_sys_error
function MlNodeFile(fd){
  this.fs = require('fs');
  this.fd = fd;
}
MlNodeFile.prototype = new MlFile ();

MlNodeFile.prototype.truncate = function(len){
  try {
    this.fs.ftruncateSync(this.fd,len|0)
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}
MlNodeFile.prototype.length = function () {
  try {
    return this.fs.fstatSync(this.fd).size;
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}
MlNodeFile.prototype.write = function(offset,buf,buf_offset,len){
  var a = caml_array_of_string(buf);
  if(! (a instanceof joo_global_object.Uint8Array))
    a = new joo_global_object.Uint8Array(a);
  var buffer = joo_global_object.Buffer.from(a);
  try {
    this.fs.writeSync(this.fd, buffer, buf_offset, len, offset);
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
  return 0;
}
MlNodeFile.prototype.read = function(offset,buf,buf_offset,len){
  var a = caml_array_of_bytes(buf);
  if(! (a instanceof joo_global_object.Uint8Array))
    a = new joo_global_object.Uint8Array(a);
  var buffer = joo_global_object.Buffer.from(a);
  try {
    this.fs.readSync(this.fd, buffer, buf_offset, len, offset);
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
  for(var i = 0; i < len; i++){
    caml_bytes_set(buf,buf_offset + i,buffer[buf_offset+i]);
  }
  return 0
}
MlNodeFile.prototype.read_one = function(offset){
  var a = new joo_global_object.Uint8Array(1);
  var buffer = joo_global_object.Buffer.from(a);
  try {
    this.fs.readSync(this.fd, buffer, 0, 1, offset);
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
  return buffer[0];
}
MlNodeFile.prototype.close = function(){
  try {
    this.fs.closeSync(this.fd);
  } catch (err) {
    caml_raise_sys_error(err.toString());
  }
}

MlNodeFile.prototype.constructor = MlNodeFile;

//# 1 "+gc.js"


//Provides: caml_gc_minor
function caml_gc_minor(){ return 0}
//Provides: caml_gc_major
function caml_gc_major(){ return 0}
//Provides: caml_gc_full_major
function caml_gc_full_major(){ return 0}
//Provides: caml_gc_compaction
function caml_gc_compaction(){ return 0}
//Provides: caml_gc_counters
function caml_gc_counters() { return [254,0,0,0] }
//Provides: caml_gc_quick_stat
function caml_gc_quick_stat(){
  return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}
//Provides: caml_gc_stat
function caml_gc_stat() {
  return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}

//Provides: caml_gc_set
function caml_gc_set(_control) {
  return 0;
}

//Provides: caml_gc_get
function caml_gc_get(){
  return [0,0,0,0,0,0,0,0,0]
}

//Provides: caml_memprof_set
function caml_memprof_set(_control) {
  return 0;
}

//Provides: caml_final_register const
function caml_final_register () { return 0; }
//Provides: caml_final_register_called_without_value const
function caml_final_register_called_without_value () { return 0; }
//Provides: caml_final_release const
function caml_final_release () { return 0; }

//Provides: caml_memprof_start
function caml_memprof_start(rate,stack_size,tracker){
  return 0;
}

//Provides: caml_memprof_stop
function caml_memprof_stop(unit) {
  return 0;
}

//# 1 "+graphics.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2014 Hugo Heuzard

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_gr_state
var caml_gr_state;

//Provides: caml_gr_state_get
//Requires: caml_gr_state
//Requires: caml_named_value, caml_string_of_jsbytes
function caml_gr_state_get() {
  if(caml_gr_state) {
    return caml_gr_state;
  }
  throw [0,caml_named_value("Graphics.Graphic_failure"), caml_string_of_jsbytes("Not initialized")]
}
//Provides: caml_gr_state_set
//Requires: caml_gr_state,caml_gr_state_init
function caml_gr_state_set(ctx) {
  caml_gr_state=ctx;
  caml_gr_state_init()
  return 0;
}

//Provides: caml_gr_open_graph
//Requires: caml_gr_state_create
//Requires: caml_gr_state_set
//Requires: caml_failwith
//Requires: caml_jsstring_of_string
function caml_gr_open_graph(info){
  var g = joo_global_object;
  var info = caml_jsstring_of_string(info);
  function get(name){
    var res = info.match("(^|,) *"+name+" *= *([a-zA-Z0-9_]+) *(,|$)");
    if(res) return res[2];
  }
  var specs = [];
  if(!(info=="")) specs.push(info);
  var target = get("target");
  if(!target) target="";
  var status = get("status");
  if(!status) specs.push("status=1")

  var w = get("width");
  w = w?parseInt(w):200;
  specs.push("width="+w);

  var h = get("height");
  h = h?parseInt(h):200;
  specs.push("height="+h);

  var win = g.open("about:blank",target,specs.join(","));
  if(!win) {caml_failwith("Graphics.open_graph: cannot open the window")}
  var doc = win.document;
  var canvas = doc.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  var ctx = caml_gr_state_create(canvas,w,h);
  ctx.set_title = function (title) {
    doc.title = title;
  };
  caml_gr_state_set(ctx);
  var body = doc.body;
  body.style.margin = "0px";
  body.appendChild(canvas);
  return 0;
}

//Provides: caml_gr_state_init
//Requires: caml_gr_state
//Requires: caml_gr_set_color,caml_gr_moveto,caml_gr_resize_window
//Requires: caml_gr_set_line_width,caml_gr_set_text_size,caml_gr_set_font
//Requires: caml_gr_set_window_title
function caml_gr_state_init(){
  caml_gr_moveto(caml_gr_state.x,caml_gr_state.y);
  caml_gr_resize_window(caml_gr_state.width,caml_gr_state.height);
  caml_gr_set_line_width(caml_gr_state.line_width);
  caml_gr_set_text_size(caml_gr_state.text_size);
  caml_gr_set_font(caml_gr_state.font);
  caml_gr_set_color(caml_gr_state.color);
  caml_gr_set_window_title(caml_gr_state.title);
  //caml_gr_resize_window might reset some canvas' properties
  caml_gr_state.context.textBaseline = 'bottom';
}

//Provides: caml_gr_state_create
//Requires: caml_string_of_jsbytes
function caml_gr_state_create(canvas,w,h){
  var context = canvas.getContext("2d");
  return {
    context: context,
    canvas : canvas,
    x : 0,
    y : 0,
    width : w,
    height : h,
    line_width : 1,
    font : caml_string_of_jsbytes("fixed"),
    text_size : 26,
    color : 0x000000,
    title : caml_string_of_jsbytes("")
  };
}

//Provides: caml_gr_doc_of_state
function caml_gr_doc_of_state(state) {
  if(state.canvas.ownerDocument)
    return state.canvas.ownerDocument;
}

//Provides: caml_gr_close_graph
//Requires: caml_gr_state_get
function caml_gr_close_graph(){
  var s = caml_gr_state_get();
  s.canvas.width = 0;
  s.canvas.height = 0;
  return 0;
}

//Provides: caml_gr_set_window_title
//Requires: caml_gr_state_get
//Requires: caml_jsstring_of_string
function caml_gr_set_window_title(name){
  var s = caml_gr_state_get();
  s.title = name;
  var jsname = caml_jsstring_of_string(name);
  if(s.set_title) s.set_title(jsname);
  return 0;
}

//Provides: caml_gr_resize_window
//Requires: caml_gr_state_get
function caml_gr_resize_window(w,h){
  var s = caml_gr_state_get()
  s.width = w;
  s.height = h;
  s.canvas.width = w;
  s.canvas.height = h;
  return 0;
}

//Provides: caml_gr_clear_graph
//Requires: caml_gr_state_get
function caml_gr_clear_graph(){
  var s = caml_gr_state_get();
  s.canvas.width = s.width;
  s.canvas.height = s.height;
  //  s.context.strokeRect (0., 0., s.width, s.height);
  return 0;
}

//Provides: caml_gr_size_x
//Requires: caml_gr_state_get
function caml_gr_size_x(){
  var s = caml_gr_state_get();
  return s.width;
}
//Provides: caml_gr_size_y
//Requires: caml_gr_state_get
function caml_gr_size_y(){
  var s = caml_gr_state_get();
  return s.height;
}


//Provides: caml_gr_set_color
//Requires: caml_gr_state_get
function caml_gr_set_color(color){
  var s = caml_gr_state_get();
  function convert(number) {
    var str = '' + number.toString(16);
    while (str.length < 2) str = '0' + str;
    return str;
  }
  var
  r = (color >> 16) & 0xff,
  g = (color >> 8)  & 0xff,
  b = (color >> 0)  & 0xff;
  s.color=color;
  var c_str = '#' + convert(r) + convert(g) + convert(b);
  s.context.fillStyle =   c_str;
  s.context.strokeStyle = c_str;
  return 0;
}
//Provides: caml_gr_plot
//Requires: caml_gr_state_get
function caml_gr_plot(x,y){
  var s = caml_gr_state_get();
  var im=s.context.createImageData(1,1);
  var d = im.data;
  var color = s.color;
  d[0] = (color >> 16) & 0xff; //r
  d[1] = (color >> 8)  & 0xff, //g
  d[2] = (color >> 0)  & 0xff; //b
  d[3] = 0xFF; //a
  s.x=x;
  s.y=y;
  s.context.putImageData(im,x,s.height - y);
  return 0;
}

//Provides: caml_gr_point_color
//Requires: caml_gr_state_get
function caml_gr_point_color(x,y){
  var s = caml_gr_state_get();
  var im=s.context.getImageData(x,s.height - y,1,1);
  var d = im.data;
  return (d[0] << 16) + (d[1] << 8) + d[2];
}
//Provides: caml_gr_moveto
//Requires: caml_gr_state_get
function caml_gr_moveto(x,y){
  var s = caml_gr_state_get();
  s.x=x;
  s.y=y;
  return 0;
}

//Provides: caml_gr_current_x
//Requires: caml_gr_state_get
function caml_gr_current_x(){
  var s = caml_gr_state_get();
  return s.x
}
//Provides: caml_gr_current_y
//Requires: caml_gr_state_get
function caml_gr_current_y(){
  var s = caml_gr_state_get();
  return s.y
}
//Provides: caml_gr_lineto
//Requires: caml_gr_state_get
function caml_gr_lineto(x,y){
  var s = caml_gr_state_get();
  s.context.beginPath();
  s.context.moveTo(s.x,s.height - s.y);
  s.context.lineTo(x,s.height - y);
  s.context.stroke();
  s.x=x;
  s.y=y;
  return 0;
}
//Provides: caml_gr_draw_rect
//Requires: caml_gr_state_get
function caml_gr_draw_rect(x,y,w,h){
  var s = caml_gr_state_get();
  s.context.strokeRect(x,s.height - y,w,-h);
  return 0;
}

//Provides: caml_gr_arc_aux
function caml_gr_arc_aux(ctx,cx,cy,ry,rx,a1,a2){
  while(a1>a2) a2+=360;
  a1 /= 180;
  a2 /= 180;
  var rot = 0,xPos,yPos,xPos_prev,yPos_prev;
  var space = 2;
  var num = (((a2 - a1) * Math.PI * ((rx+ry)/2)) / space) | 0;
  var delta = (a2 - a1) * Math.PI / num;
  var i = a1 * Math.PI;
  for (var j=0;j<=num;j++){
    xPos = cx - (rx * Math.sin(i)) * Math.sin(rot * Math.PI) + (ry * Math.cos(i)) * Math.cos(rot * Math.PI);
    xPos = xPos.toFixed(2);
    yPos = cy + (ry * Math.cos(i)) * Math.sin(rot * Math.PI) + (rx * Math.sin(i)) * Math.cos(rot * Math.PI);
    yPos = yPos.toFixed(2);
    if (j==0) {
      ctx.moveTo(xPos, yPos);
    } else if (xPos_prev!=xPos || yPos_prev!=yPos){
      ctx.lineTo(xPos, yPos);
    }
    xPos_prev=xPos;
    yPos_prev=yPos;
    i-= delta;//ccw
  }
  return 0;
}


//Provides: caml_gr_draw_arc
//Requires: caml_gr_state_get, caml_gr_arc_aux
function caml_gr_draw_arc(x,y,rx,ry,a1,a2){
  var s = caml_gr_state_get();
  s.context.beginPath();
  caml_gr_arc_aux(s.context,x,s.height - y,rx,ry,a1,a2);
  s.context.stroke();
  return 0;
}

//Provides: caml_gr_set_line_width
//Requires: caml_gr_state_get
function caml_gr_set_line_width(w){
  var s = caml_gr_state_get();
  s.line_width = w;
  s.context.lineWidth = w
  return 0;
}

//Provides: caml_gr_fill_rect
//Requires: caml_gr_state_get
function caml_gr_fill_rect(x,y,w,h){
  var s = caml_gr_state_get();
  s.context.fillRect(x,s.height - y,w,-h);
  return 0;
}
//Provides: caml_gr_fill_poly
//Requires: caml_gr_state_get
function caml_gr_fill_poly(ar){
  var s = caml_gr_state_get();
  s.context.beginPath();
  s.context.moveTo(ar[1][1],s.height - ar[1][2]);
  for(var i = 2; i < ar.length; i++)
    s.context.lineTo(ar[i][1],s.height - ar[i][2]);
  s.context.lineTo(ar[1][1],s.height - ar[1][2]);
  s.context.fill();
  return 0;
}

//Provides: caml_gr_fill_arc
//Requires: caml_gr_state_get, caml_gr_arc_aux
function caml_gr_fill_arc(x,y,rx,ry,a1,a2){
  var s = caml_gr_state_get();
  s.context.beginPath();
  caml_gr_arc_aux(s.context,x,s.height - y,rx,ry,a1,a2);
  s.context.fill();
  return 0;
}

//Provides: caml_gr_draw_str
//Requires: caml_gr_state_get
function caml_gr_draw_str(str){
  var s = caml_gr_state_get();
  var m = s.context.measureText(str);
  var dx = m.width;
  s.context.fillText(str,s.x,s.height - s.y);
  s.x += dx | 0;
  return 0;
}

//Provides: caml_gr_draw_char
//Requires: caml_gr_draw_str
function caml_gr_draw_char(c){
  caml_gr_draw_str(String.fromCharCode(c));
  return 0;
}

//Provides: caml_gr_draw_string
//Requires: caml_gr_draw_str
//Requires: caml_jsstring_of_string
function caml_gr_draw_string(str){
  caml_gr_draw_str(caml_jsstring_of_string(str));
  return 0;
}

//Provides: caml_gr_set_font
//Requires: caml_gr_state_get
//Requires: caml_jsstring_of_string
function caml_gr_set_font(f){
  var s = caml_gr_state_get();
  s.font = f;
  s.context.font = s.text_size + "px " + caml_jsstring_of_string(s.font);
  return 0;
}

//Provides: caml_gr_set_text_size
//Requires: caml_gr_state_get
//Requires: caml_jsstring_of_string
function caml_gr_set_text_size(size){
  var s = caml_gr_state_get();
  s.text_size = size;
  s.context.font = s.text_size + "px " + caml_jsstring_of_string(s.font);
  return 0;
}

//Provides: caml_gr_text_size
//Requires: caml_gr_state_get
//Requires: caml_jsstring_of_string
function caml_gr_text_size(txt){
  var s = caml_gr_state_get();
  var w = s.context.measureText(caml_jsstring_of_string(txt)).width;
  return [0,w,s.text_size];
}


//Provides: caml_gr_make_image
//Requires: caml_gr_state_get
function caml_gr_make_image(arr){
  var s = caml_gr_state_get();
  var h = arr.length - 1 ;
  var w = arr[1].length - 1;
  var im = s.context.createImageData(w,h);
  for(var i=0;i<h;i++){
    for(var j=0;j<w;j++){
      var c = arr[i+1][j+1];
      var o = i*(w*4) + (j * 4);
      if(c == -1) {
        im.data[o + 0] = 0;
        im.data[o + 1] = 0;
        im.data[o + 2] = 0;
        im.data[o + 3] = 0;
      } else {
        im.data[o + 0] = c >> 16 & 0xff;
        im.data[o + 1] = c >>  8 & 0xff;
        im.data[o + 2] = c >>  0 & 0Xff;
        im.data[o + 3] = 0xff;
      }
    }
  }
  return im
}
//Provides: caml_gr_dump_image
//Requires: caml_gr_state_get
function caml_gr_dump_image(im){
  var data = [0]
  for(var i=0; i<im.height;i++){
    data[i+1] = [0]
    for(var j=0; j<im.width;j++){
      var o = i*(im.width*4) + (j * 4),
          r = im.data[o+0],
          g = im.data[o+1],
          b = im.data[o+2];
      data[i+1][j+1] = (r << 16) + (g << 8) + b
    }
  }
  return data
}
//Provides: caml_gr_draw_image
//Requires: caml_gr_state_get
function caml_gr_draw_image(im,x,y){
  var s = caml_gr_state_get();
  if(!im.image) {
    var canvas = document.createElement("canvas");
    canvas.width = s.width;
    canvas.height = s.height;
    canvas.getContext("2d").putImageData(im,0,0);
    var image = new joo_global_object.Image();
    image.onload = function () {
      s.context.drawImage(image,x,s.height - im.height - y);
      im.image = image;
    }
    image.src = canvas.toDataURL("image/png");
  } else {
    s.context.drawImage(im.image,x,s.height - im.height - y);
  }
  return 0;
}
//Provides: caml_gr_create_image
//Requires: caml_gr_state_get
function caml_gr_create_image(x,y){
  var s = caml_gr_state_get();
  return s.context.createImageData(x,y);
}
//Provides: caml_gr_blit_image
//Requires: caml_gr_state_get
function caml_gr_blit_image(im,x,y){
  var s = caml_gr_state_get();
  var im2 = s.context.getImageData(x,s.height - im.height - y,im.width,im.height);
  for (var i = 0; i < im2.data.length; i+=4){
    im.data[i] = im2.data[i];
    im.data[i+1] = im2.data[i+1];
    im.data[i+2] = im2.data[i+2];
    im.data[i+3] = im2.data[i+3];
  }
  return 0;
}
//Provides: caml_gr_sigio_handler
function caml_gr_sigio_handler(){return 0}
//Provides: caml_gr_sigio_signal
function caml_gr_sigio_signal(){return 0}
//Provides: caml_gr_wait_event
//Requires: caml_failwith
function caml_gr_wait_event(_evl){
  caml_failwith("caml_gr_wait_event not Implemented: use Graphics_js instead");
}

//Provides: caml_gr_synchronize
//Requires: caml_failwith
function caml_gr_synchronize () {
  caml_failwith("caml_gr_synchronize not Implemented");
}
//Provides: caml_gr_remember_mode
//Requires: caml_failwith
function caml_gr_remember_mode () {
  caml_failwith("caml_gr_remember_mode not Implemented");
}
//Provides: caml_gr_display_mode
//Requires: caml_failwith
function caml_gr_display_mode() {
  caml_failwith("caml_gr_display_mode not Implemented");
}

//Provides: caml_gr_window_id
//Requires: caml_failwith
function caml_gr_window_id(a) {
  caml_failwith("caml_gr_window_id not Implemented");
}

//Provides: caml_gr_open_subwindow
//Requires: caml_failwith
function caml_gr_open_subwindow(a,b,c,d) {
  caml_failwith("caml_gr_open_subwindow not Implemented");
}

//Provides: caml_gr_close_subwindow
//Requires: caml_failwith
function caml_gr_close_subwindow(a) {
  caml_failwith("caml_gr_close_subwindow not Implemented");
}

//# 1 "+hash.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Hashtbl

//Provides: caml_hash_univ_param mutable
//Requires: caml_is_ml_string, caml_is_ml_bytes
//Requires: caml_convert_string_to_bytes
//Requires: caml_int64_to_bytes, caml_int64_bits_of_float, caml_custom_ops
//Requires: caml_ml_bytes_length, caml_jsbytes_of_string
function caml_hash_univ_param (count, limit, obj) {
  var hash_accu = 0;
  function hash_aux (obj) {
    limit --;
    if (count < 0 || limit < 0) return;
    if (obj instanceof Array && obj[0] === (obj[0]|0)) {
      switch (obj[0]) {
      case 248:
        // Object
        count --;
        hash_accu = (hash_accu * 65599 + obj[2]) | 0;
        break;
      case 250:
        // Forward
        limit++; hash_aux(obj); break;
      default:
        count --;
        hash_accu = (hash_accu * 19 + obj[0]) | 0;
        for (var i = obj.length - 1; i > 0; i--) hash_aux (obj[i]);
      }
    } else if (caml_is_ml_bytes(obj)) {
      count --;
      switch (obj.t & 6) {
      default: /* PARTIAL */
        caml_convert_string_to_bytes(obj);
      case 0: /* BYTES */
        for (var b = obj.c, l = caml_ml_bytes_length(obj), i = 0; i < l; i++)
          hash_accu = (hash_accu * 19 + b.charCodeAt(i)) | 0;
        break;
      case 2: /* ARRAY */
        for (var a = obj.c, l = caml_ml_bytes_length(obj), i = 0; i < l; i++)
          hash_accu = (hash_accu * 19 + a[i]) | 0;
      }
    } else if (caml_is_ml_string(obj)) {
        var jsbytes = caml_jsbytes_of_string(obj);
        for (var b = jsbytes, l = jsbytes.length, i = 0; i < l; i++)
          hash_accu = (hash_accu * 19 + b.charCodeAt(i)) | 0;
    } else if (typeof obj === "string") {
        for (var b = obj, l = obj.length, i = 0; i < l; i++)
          hash_accu = (hash_accu * 19 + b.charCodeAt(i)) | 0;
    } else if (obj === (obj|0)) {
      // Integer
      count --;
      hash_accu = (hash_accu * 65599 + obj) | 0;
    } else if (obj === +obj) {
      // Float
      count--;
      var p = caml_int64_to_bytes (caml_int64_bits_of_float (obj));
      for (var i = 7; i >= 0; i--) hash_accu = (hash_accu * 19 + p[i]) | 0;
    } else if(obj && obj.caml_custom) {
      if(caml_custom_ops[obj.caml_custom] && caml_custom_ops[obj.caml_custom].hash) {
        var h = caml_custom_ops[obj.caml_custom].hash(obj) | 0;
        hash_accu = (hash_accu * 65599 + h) | 0;
      }
    }
  }
  hash_aux (obj);
  return hash_accu & 0x3FFFFFFF;
}

//function ROTL32(x,n) { return ((x << n) | (x >>> (32-n))); }
//Provides: caml_hash_mix_int
//Requires: caml_mul
function caml_hash_mix_int(h,d) {
  d = caml_mul(d, 0xcc9e2d51|0);
  d = ((d << 15) | (d >>> (32-15))); // ROTL32(d, 15);
  d = caml_mul(d, 0x1b873593);
  h ^= d;
  h = ((h << 13) | (h >>> (32-13)));   //ROTL32(h, 13);
  return (((h + (h << 2))|0) + (0xe6546b64|0))|0;
}

//Provides: caml_hash_mix_final
//Requires: caml_mul
function caml_hash_mix_final(h) {
  h ^= h >>> 16;
  h = caml_mul (h, 0x85ebca6b|0);
  h ^= h >>> 13;
  h = caml_mul (h, 0xc2b2ae35|0);
  h ^= h >>> 16;
  return h;
}

//Provides: caml_hash_mix_float
//Requires: caml_int64_bits_of_float, caml_hash_mix_int64
function caml_hash_mix_float (h, v0) {
  return caml_hash_mix_int64(h, caml_int64_bits_of_float (v0));
}
//Provides: caml_hash_mix_int64
//Requires: caml_hash_mix_int
//Requires: caml_int64_lo32, caml_int64_hi32
function caml_hash_mix_int64 (h, v) {
  h = caml_hash_mix_int(h, caml_int64_lo32(v));
  h = caml_hash_mix_int(h, caml_int64_hi32(v));
  return h;
}

//Provides: caml_hash_mix_jsbytes
//Requires: caml_hash_mix_int
function caml_hash_mix_jsbytes(h, s) {
  var len = s.length, i, w;
  for (i = 0; i + 4 <= len; i += 4) {
    w = s.charCodeAt(i)
      | (s.charCodeAt(i+1) << 8)
      | (s.charCodeAt(i+2) << 16)
      | (s.charCodeAt(i+3) << 24);
    h = caml_hash_mix_int(h, w);
  }
  w = 0;
  switch (len & 3) {
  case 3: w  = s.charCodeAt(i+2) << 16;
  case 2: w |= s.charCodeAt(i+1) << 8;
  case 1:
    w |= s.charCodeAt(i);
    h = caml_hash_mix_int(h, w);
  default:
  }
  h ^= len;
  return h;
}

//Provides: caml_hash_mix_bytes_arr
//Requires: caml_hash_mix_int
function caml_hash_mix_bytes_arr(h, s) {
  var len = s.length, i, w;
  for (i = 0; i + 4 <= len; i += 4) {
    w = s[i]
      | (s[i+1] << 8)
      | (s[i+2] << 16)
      | (s[i+3] << 24);
    h = caml_hash_mix_int(h, w);
  }
  w = 0;
  switch (len & 3) {
  case 3: w  = s[i+2] << 16;
  case 2: w |= s[i+1] << 8;
  case 1: w |= s[i];
    h = caml_hash_mix_int(h, w);
  default:
  }
  h ^= len;
  return h;
}

//Provides: caml_hash_mix_bytes
//Requires: caml_convert_string_to_bytes
//Requires: caml_hash_mix_jsbytes
//Requires: caml_hash_mix_bytes_arr
function caml_hash_mix_bytes(h, v) {
  switch (v.t & 6) {
  default:
    caml_convert_string_to_bytes (v);
  case 0: /* BYTES */
    h = caml_hash_mix_jsbytes(h, v.c);
    break;
  case 2: /* ARRAY */
    h = caml_hash_mix_bytes_arr(h, v.c);
  }
  return h
}

//Provides: caml_hash_mix_string
//Requires: caml_hash_mix_jsbytes, caml_jsbytes_of_string
function caml_hash_mix_string(h, v) {
  return caml_hash_mix_jsbytes(h, caml_jsbytes_of_string(v));
}


//Provides: caml_hash mutable
//Requires: caml_is_ml_string, caml_is_ml_bytes
//Requires: caml_hash_mix_int, caml_hash_mix_final
//Requires: caml_hash_mix_float, caml_hash_mix_string, caml_hash_mix_bytes, caml_custom_ops
//Requires: caml_hash_mix_jsbytes
function caml_hash (count, limit, seed, obj) {
  var queue, rd, wr, sz, num, h, v, i, len;
  sz = limit;
  if (sz < 0 || sz > 256) sz = 256;
  num = count;
  h = seed;
  queue = [obj]; rd = 0; wr = 1;
  while (rd < wr && num > 0) {
    v = queue[rd++];
    if (v && v.caml_custom){
      if(caml_custom_ops[v.caml_custom] && caml_custom_ops[v.caml_custom].hash) {
        var hh = caml_custom_ops[v.caml_custom].hash(v);
        h = caml_hash_mix_int (h, hh);
        num --;
      }
    }
    else if (v instanceof Array && v[0] === (v[0]|0)) {
      switch (v[0]) {
      case 248:
        // Object
        h = caml_hash_mix_int(h, v[2]);
        num--;
        break;
      case 250:
        // Forward
        queue[--rd] = v[1];
        break;
      default:
        var tag = ((v.length - 1) << 10) | v[0];
        h = caml_hash_mix_int(h, tag);
        for (i = 1, len = v.length; i < len; i++) {
          if (wr >= sz) break;
          queue[wr++] = v[i];
        }
        break;
      }
    } else if (caml_is_ml_bytes(v)) {
      h = caml_hash_mix_bytes(h,v)
      num--;
    } else if (caml_is_ml_string(v)) {
      h = caml_hash_mix_string(h,v)
      num--;
    } else if (typeof v === "string") {
      h = caml_hash_mix_jsbytes(h,v)
      num--;
    } else if (v === (v|0)) {
      // Integer
      h = caml_hash_mix_int(h, v+v+1);
      num--;
    } else if (v === +v) {
      // Float
      h = caml_hash_mix_float(h,v);
      num--;
    }
  }
  h = caml_hash_mix_final(h);
  return h & 0x3FFFFFFF;
}

//# 1 "+ieee_754.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: jsoo_floor_log2
var log2_ok = Math.log2 && Math.log2(1.1235582092889474E+307) == 1020
function jsoo_floor_log2(x) {
  if(log2_ok) return Math.floor(Math.log2(x))
  var i = 0;
  if (x == 0) return -Infinity;
  if(x>=1) {while (x>=2) {x/=2; i++} }
  else {while (x < 1) {x*=2; i--} };
  return i;
}

//Provides: caml_int64_bits_of_float const
//Requires: jsoo_floor_log2, caml_int64_create_lo_mi_hi
function caml_int64_bits_of_float (x) {
  if (!isFinite(x)) {
    if (isNaN(x))
      return caml_int64_create_lo_mi_hi(1, 0, 0x7ff0);
    if (x > 0)
      return caml_int64_create_lo_mi_hi(0, 0, 0x7ff0)
    else
      return caml_int64_create_lo_mi_hi(0, 0, 0xfff0)
  }
  var sign = (x==0 && 1/x == -Infinity)?0x8000:(x>=0)?0:0x8000;
  if (sign) x = -x;
  // Int64.bits_of_float 1.1235582092889474E+307 = 0x7fb0000000000000L
  // using Math.LOG2E*Math.log(x) in place of Math.log2 result in precision lost
  var exp = jsoo_floor_log2(x) + 1023;
  if (exp <= 0) {
    exp = 0;
    x /= Math.pow(2,-1026);
  } else {
    x /= Math.pow(2,exp-1027);
    if (x < 16) {
      x *= 2; exp -=1; }
    if (exp == 0) {
      x /= 2; }
  }
  var k = Math.pow(2,24);
  var r3 = x|0;
  x = (x - r3) * k;
  var r2 = x|0;
  x = (x - r2) * k;
  var r1 = x|0;
  r3 = (r3 &0xf) | sign | exp << 4;
  return caml_int64_create_lo_mi_hi(r1, r2, r3);
}

//Provides: caml_int32_bits_of_float const
//Requires: jsoo_floor_log2
function caml_int32_bits_of_float (x) {
  var float32a = new joo_global_object.Float32Array(1);
  float32a[0] = x;
  var int32a = new joo_global_object.Int32Array(float32a.buffer);
  return int32a[0] | 0;
}

//FP literals can be written using the hexadecimal
//notation 0x<mantissa in hex>p<exponent> from ISO C99.
//https://github.com/dankogai/js-hexfloat/blob/master/hexfloat.js
//Provides: caml_hexstring_of_float const
//Requires: caml_string_of_jsstring, caml_str_repeat
function caml_hexstring_of_float (x, prec, style) {
  if (!isFinite(x)) {
    if (isNaN(x)) return caml_string_of_jsstring("nan");
    return caml_string_of_jsstring ((x > 0)?"infinity":"-infinity");
  }
  var sign = (x==0 && 1/x == -Infinity)?1:(x>=0)?0:1;
  if(sign) x = -x;
  var exp = 0;
  if (x == 0) { }
  else if (x < 1) {
    while (x < 1 && exp > -1022)  { x *= 2; exp-- }
  } else {
    while (x >= 2) { x /= 2; exp++ }
  }
  var exp_sign = exp < 0 ? '' : '+';
  var sign_str = '';
  if (sign) sign_str = '-'
  else {
    switch(style){
    case 43 /* '+' */: sign_str = '+'; break;
    case 32 /* ' ' */: sign_str = ' '; break;
    default: break;
    }
  }
  if (prec >= 0 && prec < 13) {
    /* If a precision is given, and is small, round mantissa accordingly */
    var cst = Math.pow(2,prec * 4);
    x = Math.round(x * cst) / cst;
  }
  var x_str = x.toString(16);
  if(prec >= 0){
    var idx = x_str.indexOf('.');
    if(idx<0) {
      x_str += '.' + caml_str_repeat(prec, '0');
    }
    else {
      var size = idx+1+prec;
      if(x_str.length < size)
        x_str += caml_str_repeat(size - x_str.length, '0');
      else
        x_str = x_str.substr(0,size);
    }
  }
  return caml_string_of_jsstring (sign_str + '0x' + x_str + 'p' + exp_sign + exp.toString(10));
}

//Provides: caml_int64_float_of_bits const
function caml_int64_float_of_bits (x) {
  var lo = x.lo;
  var mi = x.mi;
  var hi = x.hi;
  var exp = (hi & 0x7fff) >> 4;
  if (exp == 2047) {
    if ((lo|mi|(hi&0xf)) == 0)
      return (hi & 0x8000)?(-Infinity):Infinity;
    else
      return NaN;
  }
  var k = Math.pow(2,-24);
  var res = (lo*k+mi)*k+(hi&0xf);
  if (exp > 0) {
    res += 16;
    res *= Math.pow(2,exp-1027);
  } else
    res *= Math.pow(2,-1026);
  if (hi & 0x8000) res = - res;
  return res;
}

//Provides: caml_nextafter_float const
//Requires: caml_int64_float_of_bits, caml_int64_bits_of_float, caml_int64_add, caml_int64_sub,caml_int64_of_int32
function caml_nextafter_float (x,y) {
  if(isNaN(x) || isNaN(y)) return NaN;
  if(x==y) return y;
  if(x==0){
    if(y < 0)
      return -Math.pow(2, -1074)
    else
      return Math.pow(2, -1074)
  }
  var bits = caml_int64_bits_of_float(x);
  var one = caml_int64_of_int32(1);
  if ((x<y) == (x>0))
    bits = caml_int64_add(bits, one)
  else
    bits = caml_int64_sub(bits, one)
  return caml_int64_float_of_bits(bits);
}

//Provides: caml_trunc_float
function caml_trunc_float(x){
  return Math.trunc(x);
}

//Provides: caml_int32_float_of_bits const
function caml_int32_float_of_bits (x) {
  var int32a = new joo_global_object.Int32Array(1);
  int32a[0] = x;
  var float32a = new joo_global_object.Float32Array(int32a.buffer);
  return float32a[0];
}

//Provides: caml_classify_float const
function caml_classify_float (x) {
  if (isFinite (x)) {
    if (Math.abs(x) >= 2.2250738585072014e-308) return 0;
    if (x != 0) return 1;
    return 2;
  }
  return isNaN(x)?4:3;
}
//Provides: caml_modf_float const
function caml_modf_float (x) {
  if (isFinite (x)) {
    var neg = (1/x) < 0;
    x = Math.abs(x);
    var i = Math.floor (x);
    var f = x - i;
    if (neg) { i = -i; f = -f; }
    return [0, f, i];
  }
  if (isNaN (x)) return [0, NaN, NaN];
  return [0, 1/x, x];
}
//Provides: caml_ldexp_float const
function caml_ldexp_float (x,exp) {
  exp |= 0;
  if (exp > 1023) {
    exp -= 1023;
    x *= Math.pow(2, 1023);
    if (exp > 1023) {  // in case x is subnormal
      exp -= 1023;
      x *= Math.pow(2, 1023);
    }
  }
  if (exp < -1023) {
    exp += 1023;
    x *= Math.pow(2, -1023);
  }
  x *= Math.pow(2, exp);
  return x;
}
//Provides: caml_frexp_float const
//Requires: jsoo_floor_log2
function caml_frexp_float (x) {
  if ((x == 0) || !isFinite(x)) return [0, x, 0];
  var neg = x < 0;
  if (neg) x = - x;
  var exp = Math.max(-1023, jsoo_floor_log2(x) + 1);
  x *= Math.pow(2,-exp);
  while (x < 0.5) {
    x *= 2;
    exp--;
  }
  while (x >= 1) {
    x *= 0.5;
    exp++;
  }
  if (neg) x = - x;
  return [0, x, exp];
}

//Provides: caml_float_compare const
function caml_float_compare (x, y) {
  if (x === y) return 0;
  if (x < y) return -1;
  if (x > y) return 1;
  if (x === x) return 1;
  if (y === y) return -1;
  return 0;
}

//Provides: caml_copysign_float const
function caml_copysign_float (x, y) {
  if (y == 0) y = 1 / y;
  x = Math.abs(x);
  return (y < 0)?(-x):x;
}

//Provides: caml_signbit_float const
function caml_signbit_float(x) {
  if (x == 0) x = 1 / x;
  return (x < 0)?1:0;
}

//Provides: caml_expm1_float const
function caml_expm1_float (x) {
  var y = Math.exp(x), z = y - 1;
  return (Math.abs(x)>1?z:(z==0?x:x*z/Math.log(y)));
}

//Provides: caml_log1p_float const
function caml_log1p_float (x) {
  var y = 1 + x, z = y - 1;
  return (z==0?x:x*Math.log(y)/z);
}

//Provides: caml_hypot_float const
function caml_hypot_float (x, y) {
  var x = Math.abs(x), y = Math.abs(y);
  var a = Math.max(x, y), b = Math.min(x,y) / (a?a:1);
  return (a * Math.sqrt(1 + b*b));
}

// FIX: these five functions only give approximate results.
//Provides: caml_log10_float const
function caml_log10_float (x) { return Math.LOG10E * Math.log(x); }
//Provides: caml_cosh_float const
function caml_cosh_float (x) { return (Math.exp(x) + Math.exp(-x)) / 2; }
//Provides: caml_sinh_float const
function caml_sinh_float (x) { return (Math.exp(x) - Math.exp(-x)) / 2; }
//Provides: caml_tanh_float const
function caml_tanh_float (x) {
  var y = Math.exp(x), z = Math.exp(-x);
  return (y - z) / (y + z);
}

//Provides: caml_round_float
function caml_round_float (x) { return Math.round(x); }

//Provides: caml_format_float const
//Requires: caml_parse_format, caml_finish_formatting
function caml_format_float (fmt, x) {
  function toFixed(x,dp) {
    if (Math.abs(x) < 1.0) {
      return x.toFixed(dp);
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
        if(dp > 0) {
          x = x + '.' + (new Array(dp+1)).join('0');
        }
        return x;
      }
      else return x.toFixed(dp)
    }
  }
  var s, f = caml_parse_format(fmt);
  var prec = (f.prec < 0)?6:f.prec;
  if (x < 0 || (x == 0 && 1/x == -Infinity)) { f.sign = -1; x = -x; }
  if (isNaN(x)) { s = "nan"; f.filler = ' '; }
  else if (!isFinite(x)) { s = "inf"; f.filler = ' '; }
  else
    switch (f.conv) {
    case 'e':
      var s = x.toExponential(prec);
      // exponent should be at least two digits
      var i = s.length;
      if (s.charAt(i - 3) == 'e')
        s = s.slice (0, i - 1) + '0' + s.slice (i - 1);
      break;
    case 'f':
      s = toFixed(x, prec); break;
    case 'g':
      prec = prec?prec:1;
      s = x.toExponential(prec - 1);
      var j = s.indexOf('e');
      var exp = +s.slice(j + 1);
      if (exp < -4 || x >= 1e21 || x.toFixed(0).length > prec) {
        // remove trailing zeroes
        var i = j - 1; while (s.charAt(i) == '0') i--;
        if (s.charAt(i) == '.') i--;
        s = s.slice(0, i + 1) + s.slice(j);
        i = s.length;
        if (s.charAt(i - 3) == 'e')
          s = s.slice (0, i - 1) + '0' + s.slice (i - 1);
        break;
      } else {
        var p = prec;
        if (exp < 0) { p -= exp + 1; s = x.toFixed(p); }
        else while (s = x.toFixed(p), s.length > prec + 1) p--;
        if (p) {
          // remove trailing zeroes
          var i = s.length - 1; while (s.charAt(i) == '0') i--;
          if (s.charAt(i) == '.') i--;
          s = s.slice(0, i + 1);
        }
      }
      break;
    }
  return caml_finish_formatting(f, s);
}

//Provides: caml_float_of_string (const)
//Requires: caml_failwith, caml_jsbytes_of_string
function caml_float_of_string(s) {
  var res;
  s = caml_jsbytes_of_string(s)
  res = +s;
  if ((s.length > 0) && (res === res)) return res;
  s = s.replace(/_/g,"");
  res = +s;
  if (((s.length > 0) && (res === res)) || /^[+-]?nan$/i.test(s)) return res;
  var m = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)p([+-]?[0-9]+)/i.exec(s);
  //          1        2             3           4
  if(m){
    var m3 = m[3].replace(/0+$/,'');
    var mantissa = parseInt(m[1] + m[2] + m3, 16);
    var exponent = (m[4]|0) - 4*m3.length;
    res = mantissa * Math.pow(2, exponent);
    return res;
  }
  if(/^\+?inf(inity)?$/i.test(s)) return Infinity;
  if(/^-inf(inity)?$/i.test(s)) return -Infinity;
  caml_failwith("float_of_string");
}

//# 1 "+int64.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_int64_offset
var caml_int64_offset = Math.pow(2, -24);

//Provides: MlInt64
//Requires: caml_int64_offset, caml_raise_zero_divide
function MlInt64 (lo,mi,hi) {
  this.lo = lo & 0xffffff;
  this.mi = mi & 0xffffff;
  this.hi = hi & 0xffff;
}
MlInt64.prototype.caml_custom = "_j"
MlInt64.prototype.copy = function () {
  return new MlInt64(this.lo,this.mi,this.hi);
}

MlInt64.prototype.ucompare = function (x) {
  if (this.hi > x.hi) return 1;
  if (this.hi < x.hi) return -1;
  if (this.mi > x.mi) return 1;
  if (this.mi < x.mi) return -1;
  if (this.lo > x.lo) return 1;
  if (this.lo < x.lo) return -1;
  return 0;
}
MlInt64.prototype.compare = function (x) {
  var hi = this.hi << 16;
  var xhi = x.hi << 16;
  if (hi > xhi) return 1;
  if (hi < xhi) return -1;
  if (this.mi > x.mi) return 1;
  if (this.mi < x.mi) return -1;
  if (this.lo > x.lo) return 1;
  if (this.lo < x.lo) return -1;
  return 0;
}
MlInt64.prototype.neg = function () {
  var lo = - this.lo;
  var mi = - this.mi + (lo >> 24);
  var hi = - this.hi + (mi >> 24);
  return new MlInt64(lo, mi, hi);
}
MlInt64.prototype.add = function (x) {
  var lo = this.lo + x.lo;
  var mi = this.mi + x.mi + (lo >> 24);
  var hi = this.hi + x.hi + (mi >> 24);
  return new MlInt64(lo, mi, hi);
}
MlInt64.prototype.sub = function (x) {
  var lo = this.lo - x.lo;
  var mi = this.mi - x.mi + (lo >> 24);
  var hi = this.hi - x.hi + (mi >> 24);
  return new MlInt64(lo, mi, hi);
}
MlInt64.prototype.mul = function (x) {
  var lo = this.lo * x.lo;
  var mi = ((lo * caml_int64_offset) | 0) + this.mi * x.lo + this.lo * x.mi;
  var hi = ((mi * caml_int64_offset) | 0) + this.hi * x.lo + this.mi * x.mi + this.lo * x.hi;
  return new MlInt64(lo, mi, hi);
}
MlInt64.prototype.isZero = function () {
  return (this.lo|this.mi|this.hi) == 0;
}
MlInt64.prototype.isNeg = function () {
  return (this.hi << 16) < 0;
}
MlInt64.prototype.and = function (x) {
  return new MlInt64(this.lo & x.lo, this.mi & x.mi, this.hi & x.hi);
}
MlInt64.prototype.or = function (x) {
  return new MlInt64(this.lo|x.lo, this.mi|x.mi, this.hi|x.hi);
}
MlInt64.prototype.xor = function (x) {
  return new MlInt64(this.lo^x.lo, this.mi^x.mi, this.hi^x.hi);
}
MlInt64.prototype.shift_left = function (s) {
  s = s & 63;
  if (s == 0) return this;
  if (s < 24) {
    return new MlInt64 (this.lo << s,
                        (this.mi << s) | (this.lo >> (24 - s)),
                        (this.hi << s) | (this.mi >> (24 - s)));
  }
  if (s < 48)
    return new MlInt64 (0,
                        this.lo << (s - 24),
                        (this.mi << (s - 24)) | (this.lo >> (48 - s)));
  return new MlInt64(0, 0, this.lo << (s - 48))
}
MlInt64.prototype.shift_right_unsigned = function (s) {
  s = s & 63;
  if (s == 0) return this;
  if (s < 24)
    return new MlInt64 (
      (this.lo >> s) | (this.mi << (24 - s)),
      (this.mi >> s) | (this.hi << (24 - s)),
      (this.hi >> s));
  if (s < 48)
    return new MlInt64 (
      (this.mi >> (s - 24)) | (this.hi << (48 - s)),
      (this.hi >> (s - 24)),
      0);
  return new MlInt64 (this.hi >> (s - 48), 0, 0);
}
MlInt64.prototype.shift_right = function (s) {
  s = s & 63;
  if (s == 0) return this;
  var h = (this.hi << 16) >> 16;
  if (s < 24)
    return new MlInt64 (
      (this.lo >> s) | (this.mi << (24 - s)),
      (this.mi >> s) | (h << (24 - s)),
      ((this.hi << 16) >> s) >>> 16);
  var sign = (this.hi << 16) >> 31;
  if (s < 48)
    return new MlInt64 (
      (this.mi >> (s - 24)) | (this.hi << (48 - s)),
      (this.hi << 16) >> (s - 24) >> 16,
      sign & 0xffff);
  return new MlInt64 ((this.hi << 16) >> (s - 32), sign, sign);
}
MlInt64.prototype.lsl1 = function () {
  this.hi = (this.hi << 1) | (this.mi >> 23);
  this.mi = ((this.mi << 1) | (this.lo >> 23)) & 0xffffff;
  this.lo = (this.lo << 1) & 0xffffff;
}
MlInt64.prototype.lsr1 = function () {
  this.lo = ((this.lo >>> 1) | (this.mi << 23)) & 0xffffff;
  this.mi = ((this.mi >>> 1) | (this.hi << 23)) & 0xffffff;
  this.hi = this.hi >>> 1;
}
MlInt64.prototype.udivmod = function (x) {
  var offset = 0;
  var modulus = this.copy();
  var divisor = x.copy();
  var quotient = new MlInt64(0,0,0);
  while (modulus.ucompare(divisor) > 0) {
    offset++;
    divisor.lsl1();
  }
  while (offset >= 0) {
    offset --;
    quotient.lsl1();
    if (modulus.ucompare(divisor) >= 0) {
      quotient.lo ++;
      modulus = modulus.sub(divisor);
    }
    divisor.lsr1();
  }
  return { quotient : quotient, modulus : modulus };
}
MlInt64.prototype.div = function (y)
{
  var x = this;
  if (y.isZero()) caml_raise_zero_divide ();
  var sign = x.hi ^ y.hi;
  if (x.hi & 0x8000) x = x.neg();
  if (y.hi & 0x8000) y = y.neg();
  var q = x.udivmod(y).quotient;
  if (sign & 0x8000) q = q.neg();
  return q;
}
MlInt64.prototype.mod = function (y)
{
  var x = this;
  if (y.isZero()) caml_raise_zero_divide ();
  var sign = x.hi;
  if (x.hi & 0x8000) x = x.neg();
  if (y.hi & 0x8000) y = y.neg();
  var r = x.udivmod(y).modulus;
  if (sign & 0x8000) r = r.neg();
  return r;
}
MlInt64.prototype.toInt = function () {
  return this.lo | (this.mi << 24);
}
MlInt64.prototype.toFloat = function () {
  return ((this.hi << 16) * Math.pow(2, 32) + this.mi * Math.pow(2, 24)) + this.lo;
}
MlInt64.prototype.toArray = function () {
  return [this.hi >> 8,
          this.hi & 0xff,
          this.mi >> 16,
          (this.mi >> 8) & 0xff,
          this.mi & 0xff,
          this.lo >> 16,
          (this.lo >> 8) & 0xff,
          this.lo & 0xff];
}
MlInt64.prototype.lo32 = function () {
  return this.lo | ((this.mi & 0xff) << 24);
}
MlInt64.prototype.hi32 = function () {
  return ((this.mi >>> 8) & 0xffff) | (this.hi << 16);
}

//Provides: caml_int64_ult const
function caml_int64_ult(x,y) { return x.ucompare(y) < 0; }

//Provides: caml_int64_compare const
function caml_int64_compare(x,y, total) { return x.compare(y) }

//Provides: caml_int64_neg const
function caml_int64_neg (x) { return x.neg() }

//Provides: caml_int64_add const
function caml_int64_add (x, y) { return x.add(y) }

//Provides: caml_int64_sub const
function caml_int64_sub (x, y) { return x.sub(y) }

//Provides: caml_int64_mul const
//Requires: caml_int64_offset
function caml_int64_mul(x,y) { return x.mul(y) }

//Provides: caml_int64_is_zero const
function caml_int64_is_zero(x) { return +x.isZero(); }

//Provides: caml_int64_is_negative const
function caml_int64_is_negative(x) { return +x.isNeg(); }

//Provides: caml_int64_and const
function caml_int64_and (x, y) { return x.and(y); }

//Provides: caml_int64_or const
function caml_int64_or (x, y) { return x.or(y); }

//Provides: caml_int64_xor const
function caml_int64_xor (x, y) { return x.xor(y) }

//Provides: caml_int64_shift_left const
function caml_int64_shift_left (x, s) { return x.shift_left(s) }

//Provides: caml_int64_shift_right_unsigned const
function caml_int64_shift_right_unsigned (x, s) { return x.shift_right_unsigned(s) }

//Provides: caml_int64_shift_right const
function caml_int64_shift_right (x, s) { return x.shift_right(s) }

//Provides: caml_int64_div const
function caml_int64_div (x, y) { return x.div(y) }

//Provides: caml_int64_mod const
function caml_int64_mod (x, y) { return x.mod(y) }

//Provides: caml_int64_of_int32 const
//Requires: MlInt64
function caml_int64_of_int32 (x) {
  return new MlInt64(x & 0xffffff, (x >> 24) & 0xffffff, (x >> 31) & 0xffff)
}

//Provides: caml_int64_to_int32 const
function caml_int64_to_int32 (x) { return x.toInt() }

//Provides: caml_int64_to_float const
function caml_int64_to_float (x) { return x.toFloat () }

//Provides: caml_int64_of_float const
//Requires: caml_int64_offset, MlInt64
function caml_int64_of_float (x) {
  if (x < 0) x = Math.ceil(x);
  return new MlInt64(
    x & 0xffffff,
    Math.floor(x * caml_int64_offset) & 0xffffff,
    Math.floor(x * caml_int64_offset * caml_int64_offset) & 0xffff);
}

//Provides: caml_int64_format const
//Requires: caml_parse_format, caml_finish_formatting
//Requires: caml_int64_is_negative, caml_int64_neg
//Requires: caml_int64_of_int32, caml_int64_to_int32
//Requires: caml_int64_is_zero, caml_str_repeat
function caml_int64_format (fmt, x) {
  var f = caml_parse_format(fmt);
  if (f.signedconv && caml_int64_is_negative(x)) {
    f.sign = -1; x = caml_int64_neg(x);
  }
  var buffer = "";
  var wbase = caml_int64_of_int32(f.base);
  var cvtbl = "0123456789abcdef";
  do {
    var p = x.udivmod(wbase);
    x = p.quotient;
    buffer = cvtbl.charAt(caml_int64_to_int32(p.modulus)) + buffer;
  } while (! caml_int64_is_zero(x));
  if (f.prec >= 0) {
    f.filler = ' ';
    var n = f.prec - buffer.length;
    if (n > 0) buffer = caml_str_repeat (n, '0') + buffer;
  }
  return caml_finish_formatting(f, buffer);
}

//Provides: caml_int64_of_string
//Requires: caml_parse_sign_and_base, caml_failwith, caml_parse_digit
//Requires: caml_int64_of_int32, caml_int64_ult
//Requires: caml_int64_add, caml_int64_mul, caml_int64_neg
//Requires: caml_ml_string_length,caml_string_unsafe_get, MlInt64
function caml_int64_of_string(s) {
  var r = caml_parse_sign_and_base (s);
  var i = r[0], sign = r[1], base = r[2];
  var base64 = caml_int64_of_int32(base);
  var threshold =
      new MlInt64(0xffffff, 0xfffffff, 0xffff).udivmod(base64).quotient;
  var c = caml_string_unsafe_get(s, i);
  var d = caml_parse_digit(c);
  if (d < 0 || d >= base) caml_failwith("int_of_string");
  var res = caml_int64_of_int32(d);
  for (;;) {
    i++;
    c = caml_string_unsafe_get(s, i);
    if (c == 95) continue;
    d = caml_parse_digit(c);
    if (d < 0 || d >= base) break;
    /* Detect overflow in multiplication base * res */
    if (caml_int64_ult(threshold, res)) caml_failwith("int_of_string");
    d = caml_int64_of_int32(d);
    res = caml_int64_add(caml_int64_mul(base64, res), d);
    /* Detect overflow in addition (base * res) + d */
    if (caml_int64_ult(res, d)) caml_failwith("int_of_string");
  }
  if (i != caml_ml_string_length(s)) caml_failwith("int_of_string");
  if (base == 10 && caml_int64_ult(new MlInt64(0, 0, 0x8000), res))
    caml_failwith("int_of_string");
  if (sign < 0) res = caml_int64_neg(res);
  return res;
}

//Provides: caml_int64_create_lo_mi_hi const
//Requires: MlInt64
function caml_int64_create_lo_mi_hi(lo, mi, hi){
  return new MlInt64(lo, mi, hi)
}
//Provides: caml_int64_create_lo_hi const
//Requires: MlInt64
function caml_int64_create_lo_hi(lo, hi){
  return new MlInt64 (
    lo & 0xffffff,
    ((lo >>> 24) & 0xff) | ((hi & 0xffff) << 8),
    (hi >>> 16) & 0xffff);
}
//Provides: caml_int64_lo32 const
function caml_int64_lo32(v){ return v.lo32() }

//Provides: caml_int64_hi32 const
function caml_int64_hi32(v){ return v.hi32() }

//Provides: caml_int64_of_bytes const
//Requires: MlInt64
function caml_int64_of_bytes(a) {
  return new MlInt64(a[7] << 0 | (a[6] << 8) | (a[5] << 16),
                     a[4] << 0 | (a[3] << 8) | (a[2] << 16),
                     a[1] << 0 | (a[0] << 8));
}
//Provides: caml_int64_to_bytes const
function caml_int64_to_bytes(x) { return x.toArray() }

//Provides: caml_int64_hash const
function caml_int64_hash(v){
  return (v.lo32()) ^ (v.hi32())
}

//# 1 "+internalMod.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2014 Jérôme Vouillon, Hugo Heuzard
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_CamlinternalMod_init_mod
//Requires: caml_raise_with_arg, caml_global_data
function caml_CamlinternalMod_init_mod(loc,shape) {
  function undef_module (_x) {
    caml_raise_with_arg(caml_global_data.Undefined_recursive_module, loc);
  }
  function loop (shape,struct,idx){
    if(typeof shape === "number")
      switch(shape){
      case 0://function
        struct[idx]={fun:undef_module};
        break;
      case 1://lazy
        struct[idx]=[246, undef_module];
        break;
      default://case 2://class
        struct[idx]=[];
      }
    else
      switch(shape[0]){
      case 0://module
        struct[idx] = [0];
        for(var i=1;i<shape[1].length;i++)
          loop(shape[1][i],struct[idx],i);
        break;
      default://case 1://Value
        struct[idx] = shape[1];
      }
  }
  var res = [];
  loop(shape,res,0);
  return res[0]
}
//Provides: caml_CamlinternalMod_update_mod
//Requires: caml_update_dummy
function caml_CamlinternalMod_update_mod(shape,real,x) {
  if(typeof shape === "number")
    switch(shape){
    case 0://function
    case 1://lazy
    case 2://class
    default:
      caml_update_dummy(real,x);
    }
  else
    switch(shape[0]){
    case 0://module
      for(var i=1;i<shape[1].length;i++)
        caml_CamlinternalMod_update_mod(shape[1][i],real[i],x[i]);
      break;
      //case 1://Value
    default:
    };
  return 0
}

//# 1 "+ints.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_format_int const (const, const)
//Requires: caml_parse_format, caml_finish_formatting, caml_str_repeat
//Requires: caml_string_of_jsbytes, caml_jsbytes_of_string
function caml_format_int(fmt, i) {
  if (caml_jsbytes_of_string(fmt) == "%d") return caml_string_of_jsbytes(""+i);
  var f = caml_parse_format(fmt);
  if (i < 0) { if (f.signedconv) { f.sign = -1; i = -i; } else i >>>= 0; }
  var s = i.toString(f.base);
  if (f.prec >= 0) {
    f.filler = ' ';
    var n = f.prec - s.length;
    if (n > 0) s = caml_str_repeat (n, '0') + s;
  }
  return caml_finish_formatting(f, s);
}

//Provides: caml_parse_sign_and_base
//Requires: caml_string_unsafe_get, caml_ml_string_length
function caml_parse_sign_and_base (s) {
  var i = 0, len = caml_ml_string_length(s), base = 10, sign = 1;
  if (len > 0) {
    switch (caml_string_unsafe_get(s,i)) {
    case 45: i++; sign = -1; break;
    case 43: i++; sign = 1; break;
    }
  }
  if (i + 1 < len && caml_string_unsafe_get(s, i) == 48)
    switch (caml_string_unsafe_get(s, i + 1)) {
    case 120: case 88: base = 16; i += 2; break;
    case 111: case 79: base =  8; i += 2; break;
    case  98: case 66: base =  2; i += 2; break;
    case 117: case 85: i += 2; break;
    }
  return [i, sign, base];
}

//Provides: caml_parse_digit
function caml_parse_digit(c) {
  if (c >= 48 && c <= 57)  return c - 48;
  if (c >= 65 && c <= 90)  return c - 55;
  if (c >= 97 && c <= 122) return c - 87;
  return -1;
}

//Provides: caml_int_of_string (const)
//Requires: caml_ml_string_length, caml_string_unsafe_get
//Requires: caml_parse_sign_and_base, caml_parse_digit, caml_failwith
function caml_int_of_string (s) {
  var r = caml_parse_sign_and_base (s);
  var i = r[0], sign = r[1], base = r[2];
  var len = caml_ml_string_length(s);
  var threshold = -1 >>> 0;
  var c = (i < len)?caml_string_unsafe_get(s, i):0;
  var d = caml_parse_digit(c);
  if (d < 0 || d >= base) caml_failwith("int_of_string");
  var res = d;
  for (i++;i<len;i++) {
    c = caml_string_unsafe_get(s, i);
    if (c == 95) continue;
    d = caml_parse_digit(c);
    if (d < 0 || d >= base) break;
    res = base * res + d;
    if (res > threshold) caml_failwith("int_of_string");
  }
  if (i != len) caml_failwith("int_of_string");
  // For base different from 10, we expect an unsigned representation,
  // hence any value of 'res' (less than 'threshold') is acceptable.
  // But we have to convert the result back to a signed integer.
  res = sign * res;
  if ((base == 10) && ((res | 0) != res))
    /* Signed representation expected, allow -2^(nbits-1) to 2^(nbits-1) - 1 */
    caml_failwith("int_of_string");
  return res | 0;
}

//Provides: caml_mul const
function caml_mul(a,b){
  return Math.imul(a,b);
}

//Provides: caml_div
//Requires: caml_raise_zero_divide
function caml_div(x,y) {
  if (y == 0) caml_raise_zero_divide ();
  return (x/y)|0;
}

//Provides: caml_mod
//Requires: caml_raise_zero_divide
function caml_mod(x,y) {
  if (y == 0) caml_raise_zero_divide ();
  return x%y;
}

//Provides: caml_bswap16
function caml_bswap16(x) {
  return ((((x & 0x00FF) << 8) |
           ((x & 0xFF00) >> 8)));
}
//Provides: caml_int32_bswap
function caml_int32_bswap(x) {
  return (((x & 0x000000FF) << 24) |
          ((x & 0x0000FF00) << 8) |
          ((x & 0x00FF0000) >>> 8) |
          ((x & 0xFF000000) >>> 24));
}
//Provides: caml_int64_bswap
//Requires: caml_int64_to_bytes, caml_int64_of_bytes
function caml_int64_bswap(x) {
  var y = caml_int64_to_bytes(x);
  return caml_int64_of_bytes([y[7], y[6], y[5], y[4], y[3], y[2], y[1], y[0]]);
}

//# 1 "+io.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2014 Jérôme Vouillon, Hugo Heuzard
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Io

//Provides: caml_sys_close
//Requires: caml_global_data
function caml_sys_close(fd) {
  delete caml_global_data.fds[fd];
  return 0;
}

//Provides: caml_std_output
//Requires: caml_string_of_jsbytes, caml_ml_string_length, caml_ml_channels
function caml_std_output(chanid,s){
  var chan = caml_ml_channels[chanid];
  var str = caml_string_of_jsbytes(s);
  var slen = caml_ml_string_length(str);
  chan.file.write(chan.offset, str, 0, slen);
  chan.offset += slen;
  return 0;
}

//Provides: caml_sys_open
//Requires: caml_raise_sys_error, caml_global_data
//Requires: caml_create_bytes,MlFakeFile
//Requires: js_print_stderr, js_print_stdout
//Requires: caml_std_output
//Requires: resolve_fs_device
//Requires: caml_jsbytes_of_string
function caml_sys_open_internal(idx,output,file,flags) {
  if(caml_global_data.fds === undefined) caml_global_data.fds = new Array();
  flags=flags?flags:{};
  var info = {};
  info.file = file;
  info.offset = flags.append?file.length():0;
  info.flags = flags;
  info.output = output;
  caml_global_data.fds[idx] = info;
  if(!caml_global_data.fd_last_idx || idx > caml_global_data.fd_last_idx)
    caml_global_data.fd_last_idx = idx;
  return idx;
}
function caml_sys_open (name, flags, _perms) {
  var f = {};
  while(flags){
    switch(flags[1]){
    case 0: f.rdonly = 1;break;
    case 1: f.wronly = 1;break;
    case 2: f.append = 1;break;
    case 3: f.create = 1;break;
    case 4: f.truncate = 1;break;
    case 5: f.excl = 1; break;
    case 6: f.binary = 1;break;
    case 7: f.text = 1;break;
    case 8: f.nonblock = 1;break;
    }
    flags=flags[2];
  }
  if(f.rdonly && f.wronly)
    caml_raise_sys_error(caml_jsbytes_of_string(name) + " : flags Open_rdonly and Open_wronly are not compatible");
  if(f.text && f.binary)
    caml_raise_sys_error(caml_jsbytes_of_string(name) + " : flags Open_text and Open_binary are not compatible");
  var root = resolve_fs_device(name);
  var file = root.device.open(root.rest,f);
  var idx = caml_global_data.fd_last_idx?caml_global_data.fd_last_idx:0;
  return caml_sys_open_internal (idx+1,caml_std_output,file,f);
}
caml_sys_open_internal(0,caml_std_output, new MlFakeFile(caml_create_bytes(0))); //stdin
caml_sys_open_internal(1,js_print_stdout, new MlFakeFile(caml_create_bytes(0))); //stdout
caml_sys_open_internal(2,js_print_stderr, new MlFakeFile(caml_create_bytes(0))); //stderr


// ocaml Channels

//Provides: caml_ml_set_channel_name
function caml_ml_set_channel_name() {
  return 0
}

//Provides: caml_ml_channels
var caml_ml_channels = new Array();

//Provides: caml_ml_out_channels_list
//Requires: caml_ml_channels
function caml_ml_out_channels_list () {
  var l = 0;
  for(var c = 0; c < caml_ml_channels.length; c++){
    if(caml_ml_channels[c] && caml_ml_channels[c].opened && caml_ml_channels[c].out)
      l=[0,caml_ml_channels[c].fd,l];
  }
  return l;
}


//Provides: caml_ml_open_descriptor_out
//Requires: caml_ml_channels, caml_global_data
//Requires: caml_raise_sys_error
function caml_ml_open_descriptor_out (fd) {
  var data = caml_global_data.fds[fd];
  if(data.flags.rdonly) caml_raise_sys_error("fd "+ fd + " is readonly");
  var channel = {
    file:data.file,
    offset:data.offset,
    fd:fd,
    opened:true,
    out:true,
    buffer:""
  };
  caml_ml_channels[channel.fd]=channel;
  return channel.fd;
}

//Provides: caml_ml_open_descriptor_in
//Requires: caml_global_data,caml_sys_open,caml_raise_sys_error, caml_ml_channels
function caml_ml_open_descriptor_in (fd)  {
  var data = caml_global_data.fds[fd];
  if(data.flags.wronly) caml_raise_sys_error("fd "+ fd + " is writeonly");

  var channel = {
    file:data.file,
    offset:data.offset,
    fd:fd,
    opened:true,
    out: false,
    refill:null
  };
  caml_ml_channels[channel.fd]=channel;
  return channel.fd;
}


//Provides: caml_channel_descriptor
//Requires: caml_global_data, caml_ml_channels
function caml_channel_descriptor(chanid){
  var chan = caml_ml_channels[chanid];
  return chan.fd;
}


//Provides: caml_ml_set_binary_mode
//Requires: caml_global_data, caml_ml_channels
function caml_ml_set_binary_mode(chanid,mode){
  var chan = caml_ml_channels[chanid];
  var data = caml_global_data.fds[chan.fd];
  data.flags.text = !mode
  data.flags.binary = mode
  return 0;
}

//Input from in_channel

//Provides: caml_ml_close_channel
//Requires: caml_ml_flush, caml_ml_channels
//Requires: caml_sys_close
function caml_ml_close_channel (chanid) {
  var chan = caml_ml_channels[chanid];
  caml_ml_flush(chanid);
  chan.opened = false;
  chan.file.close();
  caml_sys_close(chan.fd)
  return 0;
}

//Provides: caml_ml_channel_size
//Requires: caml_ml_channels
function caml_ml_channel_size(chanid) {
  var chan = caml_ml_channels[chanid];
  return chan.file.length();
}

//Provides: caml_ml_channel_size_64
//Requires: caml_int64_of_float,caml_ml_channels
function caml_ml_channel_size_64(chanid) {
  var chan = caml_ml_channels[chanid];
  return caml_int64_of_float(chan.file.length ());
}

//Provides: caml_ml_set_channel_output
//Requires: caml_ml_channels, caml_global_data
function caml_ml_set_channel_output(chanid,f) {
  var chan = caml_ml_channels[chanid];
  caml_global_data.fds[chan.fd].output = f;
  return 0;
}

//Provides: caml_ml_set_channel_refill
//Requires: caml_ml_channels, caml_global_data
function caml_ml_set_channel_refill(chanid,f) {
  caml_ml_channels[chanid].refill = f;
  return 0;
}

//Provides: caml_ml_refill_input
//Requires: caml_ml_string_length
function caml_ml_refill_input (chan) {
  var str = chan.refill();
  var str_len = caml_ml_string_length(str);
  if (str_len == 0) chan.refill = null;
  chan.file.write(chan.file.length(), str, 0, str_len);
  return str_len;
}

//Provides: caml_ml_may_refill_input
//Requires: caml_ml_refill_input, caml_ml_channels
function caml_ml_may_refill_input (chanid) {
  var chan = caml_ml_channels[chanid];
  if (chan.refill == null) return;
  if (chan.file.length() != chan.offset) return;
  caml_ml_refill_input (chan);
}

//Provides: caml_ml_input
//Requires: caml_ml_refill_input, caml_ml_channels
function caml_ml_input (chanid, s, i, l) {
  var chan = caml_ml_channels[chanid];
  var l2 = chan.file.length() - chan.offset;
  if (l2 == 0 && chan.refill != null) l2 = caml_ml_refill_input(chan);
  if (l2 < l) l = l2;
  chan.file.read(chan.offset, s, i, l);
  chan.offset += l;
  return l;
}

//Provides: caml_input_value
//Requires: caml_marshal_data_size, caml_input_value_from_bytes, caml_create_bytes, caml_ml_channels
function caml_input_value (chanid) {
  var chan = caml_ml_channels[chanid];

  var buf = caml_create_bytes(8);
  chan.file.read(chan.offset,buf,0,8);

  // Header is 20 bytes
  var len = caml_marshal_data_size (buf, 0) + 20;

  var buf = caml_create_bytes(len);
  chan.file.read(chan.offset,buf,0,len);

  var offset = [0];
  var res = caml_input_value_from_bytes(buf, offset);
  chan.offset = chan.offset + offset[0];
  return res;
}

//Provides: caml_ml_input_char
//Requires: caml_raise_end_of_file, caml_array_bound_error
//Requires: caml_ml_may_refill_input, caml_ml_channels
function caml_ml_input_char (chanid) {
  var chan = caml_ml_channels[chanid];
  caml_ml_may_refill_input(chanid);
  if (chan.offset >= chan.file.length())
    caml_raise_end_of_file();
  var res = chan.file.read_one(chan.offset);
  chan.offset++;
  return res;
}

//Provides: caml_ml_input_int
//Requires: caml_raise_end_of_file
//Requires: caml_ml_refill_input, caml_ml_channels
function caml_ml_input_int (chanid) {
  var chan = caml_ml_channels[chanid];
  var file = chan.file;
  while ((chan.offset + 3) >= file.length()) {
    var l = caml_ml_refill_input(chan);
    if (l == 0) caml_raise_end_of_file();
  }
  var o = chan.offset;
  var r =(file.read_one(o  ) << 24)
      |  (file.read_one(o+1) << 16)
      |  (file.read_one(o+2) << 8)
      |  (file.read_one(o+3));
  chan.offset+=4;
  return r;
}

//Provides: caml_ml_seek_in
//Requires: caml_raise_sys_error, caml_ml_channels
function caml_ml_seek_in(chanid,pos){
  var chan = caml_ml_channels[chanid];
  if (chan.refill != null) caml_raise_sys_error("Illegal seek");
  chan.offset = pos;
  return 0;
}

//Provides: caml_ml_seek_in_64
//Requires: caml_int64_to_float, caml_raise_sys_error, caml_ml_channels
function caml_ml_seek_in_64(chanid,pos){
  var chan = caml_ml_channels[chanid];
  if (chan.refill != null) caml_raise_sys_error("Illegal seek");
  chan.offset = caml_int64_to_float(pos);
  return 0;
}

//Provides: caml_ml_pos_in
//Requires: caml_ml_channels
function caml_ml_pos_in(chanid) {return caml_ml_channels[chanid].offset}

//Provides: caml_ml_pos_in_64
//Requires: caml_int64_of_float, caml_ml_channels
function caml_ml_pos_in_64(chanid) {return caml_int64_of_float(caml_ml_channels[chanid].offset)}

//Provides: caml_ml_input_scan_line
//Requires: caml_array_bound_error
//Requires: caml_ml_may_refill_input, caml_ml_channels
function caml_ml_input_scan_line(chanid){
  var chan = caml_ml_channels[chanid];
  caml_ml_may_refill_input(chanid);
  var p = chan.offset;
  var len = chan.file.length();
  if(p >= len) { return 0;}
  while(true) {
    if(p >= len) return - (p - chan.offset);
    if(chan.file.read_one(p) == 10) return p - chan.offset + 1;
    p++;
  }
}

//Provides: caml_ml_flush
//Requires: caml_raise_sys_error, caml_global_data, caml_ml_channels
function caml_ml_flush (chanid) {
  var chan = caml_ml_channels[chanid];
  if(! chan.opened) caml_raise_sys_error("Cannot flush a closed channel");
  if(!chan.buffer || chan.buffer == "") return 0;
  if(chan.fd
     && caml_global_data.fds[chan.fd]
     && caml_global_data.fds[chan.fd].output) {
    var output = caml_global_data.fds[chan.fd].output;
    switch(output.length){
    case 2: output(chanid,chan.buffer);break;
    default: output(chan.buffer)
    };
  }
  chan.buffer = "";
  return 0;
}

//output to out_channel

//Provides: caml_ml_output_bytes
//Requires: caml_ml_flush,caml_ml_bytes_length
//Requires: caml_create_bytes, caml_blit_bytes, caml_raise_sys_error, caml_ml_channels, caml_string_of_bytes
//Requires: caml_jsbytes_of_string
function caml_ml_output_bytes(chanid,buffer,offset,len) {
  var chan = caml_ml_channels[chanid];
  if(! chan.opened) caml_raise_sys_error("Cannot output to a closed channel");
  var bytes;
  if(offset == 0 && caml_ml_bytes_length(buffer) == len)
    bytes = buffer;
  else {
    bytes = caml_create_bytes(len);
    caml_blit_bytes(buffer,offset,bytes,0,len);
  }
  var string = caml_string_of_bytes(bytes);
  var jsstring = caml_jsbytes_of_string(string);
  var id = jsstring.lastIndexOf("\n");
  if(id < 0)
    chan.buffer+=jsstring;
  else {
    chan.buffer+=jsstring.substr(0,id+1);
    caml_ml_flush (chanid);
    chan.buffer += jsstring.substr(id+1);
  }
  return 0;
}

//Provides: caml_ml_output
//Requires: caml_ml_output_bytes, caml_bytes_of_string
function caml_ml_output(chanid,buffer,offset,len){
  return caml_ml_output_bytes(chanid,caml_bytes_of_string(buffer),offset,len);
}

//Provides: caml_ml_output_char
//Requires: caml_ml_output
//Requires: caml_string_of_jsbytes
function caml_ml_output_char (chanid,c) {
  var s = caml_string_of_jsbytes(String.fromCharCode(c));
  caml_ml_output(chanid,s,0,1);
  return 0;
}

//Provides: caml_output_value
//Requires: caml_output_value_to_string, caml_ml_output,caml_ml_string_length
function caml_output_value (chanid,v,flags) {
  var s = caml_output_value_to_string(v, flags);
  caml_ml_output(chanid,s,0,caml_ml_string_length(s));
  return 0;
}


//Provides: caml_ml_seek_out
//Requires: caml_ml_channels, caml_ml_flush
function caml_ml_seek_out(chanid,pos){
  caml_ml_flush(chanid);
  caml_ml_channels[chanid].offset = pos;
  return 0;
}

//Provides: caml_ml_seek_out_64
//Requires: caml_int64_to_float, caml_ml_channels, caml_ml_flush
function caml_ml_seek_out_64(chanid,pos){
  caml_ml_flush(chanid);
  caml_ml_channels[chanid].offset = caml_int64_to_float(pos);
  return 0;
}

//Provides: caml_ml_pos_out
//Requires: caml_ml_channels, caml_ml_flush
function caml_ml_pos_out(chanid) {
  caml_ml_flush(chanid);
  return caml_ml_channels[chanid].offset
}

//Provides: caml_ml_pos_out_64
//Requires: caml_int64_of_float, caml_ml_channels, caml_ml_flush
function caml_ml_pos_out_64(chanid) {
  caml_ml_flush(chanid);
  return caml_int64_of_float (caml_ml_channels[chanid].offset);
}

//Provides: caml_ml_output_int
//Requires: caml_ml_output
//Requires: caml_string_of_array
function caml_ml_output_int (chanid,i) {
  var arr = [(i>>24) & 0xFF,(i>>16) & 0xFF,(i>>8) & 0xFF,i & 0xFF ];
  var s = caml_string_of_array(arr);
  caml_ml_output(chanid,s,0,4);
  return 0
}

//# 1 "+jslib.js"
// Js_of_ocaml library
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Jslib

//Provides: caml_js_pure_expr const
function caml_js_pure_expr (f) { return f(); }

//Provides: caml_js_set (mutable, const, const)
function caml_js_set(o,f,v) { o[f]=v;return 0}
//Provides: caml_js_get mutable (const, const)
function caml_js_get(o,f) { return o[f]; }
//Provides: caml_js_delete (mutable, const)
function caml_js_delete(o,f) { delete o[f]; return 0}

//Provides: caml_js_instanceof (const, const)
function caml_js_instanceof(o,c) { return o instanceof c; }

//Provides: caml_js_typeof (const)
function caml_js_typeof(o) { return typeof o; }

//Provides: caml_js_on_ie const
function caml_js_on_ie () {
  var ua =
      joo_global_object.navigator?joo_global_object.navigator.userAgent:"";
  return ua.indexOf("MSIE") != -1 && ua.indexOf("Opera") != 0;
}

//Provides: caml_js_html_escape const (const)
var caml_js_regexps = { amp:/&/g, lt:/</g, quot:/\"/g, all:/[&<\"]/ };
function caml_js_html_escape (s) {
  if (!caml_js_regexps.all.test(s)) return s;
  return s.replace(caml_js_regexps.amp, "&amp;")
    .replace(caml_js_regexps.lt, "&lt;")
    .replace(caml_js_regexps.quot, "&quot;");
}

//Provides: caml_js_html_entities
//Requires: caml_failwith
function caml_js_html_entities(s) {
  var entity = /^&#?[0-9a-zA-Z]+;$/
  if(s.match(entity))
  {
    var str, temp = document.createElement('p');
    temp.innerHTML= s;
    str= temp.textContent || temp.innerText;
    temp=null;
    return str;
  }
  else {
    caml_failwith("Invalid entity " + s);
  }
}

/////////// Debugging console
//Provides: caml_js_get_console const
function caml_js_get_console () {
  var c = joo_global_object.console?joo_global_object.console:{};
  var m = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
           "trace", "group", "groupCollapsed", "groupEnd", "time", "timeEnd"];
  function f () {}
  for (var i = 0; i < m.length; i++) if (!c[m[i]]) c[m[i]]=f;
  return c;
}

//Provides:caml_trampoline
function caml_trampoline(res) {
  var c = 1;
  while(res && res.joo_tramp){
    res = res.joo_tramp.apply(null, res.joo_args);
    c++;
  }
  return res;
}

//Provides:caml_trampoline_return
function caml_trampoline_return(f,args) {
  return {joo_tramp:f,joo_args:args};
}

//Provides: js_print_stdout (const)
//Requires: caml_utf16_of_utf8
function js_print_stdout(s) {
  var s = caml_utf16_of_utf8(s);
  var g = joo_global_object;
  if (g.process && g.process.stdout && g.process.stdout.write) {
    g.process.stdout.write(s)
  } else {
    // Do not output the last \n if present
    // as console logging display a newline at the end
    if(s.charCodeAt(s.length - 1) == 10)
      s = s.substr(0,s.length - 1 );
    var v = g.console;
    v  && v.log && v.log(s);
  }
}
//Provides: js_print_stderr (const)
//Requires: caml_utf16_of_utf8
function js_print_stderr(s) {
  var s = caml_utf16_of_utf8(s);
  var g = joo_global_object;
  if (g.process && g.process.stdout && g.process.stdout.write) {
    g.process.stderr.write(s)
  } else {
    // Do not output the last \n if present
    // as console logging display a newline at the end
    if(s.charCodeAt(s.length - 1) == 10)
      s = s.substr(0,s.length - 1 );
    var v = g.console;
    v && v.error && v.error(s);
  }
}


//Provides: caml_is_js
function caml_is_js() {
  return 1;
}



//Provides: caml_wrap_exception const (const)
//Requires: caml_global_data,caml_string_of_jsstring,caml_named_value
//Requires: caml_return_exn_constant
function caml_wrap_exception(e) {
  if(e instanceof Array) return e;
  //Stack_overflow: chrome, safari
  if(joo_global_object.RangeError
     && e instanceof joo_global_object.RangeError
     && e.message
     && e.message.match(/maximum call stack/i))
    return caml_return_exn_constant(caml_global_data.Stack_overflow);
  //Stack_overflow: firefox
  if(joo_global_object.InternalError
     && e instanceof joo_global_object.InternalError
     && e.message
     && e.message.match(/too much recursion/i))
    return caml_return_exn_constant(caml_global_data.Stack_overflow);
  //Wrap Error in Js.Error exception
  if(e instanceof joo_global_object.Error && caml_named_value("jsError"))
    return [0,caml_named_value("jsError"),e];
  //fallback: wrapped in Failure
  return [0,caml_global_data.Failure,caml_string_of_jsstring (String(e))];
}

// Experimental
//Provides: caml_exn_with_js_backtrace
//Requires: caml_global_data
function caml_exn_with_js_backtrace(exn, force) {
  //never reraise for constant exn
  if(!exn.js_error || force || exn[0] == 248) exn.js_error = new joo_global_object.Error("Js exception containing backtrace");
  return exn;
}

//Provides: caml_js_error_of_exception
function caml_js_error_of_exception(exn) {
  if(exn.js_error) { return exn.js_error; }
  return null;
}

//# 1 "+jslib_js_of_ocaml.js"
// Js_of_ocaml library
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Jslib: code specific to Js_of_ocaml

//Provides: caml_js_from_bool const (const)
function caml_js_from_bool(x) { return !!x; }
//Provides: caml_js_to_bool const (const)
function caml_js_to_bool(x) { return +x; }
//Provides: caml_js_from_float const (const)
function caml_js_from_float(x) { return x; }
//Provides: caml_js_to_float const (const)
function caml_js_to_float(x) { return x; }

//Provides: caml_js_from_array mutable (shallow)
function caml_js_from_array(a) {
  return a.slice(1);
}
//Provides: caml_js_to_array mutable (shallow)
function caml_js_to_array(a) {
  var len = a.length;
  var b = new Array(len+1);
  b[0] = 0;
  for(var i=0;i<len;i++) b[i+1] = a[i];
  return b;
}

//Provides: caml_list_of_js_array const (const)
function caml_list_of_js_array(a){
  var l = 0;
  for(var i=a.length - 1; i>=0; i--){
    var e = a[i];
    l = [0,e,l];
  }
  return l
}

//Provides: caml_list_to_js_array const (const)
function caml_list_to_js_array(l){
  var a = [];
  for(; l !== 0; l = l[2]) {
    a.push(l[1]);
  }
  return a;
}

//Provides: caml_js_var mutable (const)
//Requires: js_print_stderr
//Requires: caml_jsstring_of_string
function caml_js_var(x) {
  var x = caml_jsstring_of_string(x);
  //Checks that x has the form ident[.ident]*
  if(!x.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*(\.[a-zA-Z_$][a-zA-Z_$0-9]*)*$/)){
    js_print_stderr("caml_js_var: \"" + x + "\" is not a valid JavaScript variable. continuing ..");
    //joo_global_object.console.error("Js.Unsafe.eval_string")
  }
  return eval(x);
}
//Provides: caml_js_call (const, mutable, shallow)
//Requires: caml_js_from_array
function caml_js_call(f, o, args) { return f.apply(o, caml_js_from_array(args)); }
//Provides: caml_js_fun_call (const, shallow)
//Requires: caml_js_from_array
function caml_js_fun_call(f, a) {
  switch (a.length) {
  case 1: return f();
  case 2: return f (a[1]);
  case 3: return f (a[1],a[2]);
  case 4: return f (a[1],a[2],a[3]);
  case 5: return f (a[1],a[2],a[3],a[4]);
  case 6: return f (a[1],a[2],a[3],a[4],a[5]);
  case 7: return f (a[1],a[2],a[3],a[4],a[5],a[6]);
  case 8: return f (a[1],a[2],a[3],a[4],a[5],a[6],a[7]);
  }
  return f.apply(null, caml_js_from_array(a));
}
//Provides: caml_js_meth_call (mutable, const, shallow)
//Requires: caml_jsstring_of_string
//Requires: caml_js_from_array
function caml_js_meth_call(o, f, args) {
  return o[caml_jsstring_of_string(f)].apply(o, caml_js_from_array(args));
}
//Provides: caml_js_new (const, shallow)
//Requires: caml_js_from_array
function caml_js_new(c, a) {
  switch (a.length) {
  case 1: return new c;
  case 2: return new c (a[1]);
  case 3: return new c (a[1],a[2]);
  case 4: return new c (a[1],a[2],a[3]);
  case 5: return new c (a[1],a[2],a[3],a[4]);
  case 6: return new c (a[1],a[2],a[3],a[4],a[5]);
  case 7: return new c (a[1],a[2],a[3],a[4],a[5],a[6]);
  case 8: return new c (a[1],a[2],a[3],a[4],a[5],a[6],a[7]);
  }
  function F() { return c.apply(this, caml_js_from_array(a)); }
  F.prototype = c.prototype;
  return new F;
}
//Provides: caml_ojs_new_arr (const, shallow)
//Requires: caml_js_from_array
function caml_ojs_new_arr(c, a) {
  switch (a.length) {
  case 0: return new c;
  case 1: return new c (a[0]);
  case 2: return new c (a[0],a[1]);
  case 3: return new c (a[0],a[1],a[2]);
  case 4: return new c (a[0],a[1],a[2],a[3]);
  case 5: return new c (a[0],a[1],a[2],a[3],a[4]);
  case 6: return new c (a[0],a[1],a[2],a[3],a[4],a[5]);
  case 7: return new c (a[0],a[1],a[2],a[3],a[4],a[5],a[6]);
  }
  function F() { return c.apply(this, a); }
  F.prototype = c.prototype;
  return new F;
}
//Provides: caml_js_wrap_callback const (const)
//Requires: caml_call_gen
function caml_js_wrap_callback(f) {
  return function () {
    var len = arguments.length;
    if(len > 0){
      var args = new Array(len);
      for (var i = 0; i < len; i++) args[i] = arguments[i];
      return caml_call_gen(f, args);
    } else {
      return caml_call_gen(f, [undefined]);
    }
  }
}

//Provides: caml_js_wrap_callback_arguments
//Requires: caml_call_gen
function caml_js_wrap_callback_arguments(f) {
  return function() {
    var len = arguments.length;
    var args = new Array(len);
    for (var i = 0; i < len; i++) args[i] = arguments[i];
    return caml_call_gen(f, [args]);
  }
}
//Provides: caml_js_wrap_callback_strict const
//Requires: caml_call_gen
function caml_js_wrap_callback_strict(arity, f) {
  return function () {
    var n = arguments.length;
    if(n == arity && f.length == arity) return f.apply(null, arguments);
    var args = new Array(arity);
    var len = Math.min(arguments.length, arity)
    for (var i = 0; i < len; i++) args[i] = arguments[i];
    return caml_call_gen(f, args);
  };
}
//Provides: caml_js_wrap_meth_callback const (const)
//Requires: caml_call_gen
function caml_js_wrap_meth_callback(f) {
  return function () {
    var len = arguments.length;
    var args = new Array(len + 1);
    args[0] = this;
    for (var i = 0; i < len; i++) args[i+1] = arguments[i];
    return caml_call_gen(f,args);
  }
}
//Provides: caml_js_wrap_meth_callback_arguments const (const)
//Requires: caml_call_gen
function caml_js_wrap_meth_callback_arguments(f) {
  return function () {
    var len = arguments.length;
    var args = new Array(len);
    for (var i = 0; i < len; i++) args[i] = arguments[i];
    return caml_call_gen(f,[this,args]);
  }
}
//Provides: caml_js_wrap_meth_callback_strict const
//Requires: caml_call_gen
function caml_js_wrap_meth_callback_strict(arity, f) {
  return function () {
    var args = new Array(arity + 1);
    var len = Math.min(arguments.length, arity)
    args[0] = this;
    for (var i = 0; i < len; i++) args[i+1] = arguments[i];
    return caml_call_gen(f, args);
  };
}
//Provides: caml_js_wrap_meth_callback_unsafe const (const)
//Requires: caml_call_gen
function caml_js_wrap_meth_callback_unsafe(f) {
  return function () {
    var len = arguments.length;
    var args = new Array(len + 1);
    args[0] = this;
    for (var i = 0; i < len; i++) args[i+1] = arguments[i];
    return f.apply(null, args); }
}
//Provides: caml_js_equals mutable (const, const)
function caml_js_equals (x, y) { return +(x == y); }

//Provides: caml_js_eval_string (const)
//Requires: caml_jsstring_of_string
function caml_js_eval_string (s) {return eval(caml_jsstring_of_string(s));}

//Provides: caml_js_expr (const)
//Requires: js_print_stderr
//Requires: caml_jsstring_of_string
function caml_js_expr(s) {
  js_print_stderr("caml_js_expr: fallback to runtime evaluation\n");
  return eval(caml_jsstring_of_string(s));}

//Provides: caml_pure_js_expr const (const)
//Requires: js_print_stderr
//Requires: caml_jsstring_of_string
function caml_pure_js_expr (s){
  js_print_stderr("caml_pure_js_expr: fallback to runtime evaluation\n");
  return eval(caml_jsstring_of_string(s));}

//Provides: caml_js_object (object_literal)
//Requires: caml_jsstring_of_string
function caml_js_object (a) {
  var o = {};
  for (var i = 1; i < a.length; i++) {
    var p = a[i];
    o[caml_jsstring_of_string(p[1])] = p[2];
  }
  return o;
}


//Provides: caml_js_export_var
function caml_js_export_var (){
  if(typeof module !== 'undefined' && module && module.exports)
    return module.exports
  else
    return joo_global_object;
}


//Provides: caml_xmlhttprequest_create
//Requires: caml_failwith
//Weakdef
function caml_xmlhttprequest_create(unit){
  var g = joo_global_object;
  if(typeof g.XMLHttpRequest !== 'undefined') {
    try { return new g.XMLHttpRequest } catch (e) { };
  }
  if(typeof g.activeXObject !== 'undefined') {
    try { return new g.activeXObject("Msxml2.XMLHTTP") } catch(e){ };
    try { return new g.activeXObject("Msxml3.XMLHTTP") } catch(e){ };
    try { return new g.activeXObject("Microsoft.XMLHTTP") } catch(e){ };
  }
  caml_failwith("Cannot create a XMLHttpRequest");
}

//# 1 "+lexing.js"
/***********************************************************************/
/*                                                                     */
/*                           Objective Caml                            */
/*                                                                     */
/*            Xavier Leroy, projet Cristal, INRIA Rocquencourt         */
/*                                                                     */
/*  Copyright 1996 Institut National de Recherche en Informatique et   */
/*  en Automatique.  All rights reserved.  This file is distributed    */
/*  under the terms of the GNU Lesser General Public License, with     */
/*  the special exception on linking described in file ../LICENSE.     */
/*                                                                     */
/***********************************************************************/

/* $Id: lexing.c 6045 2004-01-01 16:42:43Z doligez $ */

/* The table-driven automaton for lexers generated by camllex. */

//Provides: caml_lex_array
//Requires: caml_jsbytes_of_string
function caml_lex_array(s) {
  s = caml_jsbytes_of_string(s);
  var l = s.length / 2;
  var a = new Array(l);
  for (var i = 0; i < l; i++)
    a[i] = (s.charCodeAt(2 * i) | (s.charCodeAt(2 * i + 1) << 8)) << 16 >> 16;
  return a;
}

//Provides: caml_lex_engine
//Requires: caml_failwith, caml_lex_array, caml_array_of_bytes
function caml_lex_engine(tbl, start_state, lexbuf) {
  var lex_buffer = 2;
  var lex_buffer_len = 3;
  var lex_start_pos = 5;
  var lex_curr_pos = 6;
  var lex_last_pos = 7;
  var lex_last_action = 8;
  var lex_eof_reached = 9;
  var lex_base = 1;
  var lex_backtrk = 2;
  var lex_default = 3;
  var lex_trans = 4;
  var lex_check = 5;

  if (!tbl.lex_default) {
    tbl.lex_base =    caml_lex_array (tbl[lex_base]);
    tbl.lex_backtrk = caml_lex_array (tbl[lex_backtrk]);
    tbl.lex_check =   caml_lex_array (tbl[lex_check]);
    tbl.lex_trans =   caml_lex_array (tbl[lex_trans]);
    tbl.lex_default = caml_lex_array (tbl[lex_default]);
  }

  var c, state = start_state;

  var buffer = caml_array_of_bytes(lexbuf[lex_buffer]);

  if (state >= 0) {
    /* First entry */
    lexbuf[lex_last_pos] = lexbuf[lex_start_pos] = lexbuf[lex_curr_pos];
    lexbuf[lex_last_action] = -1;
  } else {
    /* Reentry after refill */
    state = -state - 1;
  }
  for(;;) {
    /* Lookup base address or action number for current state */
    var base = tbl.lex_base[state];
    if (base < 0) return -base-1;
    /* See if it's a backtrack point */
    var backtrk = tbl.lex_backtrk[state];
    if (backtrk >= 0) {
      lexbuf[lex_last_pos] = lexbuf[lex_curr_pos];
      lexbuf[lex_last_action] = backtrk;
    }
    /* See if we need a refill */
    if (lexbuf[lex_curr_pos] >= lexbuf[lex_buffer_len]){
      if (lexbuf[lex_eof_reached] == 0)
        return -state - 1;
      else
        c = 256;
    }else{
      /* Read next input char */
      c = buffer[lexbuf[lex_curr_pos]];
      lexbuf[lex_curr_pos] ++;
    }
    /* Determine next state */
    if (tbl.lex_check[base + c] == state)
      state = tbl.lex_trans[base + c];
    else
      state = tbl.lex_default[state];
    /* If no transition on this char, return to last backtrack point */
    if (state < 0) {
      lexbuf[lex_curr_pos] = lexbuf[lex_last_pos];
      if (lexbuf[lex_last_action] == -1)
        caml_failwith("lexing: empty token");
      else
        return lexbuf[lex_last_action];
    }else{
      /* Erase the EOF condition only if the EOF pseudo-character was
         consumed by the automaton (i.e. there was no backtrack above)
      */
      if (c == 256) lexbuf[lex_eof_reached] = 0;
    }
  }
}

/***********************************************/
/* New lexer engine, with memory of positions  */
/***********************************************/

//Provides: caml_new_lex_engine
//Requires: caml_failwith, caml_lex_array
//Requires: caml_jsbytes_of_string, caml_array_of_bytes
function caml_lex_run_mem(s, i, mem, curr_pos) {
  for (;;) {
    var dst = s.charCodeAt(i); i++;
    if (dst == 0xff) return;
    var src = s.charCodeAt(i); i++;
    if (src == 0xff)
      mem [dst + 1] = curr_pos;
    else
      mem [dst + 1] = mem [src + 1];
  }
}

function caml_lex_run_tag(s, i, mem) {
  for (;;) {
    var dst = s.charCodeAt(i); i++;
    if (dst == 0xff) return ;
    var src = s.charCodeAt(i); i++;
    if (src == 0xff)
      mem [dst + 1] = -1;
    else
      mem [dst + 1] = mem [src + 1];
  }
}

function caml_new_lex_engine(tbl, start_state, lexbuf) {
  var lex_buffer = 2;
  var lex_buffer_len = 3;
  var lex_start_pos = 5;
  var lex_curr_pos = 6;
  var lex_last_pos = 7;
  var lex_last_action = 8;
  var lex_eof_reached = 9;
  var lex_mem = 10;
  var lex_base = 1;
  var lex_backtrk = 2;
  var lex_default = 3;
  var lex_trans = 4;
  var lex_check = 5;
  var lex_base_code = 6;
  var lex_backtrk_code = 7;
  var lex_default_code = 8;
  var lex_trans_code = 9;
  var lex_check_code = 10;
  var lex_code = 11;

  if (!tbl.lex_default) {
    tbl.lex_base =    caml_lex_array (tbl[lex_base]);
    tbl.lex_backtrk = caml_lex_array (tbl[lex_backtrk]);
    tbl.lex_check =   caml_lex_array (tbl[lex_check]);
    tbl.lex_trans =   caml_lex_array (tbl[lex_trans]);
    tbl.lex_default = caml_lex_array (tbl[lex_default]);
  }
  if (!tbl.lex_default_code) {
    tbl.lex_base_code =    caml_lex_array (tbl[lex_base_code]);
    tbl.lex_backtrk_code = caml_lex_array (tbl[lex_backtrk_code]);
    tbl.lex_check_code =   caml_lex_array (tbl[lex_check_code]);
    tbl.lex_trans_code =   caml_lex_array (tbl[lex_trans_code]);
    tbl.lex_default_code = caml_lex_array (tbl[lex_default_code]);
  }
  if (tbl.lex_code == null) tbl.lex_code = caml_jsbytes_of_string(tbl[lex_code]);

  var c, state = start_state;

  var buffer = caml_array_of_bytes(lexbuf[lex_buffer]);

  if (state >= 0) {
    /* First entry */
    lexbuf[lex_last_pos] = lexbuf[lex_start_pos] = lexbuf[lex_curr_pos];
    lexbuf[lex_last_action] = -1;
  } else {
    /* Reentry after refill */
    state = -state - 1;
  }
  for(;;) {
    /* Lookup base address or action number for current state */
    var base = tbl.lex_base[state];
    if (base < 0) {
      var pc_off = tbl.lex_base_code[state];
      caml_lex_run_tag(tbl.lex_code, pc_off, lexbuf[lex_mem]);
      return -base-1;
    }
    /* See if it's a backtrack point */
    var backtrk = tbl.lex_backtrk[state];
    if (backtrk >= 0) {
      var pc_off = tbl.lex_backtrk_code[state];
      caml_lex_run_tag(tbl.lex_code, pc_off, lexbuf[lex_mem]);
      lexbuf[lex_last_pos] = lexbuf[lex_curr_pos];
      lexbuf[lex_last_action] = backtrk;
    }
    /* See if we need a refill */
    if (lexbuf[lex_curr_pos] >= lexbuf[lex_buffer_len]){
      if (lexbuf[lex_eof_reached] == 0)
        return -state - 1;
      else
        c = 256;
    }else{
      /* Read next input char */
      c = buffer[lexbuf[lex_curr_pos]];
      lexbuf[lex_curr_pos] ++;
    }
    /* Determine next state */
    var pstate = state ;
    if (tbl.lex_check[base + c] == state)
      state = tbl.lex_trans[base + c];
    else
      state = tbl.lex_default[state];
    /* If no transition on this char, return to last backtrack point */
    if (state < 0) {
      lexbuf[lex_curr_pos] = lexbuf[lex_last_pos];
      if (lexbuf[lex_last_action] == -1)
        caml_failwith("lexing: empty token");
      else
        return lexbuf[lex_last_action];
    }else{
      /* If some transition, get and perform memory moves */
      var base_code = tbl.lex_base_code[pstate], pc_off;
      if (tbl.lex_check_code[base_code + c] == pstate)
        pc_off = tbl.lex_trans_code[base_code + c];
      else
        pc_off = tbl.lex_default_code[pstate];
      if (pc_off > 0)
        caml_lex_run_mem
      (tbl.lex_code, pc_off, lexbuf[lex_mem], lexbuf[lex_curr_pos]);
      /* Erase the EOF condition only if the EOF pseudo-character was
         consumed by the automaton (i.e. there was no backtrack above)
      */
      if (c == 256) lexbuf[lex_eof_reached] = 0;
    }
  }
}

//# 1 "+marshal.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_marshal_constants
var caml_marshal_constants = {
  PREFIX_SMALL_BLOCK:         0x80,
  PREFIX_SMALL_INT:           0x40,
  PREFIX_SMALL_STRING:        0x20,
  CODE_INT8:                  0x00,
  CODE_INT16:                 0x01,
  CODE_INT32:                 0x02,
  CODE_INT64:                 0x03,
  CODE_SHARED8:               0x04,
  CODE_SHARED16:              0x05,
  CODE_SHARED32:              0x06,
  CODE_BLOCK32:               0x08,
  CODE_BLOCK64:               0x13,
  CODE_STRING8:               0x09,
  CODE_STRING32:              0x0A,
  CODE_DOUBLE_BIG:            0x0B,
  CODE_DOUBLE_LITTLE:         0x0C,
  CODE_DOUBLE_ARRAY8_BIG:     0x0D,
  CODE_DOUBLE_ARRAY8_LITTLE:  0x0E,
  CODE_DOUBLE_ARRAY32_BIG:    0x0F,
  CODE_DOUBLE_ARRAY32_LITTLE: 0x07,
  CODE_CODEPOINTER:           0x10,
  CODE_INFIXPOINTER:          0x11,
  CODE_CUSTOM:                0x12,
  CODE_CUSTOM_LEN:            0x18,
  CODE_CUSTOM_FIXED:          0x19
}


//Provides: MlStringReader
//Requires: caml_string_of_jsbytes, caml_jsbytes_of_string
function MlStringReader (s, i) { this.s = caml_jsbytes_of_string(s); this.i = i; }
MlStringReader.prototype = {
  read8u:function () { return this.s.charCodeAt(this.i++); },
  read8s:function () { return this.s.charCodeAt(this.i++) << 24 >> 24; },
  read16u:function () {
    var s = this.s, i = this.i;
    this.i = i + 2;
    return (s.charCodeAt(i) << 8) | s.charCodeAt(i + 1)
  },
  read16s:function () {
    var s = this.s, i = this.i;
    this.i = i + 2;
    return (s.charCodeAt(i) << 24 >> 16) | s.charCodeAt(i + 1);
  },
  read32u:function () {
    var s = this.s, i = this.i;
    this.i = i + 4;
    return ((s.charCodeAt(i) << 24) | (s.charCodeAt(i+1) << 16) |
            (s.charCodeAt(i+2) << 8) | s.charCodeAt(i+3)) >>> 0;
  },
  read32s:function () {
    var s = this.s, i = this.i;
    this.i = i + 4;
    return (s.charCodeAt(i) << 24) | (s.charCodeAt(i+1) << 16) |
      (s.charCodeAt(i+2) << 8) | s.charCodeAt(i+3);
  },
  readstr:function (len) {
    var i = this.i;
    this.i = i + len;
    return caml_string_of_jsbytes(this.s.substring(i, i + len));
  }
}

//Provides: BigStringReader
//Requires: caml_string_of_array, caml_ba_get_1
function BigStringReader (bs, i) { this.s = bs; this.i = i; }
BigStringReader.prototype = {
  read8u:function () { return caml_ba_get_1(this.s,this.i++); },
  read8s:function () { return caml_ba_get_1(this.s,this.i++) << 24 >> 24; },
  read16u:function () {
    var s = this.s, i = this.i;
    this.i = i + 2;
    return (caml_ba_get_1(s,i) << 8) | caml_ba_get_1(s,i + 1)
  },
  read16s:function () {
    var s = this.s, i = this.i;
    this.i = i + 2;
    return (caml_ba_get_1(s,i) << 24 >> 16) | caml_ba_get_1(s,i + 1);
  },
  read32u:function () {
    var s = this.s, i = this.i;
    this.i = i + 4;
    return ((caml_ba_get_1(s,i)   << 24) | (caml_ba_get_1(s,i+1) << 16) |
            (caml_ba_get_1(s,i+2) << 8)  | caml_ba_get_1(s,i+3)         ) >>> 0;
  },
  read32s:function () {
    var s = this.s, i = this.i;
    this.i = i + 4;
    return (caml_ba_get_1(s,i)   << 24) | (caml_ba_get_1(s,i+1) << 16) |
      (caml_ba_get_1(s,i+2) << 8)  | caml_ba_get_1(s,i+3);
  },
  readstr:function (len) {
    var i = this.i;
    var arr = new Array(len)
    for(var j = 0; j < len; j++){
      arr[j] = caml_ba_get_1(this.s, i+j);
    }
    this.i = i + len;
    return caml_string_of_array(arr);
  }
}



//Provides: caml_float_of_bytes
//Requires: caml_int64_float_of_bits, caml_int64_of_bytes
function caml_float_of_bytes (a) {
  return caml_int64_float_of_bits (caml_int64_of_bytes (a));
}

//Provides: caml_input_value_from_string mutable
//Requires: MlStringReader, caml_input_value_from_reader
function caml_input_value_from_string(s,ofs) {
  var reader = new MlStringReader (s, typeof ofs=="number"?ofs:ofs[0]);
  return caml_input_value_from_reader(reader, ofs)
}

//Provides: caml_input_value_from_bytes mutable
//Requires: MlStringReader, caml_input_value_from_reader, caml_string_of_bytes
function caml_input_value_from_bytes(s,ofs) {
  var reader = new MlStringReader (caml_string_of_bytes(s), typeof ofs=="number"?ofs:ofs[0]);
  return caml_input_value_from_reader(reader, ofs)
}

//Provides: caml_int64_unmarshal
//Requires: caml_int64_of_bytes
function caml_int64_unmarshal(reader, size){
  var t = new Array(8);;
  for (var j = 0;j < 8;j++) t[j] = reader.read8u();
  size[0] = 8;
  return caml_int64_of_bytes (t);
}

//Provides: caml_int64_marshal
//Requires: caml_int64_to_bytes
function caml_int64_marshal(writer, v, sizes) {
  var b = caml_int64_to_bytes (v);
  for (var i = 0; i < 8; i++) writer.write (8, b[i]);
  sizes[0] = 8; sizes[1] = 8;
}

//Provides: caml_int32_unmarshal
function caml_int32_unmarshal(reader, size){
  size[0] = 4;
  return reader.read32s ();
}

//Provides: caml_nativeint_unmarshal
//Requires: caml_failwith
function caml_nativeint_unmarshal(reader, size){
  switch (reader.read8u ()) {
  case 1:
    size[0] = 4;
    return reader.read32s ();
  case 2:
    caml_failwith("input_value: native integer value too large");
  default: caml_failwith("input_value: ill-formed native integer");
  }
}

//Provides: caml_custom_ops
//Requires: caml_int64_unmarshal, caml_int64_marshal, caml_int64_compare, caml_int64_hash
//Requires: caml_int32_unmarshal, caml_nativeint_unmarshal
//Requires: caml_ba_serialize, caml_ba_deserialize, caml_ba_compare, caml_ba_hash
var caml_custom_ops =
    {"_j": {
      deserialize : caml_int64_unmarshal,
      serialize  : caml_int64_marshal,
      fixed_length : 8,
      compare : caml_int64_compare,
      hash : caml_int64_hash
    },
     "_i": {
       deserialize : caml_int32_unmarshal,
       fixed_length : 4,
     },
     "_n": {
       deserialize : caml_nativeint_unmarshal,
       fixed_length : 4,
     },
     "_bigarray":{
       deserialize : (function (reader, sz) {return caml_ba_deserialize (reader,sz,"_bigarray")}),
       serialize : caml_ba_serialize,
       compare : caml_ba_compare,
       hash: caml_ba_hash,
     },
     "_bigarr02":{
       deserialize : (function (reader, sz) {return caml_ba_deserialize (reader,sz,"_bigarr02")}),
       serialize : caml_ba_serialize,
       compare : caml_ba_compare,
       hash: caml_ba_hash,
     }
    }

//Provides: caml_input_value_from_reader mutable
//Requires: caml_failwith
//Requires: caml_float_of_bytes, caml_custom_ops

function caml_input_value_from_reader(reader, ofs) {
  var _magic = reader.read32u ()
  var _block_len = reader.read32u ();
  var num_objects = reader.read32u ();
  var _size_32 = reader.read32u ();
  var _size_64 = reader.read32u ();
  var stack = [];
  var intern_obj_table = (num_objects > 0)?[]:null;
  var obj_counter = 0;
  function intern_rec () {
    var code = reader.read8u ();
    if (code >= 0x40 /*cst.PREFIX_SMALL_INT*/) {
      if (code >= 0x80 /*cst.PREFIX_SMALL_BLOCK*/) {
        var tag = code & 0xF;
        var size = (code >> 4) & 0x7;
        var v = [tag];
        if (size == 0) return v;
        if (intern_obj_table) intern_obj_table[obj_counter++] = v;
        stack.push(v, size);
        return v;
      } else
        return (code & 0x3F);
    } else {
      if (code >= 0x20/*cst.PREFIX_SMALL_STRING */) {
        var len = code & 0x1F;
        var v = reader.readstr (len);
        if (intern_obj_table) intern_obj_table[obj_counter++] = v;
        return v;
      } else {
        switch(code) {
        case 0x00: //cst.CODE_INT8:
          return reader.read8s ();
        case 0x01: //cst.CODE_INT16:
          return reader.read16s ();
        case 0x02: //cst.CODE_INT32:
          return reader.read32s ();
        case 0x03: //cst.CODE_INT64:
          caml_failwith("input_value: integer too large");
          break;
        case 0x04: //cst.CODE_SHARED8:
          var offset = reader.read8u ();
          return intern_obj_table[obj_counter - offset];
        case 0x05: //cst.CODE_SHARED16:
          var offset = reader.read16u ();
          return intern_obj_table[obj_counter - offset];
        case 0x06: //cst.CODE_SHARED32:
          var offset = reader.read32u ();
          return intern_obj_table[obj_counter - offset];
        case 0x08: //cst.CODE_BLOCK32:
          var header = reader.read32u ();
          var tag = header & 0xFF;
          var size = header >> 10;
          var v = [tag];
          if (size == 0) return v;
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          stack.push(v, size);
          return v;
        case 0x13: //cst.CODE_BLOCK64:
          caml_failwith ("input_value: data block too large");
          break;
        case 0x09: //cst.CODE_STRING8:
          var len = reader.read8u();
          var v = reader.readstr (len);
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          return v;
        case 0x0A: //cst.CODE_STRING32:
          var len = reader.read32u();
          var v = reader.readstr (len);
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          return v;
        case 0x0C: //cst.CODE_DOUBLE_LITTLE:
          var t = new Array(8);;
          for (var i = 0;i < 8;i++) t[7 - i] = reader.read8u ();
          var v = caml_float_of_bytes (t);
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          return v;
        case 0x0B: //cst.CODE_DOUBLE_BIG:
          var t = new Array(8);;
          for (var i = 0;i < 8;i++) t[i] = reader.read8u ();
          var v = caml_float_of_bytes (t);
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          return v;
        case 0x0E: //cst.CODE_DOUBLE_ARRAY8_LITTLE:
          var len = reader.read8u();
          var v = new Array(len+1);
          v[0] = 254;
          var t = new Array(8);;
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          for (var i = 1;i <= len;i++) {
            for (var j = 0;j < 8;j++) t[7 - j] = reader.read8u();
            v[i] = caml_float_of_bytes (t);
          }
          return v;
        case 0x0D: //cst.CODE_DOUBLE_ARRAY8_BIG:
          var len = reader.read8u();
          var v = new Array(len+1);
          v[0] = 254;
          var t = new Array(8);;
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          for (var i = 1;i <= len;i++) {
            for (var j = 0;j < 8;j++) t[j] = reader.read8u();
            v [i] = caml_float_of_bytes (t);
          }
          return v;
        case 0x07: //cst.CODE_DOUBLE_ARRAY32_LITTLE:
          var len = reader.read32u();
          var v = new Array(len+1);
          v[0] = 254;
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          var t = new Array(8);;
          for (var i = 1;i <= len;i++) {
            for (var j = 0;j < 8;j++) t[7 - j] = reader.read8u();
            v[i] = caml_float_of_bytes (t);
          }
          return v;
        case 0x0F: //cst.CODE_DOUBLE_ARRAY32_BIG:
          var len = reader.read32u();
          var v = new Array(len+1);
          v[0] = 254;
          var t = new Array(8);;
          for (var i = 1;i <= len;i++) {
            for (var j = 0;j < 8;j++) t[j] = reader.read8u();
            v [i] = caml_float_of_bytes (t);
          }
          return v;
        case 0x10: //cst.CODE_CODEPOINTER:
        case 0x11: //cst.CODE_INFIXPOINTER:
          caml_failwith ("input_value: code pointer");
          break;
        case 0x12: //cst.CODE_CUSTOM:
        case 0x18: //cst.CODE_CUSTOM_LEN:
        case 0x19: //cst.CODE_CUSTOM_FIXED:
          var c, s = "";
          while ((c = reader.read8u ()) != 0) s += String.fromCharCode (c);
          var ops = caml_custom_ops[s];
          var expected_size;
          if(!ops)
            caml_failwith("input_value: unknown custom block identifier");
          switch(code){
          case 0x12: // cst.CODE_CUSTOM (deprecated)
            break;
          case 0x19: // cst.CODE_CUSTOM_FIXED
            if(!ops.fixed_length)
              caml_failwith("input_value: expected a fixed-size custom block");
            expected_size = ops.fixed_length;
            break;
          case 0x18: // cst.CODE_CUSTOM_LEN
            expected_size = reader.read32u ();
            // Skip size64
            reader.read32s(); reader.read32s();
            break;
          }
          var old_pos = reader.i;
          var size = [0];
          var v = ops.deserialize(reader, size);
          if(expected_size != undefined){
            if(expected_size != size[0])
              caml_failwith("input_value: incorrect length of serialized custom block");
          }
          if (intern_obj_table) intern_obj_table[obj_counter++] = v;
          return v;
        default:
          caml_failwith ("input_value: ill-formed message");
        }
      }
    }
  }
  var res = intern_rec ();
  while (stack.length > 0) {
    var size = stack.pop();
    var v = stack.pop();
    var d = v.length;
    if (d < size) stack.push(v, size);
    v[d] = intern_rec ();
  }
  if (typeof ofs!="number") ofs[0] = reader.i;
  return res;
}

//Provides: caml_marshal_data_size mutable
//Requires: caml_failwith, caml_bytes_unsafe_get
function caml_marshal_data_size (s, ofs) {
  function get32(s,i) {
    return (caml_bytes_unsafe_get(s, i) << 24) |
      (caml_bytes_unsafe_get(s, i + 1) << 16) |
      (caml_bytes_unsafe_get(s, i + 2) << 8) |
      caml_bytes_unsafe_get(s, i + 3);
  }
  if (get32(s, ofs) != (0x8495A6BE|0))
    caml_failwith("Marshal.data_size: bad object");
  return (get32(s, ofs + 4));
}

//Provides: MlObjectTable
var MlObjectTable;
if (typeof joo_global_object.WeakMap === 'undefined') {
  MlObjectTable = function() {
    /* polyfill (using linear search) */
    function NaiveLookup(objs) { this.objs = objs; }
    NaiveLookup.prototype.get = function(v) {
      for (var i = 0; i < this.objs.length; i++) {
        if (this.objs[i] === v) return i;
      }
    };
    NaiveLookup.prototype.set = function() {
      // Do nothing here. [MlObjectTable.store] will push to [this.objs] directly.
    };

    return function MlObjectTable() {
      this.objs = []; this.lookup = new NaiveLookup(this.objs);
    };
  }();
}
else {
  MlObjectTable = function MlObjectTable() {
    this.objs = []; this.lookup = new joo_global_object.WeakMap();
  };
}

MlObjectTable.prototype.store = function(v) {
  this.lookup.set(v, this.objs.length);
  this.objs.push(v);
}

MlObjectTable.prototype.recall = function(v) {
  var i = this.lookup.get(v);
  return (i === undefined)
    ? undefined : this.objs.length - i;   /* index is relative */
}

//Provides: caml_legacy_custom_code
//Version: >= 4.08
var caml_legacy_custom_code = false

//Provides: caml_legacy_custom_code
//Version: < 4.08
var caml_legacy_custom_code = true

//Provides: caml_output_val
//Requires: caml_int64_to_bytes, caml_failwith
//Requires: caml_int64_bits_of_float
//Requires: caml_is_ml_bytes, caml_ml_bytes_length, caml_bytes_unsafe_get
//Requires: caml_is_ml_string, caml_ml_string_length, caml_string_unsafe_get
//Requires: MlObjectTable, caml_list_to_js_array, caml_legacy_custom_code, caml_custom_ops
//Requires: caml_invalid_argument,caml_string_of_jsbytes
var caml_output_val = function (){
  function Writer () { this.chunk = []; }
  Writer.prototype = {
    chunk_idx:20, block_len:0, obj_counter:0, size_32:0, size_64:0,
    write:function (size, value) {
      for (var i = size - 8;i >= 0;i -= 8)
        this.chunk[this.chunk_idx++] = (value >> i) & 0xFF;
    },
    write_at:function (pos, size, value) {
      var pos = pos;
      for (var i = size - 8;i >= 0;i -= 8)
        this.chunk[pos++] = (value >> i) & 0xFF;
    },
    write_code:function (size, code, value) {
      this.chunk[this.chunk_idx++] = code;
      for (var i = size - 8;i >= 0;i -= 8)
        this.chunk[this.chunk_idx++] = (value >> i) & 0xFF;
    },
    write_shared:function (offset) {
      if (offset < (1 << 8)) this.write_code(8, 0x04 /*cst.CODE_SHARED8*/, offset);
      else if (offset < (1 << 16)) this.write_code(16, 0x05 /*cst.CODE_SHARED16*/, offset);
      else this.write_code(32, 0x06 /*cst.CODE_SHARED32*/, offset);
    },
    pos:function () { return this.chunk_idx },
    finalize:function () {
      this.block_len = this.chunk_idx - 20;
      this.chunk_idx = 0;
      this.write (32, 0x8495A6BE);
      this.write (32, this.block_len);
      this.write (32, this.obj_counter);
      this.write (32, this.size_32);
      this.write (32, this.size_64);
      return this.chunk;
    }
  }
  return function (v, flags) {
    flags = caml_list_to_js_array(flags);

    var no_sharing = (flags.indexOf(0 /*Marshal.No_sharing*/) !== -1),
        closures =  (flags.indexOf(1 /*Marshal.Closures*/) !== -1);
        /* Marshal.Compat_32 is redundant since integers are 32-bit anyway */

    if (closures)
      joo_global_object.console.warn("in caml_output_val: flag Marshal.Closures is not supported.");

    var writer = new Writer ();
    var stack = [];
    var intern_obj_table = no_sharing ? null : new MlObjectTable();

    function memo(v) {
      if (no_sharing) return false;
      var existing_offset = intern_obj_table.recall(v);
      if (existing_offset) { writer.write_shared(existing_offset); return true; }
      else { intern_obj_table.store(v); return false; }
    }

    function extern_rec (v) {
      if (v.caml_custom) {
        if (memo(v)) return;
        var name = v.caml_custom;
        var ops = caml_custom_ops[name];
        var sz_32_64 = [0,0];
        if(!ops.serialize)
          caml_invalid_argument("output_value: abstract value (Custom)");
        if(caml_legacy_custom_code) {
          writer.write (8, 0x12 /*cst.CODE_CUSTOM*/);
          for (var i = 0; i < name.length; i++)
            writer.write (8, name.charCodeAt(i));
          writer.write(8, 0);
          ops.serialize(writer, v, sz_32_64);
        } else if(ops.fixed_length == undefined){
          writer.write (8, 0x18 /*cst.CODE_CUSTOM_LEN*/);
          for (var i = 0; i < name.length; i++)
            writer.write (8, name.charCodeAt(i));
          writer.write(8, 0);
          var header_pos = writer.pos ();
          for(var i = 0; i < 12; i++) {
            writer.write(8, 0);
          }
          ops.serialize(writer, v, sz_32_64);
          writer.write_at(header_pos, 32, sz_32_64[0]);
          writer.write_at(header_pos + 4, 32, 0); // zero
          writer.write_at(header_pos + 8, 32, sz_32_64[1]);
        } else {
          writer.write (8, 0x19 /*cst.CODE_CUSTOM_FIXED*/);
          for (var i = 0; i < name.length; i++)
            writer.write (8, name.charCodeAt(i));
          writer.write(8, 0);
          var old_pos = writer.pos();
          ops.serialize(writer, v, sz_32_64);
          if (ops.fixed_length != writer.pos() - old_pos)
            caml_failwith("output_value: incorrect fixed sizes specified by " + name);
        }
        writer.size_32 += 2 + ((sz_32_64[0] + 3) >> 2);
        writer.size_64 += 2 + ((sz_32_64[1] + 7) >> 3);
      }
      else if (v instanceof Array && v[0] === (v[0]|0)) {
        if (v[0] == 251) {
          caml_failwith("output_value: abstract value (Abstract)");
        }
        if (v.length > 1 && memo(v)) return;
        if (v[0] < 16 && v.length - 1 < 8)
          writer.write (8, 0x80 /*cst.PREFIX_SMALL_BLOCK*/ + v[0] + ((v.length - 1)<<4));
        else
          writer.write_code(32, 0x08 /*cst.CODE_BLOCK32*/, ((v.length-1) << 10) | v[0]);
        writer.size_32 += v.length;
        writer.size_64 += v.length;
        if (v.length > 1) stack.push (v, 1);
      } else if (caml_is_ml_bytes(v)) {
        if(!(caml_is_ml_bytes(caml_string_of_jsbytes("")))) {
          caml_failwith("output_value: [Bytes.t] cannot safely be marshaled with [--enable use-js-string]");
        }
        if (memo(v)) return;
        var len = caml_ml_bytes_length(v);
        if (len < 0x20)
          writer.write (8, 0x20 /*cst.PREFIX_SMALL_STRING*/ + len);
        else if (len < 0x100)
          writer.write_code (8, 0x09/*cst.CODE_STRING8*/, len);
        else
          writer.write_code (32, 0x0A /*cst.CODE_STRING32*/, len);
        for (var i = 0;i < len;i++)
          writer.write (8, caml_bytes_unsafe_get(v,i));
        writer.size_32 += 1 + (((len + 4) / 4)|0);
        writer.size_64 += 1 + (((len + 8) / 8)|0);
      } else if (caml_is_ml_string(v)) {
        var len = caml_ml_string_length(v);
        if (len < 0x20)
          writer.write (8, 0x20 /*cst.PREFIX_SMALL_STRING*/ + len);
        else if (len < 0x100)
          writer.write_code (8, 0x09/*cst.CODE_STRING8*/, len);
        else
          writer.write_code (32, 0x0A /*cst.CODE_STRING32*/, len);
        for (var i = 0;i < len;i++)
          writer.write (8, caml_string_unsafe_get(v,i));
        writer.size_32 += 1 + (((len + 4) / 4)|0);
        writer.size_64 += 1 + (((len + 8) / 8)|0);
      } else {
        if (v != (v|0)){
          var type_of_v = typeof v;
          //
          // If a float happens to be an integer it is serialized as an integer
          // (Js_of_ocaml cannot tell whether the type of an integer number is
          // float or integer.) This can result in unexpected crashes when
          // unmarshalling using the standard runtime. It seems better to
          // systematically fail on marshalling.
          //
          //          if(type_of_v != "number")
          caml_failwith("output_value: abstract value ("+type_of_v+")");
          //          var t = caml_int64_to_bytes(caml_int64_bits_of_float(v));
          //          writer.write (8, 0x0B /*cst.CODE_DOUBLE_BIG*/);
          //          for(var i = 0; i<8; i++){writer.write(8,t[i])}
        }
        else if (v >= 0 && v < 0x40) {
          writer.write (8, 0X40 /*cst.PREFIX_SMALL_INT*/ + v);
        } else {
          if (v >= -(1 << 7) && v < (1 << 7))
            writer.write_code(8, 0x00 /*cst.CODE_INT8*/, v);
          else if (v >= -(1 << 15) && v < (1 << 15))
            writer.write_code(16, 0x01 /*cst.CODE_INT16*/, v);
          else
            writer.write_code(32, 0x02 /*cst.CODE_INT32*/, v);
        }
      }
    }
    extern_rec (v);
    while (stack.length > 0) {
      var i = stack.pop ();
      var v = stack.pop ();
      if (i + 1 < v.length) stack.push (v, i + 1);
      extern_rec (v[i]);
    }
    if (intern_obj_table) writer.obj_counter = intern_obj_table.objs.length;
    writer.finalize();
    return writer.chunk;
  }
} ();

//Provides: caml_output_value_to_string mutable
//Requires: caml_output_val, caml_string_of_array
function caml_output_value_to_string (v, flags) {
  return caml_string_of_array (caml_output_val (v, flags));
}

//Provides: caml_output_value_to_bytes mutable
//Requires: caml_output_val, caml_bytes_of_array
function caml_output_value_to_bytes (v, flags) {
  return caml_bytes_of_array (caml_output_val (v, flags));
}

//Provides: caml_output_value_to_buffer
//Requires: caml_output_val, caml_failwith, caml_blit_bytes
function caml_output_value_to_buffer (s, ofs, len, v, flags) {
  var t = caml_output_val (v, flags);
  if (t.length > len) caml_failwith ("Marshal.to_buffer: buffer overflow");
  caml_blit_bytes(t, 0, s, ofs, t.length);
  return 0;
}

//# 1 "+md5.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.


//Provides: caml_md5_chan
//Requires: caml_md5_string, caml_string_of_array,caml_ml_channels
//Requires: caml_raise_end_of_file, caml_create_bytes, caml_string_of_bytes
function caml_md5_chan(chanid,len){
  var chan = caml_ml_channels[chanid];
  var chan_len = chan.file.length();
  if(len<0) len = chan_len - chan.offset;
  if(chan.offset + len > chan_len) caml_raise_end_of_file();
  var buf = caml_create_bytes(len);
  chan.file.read(chan.offset,buf,0,len);
  return caml_md5_string(caml_string_of_bytes(buf),0,len);
}

//Provides: caml_md5_string
//Requires: caml_bytes_of_string, caml_md5_bytes
function caml_md5_string(s, ofs, len) {
  return caml_md5_bytes(caml_bytes_of_string(s),ofs,len);
}

//Provides: caml_md5_bytes
//Requires: caml_string_of_array, caml_convert_string_to_bytes
var caml_md5_bytes = function () {
  function add (x, y) { return (x + y) | 0; }
  function xx(q,a,b,x,s,t) {
    a = add(add(a, q), add(x, t));
    return add((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a,b,c,d,x,s,t) {
    return xx((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function gg(a,b,c,d,x,s,t) {
    return xx((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function hh(a,b,c,d,x,s,t) { return xx(b ^ c ^ d, a, b, x, s, t); }
  function ii(a,b,c,d,x,s,t) { return xx(c ^ (b | (~d)), a, b, x, s, t); }

  function md5(buffer, length) {
    var i = length;
    buffer[i >> 2] |= 0x80 << (8 * (i & 3));
    for (i = (i & ~0x3) + 8;(i & 0x3F) < 60 ;i += 4)
      buffer[(i >> 2) - 1] = 0;
    buffer[(i >> 2) -1] = length << 3;
    buffer[i >> 2] = (length >> 29) & 0x1FFFFFFF;

    var w = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476];

    for(i = 0; i < buffer.length; i += 16) {
      var a = w[0], b = w[1], c = w[2], d = w[3];

      a = ff(a, b, c, d, buffer[i+ 0], 7, 0xD76AA478);
      d = ff(d, a, b, c, buffer[i+ 1], 12, 0xE8C7B756);
      c = ff(c, d, a, b, buffer[i+ 2], 17, 0x242070DB);
      b = ff(b, c, d, a, buffer[i+ 3], 22, 0xC1BDCEEE);
      a = ff(a, b, c, d, buffer[i+ 4], 7, 0xF57C0FAF);
      d = ff(d, a, b, c, buffer[i+ 5], 12, 0x4787C62A);
      c = ff(c, d, a, b, buffer[i+ 6], 17, 0xA8304613);
      b = ff(b, c, d, a, buffer[i+ 7], 22, 0xFD469501);
      a = ff(a, b, c, d, buffer[i+ 8], 7, 0x698098D8);
      d = ff(d, a, b, c, buffer[i+ 9], 12, 0x8B44F7AF);
      c = ff(c, d, a, b, buffer[i+10], 17, 0xFFFF5BB1);
      b = ff(b, c, d, a, buffer[i+11], 22, 0x895CD7BE);
      a = ff(a, b, c, d, buffer[i+12], 7, 0x6B901122);
      d = ff(d, a, b, c, buffer[i+13], 12, 0xFD987193);
      c = ff(c, d, a, b, buffer[i+14], 17, 0xA679438E);
      b = ff(b, c, d, a, buffer[i+15], 22, 0x49B40821);

      a = gg(a, b, c, d, buffer[i+ 1], 5, 0xF61E2562);
      d = gg(d, a, b, c, buffer[i+ 6], 9, 0xC040B340);
      c = gg(c, d, a, b, buffer[i+11], 14, 0x265E5A51);
      b = gg(b, c, d, a, buffer[i+ 0], 20, 0xE9B6C7AA);
      a = gg(a, b, c, d, buffer[i+ 5], 5, 0xD62F105D);
      d = gg(d, a, b, c, buffer[i+10], 9, 0x02441453);
      c = gg(c, d, a, b, buffer[i+15], 14, 0xD8A1E681);
      b = gg(b, c, d, a, buffer[i+ 4], 20, 0xE7D3FBC8);
      a = gg(a, b, c, d, buffer[i+ 9], 5, 0x21E1CDE6);
      d = gg(d, a, b, c, buffer[i+14], 9, 0xC33707D6);
      c = gg(c, d, a, b, buffer[i+ 3], 14, 0xF4D50D87);
      b = gg(b, c, d, a, buffer[i+ 8], 20, 0x455A14ED);
      a = gg(a, b, c, d, buffer[i+13], 5, 0xA9E3E905);
      d = gg(d, a, b, c, buffer[i+ 2], 9, 0xFCEFA3F8);
      c = gg(c, d, a, b, buffer[i+ 7], 14, 0x676F02D9);
      b = gg(b, c, d, a, buffer[i+12], 20, 0x8D2A4C8A);

      a = hh(a, b, c, d, buffer[i+ 5], 4, 0xFFFA3942);
      d = hh(d, a, b, c, buffer[i+ 8], 11, 0x8771F681);
      c = hh(c, d, a, b, buffer[i+11], 16, 0x6D9D6122);
      b = hh(b, c, d, a, buffer[i+14], 23, 0xFDE5380C);
      a = hh(a, b, c, d, buffer[i+ 1], 4, 0xA4BEEA44);
      d = hh(d, a, b, c, buffer[i+ 4], 11, 0x4BDECFA9);
      c = hh(c, d, a, b, buffer[i+ 7], 16, 0xF6BB4B60);
      b = hh(b, c, d, a, buffer[i+10], 23, 0xBEBFBC70);
      a = hh(a, b, c, d, buffer[i+13], 4, 0x289B7EC6);
      d = hh(d, a, b, c, buffer[i+ 0], 11, 0xEAA127FA);
      c = hh(c, d, a, b, buffer[i+ 3], 16, 0xD4EF3085);
      b = hh(b, c, d, a, buffer[i+ 6], 23, 0x04881D05);
      a = hh(a, b, c, d, buffer[i+ 9], 4, 0xD9D4D039);
      d = hh(d, a, b, c, buffer[i+12], 11, 0xE6DB99E5);
      c = hh(c, d, a, b, buffer[i+15], 16, 0x1FA27CF8);
      b = hh(b, c, d, a, buffer[i+ 2], 23, 0xC4AC5665);

      a = ii(a, b, c, d, buffer[i+ 0], 6, 0xF4292244);
      d = ii(d, a, b, c, buffer[i+ 7], 10, 0x432AFF97);
      c = ii(c, d, a, b, buffer[i+14], 15, 0xAB9423A7);
      b = ii(b, c, d, a, buffer[i+ 5], 21, 0xFC93A039);
      a = ii(a, b, c, d, buffer[i+12], 6, 0x655B59C3);
      d = ii(d, a, b, c, buffer[i+ 3], 10, 0x8F0CCC92);
      c = ii(c, d, a, b, buffer[i+10], 15, 0xFFEFF47D);
      b = ii(b, c, d, a, buffer[i+ 1], 21, 0x85845DD1);
      a = ii(a, b, c, d, buffer[i+ 8], 6, 0x6FA87E4F);
      d = ii(d, a, b, c, buffer[i+15], 10, 0xFE2CE6E0);
      c = ii(c, d, a, b, buffer[i+ 6], 15, 0xA3014314);
      b = ii(b, c, d, a, buffer[i+13], 21, 0x4E0811A1);
      a = ii(a, b, c, d, buffer[i+ 4], 6, 0xF7537E82);
      d = ii(d, a, b, c, buffer[i+11], 10, 0xBD3AF235);
      c = ii(c, d, a, b, buffer[i+ 2], 15, 0x2AD7D2BB);
      b = ii(b, c, d, a, buffer[i+ 9], 21, 0xEB86D391);

      w[0] = add(a, w[0]);
      w[1] = add(b, w[1]);
      w[2] = add(c, w[2]);
      w[3] = add(d, w[3]);
    }

    var t = new Array(16);
    for (var i = 0; i < 4; i++)
      for (var j = 0; j < 4; j++)
        t[i * 4 + j] = (w[i] >> (8 * j)) & 0xFF;
    return t;
  }

  return function (s, ofs, len) {
    // FIX: maybe we should perform the computation by chunk of 64 bytes
    // as in http://www.myersdaily.org/joseph/javascript/md5.js
    var buf = [];
    switch (s.t & 6) {
    default:
      caml_convert_string_to_bytes(s);
    case 0: /* BYTES */
      var b = s.c;
      for (var i = 0; i < len; i+=4) {
        var j = i + ofs;
        buf[i>>2] =
          b.charCodeAt(j) | (b.charCodeAt(j+1) << 8) |
          (b.charCodeAt(j+2) << 16) | (b.charCodeAt(j+3) << 24);
      }
      for (; i < len; i++) buf[i>>2] |= b.charCodeAt(i + ofs) << (8 * (i & 3));
      break;
    case 4: /* ARRAY */
      var a = s.c;
      for (var i = 0; i < len; i+=4) {
        var j = i + ofs;
        buf[i>>2] = a[j] | (a[j+1] << 8) | (a[j+2] << 16) | (a[j+3] << 24);
      }
      for (; i < len; i++) buf[i>>2] |= a[i + ofs] << (8 * (i & 3));
    }
    return caml_string_of_array(md5(buf, len));
  }
} ();

//# 1 "+mlBytes.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010-2014 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

// An OCaml string is an object with three fields:
// - tag 't'
// - length 'l'
// - contents 'c'
//
// The contents of the string can be either a JavaScript array or
// a JavaScript string. The length of this string can be less than the
// length of the OCaml string. In this case, remaining bytes are
// assumed to be zeroes. Arrays are mutable but consumes more memory
// than strings. A common pattern is to start from an empty string and
// progressively fill it from the start. Partial strings makes it
// possible to implement this efficiently.
//
// When converting to and from UTF-16, we keep track of whether the
// string is composed only of ASCII characters (in which case, no
// conversion needs to be performed) or not.
//
// The string tag can thus take the following values:
//   full string     BYTE | UNKNOWN:      0
//                   BYTE | ASCII:        9
//                   BYTE | NOT_ASCII:    8
//   string prefix   PARTIAL:             2
//   array           ARRAY:               4
//
// One can use bit masking to discriminate these different cases:
//   known_encoding(x) = x&8
//   is_ascii(x) =       x&1
//   kind(x) =           x&6

//Provides: caml_str_repeat
function caml_str_repeat(n, s) {
  if(n == 0) return "";
  if (s.repeat) {return s.repeat(n);} // ECMAscript 6 and Firefox 24+
  var r = "", l = 0;
  for(;;) {
    if (n & 1) r += s;
    n >>= 1;
    if (n == 0) return r;
    s += s;
    l++;
    if (l == 9) {
      s.slice(0,1); // flatten the string
      // then, the flattening of the whole string will be faster,
      // as it will be composed of larger pieces
    }
  }
}

//Provides: caml_subarray_to_jsbytes
//Weakdef
// Pre ECMAScript 5, [apply] would not support array-like object.
// In such setup, Typed_array would be implemented as polyfill, and [f.apply] would
// fail here. Mark the primitive as Weakdef, so that people can override it easily.
function caml_subarray_to_jsbytes (a, i, len) {
  var f = String.fromCharCode;
  if (i == 0 && len <= 4096 && len == a.length) return f.apply (null, a);
  var s = "";
  for (; 0 < len; i += 1024,len-=1024)
    s += f.apply (null, a.slice(i,i + Math.min(len, 1024)));
  return s;
}

//Provides: caml_utf8_of_utf16
function caml_utf8_of_utf16(s) {
  for (var b = "", t = b, c, d, i = 0, l = s.length; i < l; i++) {
    c = s.charCodeAt(i);
    if (c < 0x80) {
      for (var j = i + 1; (j < l) && (c = s.charCodeAt(j)) < 0x80; j++);
      if (j - i > 512) { t.substr(0, 1); b += t; t = ""; b += s.slice(i, j) }
      else t += s.slice(i, j);
      if (j == l) break;
      i = j;
    }
    if (c < 0x800) {
      t += String.fromCharCode(0xc0 | (c >> 6));
      t += String.fromCharCode(0x80 | (c & 0x3f));
    } else if (c < 0xd800 || c >= 0xdfff) {
      t += String.fromCharCode(0xe0 | (c >> 12),
                               0x80 | ((c >> 6) & 0x3f),
                               0x80 | (c & 0x3f));
    } else if (c >= 0xdbff || i + 1 == l ||
               (d = s.charCodeAt(i + 1)) < 0xdc00 || d > 0xdfff) {
      // Unmatched surrogate pair, replaced by \ufffd (replacement character)
      t += "\xef\xbf\xbd";
    } else {
      i++;
      c = (c << 10) + d - 0x35fdc00;
      t += String.fromCharCode(0xf0 | (c >> 18),
                               0x80 | ((c >> 12) & 0x3f),
                               0x80 | ((c >> 6) & 0x3f),
                               0x80 | (c & 0x3f));
    }
    if (t.length > 1024) {t.substr(0, 1); b += t; t = "";}
  }
  return b+t;
}

//Provides: caml_utf16_of_utf8
function caml_utf16_of_utf8(s) {
  for (var b = "", t = "", c, c1, c2, v, i = 0, l = s.length; i < l; i++) {
    c1 = s.charCodeAt(i);
    if (c1 < 0x80) {
      for (var j = i + 1; (j < l) && (c1 = s.charCodeAt(j)) < 0x80; j++);
      if (j - i > 512) { t.substr(0, 1); b += t; t = ""; b += s.slice(i, j) }
      else t += s.slice(i, j);
      if (j == l) break;
      i = j;
    }
    v = 1;
    if ((++i < l) && (((c2 = s.charCodeAt(i)) & -64) == 128)) {
      c = c2 + (c1 << 6);
      if (c1 < 0xe0) {
        v = c - 0x3080;
        if (v < 0x80) v = 1;
      } else {
        v = 2;
        if ((++i < l) && (((c2 = s.charCodeAt(i)) & -64) == 128)) {
          c = c2 + (c << 6);
          if (c1 < 0xf0) {
            v = c - 0xe2080;
            if ((v < 0x800) || ((v >= 0xd7ff) && (v < 0xe000))) v = 2;
          } else {
            v = 3;
            if ((++i < l) && (((c2 = s.charCodeAt(i)) & -64) == 128) &&
                (c1 < 0xf5)) {
              v = c2 - 0x3c82080 + (c << 6);
              if (v < 0x10000 || v > 0x10ffff) v = 3;
            }
          }
        }
      }
    }
    if (v < 4) { // Invalid sequence
      i -= v;
      t += "\ufffd";
    } else if (v > 0xffff)
      t += String.fromCharCode(0xd7c0 + (v >> 10), 0xdc00 + (v & 0x3FF))
    else
      t += String.fromCharCode(v);
    if (t.length > 1024) {t.substr(0, 1); b += t; t = "";}
  }
  return b+t;
}

//Provides: jsoo_is_ascii
function jsoo_is_ascii (s) {
  // The regular expression gets better at around this point for all browsers
  if (s.length < 24) {
    // Spidermonkey gets much slower when s.length >= 24 (on 64 bit archs)
    for (var i = 0; i < s.length; i++) if (s.charCodeAt(i) > 127) return false;
    return true;
  } else
    return !/[^\x00-\x7f]/.test(s);
}

//Provides: caml_bytes_unsafe_get mutable
function caml_bytes_unsafe_get (s, i) {
  switch (s.t & 6) {
  default: /* PARTIAL */
    if (i >= s.c.length) return 0;
  case 0: /* BYTES */
    return s.c.charCodeAt(i);
  case 4: /* ARRAY */
    return s.c[i]
  }
}

//Provides: caml_bytes_unsafe_set
//Requires: caml_convert_bytes_to_array
function caml_bytes_unsafe_set (s, i, c) {
  // The OCaml compiler uses Char.unsafe_chr on integers larger than 255!
  c &= 0xff;
  if (s.t != 4 /* ARRAY */) {
    if (i == s.c.length) {
      s.c += String.fromCharCode (c);
      if (i + 1 == s.l) s.t = 0; /*BYTES | UNKOWN*/
      return 0;
    }
    caml_convert_bytes_to_array (s);
  }
  s.c[i] = c;
  return 0;
}

//Provides: caml_string_bound_error
//Requires: caml_invalid_argument
function caml_string_bound_error () {
  caml_invalid_argument ("index out of bounds");
}

//Provides: caml_bytes_bound_error
//Requires: caml_invalid_argument
function caml_bytes_bound_error () {
  caml_invalid_argument ("index out of bounds");
}

//Provides: caml_string_get
//Requires: caml_string_bound_error, caml_string_unsafe_get
//Requires: caml_ml_string_length
function caml_string_get (s, i) {
  if (i >>> 0 >= caml_ml_string_length(s)) caml_string_bound_error();
  return caml_string_unsafe_get (s, i);
}

//Provides: caml_string_get16
//Requires: caml_string_unsafe_get, caml_string_bound_error
//Requires: caml_ml_string_length
function caml_string_get16(s,i) {
  if (i >>> 0 >= caml_ml_string_length(s) - 1) caml_string_bound_error();
  var b1 = caml_string_unsafe_get (s, i),
      b2 = caml_string_unsafe_get (s, i + 1);
  return (b2 << 8 | b1);
}

//Provides: caml_bytes_get16
//Requires: caml_bytes_unsafe_get, caml_bytes_bound_error
function caml_bytes_get16(s,i) {
  if (i >>> 0 >= s.l - 1) caml_bytes_bound_error();
  var b1 = caml_bytes_unsafe_get (s, i),
      b2 = caml_bytes_unsafe_get (s, i + 1);
  return (b2 << 8 | b1);
}

//Provides: caml_string_get32
//Requires: caml_string_unsafe_get, caml_string_bound_error
//Requires: caml_ml_string_length
function caml_string_get32(s,i) {
  if (i >>> 0 >= caml_ml_string_length(s) - 3) caml_string_bound_error();
  var b1 = caml_string_unsafe_get (s, i),
      b2 = caml_string_unsafe_get (s, i + 1),
      b3 = caml_string_unsafe_get (s, i + 2),
      b4 = caml_string_unsafe_get (s, i + 3);
  return (b4 << 24 | b3 << 16 | b2 << 8 | b1);
}

//Provides: caml_bytes_get32
//Requires: caml_bytes_unsafe_get, caml_bytes_bound_error
function caml_bytes_get32(s,i) {
  if (i >>> 0 >= s.l - 3) caml_bytes_bound_error();
  var b1 = caml_bytes_unsafe_get (s, i),
      b2 = caml_bytes_unsafe_get (s, i + 1),
      b3 = caml_bytes_unsafe_get (s, i + 2),
      b4 = caml_bytes_unsafe_get (s, i + 3);
  return (b4 << 24 | b3 << 16 | b2 << 8 | b1);
}

//Provides: caml_string_get64
//Requires: caml_string_unsafe_get, caml_string_bound_error
//Requires: caml_int64_of_bytes
//Requires: caml_ml_string_length
function caml_string_get64(s,i) {
  if (i >>> 0 >= caml_ml_string_length(s) - 7) caml_string_bound_error();
  var a = new Array(8);
  for(var j = 0; j < 8; j++){
    a[7 - j] = caml_string_unsafe_get (s, i + j);
  }
  return caml_int64_of_bytes(a);
}

//Provides: caml_bytes_get64
//Requires: caml_bytes_unsafe_get, caml_bytes_bound_error
//Requires: caml_int64_of_bytes
function caml_bytes_get64(s,i) {
  if (i >>> 0 >= s.l - 7) caml_bytes_bound_error();
  var a = new Array(8);
  for(var j = 0; j < 8; j++){
    a[7 - j] = caml_bytes_unsafe_get (s, i + j);
  }
  return caml_int64_of_bytes(a);
}

//Provides: caml_bytes_get
//Requires: caml_bytes_bound_error, caml_bytes_unsafe_get
function caml_bytes_get (s, i) {
  if (i >>> 0 >= s.l) caml_bytes_bound_error();
  return caml_bytes_unsafe_get (s, i);
}

//Provides: caml_string_set
//Requires: caml_failwith
//If: js-string
function caml_string_set (s, i, c) {
  caml_failwith("caml_string_set");
}

//Provides: caml_string_set
//Requires: caml_string_unsafe_set, caml_string_bound_error
//If: !js-string
function caml_string_set (s, i, c) {
  if (i >>> 0 >= s.l) caml_string_bound_error();
  return caml_string_unsafe_set (s, i, c);
}

//Provides: caml_bytes_set16
//Requires: caml_bytes_bound_error, caml_bytes_unsafe_set
function caml_bytes_set16(s,i,i16){
  if (i >>> 0 >= s.l - 1) caml_bytes_bound_error();
  var b2 = 0xFF & i16 >> 8,
      b1 = 0xFF & i16;
  caml_bytes_unsafe_set (s, i + 0, b1);
  caml_bytes_unsafe_set (s, i + 1, b2);
  return 0
}

//Provides: caml_string_set16
//Requires: caml_failwith
//If: js-string
function caml_string_set16(s,i,i16){
    caml_failwith("caml_string_set16");
}

//Provides: caml_string_set16
//Requires: caml_bytes_set16
//If: !js-string
function caml_string_set16(s,i,i16){
  return caml_bytes_set16(s,i,i16);
}

//Provides: caml_bytes_set32
//Requires: caml_bytes_bound_error, caml_bytes_unsafe_set
function caml_bytes_set32(s,i,i32){
  if (i >>> 0 >= s.l - 3) caml_bytes_bound_error();
  var b4 = 0xFF & i32 >> 24,
      b3 = 0xFF & i32 >> 16,
      b2 = 0xFF & i32 >> 8,
      b1 = 0xFF & i32;
  caml_bytes_unsafe_set (s, i + 0, b1);
  caml_bytes_unsafe_set (s, i + 1, b2);
  caml_bytes_unsafe_set (s, i + 2, b3);
  caml_bytes_unsafe_set (s, i + 3, b4);
  return 0
}

//Provides: caml_string_set32
//Requires: caml_failwith
//If: js-string
function caml_string_set32(s,i,i32){
    caml_failwith("caml_string_set32");
}

//Provides: caml_string_set32
//Requires: caml_bytes_set32
//If: !js-string
function caml_string_set32(s,i,i32){
  return caml_bytes_set32(s,i,i32);
}

//Provides: caml_bytes_set64
//Requires: caml_bytes_bound_error, caml_bytes_unsafe_set
//Requires: caml_int64_to_bytes
function caml_bytes_set64(s,i,i64){
  if (i >>> 0 >= s.l - 7) caml_bytes_bound_error();
  var a = caml_int64_to_bytes(i64);
  for(var j = 0; j < 8; j++) {
    caml_bytes_unsafe_set (s, i + 7 - j, a[j]);
  }
  return 0
}

//Provides: caml_string_set64
//Requires: caml_failwith
//If: js-string
function caml_string_set64(s,i,i64){
    caml_failwith("caml_string_set64");
}

//Provides: caml_string_set64
//Requires: caml_bytes_set64
//If: !js-string
function caml_string_set64(s,i,i64){
  return caml_bytes_set64(s,i,i64);
}

//Provides: caml_bytes_set
//Requires: caml_bytes_bound_error, caml_bytes_unsafe_set
function caml_bytes_set (s, i, c) {
  if (i >>> 0 >= s.l) caml_bytes_bound_error();
  return caml_bytes_unsafe_set (s, i, c);
}

//Provides: caml_bytes_of_utf16_jsstring
//Requires: jsoo_is_ascii, caml_utf8_of_utf16, MlBytes
function caml_bytes_of_utf16_jsstring (s) {
  var tag = 9 /* BYTES | ASCII */;
  if (!jsoo_is_ascii(s))
    tag = 8 /* BYTES | NOT_ASCII */, s = caml_utf8_of_utf16(s);
  return new MlBytes(tag, s, s.length);
}


//Provides: MlBytes
//Requires: caml_convert_string_to_bytes, jsoo_is_ascii, caml_utf16_of_utf8
function MlBytes (tag, contents, length) {
  this.t=tag; this.c=contents; this.l=length;
}
MlBytes.prototype.toString = function(){
  switch (this.t) {
  case 9: /*BYTES | ASCII*/
    return this.c;
  default:
    caml_convert_string_to_bytes(this);
  case 0: /*BYTES | UNKOWN*/
    if (jsoo_is_ascii(this.c)) {
      this.t = 9; /*BYTES | ASCII*/
      return this.c;
    }
    this.t = 8; /*BYTES | NOT_ASCII*/
  case 8: /*BYTES | NOT_ASCII*/
    return this.c;
  }
};
MlBytes.prototype.toUtf16 = function (){
  var r = this.toString();
  if(this.t == 9) return r
  return caml_utf16_of_utf8(r);
}
MlBytes.prototype.slice = function (){
  var content = this.t == 4 ? this.c.slice() : this.c;
  return new MlBytes(this.t,content,this.l);
}

//Provides: caml_convert_string_to_bytes
//Requires: caml_str_repeat, caml_subarray_to_jsbytes
function caml_convert_string_to_bytes (s) {
  /* Assumes not BYTES */
  if (s.t == 2 /* PARTIAL */)
    s.c += caml_str_repeat(s.l - s.c.length, '\0')
  else
    s.c = caml_subarray_to_jsbytes (s.c, 0, s.c.length);
  s.t = 0; /*BYTES | UNKOWN*/
}

//Provides: caml_convert_bytes_to_array
function caml_convert_bytes_to_array (s) {
  /* Assumes not ARRAY */
  if(joo_global_object.Uint8Array) {
    var a = new joo_global_object.Uint8Array(s.l);
  } else {
    var a = new Array(s.l);
  }
  var b = s.c, l = b.length, i = 0;
  for (; i < l; i++) a[i] = b.charCodeAt(i);
  for (l = s.l; i < l; i++) a[i] = 0;
  s.c = a;
  s.t = 4; /* ARRAY */
  return a;
}

//Provides: caml_array_of_bytes mutable
//Requires: caml_convert_bytes_to_array
function caml_array_of_bytes (s) {
  if (s.t != 4 /* ARRAY */) caml_convert_bytes_to_array(s);
  return s.c;
}

//Provides: caml_array_of_string mutable
//Requires: caml_convert_bytes_to_array
//Requires: caml_ml_string_length, caml_string_unsafe_get
function caml_array_of_string (s) {
  var l = caml_ml_string_length(s);
  var a = new Array(l);
  var i = 0;
  for (; i < l; i++) a[i] = caml_string_unsafe_get(s,i);
  return a;
}

//Provides: caml_create_string const
//Requires: MlBytes, caml_invalid_argument
//If: !js-string
function caml_create_string(len) {
  if(len < 0) caml_invalid_argument("String.create");
  return new MlBytes(len?2:9,"",len);
}

//Provides: caml_create_string const
//Requires: caml_invalid_argument
//If: js-string
function caml_create_string(len) {
  caml_invalid_argument("String.create");
}

//Provides: caml_create_bytes const
//Requires: MlBytes,caml_invalid_argument
function caml_create_bytes(len) {
  if (len < 0) caml_invalid_argument("Bytes.create");
  return new MlBytes(len?2:9,"",len);
}

//Provides: caml_string_of_array
//Requires: caml_subarray_to_jsbytes, caml_string_of_jsbytes
function caml_string_of_array (a) {
  return caml_string_of_jsbytes(caml_subarray_to_jsbytes(a,0,a.length));
}

//Provides: caml_bytes_of_array
//Requires: MlBytes
function caml_bytes_of_array (a) {
  return new MlBytes(4,a,a.length);
}

//Provides: caml_bytes_compare mutable
//Requires: caml_convert_string_to_bytes
function caml_bytes_compare(s1, s2) {
  (s1.t & 6) && caml_convert_string_to_bytes(s1);
  (s2.t & 6) && caml_convert_string_to_bytes(s2);
  return (s1.c < s2.c)?-1:(s1.c > s2.c)?1:0;
}


//Provides: caml_bytes_equal mutable (const, const)
//Requires: caml_convert_string_to_bytes
function caml_bytes_equal(s1, s2) {
  if(s1 === s2) return 1;
  (s1.t & 6) && caml_convert_string_to_bytes(s1);
  (s2.t & 6) && caml_convert_string_to_bytes(s2);
  return (s1.c == s2.c)?1:0;
}

//Provides: caml_string_notequal mutable (const, const)
//Requires: caml_string_equal
function caml_string_notequal(s1, s2) { return 1-caml_string_equal(s1, s2); }

//Provides: caml_bytes_notequal mutable (const, const)
//Requires: caml_string_equal
function caml_bytes_notequal(s1, s2) { return 1-caml_string_equal(s1, s2); }

//Provides: caml_bytes_lessequal mutable
//Requires: caml_convert_string_to_bytes
function caml_bytes_lessequal(s1, s2) {
  (s1.t & 6) && caml_convert_string_to_bytes(s1);
  (s2.t & 6) && caml_convert_string_to_bytes(s2);
  return (s1.c <= s2.c)?1:0;
}

//Provides: caml_bytes_lessthan mutable
//Requires: caml_convert_string_to_bytes
function caml_bytes_lessthan(s1, s2) {
  (s1.t & 6) && caml_convert_string_to_bytes(s1);
  (s2.t & 6) && caml_convert_string_to_bytes(s2);
  return (s1.c < s2.c)?1:0;
}

//Provides: caml_string_greaterequal
//Requires: caml_string_lessequal
function caml_string_greaterequal(s1, s2) {
  return caml_string_lessequal(s2,s1);
}
//Provides: caml_bytes_greaterequal
//Requires: caml_bytes_lessequal
function caml_bytes_greaterequal(s1, s2) {
  return caml_bytes_lessequal(s2,s1);
}

//Provides: caml_string_greaterthan
//Requires: caml_string_lessthan
function caml_string_greaterthan(s1, s2) {
  return caml_string_lessthan(s2, s1);
}

//Provides: caml_bytes_greaterthan
//Requires: caml_bytes_lessthan
function caml_bytes_greaterthan(s1, s2) {
  return caml_bytes_lessthan(s2, s1);
}

//Provides: caml_fill_bytes
//Requires: caml_str_repeat, caml_convert_bytes_to_array
function caml_fill_bytes(s, i, l, c) {
  if (l > 0) {
    if (i == 0 && (l >= s.l || (s.t == 2 /* PARTIAL */ && l >= s.c.length))) {
      if (c == 0) {
        s.c = "";
        s.t = 2; /* PARTIAL */
      } else {
        s.c = caml_str_repeat (l, String.fromCharCode(c));
        s.t = (l == s.l)?0 /* BYTES | UNKOWN */ :2; /* PARTIAL */
      }
    } else {
      if (s.t != 4 /* ARRAY */) caml_convert_bytes_to_array(s);
      for (l += i; i < l; i++) s.c[i] = c;
    }
  }
  return 0;
}

//Provides: caml_fill_string
//Requires: caml_fill_bytes
var caml_fill_string = caml_fill_bytes

//Provides: caml_blit_bytes
//Requires: caml_subarray_to_jsbytes, caml_convert_bytes_to_array
function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len == 0) return 0;
  if ((i2 == 0) &&
      (len >= s2.l || (s2.t == 2 /* PARTIAL */ && len >= s2.c.length))) {
    s2.c = (s1.t == 4 /* ARRAY */)?
      caml_subarray_to_jsbytes(s1.c, i1, len):
      (i1 == 0 && s1.c.length == len)?s1.c:s1.c.substr(i1, len);
    s2.t = (s2.c.length == s2.l)?0 /* BYTES | UNKOWN */ :2; /* PARTIAL */
  } else if (s2.t == 2 /* PARTIAL */ && i2 == s2.c.length) {
    s2.c += (s1.t == 4 /* ARRAY */)?
      caml_subarray_to_jsbytes(s1.c, i1, len):
      (i1 == 0 && s1.c.length == len)?s1.c:s1.c.substr(i1, len);
    s2.t = (s2.c.length == s2.l)?0 /* BYTES | UNKOWN */ :2; /* PARTIAL */
  } else {
    if (s2.t != 4 /* ARRAY */) caml_convert_bytes_to_array(s2);
    var c1 = s1.c, c2 = s2.c;
    if (s1.t == 4 /* ARRAY */) {
      if (i2 <= i1) {
        for (var i = 0; i < len; i++) c2 [i2 + i] = c1 [i1 + i];
      } else {
        for (var i = len - 1; i >= 0; i--) c2 [i2 + i] = c1 [i1 + i];
      }
    } else {
      var l = Math.min (len, c1.length - i1);
      for (var i = 0; i < l; i++) c2 [i2 + i] = c1.charCodeAt(i1 + i);
      for (; i < len; i++) c2 [i2 + i] = 0;
    }
  }
  return 0;
}

//Provides: caml_blit_string
//Requires: caml_blit_bytes, caml_bytes_of_string
function caml_blit_string(a,b,c,d,e) {
    caml_blit_bytes(caml_bytes_of_string(a),b,c,d,e);
    return 0
}

//Provides: caml_ml_bytes_length const
function caml_ml_bytes_length(s) { return s.l }

//Provides: caml_string_unsafe_get const
//If: js-string
function caml_string_unsafe_get (s, i) {
  return s.charCodeAt(i);
}

//Provides: caml_string_unsafe_set
//Requires: caml_failwith
//If: js-string
function caml_string_unsafe_set (s, i, c) {
    caml_failwith("caml_string_unsafe_set");
}

//Provides: caml_ml_string_length const
//If: js-string
function caml_ml_string_length(s) {
  return s.length
}

//Provides: caml_string_compare const
//If: js-string
function caml_string_compare(s1, s2) {
  return (s1 < s2)?-1:(s1 > s2)?1:0;
}

//Provides: caml_string_equal const
//If: js-string
function caml_string_equal(s1, s2) {
  if(s1 === s2) return 1;
  return 0;
}

//Provides: caml_string_lessequal const
//If: js-string
function caml_string_lessequal(s1, s2) {
  return (s1 <= s2)?1:0;
}

//Provides: caml_string_lessthan const
//If: js-string
function caml_string_lessthan(s1, s2) {
  return (s1 < s2)?1:0;
}

//Provides: caml_string_of_bytes
//Requires: caml_convert_string_to_bytes, caml_string_of_jsbytes
//If: js-string
function caml_string_of_bytes(s) {
    (s.t & 6) && caml_convert_string_to_bytes(s);
  return caml_string_of_jsbytes(s.c);
}

//Provides: caml_bytes_of_string const
//Requires: caml_bytes_of_jsbytes, caml_jsbytes_of_string
//If: js-string
function caml_bytes_of_string(s) {
  return caml_bytes_of_jsbytes(caml_jsbytes_of_string(s));
}

//Provides: caml_string_of_jsbytes const
//If: js-string
function caml_string_of_jsbytes(x) { return x }

//Provides: caml_jsbytes_of_string const
//If: js-string
function caml_jsbytes_of_string(x) { return x }

//Provides: caml_jsstring_of_string const
//Requires: jsoo_is_ascii, caml_utf16_of_utf8
//If: js-string
function caml_jsstring_of_string(s) {
  if(jsoo_is_ascii(s))
    return s;
  return caml_utf16_of_utf8(s); }

//Provides: caml_string_of_jsstring const
//Requires: jsoo_is_ascii, caml_utf8_of_utf16, caml_string_of_jsbytes
//If: js-string
function caml_string_of_jsstring (s) {
  if (jsoo_is_ascii(s))
    return caml_string_of_jsbytes(s)
  else return caml_string_of_jsbytes(caml_utf8_of_utf16(s));
}

//Provides: caml_bytes_of_jsbytes const
//Requires: MlBytes
function caml_bytes_of_jsbytes(s) { return new MlBytes(0,s,s.length); }


// The section below should be used when use-js-string=false

//Provides: caml_string_unsafe_get const
//Requires: caml_bytes_unsafe_get
//If: !js-string
function caml_string_unsafe_get (s, i) {
  return caml_bytes_unsafe_get(s,i);
}

//Provides: caml_string_unsafe_set
//Requires: caml_bytes_unsafe_set
//If: !js-string
function caml_string_unsafe_set (s, i, c) {
  return caml_bytes_unsafe_set(s,i,c);
}

//Provides: caml_ml_string_length const
//Requires: caml_ml_bytes_length
//If: !js-string
function caml_ml_string_length(s) {
  return caml_ml_bytes_length(s)
}

//Provides: caml_string_compare
//Requires: caml_bytes_compare
//If: !js-string
function caml_string_compare(s1, s2) {
  return caml_bytes_compare(s1,s2)
}

//Provides: caml_string_equal
//Requires: caml_bytes_equal
//If: !js-string
function caml_string_equal(s1, s2) {
  return caml_bytes_equal(s1,s2)
}

//Provides: caml_string_lessequal
//Requires: caml_bytes_lessequal
//If: !js-string
function caml_string_lessequal(s1, s2) {
  return caml_bytes_lessequal(s1,s2)
}

//Provides: caml_string_lessthan
//Requires: caml_bytes_lessthan
//If: !js-string
function caml_string_lessthan(s1, s2) {
  return caml_bytes_lessthan(s1,s2)
}

//Provides: caml_string_of_bytes
//If: !js-string
function caml_string_of_bytes(s) { return s }

//Provides: caml_bytes_of_string const
//If: !js-string
function caml_bytes_of_string(s) { return s }

//Provides: caml_string_of_jsbytes const
//Requires: caml_bytes_of_jsbytes
//If: !js-string
function caml_string_of_jsbytes(s) { return caml_bytes_of_jsbytes(s); }

//Provides: caml_jsbytes_of_string const
//Requires: caml_convert_string_to_bytes
//If: !js-string
function caml_jsbytes_of_string(s) {
  if ((s.t & 6) != 0 /* BYTES */) caml_convert_string_to_bytes(s);
  return s.c }

//Provides: caml_jsstring_of_string mutable (const)
//If: !js-string
function caml_jsstring_of_string(s){
  return s.toUtf16()
}

//Provides: caml_string_of_jsstring
//Requires: caml_bytes_of_utf16_jsstring
//If: !js-string
function caml_string_of_jsstring (s) {
  return caml_bytes_of_utf16_jsstring(s);
}

//Provides: caml_is_ml_bytes
//Requires: MlBytes
function caml_is_ml_bytes(s) {
  return (s instanceof MlBytes);
}

//Provides: caml_is_ml_string
//Requires: jsoo_is_ascii
//If: js-string
function caml_is_ml_string(s) {
  return (typeof s === "string" && !/[^\x00-\xff]/.test(s));
}

//Provides: caml_is_ml_string
//Requires: caml_is_ml_bytes
//If: !js-string
function caml_is_ml_string(s) {
  return caml_is_ml_bytes(s);
}

// The functions below are deprecated

//Provides: caml_js_to_byte_string const
//Requires: caml_string_of_jsbytes
function caml_js_to_byte_string(s) { return caml_string_of_jsbytes(s) }

//Provides: caml_new_string
//Requires: caml_string_of_jsbytes
function caml_new_string (s) { return caml_string_of_jsbytes(s) }

//Provides: caml_js_from_string mutable (const)
//Requires: caml_jsstring_of_string
function caml_js_from_string(s) {
  return caml_jsstring_of_string(s)
}

//Provides: caml_to_js_string mutable (const)
//Requires: caml_jsstring_of_string
function caml_to_js_string(s) {
  return caml_jsstring_of_string(s)
}

//Provides: caml_js_to_string const
//Requires: caml_string_of_jsstring
function caml_js_to_string (s) {
  return caml_string_of_jsstring(s);
}

//# 1 "+nat.js"
//Provides: initialize_nat
//Requires: caml_custom_ops
//Requires: serialize_nat, deserialize_nat, caml_hash_nat
function initialize_nat() {
  caml_custom_ops["_nat"] =
    { deserialize : deserialize_nat,
      serialize : serialize_nat,
      hash : caml_hash_nat
    }
}

//Provides: MlNat
function MlNat(x){
  this.data = new joo_global_object.Int32Array(x);
  // length_nat isn't external, so we have to make the Obj.size
  // work out right. The +2 to array length seems to work.
  this.length = this.data.length + 2
}

MlNat.prototype.caml_custom = "_nat";

//Provides: caml_hash_nat
//Requires: caml_hash_mix_int, num_digits_nat
function caml_hash_nat(x) {
  var len = num_digits_nat(x, 0, x.data.length);
  var h = 0;
  for (var i = 0; i < len; i++) {
    h = caml_hash_mix_int(h, x.data[i]);
  }
  return h;
}


//Provides: nat_of_array
//Requires: MlNat
function nat_of_array(l){
  return new MlNat(l);
}

//Provides: create_nat
//Requires: MlNat
function create_nat(size) {
  var arr = new MlNat(size);
  for(var i = 0; i < size; i++) {
    arr.data[i] = -1;
  }
  return arr;
}

//Provides: set_to_zero_nat
function set_to_zero_nat(nat, ofs, len) {
  for(var i = 0; i < len; i++) {
    nat.data[ofs+i] = 0;
  }
  return 0;
}

//Provides: blit_nat
function blit_nat(nat1, ofs1, nat2, ofs2, len) {
  for(var i = 0; i < len; i++) {
    nat1.data[ofs1+i] = nat2.data[ofs2+i];
  }
  return 0;
}

//Provides: set_digit_nat
function set_digit_nat(nat, ofs, digit) {
  nat.data[ofs] = digit;
  return 0;
}

//Provides: nth_digit_nat
function nth_digit_nat(nat, ofs) {
  return nat.data[ofs];
}

//Provides: set_digit_nat_native
function set_digit_nat_native(nat, ofs, digit) {
  nat.data[ofs] = digit;
  return 0;
}

//Provides: nth_digit_nat_native
function nth_digit_nat_native(nat, ofs) {
  return nat.data[ofs];
}

//Provides: num_digits_nat
function num_digits_nat(nat, ofs, len) {
  for(var i = len - 1; i >= 0; i--) {
    if(nat.data[ofs+i] != 0) return i+1;
  }
  return 1; // 0 counts as 1 digit
}

//Provides: num_leading_zero_bits_in_digit
function num_leading_zero_bits_in_digit(nat, ofs) {
  var a = nat.data[ofs];
  var b = 0;
  if(a & 0xFFFF0000) { b +=16; a >>>=16; }
  if(a & 0xFF00)     { b += 8; a >>>= 8; }
  if(a & 0xF0)       { b += 4; a >>>= 4; }
  if(a & 12)         { b += 2; a >>>= 2; }
  if(a & 2)          { b += 1; a >>>= 1; }
  if(a & 1)          { b += 1; }
  return 32 - b;
}

//Provides: is_digit_int
function is_digit_int(nat, ofs) {
  if (nat.data[ofs] >= 0) return 1
  return 0;
}

//Provides: is_digit_zero
function is_digit_zero(nat, ofs) {
  if(nat.data[ofs] == 0) return 1;
  return 0;
}

//Provides: is_digit_odd
function is_digit_odd(nat, ofs) {
  if(nat.data[ofs] & 1) return 1;
  return 0;
}

//Provides: incr_nat
function incr_nat(nat, ofs, len, carry_in) {
  var carry = carry_in;
  for(var i = 0; i < len; i++) {
    var x = (nat.data[ofs+i] >>> 0) + carry;
    nat.data[ofs+i] = (x | 0);
    if(x == (x >>> 0)) {
      carry = 0;
      break;
    } else {
      carry = 1;
    }
  }
  return carry;
}

// len1 >= len2
//Provides: add_nat
//Requires: incr_nat
function add_nat(nat1, ofs1, len1, nat2, ofs2, len2, carry_in) {
  var carry = carry_in;
  for(var i = 0; i < len2; i++) {
    var x = (nat1.data[ofs1+i] >>> 0) + (nat2.data[ofs2+i] >>> 0) + carry;
    nat1.data[ofs1+i] = x
    if(x == (x >>> 0)) {
      carry = 0;
    } else {
      carry = 1;
    }
  }
  return incr_nat(nat1, ofs1+len2, len1-len2, carry);
}

//Provides: complement_nat
function complement_nat(nat, ofs, len) {
  for(var i = 0; i < len; i++) {
    nat.data[ofs+i] = (-1 >>> 0) - (nat.data[ofs+i] >>> 0);
  }
}

// ocaml flips carry_in
//Provides: decr_nat
function decr_nat(nat, ofs, len, carry_in) {
  var borrow = (carry_in == 1) ? 0 : 1;
  for(var i = 0; i < len; i++) {
    var x = (nat.data[ofs+i] >>>0) - borrow;
    nat.data[ofs+i] = x;
    if (x >= 0) {
      borrow = 0;
      break;
    } else {
      borrow = 1;
    }
  }
  return (borrow == 1) ? 0 : 1;
}

// ocaml flips carry_in
// len1 >= len2
//Provides: sub_nat
//Requires: decr_nat
function sub_nat(nat1, ofs1, len1, nat2, ofs2, len2, carry_in) {
  var borrow = (carry_in == 1) ? 0 : 1;
  for(var i = 0; i < len2; i++) {
    var x = (nat1.data[ofs1+i] >>> 0) - (nat2.data[ofs2+i] >>> 0) - borrow;
    nat1.data[ofs1+i] = x;
    if (x >= 0) {
      borrow = 0;
    } else {
      borrow = 1;
    }
  }
  return decr_nat(nat1, ofs1+len2, len1-len2, (borrow==1)?0:1);
}

// nat1 += nat2 * nat3[ofs3]
// len1 >= len2
//Provides: mult_digit_nat
//Requires: add_nat, nat_of_array
function mult_digit_nat(nat1, ofs1, len1, nat2, ofs2, len2, nat3, ofs3) {
  var carry = 0;
  var a = (nat3.data[ofs3] >>> 0);
  for(var i = 0; i < len2; i++) {
    var x1 = (nat1.data[ofs1+i] >>> 0) + (nat2.data[ofs2+i] >>> 0) * (a & 0x0000FFFF) + carry;
    var x2 = (nat2.data[ofs2+i] >>> 0) * (a >>> 16);
    carry = Math.floor(x2/65536);
    var x3 = x1 + (x2 % 65536) * 65536;
    nat1.data[ofs1+i] = x3;
    carry += Math.floor(x3/4294967296);
  }

  if(len2 < len1 && carry) {
    return add_nat(nat1, ofs1+len2, len1-len2, nat_of_array([carry]), 0, 1, 0);
  } else {
    return carry;
  }
}

// nat1 += nat2 * nat3
// len1 >= len2 + len3.
//Provides: mult_nat
//Requires: mult_digit_nat
function mult_nat(nat1, ofs1, len1, nat2, ofs2, len2, nat3, ofs3, len3) {
  var carry = 0;
  for(var i = 0; i < len3; i++) {
    carry += mult_digit_nat(nat1, ofs1+i, len1-i, nat2, ofs2, len2, nat3, ofs3+i);
  }
  return carry;
}

// nat1 = 2 * nat1 + nat2 * nat2
// len1 >= 2 * len2
//Provides: square_nat
//Requires: mult_nat, add_nat
function square_nat(nat1, ofs1, len1, nat2, ofs2, len2) {
  var carry = 0;
  carry += add_nat(nat1, ofs1, len1, nat1, ofs1, len1, 0);
  carry += mult_nat(nat1, ofs1, len1, nat2, ofs2, len2, nat2, ofs2, len2);
  return carry;
}


// 0 <= shift < 32
//Provides: shift_left_nat
function shift_left_nat(nat1, ofs1, len1, nat2, ofs2, nbits) {
  if(nbits == 0) {
    nat2.data[ofs2] = 0;
    return 0;
  }
  var wrap = 0;
  for(var i = 0; i < len1; i++) {
    var a = (nat1.data[ofs1+i] >>> 0);
    nat1.data[ofs1+i] = (a << nbits) | wrap;
    wrap = a >>> (32 - nbits);
  }
  nat2.data[ofs2] = wrap;
  return 0;
}

// Assuming c > a, returns [quotient, remainder] of (a<<32 + b)/c
//Provides: div_helper
function div_helper(a, b, c) {
  var x = a * 65536 + (b>>>16);
  var y = Math.floor(x/c) * 65536;
  var z = (x % c) * 65536;
  var w = z + (b & 0x0000FFFF);
  return [y + Math.floor(w/c), w % c];
}

// nat1[ofs1+len] < nat2[ofs2]
//Provides: div_digit_nat
//Requires: div_helper
function div_digit_nat(natq, ofsq, natr, ofsr, nat1, ofs1, len, nat2, ofs2) {
  var rem = (nat1.data[ofs1+len-1] >>>0);
  // natq[ofsq+len-1] is guaranteed to be zero (due to the MSD requirement),
  // and should not be written to.
  for(var i = len-2; i >= 0; i--) {
    var x = div_helper(rem, (nat1.data[ofs1+i] >>> 0), (nat2.data[ofs2] >>> 0));
    natq.data[ofsq+i] = x[0];
    rem = x[1];
  }
  natr.data[ofsr] = rem;
  return 0;
}

// nat1[nat2:] := nat1 / nat2
// nat1[:nat2] := nat1 % nat2
// len1 > len2, nat2[ofs2+len2-1] > nat1[ofs1+len1-1]
//Provides: div_nat
//Requires: div_digit_nat, div_helper, num_leading_zero_bits_in_digit, shift_left_nat, shift_right_nat, create_nat, set_to_zero_nat, mult_digit_nat, sub_nat, compare_nat, nat_of_array
function div_nat(nat1, ofs1, len1, nat2, ofs2, len2) {
  if(len2 == 1) {
    div_digit_nat(nat1, ofs1+1, nat1, ofs1, nat1, ofs1, len1, nat2, ofs2);
    return 0;
  }

  var s = num_leading_zero_bits_in_digit(nat2, ofs2+len2-1);
  shift_left_nat(nat2, ofs2, len2, nat_of_array([0]), 0, s);
  shift_left_nat(nat1, ofs1, len1, nat_of_array([0]), 0, s);

  var d = (nat2.data[ofs2+len2-1] >>> 0) + 1;
  var a = create_nat(len2+1);
  for (var i = len1 - 1; i >= len2; i--) {
    // Decent lower bound on quo
    var quo = d == 4294967296 ? (nat1.data[ofs1+i] >>> 0) : div_helper((nat1.data[ofs1+i] >>> 0), (nat1.data[ofs1+i-1] >>>0), d)[0];
    set_to_zero_nat(a, 0, len2+1);
    mult_digit_nat(a, 0, len2+1, nat2, ofs2, len2, nat_of_array([quo]), 0);
    sub_nat(nat1, ofs1+i-len2, len2+1, a, 0, len2+1, 1);

    while (nat1.data[ofs1+i] != 0 || compare_nat(nat1, ofs1+i-len2, len2, nat2, ofs2, len2) >= 0) {
      quo = quo + 1;
      sub_nat(nat1, ofs1+i-len2, len2+1, nat2, ofs2, len2, 1);
    }

    nat1.data[ofs1+i] = quo;
  }

  shift_right_nat(nat1, ofs1, len2, nat_of_array([0]), 0, s); // shift remainder
  shift_right_nat(nat2, ofs2, len2, nat_of_array([0]), 0, s); // restore
  return 0;
}


// 0 <= shift < 32
//Provides: shift_right_nat
function shift_right_nat(nat1, ofs1, len1, nat2, ofs2, nbits) {
  if(nbits == 0) {
    nat2.data[ofs2] = 0;
    return 0;
  }
  var wrap = 0;
  for(var i = len1-1; i >= 0; i--) {
    var a = nat1.data[ofs1+i] >>> 0;
    nat1.data[ofs1+i] = (a >>> nbits) | wrap;
    wrap = a << (32 - nbits);
  }
  nat2.data[ofs2] = wrap;
  return 0;
}

//Provides: compare_digits_nat
function compare_digits_nat(nat1, ofs1, nat2, ofs2) {
  if(nat1.data[ofs1] > nat2.data[ofs2]) return 1;
  if(nat1.data[ofs1] < nat2.data[ofs2]) return -1;
  return 0;
}

//Provides: compare_nat
//Requires: num_digits_nat
function compare_nat(nat1, ofs1, len1, nat2, ofs2, len2) {
  var a = num_digits_nat(nat1, ofs1, len1);
  var b = num_digits_nat(nat2, ofs2, len2);
  if(a > b) return 1;
  if(a < b) return -1;
  for(var i = len1 - 1; i >= 0; i--) {
    if ((nat1.data[ofs1+i] >>> 0) > (nat2.data[ofs2+i] >>> 0)) return 1;
    if ((nat1.data[ofs1+i] >>> 0) < (nat2.data[ofs2+i] >>> 0)) return -1;
  }
  return 0;
}

//Provides: compare_nat_real
//Requires: compare_nat
function compare_nat_real(nat1,nat2){
  return compare_nat(nat1,0,nat1.data.length,nat2,0,nat2.data.length);
}

//Provides: land_digit_nat
function land_digit_nat(nat1, ofs1, nat2, ofs2) {
  nat1.data[ofs1] &= nat2.data[ofs2];
  return 0;
}

//Provides: lor_digit_nat
function lor_digit_nat(nat1, ofs1, nat2, ofs2) {
  nat1.data[ofs1] |= nat2.data[ofs2];
  return 0;
}

//Provides: lxor_digit_nat
function lxor_digit_nat(nat1, ofs1, nat2, ofs2) {
  nat1.data[ofs1] ^= nat2.data[ofs2];
  return 0;
}


//Provides: serialize_nat
function serialize_nat(writer, nat, sz){
  var len = nat.data.length;
  writer.write(32, len);
  for(var i = 0; i < len; i++){
    writer.write(32, nat.data[i]);
  }
  sz[0] = len * 4;
  sz[1] = len * 8;
}

//Provides: deserialize_nat
//Requires: MlNat
function deserialize_nat(reader, sz){
  var len = reader.read32s();
  var nat = new MlNat(len);
  for(var i = 0; i < len; i++){
    nat.data[i] = reader.read32s();
  }
  sz[0] = len * 4;
  return nat;
}

//# 1 "+obj.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_update_dummy
function caml_update_dummy (x, y) {
  if( typeof y==="function" ) { x.fun = y; return 0; }
  if( y.fun ) { x.fun = y.fun; return 0; }
  var i = y.length; while (i--) x[i] = y[i]; return 0;
}

//Provides: caml_obj_is_block const (const)
function caml_obj_is_block (x) { return +(x instanceof Array); }


//Provides: caml_obj_tag
//Requires: caml_is_ml_bytes, caml_is_ml_string
function caml_obj_tag (x) {
  if ((x instanceof Array) && x[0] == (x[0] >>> 0))
    return x[0]
  else if (caml_is_ml_bytes(x))
    return 252
  else if (caml_is_ml_string(x))
    return 252
  else if ((x instanceof Function) || typeof x == "function")
    return 247
  else if (x && x.caml_custom)
    return 255
  else
    return 1000
}

//Provides: caml_obj_set_tag (mutable, const)
function caml_obj_set_tag (x, tag) { x[0] = tag; return 0; }
//Provides: caml_obj_block const (const,const)
function caml_obj_block (tag, size) {
  var o = new Array(size+1);
  o[0]=tag;
  for (var i = 1; i <= size; i++) o[i] = 0;
  return o;
}

//Provides: caml_obj_with_tag
function caml_obj_with_tag(tag,x) {
  var l = x.length;
  var a = new Array(l);
  a[0] = tag;
  for(var i = 1; i < l; i++ ) a[i] = x[i];
  return a;
}

//Provides: caml_obj_dup mutable (const)
function caml_obj_dup (x) {
  var l = x.length;
  var a = new Array(l);
  for(var i = 0; i < l; i++ ) a[i] = x[i];
  return a;
}

//Provides: caml_obj_truncate (mutable, const)
//Requires: caml_invalid_argument
function caml_obj_truncate (x, s) {
  if (s<=0 || s + 1 > x.length)
    caml_invalid_argument ("Obj.truncate");
  if (x.length != s + 1) x.length = s + 1;
  return 0;
}

//Provides: caml_obj_make_forward
function caml_obj_make_forward (b,v) {
  b[0]=250;
  b[1]=v;
  return 0
}

//Provides: caml_lazy_make_forward const (const)
function caml_lazy_make_forward (v) { return [250, v]; }

///////////// CamlinternalOO
//Provides: caml_get_public_method const
var caml_method_cache = [];
function caml_get_public_method (obj, tag, cacheid) {
  var meths = obj[1];
  var ofs = caml_method_cache[cacheid];
  if (ofs === undefined) {
    // Make sure the array is not sparse
    for (var i = caml_method_cache.length; i < cacheid; i++)
      caml_method_cache[i] = 0;
  } else if (meths[ofs] === tag) {
    return meths[ofs - 1];
  }
  var li = 3, hi = meths[1] * 2 + 1, mi;
  while (li < hi) {
    mi = ((li+hi) >> 1) | 1;
    if (tag < meths[mi+1]) hi = mi-2;
    else li = mi;
  }
  caml_method_cache[cacheid] = li + 1;
  /* return 0 if tag is not there */
  return (tag == meths[li+1] ? meths[li] : 0);
}

//Provides: caml_oo_last_id
var caml_oo_last_id = 0;

//Provides: caml_set_oo_id
//Requires: caml_oo_last_id
function caml_set_oo_id (b) {
  b[2]=caml_oo_last_id++;
  return b;
}

//Provides: caml_fresh_oo_id
//Requires: caml_oo_last_id
function caml_fresh_oo_id() {
  return caml_oo_last_id++;
}

//Provides: caml_obj_raw_field
function caml_obj_raw_field(o,i) { return o[i+1] }

//Provides: caml_obj_set_raw_field
function caml_obj_set_raw_field(o,i,v) { return o[i+1] = v }

//# 1 "+parsing.js"
/***********************************************************************/
/*                                                                     */
/*                           Objective Caml                            */
/*                                                                     */
/*            Xavier Leroy, projet Cristal, INRIA Rocquencourt         */
/*                                                                     */
/*  Copyright 1996 Institut National de Recherche en Informatique et   */
/*  en Automatique.  All rights reserved.  This file is distributed    */
/*  under the terms of the GNU Lesser General Public License, with     */
/*  the special exception on linking described in file ../LICENSE.     */
/*                                                                     */
/***********************************************************************/

/* $Id: parsing.c 8983 2008-08-06 09:38:25Z xleroy $ */

/* The PDA automaton for parsers generated by camlyacc */

/* The pushdown automata */

//Provides: caml_parse_engine
//Requires: caml_lex_array
function caml_parse_engine(tables, env, cmd, arg)
{
  var ERRCODE = 256;

  //var START = 0;
  //var TOKEN_READ = 1;
  //var STACKS_GROWN_1 = 2;
  //var STACKS_GROWN_2 = 3;
  //var SEMANTIC_ACTION_COMPUTED = 4;
  //var ERROR_DETECTED = 5;
  var loop = 6;
  var testshift = 7;
  var shift = 8;
  var shift_recover = 9;
  var reduce = 10;

  var READ_TOKEN = 0;
  var RAISE_PARSE_ERROR = 1;
  var GROW_STACKS_1 = 2;
  var GROW_STACKS_2 = 3;
  var COMPUTE_SEMANTIC_ACTION = 4;
  var CALL_ERROR_FUNCTION = 5;

  var env_s_stack = 1;
  var env_v_stack = 2;
  var env_symb_start_stack = 3;
  var env_symb_end_stack = 4;
  var env_stacksize = 5;
  var env_stackbase = 6;
  var env_curr_char = 7;
  var env_lval = 8;
  var env_symb_start = 9;
  var env_symb_end = 10;
  var env_asp = 11;
  var env_rule_len = 12;
  var env_rule_number = 13;
  var env_sp = 14;
  var env_state = 15;
  var env_errflag = 16;

  // var _tbl_actions = 1;
  var tbl_transl_const = 2;
  var tbl_transl_block = 3;
  var tbl_lhs = 4;
  var tbl_len = 5;
  var tbl_defred = 6;
  var tbl_dgoto = 7;
  var tbl_sindex = 8;
  var tbl_rindex = 9;
  var tbl_gindex = 10;
  var tbl_tablesize = 11;
  var tbl_table = 12;
  var tbl_check = 13;
  // var _tbl_error_function = 14;
  // var _tbl_names_const = 15;
  // var _tbl_names_block = 16;

  if (!tables.dgoto) {
    tables.defred = caml_lex_array (tables[tbl_defred]);
    tables.sindex = caml_lex_array (tables[tbl_sindex]);
    tables.check  = caml_lex_array (tables[tbl_check]);
    tables.rindex = caml_lex_array (tables[tbl_rindex]);
    tables.table  = caml_lex_array (tables[tbl_table]);
    tables.len    = caml_lex_array (tables[tbl_len]);
    tables.lhs    = caml_lex_array (tables[tbl_lhs]);
    tables.gindex = caml_lex_array (tables[tbl_gindex]);
    tables.dgoto  = caml_lex_array (tables[tbl_dgoto]);
  }

  var res = 0, n, n1, n2, state1;

  // RESTORE
  var sp = env[env_sp];
  var state = env[env_state];
  var errflag = env[env_errflag];

  exit:for (;;) {
    switch(cmd) {
    case 0://START:
      state = 0;
      errflag = 0;
      // Fall through

    case 6://loop:
      n = tables.defred[state];
      if (n != 0) { cmd = reduce; break; }
      if (env[env_curr_char] >= 0) { cmd = testshift; break; }
      res = READ_TOKEN;
      break exit;
      /* The ML code calls the lexer and updates */
      /* symb_start and symb_end */
    case 1://TOKEN_READ:
      if (arg instanceof Array) {
        env[env_curr_char] = tables[tbl_transl_block][arg[0] + 1];
        env[env_lval] = arg[1];
      } else {
        env[env_curr_char] = tables[tbl_transl_const][arg + 1];
        env[env_lval] = 0;
      }
      // Fall through

    case 7://testshift:
      n1 = tables.sindex[state];
      n2 = n1 + env[env_curr_char];
      if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
          tables.check[n2] == env[env_curr_char]) {
        cmd = shift; break;
      }
      n1 = tables.rindex[state];
      n2 = n1 + env[env_curr_char];
      if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
          tables.check[n2] == env[env_curr_char]) {
        n = tables.table[n2];
        cmd = reduce; break;
      }
      if (errflag <= 0) {
        res = CALL_ERROR_FUNCTION;
        break exit;
      }
      // Fall through
      /* The ML code calls the error function */
    case 5://ERROR_DETECTED:
      if (errflag < 3) {
        errflag = 3;
        for (;;) {
          state1 = env[env_s_stack][sp + 1];
          n1 = tables.sindex[state1];
          n2 = n1 + ERRCODE;
          if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
              tables.check[n2] == ERRCODE) {
            cmd = shift_recover; break;
          } else {
            if (sp <= env[env_stackbase]) return RAISE_PARSE_ERROR;
            /* The ML code raises Parse_error */
            sp--;
          }
        }
      } else {
        if (env[env_curr_char] == 0) return RAISE_PARSE_ERROR;
        /* The ML code raises Parse_error */
        env[env_curr_char] = -1;
        cmd = loop; break;
      }
      // Fall through
    case 8://shift:
      env[env_curr_char] = -1;
      if (errflag > 0) errflag--;
      // Fall through
    case 9://shift_recover:
      state = tables.table[n2];
      sp++;
      if (sp >= env[env_stacksize]) {
        res = GROW_STACKS_1;
        break exit;
      }
      // Fall through
      /* The ML code resizes the stacks */
    case 2://STACKS_GROWN_1:
      env[env_s_stack][sp + 1] = state;
      env[env_v_stack][sp + 1] = env[env_lval];
      env[env_symb_start_stack][sp + 1] = env[env_symb_start];
      env[env_symb_end_stack][sp + 1] = env[env_symb_end];
      cmd = loop;
      break;

    case 10://reduce:
      var m = tables.len[n];
      env[env_asp] = sp;
      env[env_rule_number] = n;
      env[env_rule_len] = m;
      sp = sp - m + 1;
      m = tables.lhs[n];
      state1 = env[env_s_stack][sp];
      n1 = tables.gindex[m];
      n2 = n1 + state1;
      if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
          tables.check[n2] == state1)
        state = tables.table[n2];
      else
        state = tables.dgoto[m];
      if (sp >= env[env_stacksize]) {
        res = GROW_STACKS_2;
        break exit;
      }
      // Fall through
      /* The ML code resizes the stacks */
    case 3://STACKS_GROWN_2:
      res = COMPUTE_SEMANTIC_ACTION;
      break exit;
      /* The ML code calls the semantic action */
    case 4://SEMANTIC_ACTION_COMPUTED:
      env[env_s_stack][sp + 1] = state;
      env[env_v_stack][sp + 1] = arg;
      var asp = env[env_asp];
      env[env_symb_end_stack][sp + 1] = env[env_symb_end_stack][asp + 1];
      if (sp > asp) {
        /* This is an epsilon production. Take symb_start equal to symb_end. */
        env[env_symb_start_stack][sp + 1] = env[env_symb_end_stack][asp + 1];
      }
      cmd = loop; break;
      /* Should not happen */
    default:
      return RAISE_PARSE_ERROR;
    }
  }
  // SAVE
  env[env_sp] = sp;
  env[env_state] = state;
  env[env_errflag] = errflag;
  return res;
}

//Provides: caml_set_parser_trace const
//Dummy function!
function caml_set_parser_trace() { return 0; }

//# 1 "+stdlib.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

//Provides: caml_call_gen (const, shallow)
//Weakdef
function caml_call_gen(f, args) {
  if(f.fun)
    return caml_call_gen(f.fun, args);
  //FIXME, can happen with too many arguments
  if(typeof f !== "function") return f;
  var n = f.length | 0;
  if(n === 0) return f.apply(null,args);
  var argsLen = args.length | 0;
  var d = n - argsLen | 0;
  if (d == 0)
    return f.apply(null, args);
  else if (d < 0) {
    return caml_call_gen(f.apply(null,args.slice(0,n)),args.slice(n));
  }
  else {
    return function (){
      var extra_args = (arguments.length == 0)?1:arguments.length;
      var nargs = new Array(args.length+extra_args);
      for(var i = 0; i < args.length; i++ ) nargs[i] = args[i];
      for(var i = 0; i < arguments.length; i++ ) nargs[args.length+i] = arguments[i];
      return caml_call_gen(f, nargs)
    }
  }
}

//Provides: caml_named_values
var caml_named_values = {};

//Provides: caml_register_named_value (const,const)
//Requires: caml_named_values, caml_jsbytes_of_string
function caml_register_named_value(nm,v) {
  caml_named_values[caml_jsbytes_of_string(nm)] = v;
  return 0;
}

//Provides: caml_named_value
//Requires: caml_named_values
function caml_named_value(nm) {
  return caml_named_values[nm]
}

//Provides: caml_global_data
var caml_global_data = [0];

//Provides: caml_register_global (const, shallow, const)
//Requires: caml_global_data
function caml_register_global (n, v, name_opt) {
  if(name_opt && joo_global_object.toplevelReloc)
    n = joo_global_object.toplevelReloc(name_opt);
  caml_global_data[n + 1] = v;
  if(name_opt) caml_global_data[name_opt] = v;
}

//Provides: caml_get_global_data mutable
//Requires: caml_global_data
function caml_get_global_data () { return caml_global_data; }

//Provides: caml_is_printable const (const)
function caml_is_printable(c) { return +(c > 31 && c < 127); }

//# 1 "+sys.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

///////////// Sys

//Provides: caml_raise_sys_error (const)
//Requires: caml_raise_with_string, caml_global_data
function caml_raise_sys_error (msg) {
  caml_raise_with_string(caml_global_data.Sys_error, msg);
}

//Provides: caml_sys_exit
//Requires: caml_invalid_argument
function caml_sys_exit (code) {
  var g = joo_global_object;
  if(g.quit) g.quit(code);
  //nodejs
  if(g.process && g.process.exit)
    g.process.exit(code);
  caml_invalid_argument("Function 'exit' not implemented");
}

//Provides: caml_set_static_env
function caml_set_static_env(k,v){
  if(!joo_global_object.jsoo_static_env)
    joo_global_object.jsoo_static_env = {}
  joo_global_object.jsoo_static_env[k] = v;
  return 0;
}
//Provides: caml_sys_getenv (const)
//Requires: caml_raise_not_found
//Requires: caml_string_of_jsstring
//Requires: caml_jsstring_of_string
function caml_sys_getenv (name) {
  var g = joo_global_object;
  var n = caml_jsstring_of_string(name);
  //nodejs env
  if(g.process
     && g.process.env
     && g.process.env[n] != undefined)
    return caml_string_of_jsstring(g.process.env[n]);
  if(joo_global_object.jsoo_static_env
     && joo_global_object.jsoo_static_env[n])
    return caml_string_of_jsstring(joo_global_object.jsoo_static_env[n])
  caml_raise_not_found ();
}

//Provides: caml_sys_unsafe_getenv
//Requires: caml_sys_getenv
function caml_sys_unsafe_getenv(name){
  return caml_sys_getenv (name);
}

//Provides: caml_argv
//Requires: caml_string_of_jsstring
var caml_argv = ((function () {
  var g = joo_global_object;
  var main = "a.out";
  var args = []

  if(g.process
     && g.process.argv
     && g.process.argv.length > 1) {
    var argv = g.process.argv
    //nodejs
    main = argv[1];
    args = argv.slice(2);
  }

  var p = caml_string_of_jsstring(main);
  var args2 = [0, p];
  for(var i = 0; i < args.length; i++)
    args2.push(caml_string_of_jsstring(args[i]));
  return args2;
})())

//Provides: caml_executable_name
//Requires: caml_argv
var caml_executable_name = caml_argv[1]

//Provides: caml_sys_get_argv
//Requires: caml_argv
function caml_sys_get_argv (a) {
  return [0, caml_argv[1], caml_argv];
}

//Provides: caml_sys_argv
//Requires: caml_argv
function caml_sys_argv (a) {
  return caml_argv;
}

//Provides: caml_sys_modify_argv
//Requires: caml_argv
function caml_sys_modify_argv(arg){
  caml_argv = arg;
  return 0;
}

//Provides: caml_sys_executable_name const
//Requires: caml_executable_name
function caml_sys_executable_name(a){
  return caml_executable_name
}

//Provides: caml_sys_system_command
//Requires: caml_jsstring_of_string
function caml_sys_system_command(cmd){
  var cmd = caml_jsstring_of_string(cmd);
  if (typeof require != "undefined"
      && require('child_process')
      && require('child_process').execSync) {
    try {require('child_process').execSync(cmd,{stdio: 'inherit'}); return 0}
    catch (e) {return 1}
  }
  else return 127;
}

//Provides: caml_sys_time mutable
var caml_initial_time = (new Date()).getTime() * 0.001;
function caml_sys_time () {
  var now = (new Date()).getTime();
  return now * 0.001 - caml_initial_time;
}

//Provides: caml_sys_time_include_children
//Requires: caml_sys_time
function caml_sys_time_include_children(b) {
  return caml_sys_time();
}

//Provides: caml_sys_random_seed mutable
//The function needs to return an array since OCaml 4.0...
function caml_sys_random_seed () {
  var now = (new Date()).getTime();
  var x = now^0xffffffff*Math.random();
  return [0,x];
}

//Provides: caml_sys_const_big_endian const
function caml_sys_const_big_endian () { return 0; }

//Provides: caml_sys_const_word_size const
function caml_sys_const_word_size () { return 32; }

//Provides: caml_sys_const_int_size const
function caml_sys_const_int_size () { return 32; }

//Provides: caml_sys_const_max_wosize const
// max_int / 4 so that the following does not overflow
//let max_string_length = word_size / 8 * max_array_length - 1;;
function caml_sys_const_max_wosize () { return (0x7FFFFFFF/4) | 0;}

//Provides: caml_sys_const_ostype_unix const
function caml_sys_const_ostype_unix () { return 1; }
//Provides: caml_sys_const_ostype_win32 const
function caml_sys_const_ostype_win32 () { return 0; }
//Provides: caml_sys_const_ostype_cygwin const
function caml_sys_const_ostype_cygwin () { return 0; }

//Provides: caml_sys_const_backend_type const
//Requires: caml_string_of_jsbytes
function caml_sys_const_backend_type () {
  return [0, caml_string_of_jsbytes("js_of_ocaml")];
}

//Provides: caml_sys_get_config const
//Requires: caml_string_of_jsbytes
function caml_sys_get_config () {
  return [0, caml_string_of_jsbytes("Unix"), 32, 0];
}

//Provides: caml_sys_isatty
function caml_sys_isatty(_chan) {
  return 0;
}

//Provides: caml_runtime_variant
//Requires: caml_string_of_jsbytes
function caml_runtime_variant(_unit) {
  return caml_string_of_jsbytes("");
}
//Provides: caml_runtime_parameters
//Requires: caml_string_of_jsbytes
function caml_runtime_parameters(_unit) {
  return caml_string_of_jsbytes("");
}

//Provides: caml_install_signal_handler const
function caml_install_signal_handler(){return 0}

//Provides: unix_inet_addr_of_string
function unix_inet_addr_of_string () {return 0;}



//Provides: caml_runtime_warnings
var caml_runtime_warnings = 0;

//Provides: caml_ml_enable_runtime_warnings
//Requires: caml_runtime_warnings
function caml_ml_enable_runtime_warnings (bool) {
  caml_runtime_warnings = bool;
  return 0;
}

//Provides: caml_ml_runtime_warnings_enabled
//Requires: caml_runtime_warnings
function caml_ml_runtime_warnings_enabled (_unit) {
  return caml_runtime_warnings;
}


//Provides: caml_spacetime_enabled const (const)
function caml_spacetime_enabled(_unit) {
  return 0;
}

//Provides: caml_sys_const_naked_pointers_checked const (const)
function caml_sys_const_naked_pointers_checked(_unit) {
  return 0;
}

//Provides: caml_register_channel_for_spacetime const (const)
function caml_register_channel_for_spacetime(_channel) {
  return 0;
}

//Provides: caml_spacetime_only_works_for_native_code
//Requires: caml_failwith
function caml_spacetime_only_works_for_native_code() {
  caml_failwith("Spacetime profiling only works for native code");
}

//# 1 "+str.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2020 - Hugo Heuzard
// Copyright (C) 2020 - Shachar Itzhaky
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

// Based on https://github.com/ocaml/ocaml/blob/4.07/otherlibs/str/strstubs.c
// Copied from https://github.com/jscoq/jscoq/blob/v8.11/coq-js/js_stub/str.js

//Provides: re_match
//Requires: caml_jsbytes_of_string, caml_js_from_array, caml_array_of_string
//Requires: caml_string_get

var re_match = function(){
  var re_word_letters = [
    0x00, 0x00, 0x00, 0x00,       /* 0x00-0x1F: none */
    0x00, 0x00, 0xFF, 0x03,       /* 0x20-0x3F: digits 0-9 */
    0xFE, 0xFF, 0xFF, 0x87,       /* 0x40-0x5F: A to Z, _ */
    0xFE, 0xFF, 0xFF, 0x07,       /* 0x60-0x7F: a to z */
    0x00, 0x00, 0x00, 0x00,       /* 0x80-0x9F: none */
    0x00, 0x00, 0x00, 0x00,       /* 0xA0-0xBF: none */
    0xFF, 0xFF, 0x7F, 0xFF,       /* 0xC0-0xDF: Latin-1 accented uppercase */
    0xFF, 0xFF, 0x7F, 0xFF        /* 0xE0-0xFF: Latin-1 accented lowercase */
  ];

  var opcodes = {
    CHAR: 0, CHARNORM: 1, STRING: 2, STRINGNORM: 3, CHARCLASS: 4,
    BOL: 5, EOL: 6, WORDBOUNDARY: 7,
    BEGGROUP: 8, ENDGROUP: 9, REFGROUP: 10,
    ACCEPT: 11,
    SIMPLEOPT: 12, SIMPLESTAR: 13, SIMPLEPLUS: 14,
    GOTO: 15, PUSHBACK: 16, SETMARK: 17,
    CHECKPROGRESS: 18
  };

  function is_word_letter(c) {
    return (re_word_letters[  (c >> 3)] >> (c & 7)) & 1;
  }

  function in_bitset(s,i) {
    return (caml_string_get(s,(i >> 3)) >> (i & 7)) & 1;
  }

  function re_match_impl(re, s, pos, partial) {

    var prog          = caml_js_from_array(re[1]),
        cpool         = caml_js_from_array(re[2]),
        normtable     = caml_jsbytes_of_string(re[3]),
        numgroups     = re[4] | 0,
        numregisters  = re[5] | 0,
        startchars    = re[6] | 0;

    var s = caml_array_of_string(s);

    var pc = 0,
        quit = false,
        stack = [],
        groups = new Array(numgroups),
        re_register = new Array(numregisters);

    for(var i = 0; i < groups.length; i++){
      groups[i] = {start: -1, end:-1}
    }
    groups[0].start = pos;

    var backtrack = function () {
      while (stack.length) {
        var item = stack.pop();
        if (item.undo) {
          item.undo.obj[item.undo.prop] = item.undo.value;
        }
        else if(item.pos) {
          pc = item.pos.pc;
          pos = item.pos.txt;
          return;
        }
      }
      quit = true;
    };

    var push = function(item) { stack.push(item); };

    var accept = function () {
      groups[0].end = pos;
      var result = new Array(1 + groups.length*2);
      result[0] = 0; // tag
      for(var i = 0; i < groups.length; i++){
        var g = groups[i];
        if(g.start < 0 || g.end < 0) {
          g.start = g.end = -1;
        }
        result[2*i + 1 ] = g.start;
        result[2*i + 1 + 1 ] = g.end;
      };
      return result
    };

    var prefix_match = function () {
      if(partial) return accept ();
      else backtrack ();
    }

    /* Main DFA interpreter loop */
    while (!quit) {
      var op = prog[pc] & 0xff,
          sarg = prog[pc] >> 8,
          uarg = sarg & 0xff,
          c = s[pos],
          group;

      pc++;

      switch (op) {
      case opcodes.CHAR:
        if(pos === s.length) {prefix_match (); break};
        if (c === uarg) pos++;
        else backtrack();
        break;
      case opcodes.CHARNORM:
        if(pos === s.length) {prefix_match (); break};
        if (normtable.charCodeAt(c) === uarg) pos++;
        else backtrack();
        break;
      case opcodes.STRING:
        for (var arg = caml_jsbytes_of_string(cpool[uarg]), i = 0; i < arg.length; i++) {
          if(pos === s.length) {prefix_match (); break};
          if (c === arg.charCodeAt(i))
            c = s[++pos];
          else { backtrack(); break; }
        }
        break;
      case opcodes.STRINGNORM:
        for (var arg = caml_jsbytes_of_string(cpool[uarg]), i = 0; i < arg.length; i++) {
          if(pos === s.length) {prefix_match (); break};
          if (normtable.charCodeAt(c) === arg.charCodeAt(i))
            c = s[++pos];
          else { backtrack(); break; }
        }
        break;
      case opcodes.CHARCLASS:
      if(pos === s.length) {prefix_match (); break};
        if (in_bitset(cpool[uarg], c)) pos++;
        else backtrack();
        break;
      case opcodes.BOL:
        if(pos > 0 && s[pos - 1] != 10 /* \n */) {backtrack()}
        break;
      case opcodes.EOL:
        if(pos < s.length && s[pos] != 10 /* \n */) {backtrack()}
        break;
      case opcodes.WORDBOUNDARY:
        if(pos == 0) {
          if(pos === s.length) {prefix_match (); break};
          if(is_word_letter(s[0])) break;
          backtrack();
        }
        else if (pos === s.length) {
          if(is_word_letter(s[pos - 1])) break;
          backtrack ();
        }
        else {
          if(is_word_letter(s[pos - 1]) != is_word_letter(s[pos])) break;
          backtrack ();
        }
        break;
      case opcodes.BEGGROUP:
        group = groups[uarg];
        push({undo: {obj:group,
                     prop:'start',
                     value: group.start}});
        group.start = pos;
        break;
      case opcodes.ENDGROUP:
        group = groups[uarg];
        push({undo: {obj: group,
                     prop:'end',
                     value: group.end}});
        group.end = pos;
        break;
      case opcodes.REFGROUP:
        group = groups[uarg];
        if(group.start < 0 || group.end < 0) {backtrack (); break}
        for (var i = group.start; i < group.end; i++){
          if(pos === s.length) {prefix_match (); break};
          if(s[i] != s[pos]) {backtrack (); break}
          pos++;
        }
        break;
      case opcodes.SIMPLEOPT:
        if (in_bitset(cpool[uarg], c)) pos++;
        break;
      case opcodes.SIMPLESTAR:
        while (in_bitset(cpool[uarg], c))
          c = s[++pos];
        break;
      case opcodes.SIMPLEPLUS:
        if(pos === s.length) {prefix_match (); break};
        if (in_bitset(cpool[uarg], c)) {
          do {
            c = s[++pos];
          } while (in_bitset(cpool[uarg], c));
        }
        else backtrack();
        break;
      case opcodes.ACCEPT:
        return accept();
      case opcodes.GOTO:
        pc = pc + sarg;
        break;
      case opcodes.PUSHBACK:
        push({pos: {pc: pc + sarg, txt: pos}});
        break;
      case opcodes.SETMARK:
        push({undo: {obj:re_register,
                     prop: uarg,
                     value: re_register[uarg]}});
        re_register[uarg] = pos;
        break;
      case opcodes.CHECKPROGRESS:
        if (re_register[uarg] === pos) backtrack();
        break;
      default: throw new Error("Invalid bytecode");
      }
    }
    return 0;
  }

  return re_match_impl;
}();


//Provides: re_search_forward
//Requires: re_match, caml_ml_string_length, caml_invalid_argument
function re_search_forward(re, s, pos) {
  if(pos < 0 || pos > caml_ml_string_length(s))
    caml_invalid_argument("Str.search_forward")
  while (pos <= caml_ml_string_length(s)) {
    var res = re_match(re, s, pos, 0);
    if (res) return res;
    pos++;
  }

  return [0];  /* [||] : int array */
}

//Provides: re_search_backward
//Requires: re_match, caml_ml_string_length, caml_invalid_argument
function re_search_backward(re, s, pos) {
  if(pos < 0 || pos > caml_ml_string_length(s))
    caml_invalid_argument("Str.search_backward")
  while (pos >= 0) {
    var res = re_match(re, s, pos, 0);
    if (res) return res;
    pos--;
  }

  return [0];  /* [||] : int array */
}


//Provides: re_string_match
//Requires: re_match, caml_ml_string_length, caml_invalid_argument
function re_string_match(re,s,pos){
  if(pos < 0 || pos > caml_ml_string_length(s))
    caml_invalid_argument("Str.string_match")
  var res = re_match(re, s, pos, 0);
  if (res) return res;
  else return [0];
}

//Provides: re_partial_match
//Requires: re_match, caml_ml_string_length, caml_invalid_argument
function re_partial_match(re,s,pos){
  if(pos < 0 || pos > caml_ml_string_length(s))
    caml_invalid_argument("Str.partial_match")
  var res = re_match(re, s, pos, 1);
  if (res) return res;
  else return [0];
}

//Provides: re_replacement_text
//Requires: caml_jsbytes_of_string, caml_string_of_jsbytes
//Requires: caml_array_get
//Requires: caml_failwith
// external re_replacement_text: string -> int array -> string -> string
function re_replacement_text(repl,groups,orig) {
  var repl = caml_jsbytes_of_string(repl);
  var len = repl.length;
  var orig = caml_jsbytes_of_string(orig);
  var res = ""; //result
  var n = 0; // current position
  var cur; //current char
  var start, end, c;
  while(n < len){
    cur = repl.charAt(n++);
    if(cur != '\\'){
      res += cur;
    }
    else {
      if(n == len) caml_failwith("Str.replace: illegal backslash sequence");
      cur = repl.charAt(n++);
      switch(cur){
      case '\\':
        res += cur;
        break;
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        c = +cur;
        if (c*2 >= groups.length - 1 )
          caml_failwith("Str.replace: reference to unmatched group" );
        start = caml_array_get(groups,c*2);
        end = caml_array_get(groups, c*2 +1);
        if (start == -1)
          caml_failwith("Str.replace: reference to unmatched group");
        res+=orig.slice(start,end);
        break;
      default:
        res += ('\\'  + cur);
      }
    }
  }
  return caml_string_of_jsbytes(res); }

//# 1 "+unix.js"
//Provides: unix_gettimeofday
function unix_gettimeofday () {
  return (new Date()).getTime() / 1000;
}

//Provides: unix_time
//Requires: unix_gettimeofday
function unix_time () {
  return Math.floor(unix_gettimeofday ());
}

//Provides: unix_gmtime
function unix_gmtime (t) {
  var d = new Date (t * 1000);
  var d_num = d.getTime();
  var januaryfirst = (new Date(Date.UTC(d.getUTCFullYear(), 0, 1))).getTime();
  var doy = Math.floor((d_num - januaryfirst) / 86400000);
  return BLOCK(0, d.getUTCSeconds(), d.getUTCMinutes(), d.getUTCHours(),
          d.getUTCDate(), d.getUTCMonth(), d.getUTCFullYear() - 1900,
          d.getUTCDay(), doy,
          false | 0 /* for UTC daylight savings time is false */)
}

//Provides: unix_localtime
function unix_localtime (t) {
  var d = new Date (t * 1000);
  var d_num = d.getTime();
  var januaryfirst = (new Date(d.getFullYear(), 0, 1)).getTime();
  var doy = Math.floor((d_num - januaryfirst) / 86400000);
  var jan = new Date(d.getFullYear(), 0, 1);
  var jul = new Date(d.getFullYear(), 6, 1);
  var stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  return BLOCK(0, d.getSeconds(), d.getMinutes(), d.getHours(),
          d.getDate(), d.getMonth(), d.getFullYear() - 1900,
          d.getDay(), doy,
          (d.getTimezoneOffset() < stdTimezoneOffset) | 0 /* daylight savings time  field. */)
}

//Provides: unix_mktime
//Requires: unix_localtime
function unix_mktime(tm){
  var d = (new Date(tm[6]+1900,tm[5],tm[4],tm[3],tm[2],tm[1])).getTime();
  var t = Math.floor(d / 1000);
  var tm2 = unix_localtime(t);
  return BLOCK(0,t,tm2);
}

//Provides: win_startup const
function win_startup() {}

//Provides: win_cleanup const
function win_cleanup() {}

//Provides: win_handle_fd const
function win_handle_fd(x) {return x;}

//Provides: unix_isatty 
//Requires: fs_node_supported
function unix_isatty(fileDescriptor) {
  if(fs_node_supported()) {
    var tty = require('tty');
    return tty.isatty(fileDescriptor);
  } else {
    return false;
  }
}

//# 1 "+weak.js"
// Js_of_ocaml runtime support
// http://www.ocsigen.org/js_of_ocaml/
// Copyright (C) 2010 Jérôme Vouillon
// Laboratoire PPS - CNRS Université Paris Diderot
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, with linking exception;
// either version 2.1 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

// Weak API, but without the weak semantics

//Provides: caml_ephe_key_offset
//Version: < 4.03
var caml_ephe_key_offset = 2

//Provides: caml_ephe_key_offset
//Version: >= 4.03
var caml_ephe_key_offset = 3

//Provides: caml_ephe_data_offset
//Version: >= 4.03
var caml_ephe_data_offset = 2

//Provides: caml_weak_create
//Requires: caml_ephe_key_offset, caml_invalid_argument
function caml_weak_create (n) {
  if (n < 0) caml_invalid_argument ("Weak.create");
  var x = [251,"caml_ephe_list_head"];
  x.length = caml_ephe_key_offset + n;
  return x;
}

//Provides: caml_weak_set
//Requires: caml_ephe_key_offset, caml_invalid_argument
function caml_weak_set(x, i, v) {
  if(i < 0 || caml_ephe_key_offset + i >= x.length)
    caml_invalid_argument ("Weak.set");
  x[caml_ephe_key_offset + i] = v;
  return 0;
}
//Provides: caml_weak_get
//Requires: caml_ephe_key_offset, caml_invalid_argument
function caml_weak_get(x, i) {
  if(i < 0 || caml_ephe_key_offset + i >= x.length)
    caml_invalid_argument ("Weak.get_key");
  return (x[caml_ephe_key_offset + i ]===undefined)?0:x[caml_ephe_key_offset + i];
}
//Provides: caml_weak_get_copy
//Requires: caml_weak_get,caml_ephe_key_offset
//Requires: caml_obj_dup, caml_invalid_argument
function caml_weak_get_copy(x, i) {
  if(i < 0 || caml_ephe_key_offset + i >= x.length)
    caml_invalid_argument ("Weak.get_copy");
  var y = caml_weak_get(x, i);
  if (y === 0) return y;
  var z = y[1];
  if (z instanceof Array) return [0, caml_obj_dup(z)];
  return y;
}

//Provides: caml_weak_check mutable
//Requires: caml_ephe_key_offset
function caml_weak_check(x, i) {
  if(x[caml_ephe_key_offset + i]!==undefined && x[caml_ephe_key_offset + i] !==0)
    return 1;
  else
    return 0;
}

//Provides: caml_weak_blit
//Requires: caml_array_blit
//Requires: caml_ephe_key_offset
function caml_weak_blit(a1, i1, a2, i2, len) {
  // minus one because caml_array_blit works on ocaml array
  caml_array_blit(a1, caml_ephe_key_offset + i1 - 1,
                  a2, caml_ephe_key_offset + i2 - 1,
                  len);
  return 0;
}

//Provides: caml_ephe_create
//Requires: caml_weak_create
var caml_ephe_create = caml_weak_create

//Provides: caml_ephe_blit_key
//Requires: caml_weak_blit
var caml_ephe_blit_key = caml_weak_blit

//Provides: caml_ephe_get_key
//Requires: caml_weak_get
var caml_ephe_get_key = caml_weak_get

//Provides: caml_ephe_get_key_copy
//Requires: caml_weak_get_copy
var caml_ephe_get_key_copy = caml_weak_get_copy

//Provides: caml_ephe_check_key
//Requires: caml_weak_check
var caml_ephe_check_key = caml_weak_check

//Provides: caml_ephe_set_key
//Requires: caml_weak_set
function caml_ephe_set_key(x, i, v) {
  return caml_weak_set(x, i, [0, v])
}

//Provides: caml_ephe_unset_key
//Requires: caml_weak_set
function caml_ephe_unset_key(x, i) {
  return caml_weak_set(x, i, 0)
}

//Provides: caml_ephe_blit_data
//Requires: caml_ephe_data_offset
//Version: >= 4.03
function caml_ephe_blit_data(src, dst){
  dst[caml_ephe_data_offset] = src[caml_ephe_data_offset];
  return 0;
}

//Provides: caml_ephe_get_data
//Requires: caml_ephe_data_offset
//Version: >= 4.03
function caml_ephe_get_data(x){
  if(x[caml_ephe_data_offset] === undefined)
    return 0;
  else
    return [0, x[caml_ephe_data_offset]];
}

//Provides: caml_ephe_get_data_copy
//Requires: caml_ephe_data_offset
//Requires: caml_obj_dup
//Version: >= 4.03
function caml_ephe_get_data_copy(x){
  if(x[caml_ephe_data_offset] === undefined)
    return 0;
  else
    return [0, caml_obj_dup(x[caml_ephe_data_offset])];
}

//Provides: caml_ephe_set_data
//Requires: caml_ephe_data_offset
//Version: >= 4.03
function caml_ephe_set_data(x, data){
  x[caml_ephe_data_offset] = data;
  return 0;
}

//Provides: caml_ephe_unset_data
//Requires: caml_ephe_data_offset
//Version: >= 4.03
function caml_ephe_unset_data(x, data){
  x[caml_ephe_data_offset] = undefined;
  return 0;
}

//Provides: caml_ephe_check_data
//Requires: caml_ephe_data_offset
//Version: >= 4.03
function caml_ephe_check_data(x){
  if(x[caml_ephe_data_offset] === undefined)
    return 0;
  else
    return 1;
}

