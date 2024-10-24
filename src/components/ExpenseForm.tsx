import { categories } from "../data/Categories";
import useBudget from "../hooks/useBudget";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import type { DraftExpense, Value } from "../types";

function ExpenseForm() {
	const { dispatch, state, spent } = useBudget();
	const initialValue = {
		amount: 0,
		expenseName: "",
		category: "",
		date: new Date(),
	};

	const initialErrValue = {
		amoutErr: "",
		expenseNameErr: "",
		categoryErr: "",
	};

	const [expense, setExpense] = useState<DraftExpense>(initialValue);
	const [freeze, setFreeze] = useState(0);
	const [err, setErr] = useState(initialErrValue);

	useEffect(() => {
		if (state.edit) {
			const finded = state.expense.filter((e) => e.id === state.edit)[0];
			setExpense(finded);
			setFreeze(finded.amount);
		}
	}, [state.edit]);

	useEffect(() => {
		setErr(initialErrValue);
	}, [expense.amount, expense.expenseName, expense.category]);

	function handleChange(
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) {
		const { name, value } = e.target;
		const isNumber = name === "amount";

		setExpense({
			...expense,
			[name]: isNumber ? Number(value) : value,
		});
	}

	function handleDate(date: Value) {
		setExpense({
			...expense,
			date,
		});
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!expense.expenseName.trim()) {
			setErr({
				...err,
				expenseNameErr: "El nombre es obligatorio.",
			});
			return;
		}

		if (expense.amount <= 0) {
			setErr({
				...err,
				amoutErr: "Coloque una cantidad valida.",
			});
			return;
		}

		if (!expense.category) {
			setErr({
				...err,
				categoryErr: "Seleccione una categoria.",
			});
			return;
		}

		if (expense.amount - freeze > spent) {
			setErr({
				...err,
				amoutErr: "La cantidad sobrepasa lo disponible.",
			});
			return;
		}

		dispatch({ type: "add-expense", payload: { expense } });
		setExpense(initialValue);
	}

	return (
		<>
			<form className="space-y-5" onSubmit={handleSubmit}>
				<legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
					{state.edit ? "Editar gasto" : "Nuevo gasto"}
				</legend>
				<div className="flex flex-col gap-2">
					<label htmlFor="expenseName" className="text-xl font-medium">
						Nombre Gasto:
					</label>
					<input
						type="text"
						id="expenseName"
						className="bg-slate-100 p-2 outline-none border-2 rounded border-gray-200 focus:border-blue-500"
						name="expenseName"
						onChange={handleChange}
						placeholder="Añade nombre de gasto"
						value={expense.expenseName}
					/>
					{err.expenseNameErr && (
						<p className="text-red-500 text-sm">{err.expenseNameErr}</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="amount" className="text-xl font-medium">
						Cantidad:
					</label>
					<input
						type="number"
						id="amount"
						className="bg-slate-100 p-2 outline-none border-2 rounded border-gray-200 focus:border-blue-500"
						name="amount"
						value={expense.amount}
						onChange={handleChange}
						placeholder="Añade la cantidad del gasto: ej. 300"
					/>
					{err.amoutErr && (
						<p className="text-red-500 text-sm">{err.amoutErr}</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="category" className="text-xl font-medium">
						Categorias
					</label>
					<select
						name="category"
						id="category"
						onChange={handleChange}
						value={expense.category}
						className="w-full outline-none border-2 border-gray-200 py-1 px-2 rounded"
					>
						<option value="">--Seleccione--</option>
						{categories.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
					{err.categoryErr && (
						<p className="text-red-500 text-sm">{err.categoryErr}</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="date" className="text-xl font-medium">
						Fecha Gasto:
					</label>
					<DatePicker
						className={"bg-slate-100 p-2 border-0"}
						onChange={handleDate}
						id="date"
						value={expense.date}
					/>
				</div>
				<input
					type="submit"
					value={state.edit ? "Guardar cambios" : "Registrar gasto"}
					className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase rounded-lg font-bold hover:bg-blue-700"
				/>
			</form>
		</>
	);
}

export default ExpenseForm;
