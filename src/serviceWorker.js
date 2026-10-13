// Files needed to use the page offline (the others are cached when first used)
const staticAssets = [
    './manifest.json',
    './index.html',
    './css/icon.css',
    './css/index.css',
    './css/iconfont/MaterialIcons-Regular.woff',
    './css/iconfont/MaterialIcons-Regular.woff2',
    './css/theme/material.css',
    './css/theme/mdn-like.css',
    './css/theme/monokai.css',
    './css/theme/pycharm.css',
    './icon/favicon.ico',
    './icon/android-icon-192x192.png',
    './icon/apple-icon-180x180.png',
    './icon/banner.png',
    './js/codemirror6.js',
    './js/editor_change.js',
    './js/editor_cm6.js',
    './js/editor_merlin.js',
    './js/app.js',
    './js/resizer.js',
    './js/toplevel_client.js',
    // './toplevels/',
    './toplevels/toplevel-5.5.1.js',
];

self.addEventListener('install', event => {
    // Finish caching before the install completes, and replace any older service worker
    event.waitUntil(caches.open('static-cache').then(cache => cache.addAll(staticAssets)));
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // Take control of the page that registered us, so its first visit is already cached
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET' || !req.url.startsWith('http')) return;
    event.respondWith(networkFirst(req));
});

async function networkFirst(req){
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        // Offline: any cache, then for pages the same URL without "?version=..."
        return (await caches.match(req))
            || (req.mode === 'navigate' && await caches.match(req, {ignoreSearch: true}))
            || Response.error();
    }
}
