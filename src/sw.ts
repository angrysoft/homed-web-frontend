

const HOME_CACHE_NAME = "home-cache-v1";





class ServiceWorkerOne {

    public static run(): void {
        addEventListener('install', ServiceWorkerOne.onInstalled);
        addEventListener('fetch', ServiceWorkerOne.onFetched);
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
        event.respondWith(
            caches.match(event.request).then((matchResponse) => {
                return matchResponse || fetch(event.request).then((fetchResponse) => {
                    return caches.open(HOME_CACHE_NAME).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
}

ServiceWorkerOne.run();