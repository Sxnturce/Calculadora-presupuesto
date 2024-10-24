import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useBudget from "../hooks/useBudget";
import "react-circular-progressbar/dist/styles.css";

export default function BudgeTracker() {
	const { state, spent, available, dispatch } = useBudget();
	const percentage = +((spent / state.budget) * 100).toFixed(2);

	return (
		<>
			<section className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<div className="flex justify-center">
					<CircularProgressbar
						value={percentage}
						styles={buildStyles({
							pathColor: percentage === 100 ? "#dc2626" : "#3b82f6",
							trailColor: "#f5f5f5",
							textColor: percentage === 100 ? "#dc2626" : "#3b82f6",
							textSize: 8,
						})}
						text={`${percentage}% Gastado`}
					/>
				</div>
				<div className="flex flex-col justify-center items-center gap-8">
					<button
						type="button"
						className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
						onClick={() => dispatch({ type: "clear-expense" })}
					>
						Resetear APP
					</button>
					<AmountDisplay label="Presupuesto" amount={state.budget} />
					<AmountDisplay label="Disponible" amount={available} />
					<AmountDisplay label="Gastado" amount={spent} />
				</div>
			</section>
		</>
	);
}
