import { ProductElement } from "./ProductElement";
import { type ProductListItemFragment } from "@/gql/graphql";
import { Loader } from "@/ui/atoms/Loader";

interface ProductListProps {
	products: readonly ProductListItemFragment[];
	loading?: boolean;
}

export const ProductList = ({ products, loading = false }: ProductListProps) => {
	if (loading) {
		return (
			<div className="flex min-h-[300px] items-center justify-center">
				<Loader size={15} color="currentColor" className="text-neutral-900 dark:text-white" />
			</div>
		);
	}

	return (
		<ul
			role="list"
			data-testid="ProductList"
			className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
		>
			{products.map((product, index) => (
				<ProductElement
					key={product.id}
					product={product}
					priority={index < 2}
					loading={index < 3 ? "eager" : "lazy"}
				/>
			))}
		</ul>
	);
};
