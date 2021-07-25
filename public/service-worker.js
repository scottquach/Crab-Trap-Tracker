const CACHE_NAME = 'version-1';

const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW event handler
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('cache...', cache);

            return cache.addAll(urlsToCache);
        })
    );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).catch(() => caches.match('offline.html'));
        })
    );
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((cacheName) => !cacheWhiteList.includes(cacheName))
                        .map((cacheName) => caches.delete(cacheName))
                )
            )
    );
});
