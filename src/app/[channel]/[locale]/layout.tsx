import { notFound } from "next/navigation";
import { isValidLocale, getChannelLocales } from "@/lib/i18n/config";

export default async function LocaleLayout({
	children,
	params: { channel, locale },
}: {
	children: React.ReactNode;
	params: { channel: string; locale: string };
}) {
	// 验证语言代码是否有效
	const isValid = await isValidLocale(channel, locale);
	if (!isValid) {
		notFound();
	}

	return (
		<div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
			{children}
		</div>
	);
}

// 生成静态路由参数
export async function generateStaticParams() {
	// 获取所有 channel 的语言组合
	const channels = ["default-channel", "channel-pln", "channel-china"];
	const params = [];

	for (const channel of channels) {
		const locales = await getChannelLocales(channel);
		for (const locale of locales) {
			params.push({
				channel,
				locale: locale.code,
			});
		}
	}

	return params;
}
