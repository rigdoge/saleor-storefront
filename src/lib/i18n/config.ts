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

// 语言本地化名称映射
const LANGUAGE_NAMES: Record<string, { name: string; local: string }> = {
	EN: { name: "English", local: "English" },
	ES: { name: "Spanish", local: "Español" },
	PL: { name: "Polish", local: "Polski" },
	ZH_HANS: { name: "Simplified Chinese", local: "简体中文" },
	ZH_HANT: { name: "Traditional Chinese", local: "繁體中文" },
	fr: { name: "French", local: "Français" },
	de: { name: "German", local: "Deutsch" },
	it: { name: "Italian", local: "Italiano" },
	ja: { name: "Japanese", local: "日本語" },
	ko: { name: "Korean", local: "한국어" },
	ru: { name: "Russian", local: "Русский" },
	ar: { name: "Arabic", local: "العربية" },
	pt: { name: "Portuguese", local: "Português" },
	nl: { name: "Dutch", local: "Nederlands" },
	tr: { name: "Turkish", local: "Türkçe" },
	vi: { name: "Vietnamese", local: "Tiếng Việt" },
	th: { name: "Thai", local: "ไทย" },
	id: { name: "Indonesian", local: "Bahasa Indonesia" },
};

export const DEFAULT_LOCALE = "EN";

// 获取支持的语言列表
export async function fetchSupportedLanguages(): Promise<Locale[]> {
	try {
		const response = await executeGraphQL(GetSupportedLanguagesDocument, {
			withAuth: false,
		});

		return response.shop.languages.map((lang) => ({
			code: lang.code, // 保持原始大写格式
			name: LANGUAGE_NAMES[lang.code]?.name || lang.language,
			local: LANGUAGE_NAMES[lang.code]?.local || lang.language,
		}));
	} catch (error) {
		console.error("Failed to fetch supported languages:", error);
		return Object.entries(LANGUAGE_NAMES).map(([code, { name, local }]) => ({
			code,
			name,
			local,
		}));
	}
}

// 获取特定 channel 支持的语言
export async function getChannelLocales(channel: string): Promise<Locale[]> {
	const languages = await fetchSupportedLanguages();

	// 如果是中国 channel，确保包含简体中文和繁体中文
	if (channel === "channel-china") {
		return languages.filter((lang) => ["EN", "ZH_HANS", "ZH_HANT"].includes(lang.code));
	}

	// 如果是波兰 channel，确保包含波兰语
	if (channel === "channel-pln") {
		return languages.filter((lang) => ["EN", "PL"].includes(lang.code));
	}

	// 默认 channel 只使用英语
	return languages.filter((lang) => ["EN"].includes(lang.code));
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
