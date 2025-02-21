import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";
import { ChannelSelect } from "./ChannelSelect";
import { LanguageSelect } from "./LanguageSelect";
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument } from "@/gql/graphql";
import { getChannelLocales } from "@/lib/i18n/config";

export async function Header({ channel }: { channel: string }) {
	// 获取 channels 数据
	const defaultChannels = [
		{
			id: "default-channel",
			name: "Default Channel",
			slug: "default-channel",
			currencyCode: "USD",
		},
		{
			id: "channel-pln",
			name: "Poland Channel",
			slug: "channel-pln",
			currencyCode: "PLN",
		},
		{
			id: "channel-china",
			name: "China Channel",
			slug: "channel-china",
			currencyCode: "CNY",
		},
	];

	let activeChannels = defaultChannels;

	try {
		const channelsData = await executeGraphQL(ChannelsListDocument, {
			withAuth: false,
		});

		if (channelsData?.channels?.length > 0) {
			activeChannels = channelsData.channels.filter((ch) => ch.isActive);
		}
	} catch (error) {
		console.error("Failed to fetch channels:", error);
	}

	// 获取语言列表
	const languages = await getChannelLocales(channel);

	return (
		<header className="sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-3 sm:px-8">
				<div className="flex h-16 items-center justify-between gap-4 md:gap-8">
					<Logo />
					<Nav channel={channel} />
					<div className="flex items-center gap-2">
						<LanguageSelect languages={languages} />
						<ChannelSelect channels={activeChannels} className="ml-2" />
					</div>
				</div>
			</div>
		</header>
	);
}
