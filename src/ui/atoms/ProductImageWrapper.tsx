import NextImage, { type ImageProps } from "next/image";

export const ProductImageWrapper = (props: ImageProps) => {
	return (
		<div className="aspect-square overflow-hidden bg-neutral-50 dark:bg-neutral-800">
			<NextImage
				{...props}
				className="h-full w-full object-contain object-center p-2 transition-opacity duration-300"
				quality={85}
				sizes="(min-width: 1536px) 512px, (min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 342px, (min-width: 640px) 512px, 100vw"
				blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmOGY4ZjgiLz48L3N2Zz4="
				placeholder="blur"
				loading={props.priority ? "eager" : "lazy"}
				fetchPriority={props.priority ? "high" : "auto"}
				decoding={props.priority ? "sync" : "async"}
			/>
		</div>
	);
};
