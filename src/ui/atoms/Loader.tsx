import { PulseLoader } from "react-spinners";

interface LoaderProps {
	size?: number;
	color?: string;
	className?: string;
}

export const Loader = ({ size = 10, color = "#000", className = "" }: LoaderProps) => {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<PulseLoader size={size} color={color} />
		</div>
	);
};
