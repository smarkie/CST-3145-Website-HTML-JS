var cacheName = 'lessons';
var cacheFiles = [
    'index.html',
    'lessons.js',
    'service-worker.js',
    'lessons.webmanifest',
    'style.css',
    'img/lesson-icon-13.jpg',
    'img/lesson-icon-13.resize.png'
];

self.addEventListener('install', (e) => {
    console.log('[servie worker] install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[service worker] caching files.');
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch', function (e) {
e.respondWith(
    caches.match(e.request).then(function (r) {
    // Download the file if it is not in the cache,
        return r || fetch(e.request).then(function (response) {
        // add the new file to cache
            return caches.open(cacheName).then(function (cache) {
                cache.put(e.request, response.clone());
                return response;
                });
            });
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r
        })
    )
});