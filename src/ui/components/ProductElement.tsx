"use client";

import { useState, useRef, useEffect } from "react";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

interface ProductImage {
	url: string;
	alt: string | null | undefined;
	type?: string;
}

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// 使用 thumbnail 作为唯一图片
	const thumbnail: ProductImage | null = product.thumbnail
		? { url: product.thumbnail.url, alt: product.thumbnail.alt }
		: null;
	const allImages: ProductImage[] = thumbnail ? [thumbnail] : [];

	useEffect(() => {
		if (isHovered && allImages.length > 1) {
			timerRef.current = setInterval(() => {
				setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
			}, 1000);
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [isHovered, allImages.length]);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		setCurrentImageIndex(0);
	};

	return (
		<li
			data-testid="ProductElement"
			className="group relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id} className="block">
				<div className="overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
					{allImages.length > 0 && (
						<div className="relative overflow-hidden">
							<ProductImageWrapper
								loading={loading}
								src={allImages[currentImageIndex].url}
								alt={allImages[currentImageIndex].alt ?? ""}
								width={512}
								height={512}
								sizes={"512px"}
								priority={priority}
								className="transform transition-all duration-500 group-hover:scale-110"
							/>
							{allImages.length > 1 && (
								<div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
									{allImages.map((_, index) => (
										<span
											key={index}
											className={`h-1.5 w-1.5 rounded-full transition-all ${
												index === currentImageIndex ? "bg-white" : "bg-white/50"
											}`}
										/>
									))}
								</div>
							)}
						</div>
					)}
					<div className="p-4">
						<div className="mt-2 flex justify-between">
							<div>
								<h3 className="mt-1 text-sm font-semibold text-neutral-900 transition-colors group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
									{product.name}
								</h3>
								<p
									className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
									data-testid="ProductElement_Category"
								>
									{product.category?.name}
								</p>
							</div>
							<p
								className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100"
								data-testid="ProductElement_PriceRange"
							>
								{formatMoneyRange({
									start: product?.pricing?.priceRange?.start?.gross,
									stop: product?.pricing?.priceRange?.stop?.gross,
								})}
							</p>
						</div>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
