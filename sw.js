"use strict";
const HOME_CACHE_NAME = "home-cache-v1";

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(HOME_CACHE_NAME).then((cache) => {
        return cache.addAll([
            '/',
            '/static/scripts/Home.js',
            '/static/devices.min.css'
        ]);
    }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            console.log(event);
            const cache = await caches.open(HOME_CACHE_NAME);
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                event.waitUntil(cache.add(event.request));
                return cachedResponse;
            }
            return fetch(event.request);
        })()
    );
});
