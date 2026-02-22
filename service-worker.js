const CACHE_NAME = 'schedai-cache-v4';
const APP_SHELL_URLS = [
  '.',
  'index.html',
  'privacy.html',
  'terms.html',
  'css/style.css',
  'js/script.js',
  'images/hero.jpg',
  'images/favicon.svg',
  'images/favicon-32x32.png',
  'images/apple-touch-icon.png'
].map((path) => new URL(path, self.registration.scope).toString());
const APP_FALLBACK_URL = new URL('index.html', self.registration.scope).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (isStaticAsset(event.request)) {
    event.respondWith(cacheFirst(event.request));
  }
});

function isStaticAsset(request) {
  return ['style', 'script', 'image', 'font'].includes(request.destination);
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    return cachedResponse || caches.match(APP_FALLBACK_URL);
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  const networkResponse = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, networkResponse.clone());
  return networkResponse;
}
