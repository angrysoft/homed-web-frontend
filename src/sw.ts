
const HOME_CACHE_NAME = "home-cache-v1";

class ServiceWorkerOne {

    public static run(): void {
        addEventListener('install', ServiceWorkerOne.onInstalled);
        // addEventListener('fetch', ServiceWorkerOne.onFetched);
    }

    public static onInstalled = (event: any): void => {
        event.waitUntil(
            caches.open(HOME_CACHE_NAME).then((cache) => {
                return cache.addAll([
                    '/static/scripts/Home.js',
                    '/static/devices.min.css'
                ]);
            })
        );
    }

    public static onFetched = (event: any): void => {
        if (event.request.method != "GET") return;

        event.respondWith(async () => {
            const cache = await caches.open(HOME_CACHE_NAME);
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                event.waitUntil(cache.add(event.request));
                return cachedResponse;
            }
            return fetch(event.request);
        }
        );
    }

    /* public static onActivate(event: any): void {
        let cacheKeepList = ['v1'];
    
    event.waitUntil(
        caches.keys().then( keyList => {
            return Promise.all(keyList.map(function(key) {
                if (cacheKeepList.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
    } */
}

ServiceWorkerOne.run();