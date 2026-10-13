// Graphics runtime functions replaced for the toplevel running in a Web Worker.
// The original ones (js_of_ocaml-compiler/graphics.js) use document, which a worker does not have.

//Provides: caml_gr_draw_image
//Requires: caml_gr_state_get, caml_gr_y
function caml_gr_draw_image(im, x, y) {
  var s = caml_gr_state_get();
  if (!im.image) {
    // As the original, but with an OffscreenCanvas when there is no document, and the size
    // of the image (the original uses the size of the window, which cuts larger images)
    var canvas = typeof document !== "undefined"
      ? document.createElement("canvas")
      : new globalThis.OffscreenCanvas(im.width, im.height);
    canvas.width = im.width;
    canvas.height = im.height;
    canvas.getContext("2d").putImageData(im, 0, 0);
    im.image = canvas;
  }
  // the image's bottom row is caml_gr_y(s, y); drawImage takes the top-left
  s.context.drawImage(im.image, x, caml_gr_y(s, y) - im.height + 1);
  return 0;
}
