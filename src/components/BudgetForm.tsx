import { useState, useMemo, ChangeEvent } from "react";
import useBudget from "../hooks/useBudget";

export default function BudgetForm() {
	const [budget, setBudget] = useState(0);
	const { dispatch } = useBudget();

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setBudget(e.target.valueAsNumber);
	}

	function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch({ type: "define-budget", payload: { budget } });
	}

	const isEmpty = useMemo(() => budget === 0 || isNaN(budget), [budget]);

	return (
		<>
			<form action="" className="space-y-5" onSubmit={handleSubmit}>
				<div className="flex flex-col space-y-5">
					<label
						htmlFor="budget"
						className="text-center text-blue-600 font-bold text-4xl"
					>
						Definir Presupuesto
					</label>
					<input
						type="number"
						name="budget"
						id="budget"
						onChange={handleChange}
						value={budget}
						placeholder="Define tu presupuesto"
						className="w-full bg-white border-2 border-gray-200 focus:border-blue-600 p-2 outline-none rounded"
					/>
				</div>
				<input
					type="submit"
					value={"Definir Presupuesto"}
					disabled={isEmpty}
					className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full disabled:opacity-50 disabled:cursor-auto p-2 text-white font-black uppercase"
				/>
			</form>
		</>
	);
}
