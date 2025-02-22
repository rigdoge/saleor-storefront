"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

interface HeroSlide {
	id: string;
	title: string;
	subtitle: string;
	buttonText: string;
	buttonLink: string;
	imageUrl: string;
	imageAlt: string;
}

interface HeroProps {
	slides: HeroSlide[];
	autoPlayInterval?: number;
}

export function Hero({ slides, autoPlayInterval = 5000 }: HeroProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (slides.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentSlide((current) => (current + 1) % slides.length);
		}, autoPlayInterval);

		return () => clearInterval(interval);
	}, [slides.length, autoPlayInterval]);

	const handleImageLoad = useCallback(() => {
		setIsLoading(false);
	}, []);

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	const nextSlide = () => {
		setCurrentSlide((current) => (current + 1) % slides.length);
	};

	const previousSlide = () => {
		setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
	};

	return (
		<div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
			{/* Slides */}
			{slides.map((slide, index) => (
				<div
					key={slide.id}
					className={`absolute inset-0 transition-opacity duration-1000 ${
						index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
					}`}
				>
					{/* Background Image */}
					<div className="absolute inset-0">
						<Image
							src={slide.imageUrl}
							alt={slide.imageAlt}
							fill
							priority={index === 0}
							className={`object-cover transition-opacity duration-500 ${
								isLoading && index === 0 ? "opacity-0" : "opacity-100"
							}`}
							sizes="100vw"
							quality={90}
							placeholder="blur"
							blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4="
							onLoadingComplete={index === 0 ? handleImageLoad : undefined}
							fetchPriority={index === 0 ? "high" : "low"}
							loading={index === 0 ? "eager" : "lazy"}
						/>
						<div className="absolute inset-0 bg-black/30" />
					</div>

					{/* Content */}
					<div className="relative flex h-full items-center">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="max-w-lg text-white">
								<h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
									{slide.title}
								</h2>
								<p className="mb-8 text-lg text-neutral-200 sm:text-xl">{slide.subtitle}</p>
								<LinkWithChannel
									href={slide.buttonLink}
									className="inline-block rounded-md bg-white px-8 py-3 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
								>
									{slide.buttonText}
								</LinkWithChannel>
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Navigation Arrows */}
			{slides.length > 1 && (
				<>
					<button
						onClick={previousSlide}
						className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50"
						aria-label="Previous slide"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						onClick={nextSlide}
						className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50"
						aria-label="Next slide"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</>
			)}

			{/* Dots Navigation */}
			{slides.length > 1 && (
				<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`h-2 w-2 rounded-full transition-all ${
								index === currentSlide ? "w-8 bg-white" : "bg-white/50 hover:bg-white/75"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
