

var HOME_CACHE_NAME = "home-cache-v1";
var urlsCache = [
    '/static/scripts/Home.js'
];

self.addEventListener('install', ev=> {
    // @ts-ignore: Unreachable code error
    ev.waitUntil(
        caches.open(HOME_CACHE_NAME)
        .then((cache )=> {
            return cache.addAll(urlsCache);
        })
    );
});