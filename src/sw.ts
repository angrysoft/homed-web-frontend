

var HOME_CACHE_NAME = "home-cache-v1";
var urlsCache = [
    '/',
    '/icons',
    '/static'
];

self.addEventListener('install', event => {
    const preCache = async () => {
      const cache = await caches.open('static-v1');
      return cache.addAll(urlsCache);
    };
    // @ts-ignore: Unreachable code error
    event.waitUntil(preCache());
  });