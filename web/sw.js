/* Counter – Service Worker: macht die App offline-fähig.
   Bei jeder Änderung an den Dateien CACHE-Version erhöhen. */
const CACHE = "counter-v2.0.2";
const ASSETS = [
  "./", "index.html", "styles.css", "app.js", "config.js", "manifest.webmanifest", "LICENSE.txt",
  "favicon.ico", "icons/favicon-48.png", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "img/logo.png", "img/size.png", "img/os_code.png", "img/bug.png",
  "fonts/roboto-latin-300-normal.woff2", "fonts/roboto-latin-400-normal.woff2", "fonts/roboto-latin-500-normal.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: sofort aus dem Cache, im Hintergrund aktualisieren.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true }) ||
        (req.mode === "navigate" ? await cache.match("index.html") : undefined);
      const network = fetch(req).then((res) => {
        if (res && res.ok && res.type === "basic") cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
