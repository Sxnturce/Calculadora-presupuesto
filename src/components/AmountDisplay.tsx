import { formatCurrency } from "../helpers";

type AmountProp = {
	label?: string;
	amount: number;
};

function AmountDisplay({ label, amount }: AmountProp) {
	return (
		<>
			<div className="max-w-28 mx-auto flex gap-4 items-center justify-center text-blue-600 text-2xl">
				{label && label + `:`}
				<h1 className="text-black  font-bold">{formatCurrency(amount)}</h1>
			</div>
		</>
	);
}

export default AmountDisplay;
