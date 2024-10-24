import type { DraftExpense, Expense, Category } from "../types";

export type BudgetActions =
	| { type: "define-budget"; payload: { budget: number } }
	| { type: "modal-state" }
	| { type: "add-expense"; payload: { expense: DraftExpense } }
	| { type: "remove-expense"; payload: { id: Expense["id"] } }
	| { type: "edit-expense"; payload: { id: Expense["id"] } }
	| { type: "filter-id"; payload: { id: Category["id"] } }
	| { type: "clear-expense" };

function saveData() {
	let arr: Expense[] = [];
	const query = localStorage.getItem("expens");
	return (arr = query ? JSON.parse(query) : []);
}

function saveBudget(): number {
	let num = 0;
	const query = localStorage.getItem("budget");
	return (num = query ? Number(query) : 0);
}

export type BudgetState = {
	budget: number;
	modal: boolean;
	expense: Expense[];
	edit: Expense["id"];
	category: Category["id"];
};

export const initialBudget: BudgetState = {
	budget: saveBudget(),
	modal: false,
	expense: saveData(),
	edit: "",
	category: "",
};

export const BudgetReducer = (
	state: BudgetState = initialBudget,
	action: BudgetActions
) => {
	if (action.type === "define-budget") {
		return {
			...state,
			budget: action.payload.budget,
		};
	}
	if (action.type === "modal-state") {
		return {
			...state,
			modal: !state.modal,
			edit: "",
		};
	}
	if (action.type === "add-expense") {
		const payload = action.payload.expense;
		let arr: Expense[] = [];

		if (state.edit) {
			arr = state.expense.map((e) =>
				e.id === state.edit ? { ...e, ...payload } : e
			);
		} else {
			arr = [...state.expense, { ...payload, id: crypto.randomUUID() }];
		}

		return {
			...state,
			expense: arr,
			edit: "",
			modal: false,
		};
	}
	if (action.type === "remove-expense") {
		const payload = action.payload.id;
		const newArr = state.expense.filter((e) => e.id !== payload);
		return {
			...state,
			expense: newArr,
		};
	}
	if (action.type === "edit-expense") {
		return {
			...state,
			edit: action.payload.id,
			modal: true,
		};
	}
	if (action.type === "filter-id") {
		return {
			...state,
			category: action.payload.id,
		};
	}

	if (action.type === "clear-expense") {
		return {
			...state,
			budget: 0,
			expense: [],
		};
	}
	return state;
};
