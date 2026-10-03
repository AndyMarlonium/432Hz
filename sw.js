/* Service worker de Diapason Solfeggio : met l'application en cache pour qu'elle fonctionne sans connexion. */
const VERSION = "diapason-v1";
const FONTS = VERSION + "-fonts";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Pages de l'application : réseau d'abord pour recevoir les mises à jour, cache si hors connexion.
  if (url.origin === self.location.origin) {
    if (req.mode === "navigate") {
      event.respondWith(
        fetch(req)
          .then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put("index.html", copy));
            return res;
          })
          .catch(() => caches.match("index.html"))
      );
      return;
    }
    event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
    return;
  }

  // Polices Google : gardées en cache après la première visite.
  if (url.host === "fonts.googleapis.com" || url.host === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONTS).then(async (cache) => {
        const hit = await cache.match(req);
        const net = fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || net;
      })
    );
  }
});
