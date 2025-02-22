export function registerServiceWorker() {
	if (
		typeof window !== "undefined" &&
		"serviceWorker" in navigator &&
		process.env.NODE_ENV === "production"
	) {
		window.addEventListener("load", () => {
			navigator.serviceWorker
				.register("/sw.js")
				.then((registration) => {
					console.log("Service Worker 注册成功:", registration);
				})
				.catch((error) => {
					console.log("Service Worker 注册失败:", error);
				});
		});
	}
}
