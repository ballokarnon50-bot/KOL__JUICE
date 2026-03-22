const CACHE_NAME = 'kol-juice-v2';
const ASSETS = [
  '/KOL__JUICE/',
  '/KOL__JUICE/index.html',
  '/KOL__JUICE/style.css',
  '/KOL__JUICE/manifest.json',
  '/KOL__JUICE/icons/icon-512.png',
  '/KOL__JUICE/PTH.jpeg',
  '/KOL__JUICE/modelfull.jpeg',
  '/KOL__JUICE/prod.jpeg',
  '/KOL__JUICE/bissap.jpeg',
  '/KOL__JUICE/passion.jpeg',
  '/KOL__JUICE/tommy.jpeg',
  '/KOL__JUICE/citron.jpeg',
  '/KOL__JUICE/cocktail.jpeg',
  '/KOL__JUICE/gingembre.jpeg'
];

// Installation du Service Worker et mise en cache des fichiers principaux
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS).catch(error => {
          console.error("Erreur de mise en cache : ", error);
          throw error;
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Gestion des requêtes pour permettre le mode hors-ligne
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});