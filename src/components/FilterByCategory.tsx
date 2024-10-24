import { categories } from "../data/Categories";
import useBudget from "../hooks/useBudget";

function FilterByCategory() {
	const { dispatch } = useBudget();

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		dispatch({ type: "filter-id", payload: { id: e.target.value } });
	}

	return (
		<>
			<div className="bg-white rounded-lg p-10 shadow-lg">
				<form action="">
					<div className="flex flex-col gap-5 md:items-center md:flex-row">
						<label htmlFor="category" className="font-medium">
							Filtrar gastos
						</label>
						<select
							id="category"
							className="bg-slate-100 p-3 flex-1 rounded outline-none focus:ring-2"
							onChange={handleChange}
						>
							<option value="">--Todas las categorias--</option>
							{categories.map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
					</div>
				</form>
			</div>
		</>
	);
}

export default FilterByCategory;
