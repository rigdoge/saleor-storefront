import { Suspense } from "react";
import edjsHTML from "editorjs-html";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { type ResolvingMetadata, type Metadata } from "next";
import xss from "xss";
import { invariant } from "ts-invariant";
import { type WithContext, type Product } from "schema-dts";
import { AddButton } from "./AddButton";
import {
	CheckoutAddLineDocument,
	ProductDetailsMultilingualDocument,
	ProductListDocument,
	LanguageCodeEnum,
	type ProductListItemFragment,
} from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { formatMoney, formatMoneyRange } from "@/lib/utils";
import * as Checkout from "@/lib/checkout";
import { VariantSelector } from "@/ui/components/VariantSelector";
import { AvailabilityMessage } from "@/ui/components/AvailabilityMessage";
import { ProductAttributes } from "@/ui/components/ProductAttributes";
import { ProductGallery } from "@/ui/components/ProductGallery";

export async function generateMetadata(
	{
		params,
		searchParams,
	}: {
		params: { slug: string; channel: string };
		searchParams: { variant?: string };
	},
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { product } = await executeGraphQL(ProductDetailsMultilingualDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
			languageCode: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const productName = product.seoTitle || product.name;
	const variantName = product.variants?.find(({ id }) => id === searchParams.variant)?.name;
	const productNameAndVariant = variantName ? `${productName} - ${variantName}` : productName;

	return {
		title: `${product.name} | ${product.seoTitle || (await parent).title?.absolute}`,
		description: product.seoDescription || productNameAndVariant,
		alternates: {
			canonical: process.env.NEXT_PUBLIC_STOREFRONT_URL
				? process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`
				: undefined,
		},
		openGraph: product.thumbnail
			? {
					images: [
						{
							url: product.thumbnail.url,
							alt: product.name,
						},
					],
				}
			: null,
	};
}

export async function generateStaticParams({ params }: { params: { channel: string } }) {
	const { products } = await executeGraphQL(ProductListDocument, {
		revalidate: 60,
		variables: { first: 20, channel: params.channel },
		withAuth: false,
	});

	const paths = products?.edges.map(({ node: { slug } }) => ({ slug })) || [];
	return paths;
}

const parser = edjsHTML();

async function ProductVariants({
	product,
	channel,
	searchParams,
}: {
	product: ProductListItemFragment;
	channel: string;
	searchParams: { variant?: string };
}) {
	const { product: productDetails } = await executeGraphQL(ProductDetailsMultilingualDocument, {
		variables: {
			slug: decodeURIComponent(product.slug),
			channel: channel,
			languageCode: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!productDetails) {
		notFound();
	}

	const variants = productDetails.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);

	return (
		<VariantSelector
			variants={variants || []}
			product={product}
			selectedVariant={selectedVariant}
			channel={channel}
		/>
	);
}

export default async function Page({
	params,
	searchParams,
}: {
	params: { slug: string; channel: string };
	searchParams: { variant?: string };
}) {
	const { product } = await executeGraphQL(ProductDetailsMultilingualDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
			languageCode: LanguageCodeEnum.En,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const firstImage = product.thumbnail;
	const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;

	const variants = product.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);

	async function addItem() {
		"use server";

		const checkout = await Checkout.findOrCreate({
			checkoutId: Checkout.getIdFromCookies(params.channel),
			channel: params.channel,
		});
		invariant(checkout, "This should never happen");

		Checkout.saveIdToCookie(params.channel, checkout.id);

		if (!selectedVariantID) {
			return;
		}

		try {
			const result = await executeGraphQL(CheckoutAddLineDocument, {
				variables: {
					id: checkout.id,
					productVariantId: decodeURIComponent(selectedVariantID),
				},
				cache: "no-cache",
				headers: {
					"Cache-Control": "no-cache, no-store, must-revalidate",
					Pragma: "no-cache",
					Expires: "0",
				},
			});

			if (result.checkoutLinesAdd?.errors?.length) {
				const errorMessage = result.checkoutLinesAdd.errors[0].message || "Failed to add item to cart";
				throw new Error(errorMessage);
			}

			revalidatePath(`/${params.channel}/cart`, "page");
			revalidatePath(`/${params.channel}`, "layout");
		} catch (error) {
			console.error("Failed to add item to cart:", error);
			throw error;
		}
	}

	const isAvailable = variants?.some((variant) => variant.quantityAvailable) ?? false;

	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: isAvailable
			? formatMoneyRange({
					start: product?.pricing?.priceRange?.start?.gross,
					stop: product?.pricing?.priceRange?.stop?.gross,
				})
			: "";

	const productJsonLd: WithContext<Product> = {
		"@context": "https://schema.org",
		"@type": "Product",
		image: product.thumbnail?.url,
		...(selectedVariant
			? {
					name: `${product.name} - ${selectedVariant.name}`,
					description: product.seoDescription || `${product.name} - ${selectedVariant.name}`,
					offers: {
						"@type": "Offer",
						availability: selectedVariant.quantityAvailable
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: selectedVariant.pricing?.price?.gross.currency,
						price: selectedVariant.pricing?.price?.gross.amount,
					},
				}
			: {
					name: product.name,
					description: product.seoDescription || product.name,
					offers: {
						"@type": "AggregateOffer",
						availability: product.variants?.some((variant) => variant.quantityAvailable)
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
						lowPrice: product.pricing?.priceRange?.start?.gross.amount,
						highPrice: product.pricing?.priceRange?.stop?.gross.amount,
					},
				}),
	};

	return (
		<section className="mx-auto grid max-w-7xl p-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8" action={addItem}>
				<div className="md:col-span-1 lg:col-span-5">
					{firstImage && <ProductGallery thumbnail={firstImage} media={product.media || []} />}
				</div>
				<div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
					<div>
						<h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900 dark:text-white">
							{product?.name}
						</h1>
						<p
							className="mb-8 text-sm text-neutral-500 dark:text-neutral-400"
							data-testid="ProductElement_Price"
						>
							{price}
						</p>

						{variants && (
							<Suspense
								fallback={
									<VariantSelector variants={[]} product={product} channel={params.channel} loading={true} />
								}
							>
								<ProductVariants product={product} channel={params.channel} searchParams={searchParams} />
							</Suspense>
						)}
						<AvailabilityMessage isAvailable={isAvailable} />
						<div className="mt-8">
							<AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />
						</div>

						<div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-700">
							<ProductAttributes
								attributes={product.attributes}
								variantAttributes={selectedVariant?.attributes}
							/>
						</div>

						{description && (
							<div className="mt-8 space-y-6 text-sm text-neutral-500 dark:text-neutral-400">
								{description.map((content) => (
									<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
								))}
							</div>
						)}
					</div>
				</div>
			</form>
		</section>
	);
}
