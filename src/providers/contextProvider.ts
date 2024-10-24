import { createContext, Dispatch } from "react";
import { BudgetActions, BudgetState } from "../reducers/budget-reducer";

type BudgetContextProp = {
	state: BudgetState;
	dispatch: Dispatch<BudgetActions>;
	spent: number;
	available: number;
};

const BudgetContext = createContext<BudgetContextProp>({} as BudgetContextProp);

export default BudgetContext;
