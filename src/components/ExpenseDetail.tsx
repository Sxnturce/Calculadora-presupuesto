import { formatDate } from "../helpers";
import useBudget from "../hooks/useBudget";
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import { useMemo } from "react";
import { categories } from "../data/Categories";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import "react-swipeable-list/dist/styles.css";

type ExpenseDetailProp = {
	item: Expense;
};

function ExpenseDetail({ item }: ExpenseDetailProp) {
	const { expenseName, amount, id } = item;
	const { dispatch } = useBudget();
	const categoryName = useMemo(
		() => categories.find((c) => c.id === item.category)?.name,
		[item]
	);

	function leadingActions() {
		return (
			<LeadingActions>
				<SwipeAction
					onClick={() => dispatch({ type: "edit-expense", payload: { id } })}
				>
					Actualizar
				</SwipeAction>
			</LeadingActions>
		);
	}

	function trailingActions() {
		return (
			<TrailingActions>
				<SwipeAction
					onClick={() => dispatch({ type: "remove-expense", payload: { id } })}
					destructive={true}
				>
					Eliminar
				</SwipeAction>
			</TrailingActions>
		);
	}
	return (
		<>
			<SwipeableList>
				<SwipeableListItem
					maxSwipe={1.0}
					leadingActions={leadingActions()}
					trailingActions={trailingActions()}
				>
					<div className="bg-white w-full border-b border-gray-200 p-10 shadow-lg flex gap-5 items-center cursor-pointer">
						<div>
							<img
								className="w-20 h-20"
								src={`/img/icono_${categoryName!.toLowerCase()}.svg`}
								alt={`img-${categoryName}`}
							/>
						</div>
						<div className="flex-1">
							<p className="text-sm font-bold text-slate-500 uppercase">
								{categoryName}
							</p>
							<p className="font-medium">{expenseName}</p>
							<p className="text-slate-600 text-sm">
								{formatDate(item.date!.toString())}
							</p>
						</div>
						<AmountDisplay amount={amount} />
					</div>
				</SwipeableListItem>
			</SwipeableList>
		</>
	);
}

export default ExpenseDetail;
