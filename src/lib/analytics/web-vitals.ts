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
		gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
	}
}

export function reportWebVitals(metric: WebVitalsMetric) {
	// 发送到你的分析服务
	console.log(metric);

	// 可以发送到 Google Analytics 或其他分析服务
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", metric.name, {
			value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
			event_label: metric.id,
			non_interaction: true,
		});
	}
}
