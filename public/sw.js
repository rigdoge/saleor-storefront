if (!self.define) {
	let e,
		s = {};
	const n = (n, a) => (
		(n = new URL(n + ".js", a).href),
		s[n] ||
			new Promise((s) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = n), (e.onload = s), document.head.appendChild(e);
				} else (e = n), importScripts(n), s();
			}).then(() => {
				let e = s[n];
				if (!e) throw new Error(`Module ${n} didn’t register its module`);
				return e;
			})
	);
	self.define = (a, c) => {
		const t = e || ("document" in self ? document.currentScript.src : "") || location.href;
		if (s[t]) return;
		let i = {};
		const r = (e) => n(e, t),
			o = { module: { uri: t }, exports: i, require: r };
		s[t] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (c(...e), i));
	};
}
define(["./workbox-e9849328"], function (e) {
	"use strict";
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{ url: "/_next/app-build-manifest.json", revision: "1ff0bf49702b70493b235d4c539144f6" },
				{
					url: "/_next/static/Qormfr2SbuCQeToCAAPvO/_buildManifest.js",
					revision: "9620ab3d74e3664752a2e12dbe1bcd57",
				},
				{
					url: "/_next/static/Qormfr2SbuCQeToCAAPvO/_ssgManifest.js",
					revision: "b6652df95db52feb4daf4eca35380933",
				},
				{ url: "/_next/static/chunks/1013.1f0dc8818e257a88.js", revision: "1f0dc8818e257a88" },
				{ url: "/_next/static/chunks/1391.b147453fdafba963.js", revision: "b147453fdafba963" },
				{ url: "/_next/static/chunks/1431.8d9c37e6e7023a65.js", revision: "8d9c37e6e7023a65" },
				{ url: "/_next/static/chunks/1965.682e646d6f76327b.js", revision: "682e646d6f76327b" },
				{ url: "/_next/static/chunks/2263.2fb9df5156404f10.js", revision: "2fb9df5156404f10" },
				{ url: "/_next/static/chunks/2434.1b3daabbbc7aed56.js", revision: "1b3daabbbc7aed56" },
				{ url: "/_next/static/chunks/281.108de71a120b78c5.js", revision: "108de71a120b78c5" },
				{ url: "/_next/static/chunks/2838.f36102101aeab336.js", revision: "f36102101aeab336" },
				{ url: "/_next/static/chunks/3096-f19b10ef7fe33bc6.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/3298.504f6a0519912e52.js", revision: "504f6a0519912e52" },
				{ url: "/_next/static/chunks/3370.b86db75942165210.js", revision: "b86db75942165210" },
				{ url: "/_next/static/chunks/35b501f1.3fbba47990179f3d.js", revision: "3fbba47990179f3d" },
				{ url: "/_next/static/chunks/3992.d92b7d9627928bac.js", revision: "d92b7d9627928bac" },
				{ url: "/_next/static/chunks/4117.4a4db917c8e13610.js", revision: "4a4db917c8e13610" },
				{ url: "/_next/static/chunks/459.8daac7b967cd0734.js", revision: "8daac7b967cd0734" },
				{ url: "/_next/static/chunks/5214.0d903b865cf8fd12.js", revision: "0d903b865cf8fd12" },
				{ url: "/_next/static/chunks/5444.5d8d74b3b04095aa.js", revision: "5d8d74b3b04095aa" },
				{ url: "/_next/static/chunks/6159-f51c6f59464a5e16.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/653.eb8972e20816be88.js", revision: "eb8972e20816be88" },
				{ url: "/_next/static/chunks/6623.d7bb355a0121c47f.js", revision: "d7bb355a0121c47f" },
				{ url: "/_next/static/chunks/6682.d71c7eb4b0eff996.js", revision: "d71c7eb4b0eff996" },
				{ url: "/_next/static/chunks/6811.f30ff304dd7e1b80.js", revision: "f30ff304dd7e1b80" },
				{ url: "/_next/static/chunks/7151.7deb95ae16e1a13b.js", revision: "7deb95ae16e1a13b" },
				{ url: "/_next/static/chunks/7225.58e53d36fdade7cb.js", revision: "58e53d36fdade7cb" },
				{ url: "/_next/static/chunks/7937-0a78cb075051a509.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/8388.82cd33293820e41f.js", revision: "82cd33293820e41f" },
				{ url: "/_next/static/chunks/8471.2009ebdeda81841b.js", revision: "2009ebdeda81841b" },
				{ url: "/_next/static/chunks/8505.f5e2a8fbb0ec81f0.js", revision: "f5e2a8fbb0ec81f0" },
				{ url: "/_next/static/chunks/855-f1f39ef8dbe7320f.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/8829-7fc1873f8c185d11.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/9041.0e24cec3094c201c.js", revision: "0e24cec3094c201c" },
				{ url: "/_next/static/chunks/9045.e88faf91c8c9cdd4.js", revision: "e88faf91c8c9cdd4" },
				{ url: "/_next/static/chunks/9067-87a952f461a0b54e.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/9207.db7016024e0b4d1d.js", revision: "db7016024e0b4d1d" },
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/%5Blocale%5D/layout-01bbc7775443142b.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/%5Blocale%5D/page-845778602ac45ac0.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/cart/page-ae5f7e0e1da60427.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/categories/%5Bslug%5D/page-250d2bf5c6525fed.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/collections/%5Bslug%5D/page-be2cb8e52bd69aa8.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/layout-59f870fbe32c5555.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/login/page-184e26ba65cce5bd.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/orders/page-cca481b676e1bcce.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/page-2318381b09efdba3.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/pages/%5Bslug%5D/page-75609c18302bd89a.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/%5Bslug%5D/not-found-bacb9fa8792c1b79.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/%5Bslug%5D/page-27a46c665ec2787e.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/loading-4fefbbcf31e1fc71.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/page-a68f5c4f8a13afbf.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/search/page-6451af86ac337a2f.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/layout-8b6993101b09f633.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{ url: "/_next/static/chunks/app/_not-found-354049aa12899bec.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{
					url: "/_next/static/chunks/app/checkout/layout-3792c31d7a466265.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{
					url: "/_next/static/chunks/app/checkout/page-0786ea9328e642a9.js",
					revision: "Qormfr2SbuCQeToCAAPvO",
				},
				{ url: "/_next/static/chunks/app/error-9ebfcae010399b7d.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/app/layout-0d18ce5069eb87dd.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/app/page-0ae8bb501905c5d0.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/daa7a8a6-e2bef55cc023fd9c.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/framework-e5b349f33374e1a2.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/main-01b8ecaf5968adf3.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/main-app-76f9445ba0557b95.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/pages/_app-7b4904774edcf406.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/chunks/pages/_error-c726d82c06a2c866.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{
					url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
					revision: "837c0df77fd5009c9e46d446188ecfd0",
				},
				{ url: "/_next/static/chunks/webpack-a1341fd82d8ace9f.js", revision: "Qormfr2SbuCQeToCAAPvO" },
				{ url: "/_next/static/css/1da6a114dbe2b17e.css", revision: "1da6a114dbe2b17e" },
				{ url: "/_next/static/css/7ac653ce965e9932.css", revision: "7ac653ce965e9932" },
				{ url: "/_next/static/css/cb7d0d9db7a6c654.css", revision: "cb7d0d9db7a6c654" },
				{ url: "/_next/static/media/26a46d62cd723877-s.woff2", revision: "befd9c0fdfa3d8a645d5f95717ed6420" },
				{ url: "/_next/static/media/55c55f0601d81cf3-s.woff2", revision: "43828e14271c77b87e3ed582dbff9f74" },
				{ url: "/_next/static/media/581909926a08bbc8-s.woff2", revision: "f0b86e7c24f455280b8df606b89af891" },
				{ url: "/_next/static/media/6d93bde91c0c2823-s.woff2", revision: "621a07228c8ccbfd647918f1021b4868" },
				{ url: "/_next/static/media/97e0cb1ae144a2a9-s.woff2", revision: "e360c61c5bd8d90639fd4503c829c2dc" },
				{
					url: "/_next/static/media/a34f9d1faa5f3315-s.p.woff2",
					revision: "d4fe31e6a2aebc06b8d6e558c9141119",
				},
				{ url: "/_next/static/media/df0a9ae256c0569c-s.woff2", revision: "d54db44de5ccb18886ece2fda72bdfe0" },
				{ url: "/github-mark.svg", revision: "16ee374bce892af835617d5661a9a2fd" },
				{ url: "/icon.svg", revision: "c89538f6f2e55faeb0b1458ff13f4354" },
				{ url: "/manifest.json", revision: "de053f24fdc48f90d6ee0f718640cd08" },
				{ url: "/screenshot.png", revision: "0c880e7e9773e2d31e5853341c7c1628" },
			],
			{ ignoreURLParametersMatching: [] },
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			"/",
			new e.NetworkFirst({
				cacheName: "start-url",
				plugins: [
					{
						cacheWillUpdate: async ({ request: e, response: s, event: n, state: a }) =>
							s && "opaqueredirect" === s.type
								? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers })
								: s,
					},
				],
			}),
			"GET",
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: "google-fonts-webfonts",
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
			}),
			"GET",
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: "google-fonts-stylesheets",
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-font-assets",
				plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-image-assets",
				plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-image",
				plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: "static-audio-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: "static-video-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-js-assets",
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-style-assets",
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-data",
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: "static-data-assets",
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "apis",
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "others",
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
			}),
			"GET",
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: "cross-origin",
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
			}),
			"GET",
		);
});
