/* Service worker: zorgt dat de app ook zonder internet werkt.

   Hoe het werkt:
   - Bij de eerste keer laden worden alle bestanden van de app in een cache (opslag in de browser) gezet.
   - Daarna haalt de app elk bestand eerst van internet ("netwerk eerst"). Zo komt een nieuwe
     versie altijd meteen door. Lukt dat niet (geen internet), dan komt het bestand uit de cache.

   VERSIE: verhoog dit getal als je bestanden toevoegt, weghaalt of hernoemt (en bij elke nieuwe
   versie die je live zet, dat kan geen kwaad). Dan wordt de cache opnieuw gevuld en de oude opgeruimd.
   BESTANDEN: alle bestanden die de app nodig heeft. "npm test" controleert of deze lijst compleet is. */

const VERSIE = 1;
const CACHE = 'rekenjerot-v' + VERSIE;
const BESTANDEN = [
  './',
  './index.html',
  './manifest.json',
  './css/basis.css',
  './css/bewerkingen.css',
  './css/getallen.css',
  './css/meten.css',
  './css/verhoudingen.css',
  './css/verbanden.css',
  './js/app.js',
  './js/config.js',
  './js/kern.js',
  './js/koppelingen.js',
  './js/oefeningen.js',
  './js/opslag.js',
  './js/scherm.js',
  './js/speler.js',
  './js/spellen.js',
  './js/voortgang.js',
  './js/domeinen/bewerkingen.js',
  './js/domeinen/getallen.js',
  './js/domeinen/meten.js',
  './js/domeinen/verbanden.js',
  './js/domeinen/verhoudingen.js',
  './iconen/icoon.svg',
  './iconen/icoon-192.png',
  './iconen/icoon-512.png',
  './iconen/icoon-maskable-512.png',
  './iconen/apple-touch-icon.png'
];

/* Installeren: alles in de cache zetten (rechtstreeks van de server, niet uit de browsercache) */
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BESTANDEN.map(b => new Request(b, { cache: 'reload' })))));
  self.skipWaiting();
});

/* Activeren: oude caches (van vorige versies) opruimen */
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

/* Elk verzoek: eerst internet, anders de cache */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    try {
      /* no-cache: vraag de server of er iets nieuws is, zodat alle bestanden van dezelfde versie zijn */
      const antwoord = await fetch(req, { cache: 'no-cache' });
      if (antwoord.ok) {
        const kopie = antwoord.clone();
        e.waitUntil(caches.open(CACHE).then(c => c.put(req, kopie)));
      }
      return antwoord;
    } catch (fout) {
      const uitCache = await caches.match(req, { ignoreSearch: true });
      if (uitCache) return uitCache;
      if (req.mode === 'navigate') return caches.match('./index.html');
      throw fout;
    }
  })());
});
