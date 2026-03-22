const CACHE_NAME = 'kol-juice-v1';
const ASSETS = [
  '/KOL__JUICE/',
  '/KOL__JUICE/index.html',
  '/KOL__JUICE/style.css',
  '/KOL__JUICE/manifest.json',
  '/KOL__JUICE/PTH.jpeg'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Gestion des requêtes pour permettre le mode hors-ligne
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});