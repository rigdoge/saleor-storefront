"use client";

import { useState, useCallback, useEffect } from "react";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

interface ProductMedia {
	url: string;
	alt?: string | null;
	type: string;
}

interface ProductGalleryProps {
	media: ProductMedia[];
	thumbnail: {
		__typename?: "Image";
		url: string;
		alt?: string | null;
	};
}

export function ProductGallery({ media, thumbnail }: ProductGalleryProps) {
	// 过滤掉与缩略图 URL 相同的图片
	const uniqueImages = media.filter((item) => item.type === "IMAGE" && item.url !== thumbnail.url);
	const allImages = [thumbnail, ...uniqueImages];
	const [selectedImage, setSelectedImage] = useState(0);
	const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set([0]));

	// 预加载下一张图片
	const preloadNextImage = useCallback(
		(currentIndex: number) => {
			const nextIndex = (currentIndex + 1) % allImages.length;
			if (!preloadedImages.has(nextIndex)) {
				const img = new Image();
				img.src = allImages[nextIndex].url;
				setPreloadedImages((prev) => new Set([...prev, nextIndex]));
			}
		},
		[allImages, preloadedImages],
	);

	// 当选择新图片时预加载下一张
	useEffect(() => {
		preloadNextImage(selectedImage);
	}, [selectedImage, preloadNextImage]);

	return (
		<div className="grid gap-4">
			{/* 主图显示区域 */}
			<div className="aspect-square overflow-hidden rounded-lg bg-white dark:bg-neutral-800">
				<ProductImageWrapper
					priority={true}
					alt={allImages[selectedImage].alt || ""}
					width={1024}
					height={1024}
					src={allImages[selectedImage].url}
					sizes="(min-width: 1024px) 66vw, 100vw"
					className="transform transition-opacity duration-300"
				/>
			</div>

			{/* 缩略图列表 */}
			{allImages.length > 1 && (
				<div className="no-scrollbar -mx-2 flex gap-3 overflow-x-auto px-2 py-3">
					{allImages.map((image, index) => (
						<button
							key={image.url}
							onClick={() => setSelectedImage(index)}
							className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white transition-all duration-200 dark:bg-neutral-800 ${
								selectedImage === index
									? "ring-2 ring-neutral-900 ring-offset-2 dark:ring-white dark:ring-offset-neutral-900"
									: "hover:ring-1 hover:ring-neutral-300 dark:hover:ring-neutral-600"
							}`}
						>
							<ProductImageWrapper
								alt={image.alt || ""}
								width={80}
								height={80}
								src={image.url}
								sizes="80px"
								priority={index === 0}
								loading={index < 3 ? "eager" : "lazy"}
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
