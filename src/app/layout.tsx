import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata, type Viewport } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
	themeColor: "#000000",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export const metadata: Metadata = {
	title: "Saleor Storefront",
	description: "Modern PWA Storefront powered by Saleor",
	manifest: "/manifest.json",
	icons: {
		icon: "/icon.svg",
		apple: "/icon.svg",
	},
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh">
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black" />
				<link rel="apple-touch-icon" href="/icon.svg" />
			</head>
			<body
				className={`${inter.className} min-h-dvh bg-white text-black dark:bg-neutral-900 dark:text-white`}
			>
				{children}
				<DraftModeNotification />
			</body>
		</html>
	);
}
