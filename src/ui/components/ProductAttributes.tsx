interface AttributeValue {
	id: string;
	name: string;
	translation?: {
		id: string;
		name: string;
	} | null;
}

interface Attribute {
	attribute: {
		id: string;
		name: string;
		translation?: {
			id: string;
			name: string;
		} | null;
	};
	values: AttributeValue[];
}

interface ProductAttributesProps {
	attributes: Attribute[];
	variantAttributes?: Attribute[];
	className?: string;
}

export const ProductAttributes = ({
	attributes,
	variantAttributes,
	className = "",
}: ProductAttributesProps) => {
	if (!attributes?.length && !variantAttributes?.length) {
		return null;
	}

	const renderAttributeValue = (values: AttributeValue[]) => {
		return values.map((value, index) => (
			<span key={value.id} className="rounded-full bg-neutral-100 px-3 py-1 text-sm">
				{value.translation?.name || value.name}
				{index < values.length - 1 ? ", " : ""}
			</span>
		));
	};

	const renderAttributeGroup = (attrs: Attribute[], title: string) => {
		if (!attrs?.length) return null;

		return (
			<div className="space-y-2">
				<h3 className="font-medium text-neutral-700">{title}</h3>
				<div className="space-y-3">
					{attrs.map((attr) => (
						<div key={attr.attribute.id} className="flex items-start gap-2">
							<span className="min-w-[120px] text-sm text-neutral-600">
								{attr.attribute.translation?.name || attr.attribute.name}:
							</span>
							<div className="flex flex-wrap gap-2">{renderAttributeValue(attr.values)}</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className={`space-y-6 ${className}`}>
			{renderAttributeGroup(attributes, "Product Specifications")}
			{renderAttributeGroup(variantAttributes || [], "Variant Options")}
		</div>
	);
};
