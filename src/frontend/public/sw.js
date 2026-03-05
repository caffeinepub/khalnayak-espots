// Khalnayak Espots - Service Worker
// Version: 1.0.0

const CACHE_NAME = 'khalnayak-espots-v1';
const OFFLINE_URL = '/offline.html';

// Static assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
];

// ── Install event: precache static assets ────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_ASSETS);
      // Activate new SW immediately
      await self.skipWaiting();
    })()
  );
});

// ── Activate event: clean old caches ─────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Remove old caches
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      // Take control of all clients immediately
      await self.clients.claim();
    })()
  );
});

// ── Fetch event: stale-while-revalidate strategy ──────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip ICP/canister API calls (never cache these)
  if (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('ic0.app') ||
    url.hostname.includes('icp0.io') ||
    url.hostname.includes('internetcomputer.org') ||
    url.hostname.includes('identity.ic0.app')
  ) {
    return;
  }

  // For navigation requests: show offline page if network fails
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try network first for navigation
          const networkResponse = await fetch(request);
          // Cache successful navigation responses
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch {
          // Offline: try cache, fallback to offline page
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const offlineResponse = await caches.match(OFFLINE_URL);
          return offlineResponse || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  // For static assets (JS, CSS, images, fonts): stale-while-revalidate
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|woff|woff2|ttf|ico)$/) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);

        // Fetch from network in background (revalidate)
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => null);

        // Return cached immediately (stale), update in background (revalidate)
        return cachedResponse || fetchPromise;
      })()
    );
    return;
  }
});

// ── Push Notifications ────────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  let data = {
    title: 'Khalnayak Espots',
    body: 'New update from Khalnayak Espots!',
    icon: '/assets/generated/pwa-icon-192.dim_192x192.png',
    badge: '/assets/generated/pwa-icon-192.dim_192x192.png',
    tag: 'khalnayak-notification',
    url: '/',
  };

  try {
    if (event.data) {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    }
  } catch {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      tag: data.tag,
      data: { url: data.url },
      vibrate: [200, 100, 200],
      actions: [
        { action: 'open', title: 'Open App' },
        { action: 'close', title: 'Dismiss' },
      ],
    })
  );
});

// ── Notification Click Handler ────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      // If app is already open, focus it
      for (const client of clients) {
        if ('focus' in client) {
          await client.focus();
          client.postMessage({ type: 'NAVIGATE', url });
          return;
        }
      }
      // Otherwise open a new window
      await self.clients.openWindow(url);
    })()
  );
});

// ── Background Sync (for offline actions) ─────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // When back online, notify the app
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'BACK_ONLINE' });
        });
      })
    );
  }
});

// ── Message Handler ────────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
