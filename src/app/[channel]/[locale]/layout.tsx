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

	// 将语言代码转换为小写用于 HTML lang 属性
	const htmlLang = locale.toLowerCase();
	const isRTL = htmlLang === "ar"; // 阿拉伯语是从右到左的文字

	return (
		<div lang={htmlLang} dir={isRTL ? "rtl" : "ltr"}>
			{children}
		</div>
	);
}

// 生成静态路由参数
export async function generateStaticParams() {
	// 获取所有 channel 的语言组合
	const channels = ["default-channel", "channel-pln", "channel-china", "channel-asia", "channel-europe"];
	const params = [];

	for (const channel of channels) {
		const locales = await getChannelLocales(channel);
		for (const locale of locales) {
			// 如果是默认语言(EN)，不生成带语言代码的路由
			if (locale.code !== "EN") {
				params.push({
					channel,
					locale: locale.code.toLowerCase(),
				});
			}
		}
	}

	return params;
}
