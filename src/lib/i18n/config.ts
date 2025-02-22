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

// 支持的语言配置
const LANGUAGE_NAMES: Record<string, { name: string; local: string }> = {
	EN: { name: "English", local: "English" },
	ZH_HANS: { name: "Simplified Chinese", local: "简体中文" },
	ZH_HANT: { name: "Traditional Chinese", local: "繁體中文" },
	ES: { name: "Spanish", local: "Español" },
	JA: { name: "Japanese", local: "日本語" },
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
		return Object.entries(LANGUAGE_NAMES).map(([code, { name, local }]) => ({
			code,
			name,
			local,
		}));
	}
}

// 根据市场获取支持的语言
export async function getChannelLocales(_channel: string): Promise<Locale[]> {
	const languages = await fetchSupportedLanguages();

	// 所有渠道都使用相同的语言选项
	return languages.filter((lang) => ["EN", "ZH_HANS", "ES", "JA"].includes(lang.code));
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
