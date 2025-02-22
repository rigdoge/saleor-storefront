"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Channel {
	id: string;
	name: string;
	slug: string;
	currencyCode: string;
}

export const ChannelSelect = ({ channels, className = "" }: { channels: Channel[]; className?: string }) => {
	const router = useRouter();
	const params = useParams<{ channel: string }>();
	const [isOpen, setIsOpen] = useState(false);
	const currentChannel = channels.find((ch) => ch.slug === params.channel);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".channel-select")) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const handleChannelChange = (slug: string) => {
		setIsOpen(false);
		router.push(`/${slug}`);
	};

	return (
		<div className={`channel-select relative ${className}`}>
			<button
				className="flex min-w-[120px] items-center justify-between gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Select Channel"
			>
				<div className="flex items-center gap-2">
					<span className="text-neutral-600 dark:text-neutral-400">Channel:</span>
					<span className="font-semibold">{currentChannel?.currencyCode || "Select"}</span>
				</div>
				<svg
					className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-56 rounded-md border border-neutral-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:border-neutral-700 dark:bg-neutral-800">
					<div className="py-1">
						{channels.map((channel) => (
							<button
								key={channel.id}
								className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-700
									${channel.slug === params.channel ? "bg-neutral-100 font-medium dark:bg-neutral-700" : ""}`}
								onClick={() => handleChannelChange(channel.slug)}
							>
								<div className="flex items-center justify-between">
									<span className="font-medium">{channel.name}</span>
									<span
										className={`ml-2 text-sm ${
											channel.slug === params.channel
												? "text-black dark:text-white"
												: "text-neutral-500 dark:text-neutral-400"
										}`}
									>
										{channel.currencyCode}
									</span>
								</div>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
