import { CheckoutLink } from "./CheckoutLink";
import { DeleteLineButton } from "./DeleteLineButton";
import * as Checkout from "@/lib/checkout";
import { formatMoney, getHrefForVariant } from "@/lib/utils";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

export const metadata = {
	title: "Shopping Cart · Saleor Storefront example",
};

export default async function Page({ params }: { params: { channel: string } }) {
	const checkoutId = Checkout.getIdFromCookies(params.channel);

	const checkout = await Checkout.find(checkoutId);

	if (!checkout || checkout.lines.length < 1) {
		return (
			<section className="mx-auto max-w-7xl p-8">
				<h1 className="mt-8 text-3xl font-bold text-neutral-900 dark:text-white">
					Your Shopping Cart is empty
				</h1>
				<p className="my-12 text-sm text-neutral-500 dark:text-neutral-400">
					Looks like you haven&apos;t added any items to the cart yet.
				</p>
				<LinkWithChannel
					href="/products"
					className="inline-block max-w-full rounded border border-transparent bg-neutral-900 px-6 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500 sm:px-16 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
				>
					Explore products
				</LinkWithChannel>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-7xl p-8">
			<h1 className="mt-8 text-3xl font-bold text-neutral-900 dark:text-white">Your Shopping Cart</h1>
			<form className="mt-12">
				<ul
					data-testid="CartProductList"
					role="list"
					className="divide-y divide-neutral-200 border-b border-t border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700"
				>
					{checkout.lines.map((item, index) => (
						<li key={item.id} className="flex py-4">
							<div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-50 sm:h-32 sm:w-32 dark:border-neutral-700 dark:bg-neutral-800">
								{item.variant?.product?.thumbnail?.url && (
									<ProductImageWrapper
										src={item.variant.product.thumbnail.url}
										alt={item.variant.product.thumbnail.alt ?? ""}
										width={200}
										height={200}
										priority={index < 2}
									/>
								)}
							</div>
							<div className="relative flex flex-1 flex-col justify-between p-4 py-2">
								<div className="flex justify-between justify-items-start gap-4">
									<div>
										<LinkWithChannel
											href={getHrefForVariant({
												productSlug: item.variant.product.slug,
												variantId: item.variant.id,
											})}
										>
											<h2 className="font-medium text-neutral-700 dark:text-neutral-300">
												{item.variant?.product?.name}
											</h2>
										</LinkWithChannel>
										<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
											{item.variant?.product?.category?.name}
										</p>
										{item.variant.name !== item.variant.id && Boolean(item.variant.name) && (
											<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
												Variant: {item.variant.name}
											</p>
										)}
									</div>
									<p className="text-right font-semibold text-neutral-900 dark:text-white">
										{formatMoney(item.totalPrice.gross.amount, item.totalPrice.gross.currency)}
									</p>
								</div>
								<div className="flex justify-between">
									<div className="text-sm font-bold dark:text-neutral-300">Qty: {item.quantity}</div>
									<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-12">
					<div className="rounded border bg-neutral-50 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800">
						<div className="flex items-center justify-between gap-2 py-2">
							<div>
								<p className="font-semibold text-neutral-900 dark:text-white">Your Total</p>
								<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
									Shipping will be calculated in the next step
								</p>
							</div>
							<div className="font-medium text-neutral-900 dark:text-white">
								{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
							</div>
						</div>
					</div>
					<div className="mt-10 text-center">
						<CheckoutLink
							checkoutId={checkoutId}
							disabled={!checkout.lines.length}
							className="w-full sm:w-1/3"
						/>
					</div>
				</div>
			</form>
		</section>
	);
}
