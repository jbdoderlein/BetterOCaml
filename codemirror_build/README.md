# CodeMirror 6 bundle

The editor uses [CodeMirror 6](https://codemirror.net/), which is distributed as ES modules.
To keep the site static and usable offline, the modules BetterOCaml needs are bundled
once into `src/js/codemirror6.js` (committed), which exposes them as the global `CM`.

The editor itself is set up in `src/js/editor_cm6.js`.

## Rebuild the bundle

Only needed to update CodeMirror or to use more of its modules (add them to `entry.js`):

```sh
cd codemirror_build
npm install
npm run build
```

`npm update` followed by `npm run build` updates CodeMirror to the latest 6.x versions.
