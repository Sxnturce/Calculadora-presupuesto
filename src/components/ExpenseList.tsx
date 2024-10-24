import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {
	const { state } = useBudget();
	const filtered = state.category
		? state.expense.filter((e) => e.category === state.category)
		: state.expense;

	const isEmpty = useMemo(() => filtered.length <= 0, [filtered]);

	return (
		<>
			<section className="mt-10 bg-white rounded-lg p-5 shadow-lg">
				{isEmpty ? (
					<p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
				) : (
					<>
						<p className="text-gray-600 text-2xl font-bold">
							Listado de gastos
						</p>
						{filtered.map((e) => (
							<ExpenseDetail key={e.id} item={e} />
						))}
					</>
				)}
			</section>
		</>
	);
}

export default ExpenseList;
