if (!self.define) {
	let e,
		a = {};
	const c = (c, s) => (
		(c = new URL(c + ".js", s).href),
		a[c] ||
			new Promise((a) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = c), (e.onload = a), document.head.appendChild(e);
				} else (e = c), importScripts(c), a();
			}).then(() => {
				let e = a[c];
				if (!e) throw new Error(`Module ${c} didn’t register its module`);
				return e;
			})
	);
	self.define = (s, n) => {
		const t = e || ("document" in self ? document.currentScript.src : "") || location.href;
		if (a[t]) return;
		let i = {};
		const f = (e) => c(e, t),
			r = { module: { uri: t }, exports: i, require: f };
		a[t] = Promise.all(s.map((e) => r[e] || f(e))).then((e) => (n(...e), i));
	};
}
define(["./workbox-c04df694"], function (e) {
	"use strict";
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{ url: "/_next/app-build-manifest.json", revision: "a76383063f4196f6aa6883917777f023" },
				{
					url: "/_next/static/BOHYg3kf9g46aK6UGCpLR/_buildManifest.js",
					revision: "fc98ce183f07ebacbc37333efc876199",
				},
				{
					url: "/_next/static/BOHYg3kf9g46aK6UGCpLR/_ssgManifest.js",
					revision: "b6652df95db52feb4daf4eca35380933",
				},
				{ url: "/_next/static/chunks/1013.36ba008d6d7db2d5.js", revision: "36ba008d6d7db2d5" },
				{
					url: "/_next/static/chunks/1013.36ba008d6d7db2d5.js.map",
					revision: "33db4b9fb1d2bcff54c2f8334c75ed6c",
				},
				{ url: "/_next/static/chunks/1391.7c57749bc993dd18.js", revision: "7c57749bc993dd18" },
				{
					url: "/_next/static/chunks/1391.7c57749bc993dd18.js.map",
					revision: "b0ef0c2eafc347cae2dabcb36fd53f51",
				},
				{ url: "/_next/static/chunks/1431.ad1e00b6830108f5.js", revision: "ad1e00b6830108f5" },
				{
					url: "/_next/static/chunks/1431.ad1e00b6830108f5.js.map",
					revision: "71940b982e4abe3691ac2d7bb56d0a86",
				},
				{ url: "/_next/static/chunks/1965.1b731c734ec24679.js", revision: "1b731c734ec24679" },
				{
					url: "/_next/static/chunks/1965.1b731c734ec24679.js.map",
					revision: "38a62ff08017faf030eca7814751e8be",
				},
				{ url: "/_next/static/chunks/2263.a47bc412f3de1e12.js", revision: "a47bc412f3de1e12" },
				{
					url: "/_next/static/chunks/2263.a47bc412f3de1e12.js.map",
					revision: "1351f702754da34ffde96ec3706ab34c",
				},
				{ url: "/_next/static/chunks/2434.69c6e01bd9277323.js", revision: "69c6e01bd9277323" },
				{
					url: "/_next/static/chunks/2434.69c6e01bd9277323.js.map",
					revision: "a8459a935b5951adf336c94fcc56df0e",
				},
				{ url: "/_next/static/chunks/281.51bde58e0d3d2784.js", revision: "51bde58e0d3d2784" },
				{
					url: "/_next/static/chunks/281.51bde58e0d3d2784.js.map",
					revision: "9795fcfe89591da5cc5213ac926d316b",
				},
				{ url: "/_next/static/chunks/2838.dce52a76917e1240.js", revision: "dce52a76917e1240" },
				{
					url: "/_next/static/chunks/2838.dce52a76917e1240.js.map",
					revision: "4207a12e3543f15712ca510799206398",
				},
				{ url: "/_next/static/chunks/3096-988bd927221d8938.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/3096-988bd927221d8938.js.map",
					revision: "bc89df6792bbb4d37416fc848dca2c98",
				},
				{ url: "/_next/static/chunks/3298.66cd56d31a9639be.js", revision: "66cd56d31a9639be" },
				{
					url: "/_next/static/chunks/3298.66cd56d31a9639be.js.map",
					revision: "94ba6c6a1f4be87072a42d8bb41cfd0b",
				},
				{ url: "/_next/static/chunks/3370.90668ad7748c3154.js", revision: "90668ad7748c3154" },
				{
					url: "/_next/static/chunks/3370.90668ad7748c3154.js.map",
					revision: "ee49a466916fd00500e5f7c06f8fb388",
				},
				{ url: "/_next/static/chunks/35b501f1.016c16941346e977.js", revision: "016c16941346e977" },
				{
					url: "/_next/static/chunks/35b501f1.016c16941346e977.js.map",
					revision: "02b060f645690e0b4f84eba3834df1f1",
				},
				{ url: "/_next/static/chunks/3992.af060a284738925f.js", revision: "af060a284738925f" },
				{
					url: "/_next/static/chunks/3992.af060a284738925f.js.map",
					revision: "c8bfde5e1d81bdb30131225725e1e267",
				},
				{ url: "/_next/static/chunks/4117.5c28a60255440a56.js", revision: "5c28a60255440a56" },
				{
					url: "/_next/static/chunks/4117.5c28a60255440a56.js.map",
					revision: "4b81dc3ce234024b7b2c1ebd4ec3d302",
				},
				{ url: "/_next/static/chunks/459.a2f0f9abe3e2422e.js", revision: "a2f0f9abe3e2422e" },
				{
					url: "/_next/static/chunks/459.a2f0f9abe3e2422e.js.map",
					revision: "6e276029bfe9902faead02829d4f1c1d",
				},
				{ url: "/_next/static/chunks/5214.e0786522900b213c.js", revision: "e0786522900b213c" },
				{
					url: "/_next/static/chunks/5214.e0786522900b213c.js.map",
					revision: "90d4f924022d99676fc3ab17ef29fc3e",
				},
				{ url: "/_next/static/chunks/5444.59ce1e13356f6b99.js", revision: "59ce1e13356f6b99" },
				{
					url: "/_next/static/chunks/5444.59ce1e13356f6b99.js.map",
					revision: "699d2596883b48325d3112630d8895f9",
				},
				{ url: "/_next/static/chunks/6159-7c56550f998e80bf.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/6159-7c56550f998e80bf.js.map",
					revision: "b3ed3d623d14ede229b74f8aff276122",
				},
				{ url: "/_next/static/chunks/653.a4baabcac080e265.js", revision: "a4baabcac080e265" },
				{
					url: "/_next/static/chunks/653.a4baabcac080e265.js.map",
					revision: "0dd726d8fe26b15e0963b0f268ddcd16",
				},
				{ url: "/_next/static/chunks/6623.55e38ffd1305b43b.js", revision: "55e38ffd1305b43b" },
				{
					url: "/_next/static/chunks/6623.55e38ffd1305b43b.js.map",
					revision: "c077b08da3e2a3c8cbc1412379ddb258",
				},
				{ url: "/_next/static/chunks/6682.1dac72c6394e1830.js", revision: "1dac72c6394e1830" },
				{
					url: "/_next/static/chunks/6682.1dac72c6394e1830.js.map",
					revision: "becff4e7387b6fda484b284bbb5253fc",
				},
				{ url: "/_next/static/chunks/6811.655cb48749792321.js", revision: "655cb48749792321" },
				{
					url: "/_next/static/chunks/6811.655cb48749792321.js.map",
					revision: "a035eaec81c9ecb4dfac53864ea36f2b",
				},
				{ url: "/_next/static/chunks/7225.bbd5fcb69e1a7a7f.js", revision: "bbd5fcb69e1a7a7f" },
				{
					url: "/_next/static/chunks/7225.bbd5fcb69e1a7a7f.js.map",
					revision: "2df95f1881dcb5c4a096897f6aaae0f5",
				},
				{ url: "/_next/static/chunks/7473.16df032ab22a60a6.js", revision: "16df032ab22a60a6" },
				{
					url: "/_next/static/chunks/7473.16df032ab22a60a6.js.map",
					revision: "610efc636f60e4594b75a611c4eb06fc",
				},
				{ url: "/_next/static/chunks/7937-a00457b6455f3047.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/7937-a00457b6455f3047.js.map",
					revision: "0688b738acfec3808580b69b638f987c",
				},
				{ url: "/_next/static/chunks/8388.31ef65fcb9eb38c8.js", revision: "31ef65fcb9eb38c8" },
				{
					url: "/_next/static/chunks/8388.31ef65fcb9eb38c8.js.map",
					revision: "d85a1a23cd36d110a2c5bffb38f50ab3",
				},
				{ url: "/_next/static/chunks/8471.39cdab454d1677eb.js", revision: "39cdab454d1677eb" },
				{
					url: "/_next/static/chunks/8471.39cdab454d1677eb.js.map",
					revision: "76f5125507fad6b2d7bb37de5ded54a8",
				},
				{ url: "/_next/static/chunks/8505.b8ede12522698e18.js", revision: "b8ede12522698e18" },
				{
					url: "/_next/static/chunks/8505.b8ede12522698e18.js.map",
					revision: "77178354b9c504a72e335198295835ae",
				},
				{ url: "/_next/static/chunks/855-cedcf1fde6c48ab1.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/855-cedcf1fde6c48ab1.js.map",
					revision: "7906281b05a4817439c72deeb335a161",
				},
				{ url: "/_next/static/chunks/8829-20785ccea06889c8.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/8829-20785ccea06889c8.js.map",
					revision: "31b7a18a7e9db106c58d446ed56e7c75",
				},
				{ url: "/_next/static/chunks/9041.4c55ceb397499ba3.js", revision: "4c55ceb397499ba3" },
				{
					url: "/_next/static/chunks/9041.4c55ceb397499ba3.js.map",
					revision: "a514a9119b8ee165e80661df63d44a5b",
				},
				{ url: "/_next/static/chunks/9045.7b1f9f65a1a5c233.js", revision: "7b1f9f65a1a5c233" },
				{
					url: "/_next/static/chunks/9045.7b1f9f65a1a5c233.js.map",
					revision: "45d36c03ceccd435563d9b84484489ee",
				},
				{ url: "/_next/static/chunks/9067-cd235fd3e9cde661.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/9067-cd235fd3e9cde661.js.map",
					revision: "b6ae32f7fd4a9756c9e570721e6cc232",
				},
				{ url: "/_next/static/chunks/9207.ac8c0b43d8be2739.js", revision: "ac8c0b43d8be2739" },
				{
					url: "/_next/static/chunks/9207.ac8c0b43d8be2739.js.map",
					revision: "024098ab5fea8a0929984555e356ba57",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/%5Blocale%5D/layout-b2504b6b22f41a7e.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/%5Blocale%5D/page-af0b9af5d28ebef3.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/cart/page-085c3063e93d8054.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/cart/page-085c3063e93d8054.js.map",
					revision: "cc4f2283a53c53baf761c1ed5099cf66",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/categories/%5Bslug%5D/page-82360276fd581a38.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/categories/%5Bslug%5D/page-82360276fd581a38.js.map",
					revision: "bcb82746be314ffcf8e19a3da35c9f76",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/collections/%5Bslug%5D/page-761e6cf3a217eab9.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/collections/%5Bslug%5D/page-761e6cf3a217eab9.js.map",
					revision: "1bf04ab93d1797ad716454308429c023",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/layout-fbb11d375958c3a7.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/layout-fbb11d375958c3a7.js.map",
					revision: "dac209dd895108ce5d05a8cf78c5a62c",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/login/page-f38f984d8dc1bc68.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/orders/page-70e2d06b5960042a.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/orders/page-70e2d06b5960042a.js.map",
					revision: "95f02a894751b9e1524ec580d2fd347a",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/page-8f5fe46ffa4fa943.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/page-8f5fe46ffa4fa943.js.map",
					revision: "894aa7bd19b06dd9b89bf6e7caff7d4a",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/pages/%5Bslug%5D/page-8ee19c9631ea1d97.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/%5Bslug%5D/not-found-e715a596ee809aeb.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/%5Bslug%5D/page-1a4441cd20270582.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/%5Bslug%5D/page-1a4441cd20270582.js.map",
					revision: "19f4876d07241038396de74abc9c734f",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/loading-53ae3e850bcbe10b.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/page-080fa1615f8e777b.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/products/page-080fa1615f8e777b.js.map",
					revision: "23a04a0957b7ec57c03fabf558500097",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/search/page-9b41b413779376e4.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/(main)/search/page-9b41b413779376e4.js.map",
					revision: "7c80f888e377631e3aba5d5999a9d736",
				},
				{
					url: "/_next/static/chunks/app/%5Bchannel%5D/layout-3aee965fce7bfd86.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{ url: "/_next/static/chunks/app/_not-found-4ca5b171c5a38ae1.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/app/_not-found-4ca5b171c5a38ae1.js.map",
					revision: "32af3f732b554bc6055d63010b1e700d",
				},
				{
					url: "/_next/static/chunks/app/checkout/layout-4235c52efae2cfb5.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/checkout/layout-4235c52efae2cfb5.js.map",
					revision: "692853d5d32f697de068f68d32a97b58",
				},
				{
					url: "/_next/static/chunks/app/checkout/page-b21cfc6087633e43.js",
					revision: "BOHYg3kf9g46aK6UGCpLR",
				},
				{
					url: "/_next/static/chunks/app/checkout/page-b21cfc6087633e43.js.map",
					revision: "4695046f976722ccbde54abd93f7f2d1",
				},
				{ url: "/_next/static/chunks/app/error-dccbfd6b62c26e6a.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/app/error-dccbfd6b62c26e6a.js.map",
					revision: "684c04d6280a471c3ebeaca7603d1ebd",
				},
				{ url: "/_next/static/chunks/app/layout-6f493b2f33da9730.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/app/layout-6f493b2f33da9730.js.map",
					revision: "6fe2f73420ea19c7b515da3614719f52",
				},
				{ url: "/_next/static/chunks/app/page-61e7a79eaff22c3f.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{ url: "/_next/static/chunks/daa7a8a6-81f1cd54d58d3c9c.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/daa7a8a6-81f1cd54d58d3c9c.js.map",
					revision: "5f77998a4c9dae62318d19e007cfd3e9",
				},
				{ url: "/_next/static/chunks/framework-3ed73fed658f031a.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/framework-3ed73fed658f031a.js.map",
					revision: "ed297ff80143b7c12ceacfadd61b558d",
				},
				{ url: "/_next/static/chunks/main-580fd840c813bec4.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/main-580fd840c813bec4.js.map",
					revision: "07f13c2fd17746a3e9bad20fbfccd9df",
				},
				{ url: "/_next/static/chunks/main-app-4953c16b61ee56c6.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/main-app-4953c16b61ee56c6.js.map",
					revision: "f43cb06a5e5c0c0b74e2ac40a13a148d",
				},
				{ url: "/_next/static/chunks/pages/_app-9ed784ff33281852.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/pages/_app-9ed784ff33281852.js.map",
					revision: "93e3fb70af7c6b63616499e0bb87b5ca",
				},
				{ url: "/_next/static/chunks/pages/_error-9d55664d8e2ee351.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/pages/_error-9d55664d8e2ee351.js.map",
					revision: "ae4350a52914eedcf4931aa868a8cd74",
				},
				{
					url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
					revision: "837c0df77fd5009c9e46d446188ecfd0",
				},
				{ url: "/_next/static/chunks/webpack-2020d44a422c8111.js", revision: "BOHYg3kf9g46aK6UGCpLR" },
				{
					url: "/_next/static/chunks/webpack-2020d44a422c8111.js.map",
					revision: "3f53703494573a9ed7eaccec23afa54f",
				},
				{ url: "/_next/static/css/3d51bc8e2b23eac6.css", revision: "3d51bc8e2b23eac6" },
				{ url: "/_next/static/css/3d51bc8e2b23eac6.css.map", revision: "4fbde3a5031c4dc26556217970b924d5" },
				{ url: "/_next/static/css/5cd1e3865405656c.css", revision: "5cd1e3865405656c" },
				{ url: "/_next/static/css/5cd1e3865405656c.css.map", revision: "f40e8978f5a57ce9fcf6f21d0718368d" },
				{ url: "/_next/static/css/9bc34389cce625b2.css", revision: "9bc34389cce625b2" },
				{ url: "/_next/static/css/9bc34389cce625b2.css.map", revision: "19efc5e54b4cfb8310f3d394f1de4e4d" },
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
						cacheWillUpdate: async ({ request: e, response: a, event: c, state: s }) =>
							a && "opaqueredirect" === a.type
								? new Response(a.body, { status: 200, statusText: "OK", headers: a.headers })
								: a,
					},
				],
			}),
			"GET",
		),
		e.registerRoute(
			/^https:\/\/api\.saleor\.tschenfeng\.com\/graphql/,
			new e.NetworkFirst({
				cacheName: "saleor-api",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			({ url: e }) => self.origin === e.origin && e.pathname.startsWith("/cart"),
			new e.NetworkFirst({
				cacheName: "cart-pages",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-image",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 256, maxAgeSeconds: 604800 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:js|css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-resources",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 128, maxAgeSeconds: 86400 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/^https:\/\/images\.unsplash\.com\//,
			new e.StaleWhileRevalidate({
				cacheName: "unsplash-images",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 128, maxAgeSeconds: 604800 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:woff|woff2|eot|ttf|otf)$/i,
			new e.CacheFirst({
				cacheName: "static-fonts",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 604800 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:png|jpg|jpeg|gif|webp|avif|ico|svg)$/i,
			new e.CacheFirst({
				cacheName: "static-images",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 256, maxAgeSeconds: 604800 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\/$/,
			new e.NetworkFirst({
				cacheName: "html-cache",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
					new e.CacheableResponsePlugin({ statuses: [0, 200] }),
				],
			}),
			"GET",
		);
});
//# sourceMappingURL=sw.js.map
