import { executeGraphQL } from "@/lib/graphql";
import { GetSupportedLanguagesDocument } from "@/gql/graphql";

export type Locale = {
	code: string;
	name: string;
	local: string;
};

export type ChannelLocales = {
	[key: string]: Locale[];
};

// 第一层：主要市场语言
const TIER1_LANGUAGES: Record<string, { name: string; local: string }> = {
	EN: { name: "English", local: "English" }, // 全球通用
	ZH_HANS: { name: "Simplified Chinese", local: "简体中文" }, // 中国大陆
	ZH_HANT: { name: "Traditional Chinese", local: "繁體中文" }, // 港澳台
	JA: { name: "Japanese", local: "日本語" }, // 日本
	KO: { name: "Korean", local: "한국어" }, // 韩国
};

// 第二层：重要区域市场语言
const TIER2_LANGUAGES: Record<string, { name: string; local: string }> = {
	ES: { name: "Spanish", local: "Español" }, // 西语区
	DE: { name: "German", local: "Deutsch" }, // 德语区
	FR: { name: "French", local: "Français" }, // 法语区
	PT: { name: "Portuguese", local: "Português" }, // 葡语区
	RU: { name: "Russian", local: "Русский" }, // 俄语区
};

// 第三层：其他市场语言
const TIER3_LANGUAGES: Record<string, { name: string; local: string }> = {
	IT: { name: "Italian", local: "Italiano" }, // 意大利
	PL: { name: "Polish", local: "Polski" }, // 波兰
	AR: { name: "Arabic", local: "العربية" }, // 阿拉伯语区
	NL: { name: "Dutch", local: "Nederlands" }, // 荷兰
	TR: { name: "Turkish", local: "Türkçe" }, // 土耳其
	VI: { name: "Vietnamese", local: "Tiếng Việt" }, // 越南
	TH: { name: "Thai", local: "ไทย" }, // 泰国
	ID: { name: "Indonesian", local: "Bahasa Indonesia" }, // 印尼
};

// 合并所有语言配置
const LANGUAGE_NAMES: Record<string, { name: string; local: string }> = {
	...TIER1_LANGUAGES,
	...TIER2_LANGUAGES,
	...TIER3_LANGUAGES,
};

export const DEFAULT_LOCALE = "EN";

// 获取支持的语言列表
export async function fetchSupportedLanguages(): Promise<Locale[]> {
	try {
		const response = await executeGraphQL(GetSupportedLanguagesDocument, {
			withAuth: false,
		});

		return response.shop.languages.map((lang) => ({
			code: lang.code,
			name: LANGUAGE_NAMES[lang.code]?.name || lang.language,
			local: LANGUAGE_NAMES[lang.code]?.local || lang.language,
		}));
	} catch (error) {
		console.error("Failed to fetch supported languages:", error);
		return Object.entries(TIER1_LANGUAGES).map(([code, { name, local }]) => ({
			code,
			name,
			local,
		}));
	}
}

// 根据市场获取支持的语言
export async function getChannelLocales(channel: string): Promise<Locale[]> {
	const languages = await fetchSupportedLanguages();

	// 根据渠道返回相应的语言支持
	switch (channel) {
		case "channel-china":
			// 中国市场：英文、简体中文、繁体中文
			return languages.filter((lang) => ["EN", "ZH_HANS", "ZH_HANT"].includes(lang.code));

		case "channel-asia":
			// 亚洲市场：英文 + 东亚语言
			return languages.filter((lang) => Object.keys(TIER1_LANGUAGES).includes(lang.code));

		case "channel-europe":
			// 欧洲市场：英文 + 主要欧洲语言
			return languages.filter((lang) =>
				[...Object.keys(TIER1_LANGUAGES), ...Object.keys(TIER2_LANGUAGES)].includes(lang.code),
			);

		case "channel-pln":
			// 波兰市场：英文、波兰语
			return languages.filter((lang) => ["EN", "PL"].includes(lang.code));

		default:
			// 默认只返回英语
			return languages.filter((lang) => ["EN"].includes(lang.code));
	}
}

// 验证语言代码是否有效
export async function isValidLocale(channel: string, locale: string): Promise<boolean> {
	const locales = await getChannelLocales(channel);
	return locales.some((l) => l.code === locale.toUpperCase());
}

// 获取默认语言
export function getDefaultLocale(_channel: string): string {
	return DEFAULT_LOCALE;
}
