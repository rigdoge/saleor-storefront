import { clsx } from "clsx";
import { redirect } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { type ProductListItemFragment, type VariantDetailsFragment } from "@/gql/graphql";
import { getHrefForVariant } from "@/lib/utils";
import { Loader } from "@/ui/atoms/Loader";

interface VariantSelectorProps {
	variants: readonly VariantDetailsFragment[];
	product: ProductListItemFragment;
	selectedVariant?: VariantDetailsFragment;
	channel: string;
	loading?: boolean;
}

export function VariantSelector({
	variants,
	product,
	selectedVariant,
	channel,
	loading = false,
}: VariantSelectorProps) {
	if (loading) {
		return (
			<div className="my-4 flex min-h-[48px] items-center">
				<Loader size={12} color="currentColor" className="text-neutral-900 dark:text-white" />
			</div>
		);
	}

	if (!selectedVariant && variants.length === 1 && variants[0]?.quantityAvailable) {
		redirect("/" + channel + getHrefForVariant({ productSlug: product.slug, variantId: variants[0].id }));
	}

	return (
		variants.length > 1 && (
			<fieldset className="my-4" role="radiogroup" data-testid="VariantSelector">
				<legend className="sr-only">Variants</legend>
				<div className="flex flex-wrap gap-3">
					{variants.map((variant) => {
						const isDisabled = !variant.quantityAvailable;
						const isCurrentVariant = selectedVariant?.id === variant.id;
						return (
							<LinkWithChannel
								key={variant.id}
								prefetch={true}
								scroll={false}
								href={
									isDisabled ? "#" : getHrefForVariant({ productSlug: product.slug, variantId: variant.id })
								}
								className={clsx(
									isCurrentVariant
										? "border-transparent bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
										: "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
									"relative flex min-w-[5ch] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded border p-3 text-center text-sm font-semibold focus-within:outline focus-within:outline-2 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-100 aria-disabled:text-neutral-800 aria-disabled:opacity-50 dark:aria-disabled:bg-neutral-800 dark:aria-disabled:text-neutral-400",
									isDisabled && "pointer-events-none",
								)}
								role="radio"
								tabIndex={isDisabled ? -1 : undefined}
								aria-checked={isCurrentVariant}
								aria-disabled={isDisabled}
							>
								{variant.name}
							</LinkWithChannel>
						);
					})}
				</div>
			</fieldset>
		)
	);
}
