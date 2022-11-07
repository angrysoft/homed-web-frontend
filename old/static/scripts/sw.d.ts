declare const HOME_CACHE_NAME = "home-cache-v1";
declare class ServiceWorkerOne {
    static run(): void;
    static onInstalled: (event: any) => void;
    static onFetched: (event: any) => void;
}
