"use client";

import { useEffect, useState } from "react";

export const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const storedTheme = localStorage.getItem("theme");

		if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
			setIsDark(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		setIsDark(!isDark);
		if (!isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
			aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
		>
			<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{!isDark ? (
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
					/>
				) : (
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				)}
			</svg>
		</button>
	);
};
