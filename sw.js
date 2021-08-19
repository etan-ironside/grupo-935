self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw-cache').then(function(cache) {
            return cache.add('index.html');
        })
    );
});
 
self.addEventListener('fetch', function(event) {
event.respondWith(
    caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    })
);
});

self.addEventListener("message", async e=>{
    if ("refresh" === e.data) {
        await self.skipWaiting();
        (await self.clients.matchAll({
            type: "window",
            includeUncontrolled: !0
        })).forEach(e=>{
            e.navigate(e.url)
        }
        )
    }
});