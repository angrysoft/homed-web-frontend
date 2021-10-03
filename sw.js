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

self.addEventListener('fetch', event => {
    if (event.request.method != 'GET') return;
  
    event.respondWith(async function() {
      const cache = await caches.open('dynamic-v1');
      const cachedResponse = await cache.match(event.request);
  
      if (cachedResponse) {
        event.waitUntil(cache.add(event.request));
        return cachedResponse;
      }
      return fetch(event.request);
    }());
  });

/*   self.addEventListener('activate', (event) => {
    var cacheKeepList = ['v2'];
  
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  }); */