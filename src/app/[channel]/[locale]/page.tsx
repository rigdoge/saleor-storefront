import { getChannelLocales } from "@/lib/i18n/config";

export default async function HomePage({
	params: { channel, locale },
}: {
	params: { channel: string; locale: string };
}) {
	const locales = await getChannelLocales(channel);
	const currentLocale = locales.find((l) => l.code === locale.toLowerCase());

	return (
		<main className="mx-auto max-w-7xl p-4">
			<h1 className="text-2xl font-bold">
				Welcome to {channel} ({currentLocale?.local})
			</h1>
			{/* 其他内容 */}
		</main>
	);
}
