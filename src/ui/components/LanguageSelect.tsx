"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const LanguageSelect = () => {
	const router = useRouter();
	const params = useParams<{ channel: string; locale: string }>();
	const [isOpen, setIsOpen] = useState(false);

	const currentLocale = params.locale?.toUpperCase() || "EN";

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
		if (code === "EN") {
			router.push(`/${targetChannel}`);
		} else {
			router.push(`/${targetChannel}/${code.toLowerCase()}`);
		}
	};

	// 简化的语言选项
	const languageOptions = [
		{ code: "EN", name: "English" },
		{ code: "ZH_HANS", name: "简体中文" },
		{ code: "ES", name: "Español" },
		{ code: "JA", name: "日本語" },
	];

	const currentLanguage = languageOptions.find((lang) => lang.code === currentLocale) || languageOptions[0];

	return (
		<div className="language-select relative">
			<button
				className="flex min-w-[120px] items-center justify-between gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Select Language"
			>
				<span className="font-semibold">{currentLanguage.name}</span>
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
				<div className="absolute right-0 mt-2 w-32 rounded-md border border-neutral-200 bg-white shadow-lg">
					<div className="py-1">
						{languageOptions.map((language) => (
							<button
								key={language.code}
								className={`block w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 
									${language.code === currentLocale ? "bg-neutral-100 font-medium" : ""}`}
								onClick={() => handleLanguageChange(language.code)}
							>
								{language.name}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
