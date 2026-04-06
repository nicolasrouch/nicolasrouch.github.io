const CACHE = 'marche-avec-jesus-v1';
const ASSETS = [
  '/team-jesus/',
  '/team-jesus/index.html',
  '/team-jesus/manifest.json',
  '/team-jesus/icon-192.png',
  '/team-jesus/icon-512.png',
  '/team-jesus/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
