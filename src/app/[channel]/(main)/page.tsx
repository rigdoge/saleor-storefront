import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { heroSlides } from "@/ui/components/home/heroData";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { Loader } from "@/ui/atoms/Loader";

const DynamicHero = dynamic(
	() => import("@/ui/components/home/Hero").then((mod) => ({ default: mod.Hero })),
	{
		loading: () => (
			<div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
				<div className="absolute inset-0 flex items-center justify-center">
					<Loader size={20} className="text-neutral-900 dark:text-white" />
				</div>
			</div>
		),
		ssr: true,
	},
);

async function FeaturedProducts({ channel }: { channel: string }) {
	// Fetch featured products
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: channel,
		},
		revalidate: 60,
	});

	const products = data.collection?.products?.edges.map(({ node: product }) => product) || [];

	return <ProductList products={products} />;
}

export const metadata = {
	title: "ACME Storefront, powered by Saleor & Next.js",
	description:
		"Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.",
};

export default async function HomePage({ params }: { params: { channel: string } }) {
	return (
		<main className="min-h-screen">
			{/* Hero Slider */}
			<Suspense
				fallback={
					<div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
						<div className="absolute inset-0 flex items-center justify-center">
							<Loader size={20} className="text-neutral-900 dark:text-white" />
						</div>
					</div>
				}
			>
				<DynamicHero slides={heroSlides} />
			</Suspense>

			{/* Featured Products */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
						Featured Products
					</h2>
					<LinkWithChannel
						href="/collections/featured-products"
						className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
					>
						View All
						<span aria-hidden="true"> &rarr;</span>
					</LinkWithChannel>
				</div>

				<div className="mt-8">
					<Suspense fallback={<ProductList products={[]} loading={true} />}>
						<FeaturedProducts channel={params.channel} />
					</Suspense>
				</div>
			</section>

			{/* Brand Features */}
			<section className="bg-neutral-50 dark:bg-neutral-900">
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
						<div className="text-center">
							<div className="mx-auto h-12 w-12 text-neutral-900 dark:text-white">
								<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<h3 className="mt-4 text-lg font-medium text-neutral-900 dark:text-white">
								Authentic Products
							</h3>
							<p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
								All items are officially authorized and genuine
							</p>
						</div>
						<div className="text-center">
							<div className="mx-auto h-12 w-12 text-neutral-900 dark:text-white">
								<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M20 7l-8 4-8-4V5l8 4 8-4v2z"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-lg font-medium text-neutral-900 dark:text-white">Global Shipping</h3>
							<p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
								Fast worldwide delivery available
							</p>
						</div>
						<div className="text-center">
							<div className="mx-auto h-12 w-12 text-neutral-900 dark:text-white">
								<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-lg font-medium text-neutral-900 dark:text-white">Secure Payment</h3>
							<p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
								Multiple secure payment methods accepted
							</p>
						</div>
						<div className="text-center">
							<div className="mx-auto h-12 w-12 text-neutral-900 dark:text-white">
								<svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-lg font-medium text-neutral-900 dark:text-white">Easy Returns</h3>
							<p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
								7-day no-questions-asked return policy
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
