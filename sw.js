// Offline cache for the web version (iPhone "Add to Home Screen").
// build-web replaces 20261116205416 and [".last_build_id","favicon-192.png","favicon-48.png","favicon-96.png","favicon.ico","favicon.png","flutter.js","flutter_bootstrap.js","index.html","main.dart.js","manifest.json","powersync_db.worker.js","powersync_db.worker.js.deps","robots.txt","sitemap.xml","sqlite3.wasm","_headers","assets/AssetManifest.bin","assets/AssetManifest.bin.json","assets/FontManifest.json","assets/NOTICES","assets/shorebird.yaml","assets/assets/fonts/FontAwesome-Regular.otf","assets/assets/fonts/FontAwesome-Solid.otf","assets/assets/fonts/Phosphor-Bold.ttf","assets/assets/fonts/Phosphor-Fill.ttf","assets/assets/fonts/Phosphor-Light.ttf","assets/assets/fonts/Phosphor.ttf","assets/assets/ui_icons/add.png","assets/assets/ui_icons/bell.png","assets/assets/ui_icons/calendar.png","assets/assets/ui_icons/clients.png","assets/assets/ui_icons/earnings.png","assets/assets/ui_icons/expense.png","assets/assets/ui_icons/finance.png","assets/assets/ui_icons/grid.png","assets/assets/ui_icons/income.png","assets/assets/ui_icons/month.png","assets/assets/ui_icons/pin.png","assets/assets/ui_icons/pin_plain.png","assets/assets/ui_icons/records.png","assets/assets/ui_icons/services.png","assets/assets/ui_icons/settings.png","assets/assets/ui_icons/summary.png","assets/assets/ui_icons/sync.png","assets/fonts/MaterialIcons-Regular.otf","assets/fonts/fallback/Roboto-Regular.ttf","assets/packages/cupertino_icons/assets/CupertinoIcons.ttf","assets/packages/lucide_icons_flutter/assets/lucide.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w100.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w200.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w300.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w400.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w500.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w600.ttf","assets/packages/material_ui/shaders/ink_sparkle.frag","assets/shaders/ink_sparkle.frag","assets/shaders/stretch_effect.frag","canvaskit/canvaskit.js","canvaskit/canvaskit.js.symbols","canvaskit/canvaskit.wasm","canvaskit/wimp.js","canvaskit/wimp.js.symbols","canvaskit/wimp.wasm","canvaskit/webparagraph/canvaskit.js","canvaskit/webparagraph/canvaskit.js.symbols","canvaskit/webparagraph/canvaskit.wasm","icons/Icon-192.png","icons/Icon-512.png","icons/Icon-maskable-192.png","icons/Icon-maskable-512.png"]; a new build = a new worker = fresh cache.
const BUILD = '20261116205416';
const FILES = [".last_build_id","favicon-192.png","favicon-48.png","favicon-96.png","favicon.ico","favicon.png","flutter.js","flutter_bootstrap.js","index.html","main.dart.js","manifest.json","powersync_db.worker.js","powersync_db.worker.js.deps","robots.txt","sitemap.xml","sqlite3.wasm","_headers","assets/AssetManifest.bin","assets/AssetManifest.bin.json","assets/FontManifest.json","assets/NOTICES","assets/shorebird.yaml","assets/assets/fonts/FontAwesome-Regular.otf","assets/assets/fonts/FontAwesome-Solid.otf","assets/assets/fonts/Phosphor-Bold.ttf","assets/assets/fonts/Phosphor-Fill.ttf","assets/assets/fonts/Phosphor-Light.ttf","assets/assets/fonts/Phosphor.ttf","assets/assets/ui_icons/add.png","assets/assets/ui_icons/bell.png","assets/assets/ui_icons/calendar.png","assets/assets/ui_icons/clients.png","assets/assets/ui_icons/earnings.png","assets/assets/ui_icons/expense.png","assets/assets/ui_icons/finance.png","assets/assets/ui_icons/grid.png","assets/assets/ui_icons/income.png","assets/assets/ui_icons/month.png","assets/assets/ui_icons/pin.png","assets/assets/ui_icons/pin_plain.png","assets/assets/ui_icons/records.png","assets/assets/ui_icons/services.png","assets/assets/ui_icons/settings.png","assets/assets/ui_icons/summary.png","assets/assets/ui_icons/sync.png","assets/fonts/MaterialIcons-Regular.otf","assets/fonts/fallback/Roboto-Regular.ttf","assets/packages/cupertino_icons/assets/CupertinoIcons.ttf","assets/packages/lucide_icons_flutter/assets/lucide.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w100.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w200.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w300.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w400.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w500.ttf","assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w600.ttf","assets/packages/material_ui/shaders/ink_sparkle.frag","assets/shaders/ink_sparkle.frag","assets/shaders/stretch_effect.frag","canvaskit/canvaskit.js","canvaskit/canvaskit.js.symbols","canvaskit/canvaskit.wasm","canvaskit/wimp.js","canvaskit/wimp.js.symbols","canvaskit/wimp.wasm","canvaskit/webparagraph/canvaskit.js","canvaskit/webparagraph/canvaskit.js.symbols","canvaskit/webparagraph/canvaskit.wasm","icons/Icon-192.png","icons/Icon-512.png","icons/Icon-maskable-192.png","icons/Icon-maskable-512.png"];
const APP = 'crm-app-' + BUILD;
const FONTS = 'crm-fonts'; // fonts.gstatic.com (Cyrillic etc.), kept across builds

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(APP);
    // One by one: a single failed file must not break the whole install.
    for (const f of FILES) {
      try {
        const r = await fetch(f, { cache: 'reload' });
        if (r.ok) await c.put(f, r);
      } catch (_) {}
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) {
      if (k !== APP && k !== FONTS) await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fonts that Flutter downloads at run time: cache forever.
  if (url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com') {
    e.respondWith(cacheFirst(FONTS, req));
    return;
  }
  if (url.origin !== self.location.origin) return; // Supabase, PowerSync, rates: always network

  // Page: network first (to pick up a new version), offline -> cached page.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        return await fetch(req);
      } catch (_) {
        const c = await caches.open(APP);
        return (await c.match('index.html')) || (await c.match('./')) || Response.error();
      }
    })());
    return;
  }
  if (url.pathname.endsWith('/sw.js')) return;
  e.respondWith(cacheFirst(APP, req, true));
});

async function cacheFirst(name, req, ignoreSearch) {
  const c = await caches.open(name);
  const hit = await c.match(req, { ignoreSearch: !!ignoreSearch });
  if (hit) return hit;
  try {
    const r = await fetch(req);
    if (r.ok || r.type === 'opaque') c.put(req, r.clone());
    return r;
  } catch (err) {
    return Response.error();
  }
}
