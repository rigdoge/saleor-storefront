"use client";

import { reportWebVitals } from "@/lib/analytics/web-vitals";

interface WebVitalsMetric {
	id: string;
	name: string;
	label: string;
	value: number;
	startTime?: number;
	valueText?: string;
}

declare global {
	interface Window {
		reportWebVitals?: (callback: (metric: WebVitalsMetric) => void) => void;
	}
}

export function register() {
	if (typeof window !== "undefined") {
		// 只在客户端执行
		const reportWebVitalsCallback = (metric: WebVitalsMetric) => {
			reportWebVitals(metric);
		};

		if (typeof window.reportWebVitals === "function") {
			window.reportWebVitals(reportWebVitalsCallback);
		}
	}
}

// 在应用启动时注册
register();
