import { useReducer, useEffect, useMemo } from "react";
import BudgetContext from "../providers/contextProvider";
import { ReactNode } from "react";
import { BudgetReducer, initialBudget } from "../reducers/budget-reducer";

type BudgetProviderProp = {
	children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProp) => {
	const [state, dispatch] = useReducer(BudgetReducer, initialBudget);

	useEffect(() => {
		localStorage.setItem("expens", JSON.stringify(state.expense));
		localStorage.setItem("budget", JSON.stringify(state.budget));
	}, [state.expense]);

	const spent = useMemo(
		() => state.expense.reduce((prev, item) => prev + item.amount, 0),
		[state.expense]
	);
	const available = state.budget - spent;

	return (
		<BudgetContext.Provider value={{ state, dispatch, spent, available }}>
			{children}
		</BudgetContext.Provider>
	);
};
