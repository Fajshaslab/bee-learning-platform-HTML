/* BEE Learning Platform: app-shell offline cache. No API/auth data is cached. */
const VERSION = 'bee-shell-2026-security-v242'
const ROOT = new URL('./', self.location.href)
const ASSETS = [
  './', './index.html', './sandbox.html', './config.js', './assets/styles.css',
  './src/main.js', './src/auth.js', './src/storage.js',
  './src/learning.js', './src/assessment.js', './src/js-runner.js', './data/curriculum.js', './data/lesson-guides.js',
].map(path => new URL(path, ROOT).href)

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(ASSETS)))
  self.skipWaiting()
})
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('bee-shell-') && key !== VERSION) await caches.delete(key)
    }
    await self.clients.claim()
  })())
})
self.addEventListener('fetch', event => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  // Same-origin static assets only. Never intercept Supabase/Auth/RPC traffic.
  if (url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname)) return
  const isNavigation = req.mode === 'navigate'
  const matching = ASSETS.includes(url.href)
  if (!isNavigation && !matching) return
  event.respondWith((async () => {
    const cache = await caches.open(VERSION)
    if (!navigator.onLine) {
      const cached = await cache.match(isNavigation ? new URL('index.html', ROOT).href : req)
      if (cached) return cached
    }
    try {
      const response = await fetch(req)
      if (response.ok && (matching || isNavigation)) {
        await cache.put(isNavigation ? new URL('index.html', ROOT).href : req, response.clone())
      }
      return response
    } catch (error) {
      const fallback = await cache.match(isNavigation ? new URL('index.html', ROOT).href : req)
      if (fallback) return fallback
      throw error
    }
  })())
})
