self.addEventListener('fetch', (event) => {});if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/KOL__JUICE/sw.js')
    .then(() => console.log("Service Worker enregistré !"))
    .catch(err => console.log("Erreur SW :", err));
}