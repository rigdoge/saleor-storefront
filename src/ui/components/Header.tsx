import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";
import { ChannelSelect } from "./ChannelSelect";
import { LanguageSelect } from "./LanguageSelect";
import { ThemeToggle } from "./ThemeToggle";

export async function Header({ channel }: { channel: string }) {
	// 默认渠道列表
	const activeChannels = [
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

	return (
		<header className="sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md dark:bg-neutral-800/50">
			<div className="mx-auto max-w-7xl px-3 sm:px-8">
				<div className="flex h-16 items-center justify-between gap-4 md:gap-8">
					<Logo />
					<Nav channel={channel} />
					<div className="flex items-center gap-2">
						<ThemeToggle />
						<LanguageSelect />
						<ChannelSelect channels={activeChannels} className="ml-2" />
					</div>
				</div>
			</div>
		</header>
	);
}
