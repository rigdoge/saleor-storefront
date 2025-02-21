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
	en: { name: "English", local: "English" },
	es: { name: "Spanish", local: "Español" },
	pl: { name: "Polish", local: "Polski" },
	"zh-hans": { name: "Simplified Chinese", local: "简体中文" },
	"zh-hant": { name: "Traditional Chinese", local: "繁體中文" },
};

export const DEFAULT_LOCALE = "en";

// 获取支持的语言列表
export async function fetchSupportedLanguages(): Promise<Locale[]> {
	try {
		const response = await executeGraphQL(GetSupportedLanguagesDocument, {
			withAuth: false,
		});

		return response.shop.languages.map((lang) => ({
			code: lang.code.toLowerCase().replace("_", "-"), // 转换为小写并替换下划线为连字符
			name: LANGUAGE_NAMES[lang.code.toLowerCase().replace("_", "-")]?.name || lang.language,
			local: LANGUAGE_NAMES[lang.code.toLowerCase().replace("_", "-")]?.local || lang.language,
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
		return languages.filter((lang) => ["en", "zh-hans", "zh-hant"].includes(lang.code));
	}

	// 如果是波兰 channel，确保包含波兰语
	if (channel === "channel-pln") {
		return languages.filter((lang) => ["en", "pl"].includes(lang.code));
	}

	// 默认 channel 使用英语和西班牙语
	return languages.filter((lang) => ["en", "es"].includes(lang.code));
}

// 验证语言代码是否有效
export async function isValidLocale(channel: string, locale: string): Promise<boolean> {
	const locales = await getChannelLocales(channel);
	return locales.some((l) => l.code === locale.toLowerCase());
}

// 获取默认语言
export function getDefaultLocale(_channel: string): string {
	return DEFAULT_LOCALE;
}
