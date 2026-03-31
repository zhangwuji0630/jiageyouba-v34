const CACHE_NAME = "jiageyouba-v360-cache-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./add.html",
  "./stats.html",
  "./logs.html",
  "./settings.html",
  "./app.css",
  "./app.js",
  "./manifest.webmanifest",
  "./tailwind.generated.css",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/fonts/material-symbols-outlined.ttf",
  "./vendor/material-symbols.css",
  "./vendor/supabase-js.min.js",
  "./images/dashboard-story.png",
];
const APP_SHELL_URLS = new Set(APP_SHELL.map((path) => new URL(path, self.location.href).pathname));
const STATIC_FILE_PATTERN = /\.(?:css|js|png|jpg|jpeg|gif|webp|svg|ico|ttf|woff2?|webmanifest)$/i;

function isCacheableResponse(response) {
  return response && (response.ok || response.type === "opaque");
}

async function updateCache(request, response) {
  if (!isCacheableResponse(response)) {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone()).catch(() => {});
  return response;
}

async function matchCachedPath(pathname) {
  const cache = await caches.open(CACHE_NAME);
  return cache.match(new URL(pathname, self.location.origin).href);
}

async function precacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled(
    APP_SHELL.map(async (path) => {
      const request = new Request(path, { cache: "reload" });
      const response = await fetch(request);
      if (!isCacheableResponse(response)) {
        throw new Error(`Failed to precache ${path}`);
      }
      await cache.put(request, response.clone());
    })
  );

  const hasIndex = await matchCachedPath(new URL("./index.html", self.location.href).pathname);
  if (!hasIndex) {
    throw new Error("Failed to precache index.html");
  }
}

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isAppShellRequest(request) {
  const url = new URL(request.url);
  return isSameOrigin(url) && APP_SHELL_URLS.has(url.pathname);
}

function isStaticAssetRequest(request) {
  const url = new URL(request.url);
  if (!isSameOrigin(url) || request.mode === "navigate") {
    return false;
  }

  return STATIC_FILE_PATTERN.test(url.pathname);
}

async function networkFirst(request, fallbackRequest = request) {
  try {
    const response = await fetch(request);
    return updateCache(request, response);
  } catch (error) {
    const cachedResponse = await caches.match(fallbackRequest);
    if (cachedResponse) {
      return cachedResponse;
    }

    if (request.mode === "navigate") {
      const url = new URL(request.url);
      return (await matchCachedPath(url.pathname)) || (await matchCachedPath(new URL("./index.html", self.location.href).pathname));
    }

    throw error;
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  return updateCache(request, response);
}

async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  const networkResponsePromise = fetch(request)
    .then((response) => updateCache(request, response))
    .catch(() => null);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await networkResponsePromise;
  if (networkResponse) {
    return networkResponse;
  }

  throw new Error("Resource unavailable");
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (isAppShellRequest(event.request)) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  if (isStaticAssetRequest(event.request)) {
    event.respondWith(cacheFirst(event.request));
  }
});
