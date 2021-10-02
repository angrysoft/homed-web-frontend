

var HOME_CACHE_NAME = "home-cache-v1";
var urlsCache = [
    '/',
    '/icons',
    '/static'
];

/* self.addEventListener('install', event => {
    const preCache = async () => {
      const cache = await caches.open('static-v1');
      return await cache.addAll(urlsCache);
    };
    // @ts-ignore: Unreachable code error
    event.waitUntil(preCache());
  }); */

self.addEventListener('install', ev=> {
    // @ts-ignore: Unreachable code error
    ev.waitUntil(
        caches.open(HOME_CACHE_NAME)
        .then((cache )=> {
            return cache.addAll(urlsCache);
        })
    );
});