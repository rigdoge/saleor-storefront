import React from "react";
import { useField } from "formik";
import { useFormContext } from "@/checkout/hooks/useForm";

interface CheckboxProps<TName extends string> {
	name: TName;
	label: string;
}

export const Checkbox = <TName extends string>({ name, label }: CheckboxProps<TName>) => {
	const { handleChange } = useFormContext<Record<TName, string>>();
	const [field, { value }] = useField<boolean>(name);

	return (
		<label className="inline-flex items-center gap-x-2">
			<input
				{...field}
				value={field.value as unknown as string}
				name={name}
				checked={value}
				onChange={(event) => {
					handleChange({ ...event, target: { ...event.target, name, value: !value } });
				}}
				type="checkbox"
				className="rounded border-neutral-300 text-neutral-600 shadow-sm focus:border-neutral-300 focus:ring focus:ring-neutral-200 focus:ring-opacity-50 focus:ring-offset-0 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:focus:border-neutral-600 dark:focus:ring-neutral-700"
			/>
			<span className="text-neutral-700 dark:text-neutral-300">{label}</span>
		</label>
	);
};
