const staticAssets = [
    // './',
    './manifest.json',
    './index.html',
    './favicon.ico',
    // './css/',
    './css/bootstrap.css',
    './css/icon.css',
    './css/index.css',
    './css/codemirror/codemirror.min.css',
    './css/codemirror/dialog.css',
    './css/iconfont/MaterialIcons-Regular.eot',
    './css/iconfont/MaterialIcons-Regular.ttf',
    './css/iconfont/MaterialIcons-Regular.woff',
    './css/iconfont/MaterialIcons-Regular.woff2',
    './css/materialize/materialize.min.css',
    './css/theme/material.css',
    './css/theme/mdn-like.css',
    './css/theme/monokai.css',
    // './icon/',
    './icon/android-icon-36x36.png',
    './icon/android-icon-48x48.png',
    './icon/android-icon-72x72.png',
    './icon/android-icon-96x96.png',
    './icon/android-icon-144x144.png',
    './icon/android-icon-192x192.png',
    './icon/apple-icon.png',
    './icon/apple-icon-57x57.png',
    './icon/apple-icon-60x60.png',
    './icon/apple-icon-72x72.png',
    './icon/apple-icon-76x76.png',
    './icon/apple-icon-114x114.png',
    './icon/apple-icon-120x120.png',
    './icon/apple-icon-144x144.png',
    './icon/apple-icon-152x152.png',
    './icon/apple-icon-180x180.png',
    './icon/favicon-16x16.png',
    './icon/favicon-32x32.png',
    // './js/',
    './js/buttons.js',
    './js/editor_change.js',
    './js/jquery.min.js',
    './js/materialize.min.js',
    './js/resizer.js',
    './js/codemirror/closebrackets.js',
    './js/codemirror/codemirror.js',
    './js/codemirror/dialog.js',
    './js/codemirror/jump-to-line.js',
    './js/codemirror/matchbrackets.min.js',
    './js/codemirror/mllike.js',
    './js/codemirror/search.js',
    './js/codemirror/searchcursor.js',
    './js/codemirror/show-hint.js',
    './js/codemirror/sublime.min.js',
    // './toplevels/',
    './toplevels/toplevel-5.1.1.js',
];

self.addEventListener('install', async event=>{
    const cache = await caches.open('static-cache');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.url){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(newtorkFirst(req));
    }
});

async function cacheFirst(req){
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function newtorkFirst(req){
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}
