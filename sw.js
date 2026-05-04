const CACHE = 'team-jesus-v4';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// ══ NOTIFICATIONS PUSH ══
self.addEventListener('push', e => {
  let data = {
    title: '🙏 Team Jesus',
    body: 'As-tu lu la prière du jour ?',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    url: '/'
  };

  if (e.data) {
    try {
      const payload = e.data.json();
      data = { ...data, ...payload };
    } catch(err) {
      data.body = e.data.text();
    }
  }

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      vibrate: [200, 100, 200],
      data: { url: data.url }
    })
  );
});

// ══ CLIC SUR NOTIFICATION ══
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
