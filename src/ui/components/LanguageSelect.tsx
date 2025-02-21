"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

export const LanguageSelect = ({ languages }: { languages: Locale[] }) => {
	const router = useRouter();
	const params = useParams<{ channel: string; locale: string }>();
	const [isOpen, setIsOpen] = useState(false);

	const currentLocale = params.locale?.toLowerCase() || "en";
	const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".language-select")) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const handleLanguageChange = (code: string) => {
		setIsOpen(false);
		const targetChannel = params.channel || "default-channel";
		router.push(`/${targetChannel}/${code}`);
	};

	if (!languages.length) {
		return null;
	}

	return (
		<div className="language-select relative">
			<button
				className="flex min-w-[120px] items-center justify-between gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Select Language"
			>
				<div className="flex items-center gap-2">
					<span className="text-neutral-600">Language:</span>
					<span className="font-semibold">{currentLanguage?.local || "Select"}</span>
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

			{isOpen && languages.length > 0 && (
				<div className="absolute right-0 mt-2 w-56 rounded-md border border-neutral-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					<div className="py-1">
						{languages.map((language) => (
							<button
								key={language.code}
								className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 
                  ${language.code === currentLocale ? "bg-neutral-100 font-medium" : ""}`}
								onClick={() => handleLanguageChange(language.code)}
							>
								<div className="flex items-center justify-between">
									<span className="font-medium">{language.local}</span>
									<span
										className={`ml-2 text-sm ${
											language.code === currentLocale ? "text-black" : "text-neutral-500"
										}`}
									>
										{language.name}
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
