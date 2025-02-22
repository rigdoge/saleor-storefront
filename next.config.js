import nextPWA from "next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzerConfig = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24, // 24 hours
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	experimental: {
		typedRoutes: false,
		optimizePackageImports: ["@headlessui/react", "lucide-react", "@stripe/stripe-js"],
		optimizeCss: true,
	},
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
				? "export"
				: undefined,
	poweredByHeader: false,
	reactStrictMode: true,
	compress: true,
	generateEtags: true,
	pageExtensions: ["tsx", "ts"],
	productionBrowserSourceMaps: true,
};

const withPWA = nextPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
	buildExcludes: [/middleware-manifest\.json$/],
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/api\.saleor\.tschenfeng\.com\/graphql/,
			handler: "NetworkFirst",
			options: {
				cacheName: "saleor-api",
				networkTimeoutSeconds: 10,
				expiration: {
					maxEntries: 32,
					maxAgeSeconds: 24 * 60 * 60, // 24 hours
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		{
			urlPattern: ({ url }) => {
				const isSameOrigin = self.origin === url.origin;
				return isSameOrigin && url.pathname.startsWith("/cart");
			},
			handler: "NetworkFirst",
			options: {
				cacheName: "cart-pages",
				networkTimeoutSeconds: 10,
				expiration: {
					maxEntries: 32,
					maxAgeSeconds: 24 * 60 * 60, // 24 hours
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		{
			urlPattern: /\/_next\/image\?url=.+$/i,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "next-image",
				expiration: {
					maxEntries: 256,
					maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		{
			urlPattern: /\.(?:js|css)$/i,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "static-resources",
				expiration: {
					maxEntries: 128,
					maxAgeSeconds: 24 * 60 * 60, // 24 hours
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		{
			urlPattern: /^https:\/\/images\.unsplash\.com\//,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "unsplash-images",
				expiration: {
					maxEntries: 128,
					maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		// 添加字体缓存
		{
			urlPattern: /\.(?:woff|woff2|eot|ttf|otf)$/i,
			handler: "CacheFirst",
			options: {
				cacheName: "static-fonts",
				expiration: {
					maxEntries: 32,
					maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		// 添加图片缓存
		{
			urlPattern: /\.(?:png|jpg|jpeg|gif|webp|avif|ico|svg)$/i,
			handler: "CacheFirst",
			options: {
				cacheName: "static-images",
				expiration: {
					maxEntries: 256,
					maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		// HTML 页面缓存
		{
			urlPattern: /\/$/,
			handler: "NetworkFirst",
			options: {
				cacheName: "html-cache",
				expiration: {
					maxEntries: 64,
					maxAgeSeconds: 24 * 60 * 60, // 24 hours
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
	],
});

export default withPWA(nextConfig);
