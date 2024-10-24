import { useContext } from "react";
import BudgetContext from "../providers/contextProvider";

export default function useBudget() {
	const context = useContext(BudgetContext);

	if (!context) {
		throw new Error("useBudget must be use within a BudgetProvider");
	}

	const { state, dispatch, available, spent } = context;

	return {
		state,
		dispatch,
		available,
		spent,
	};
}
