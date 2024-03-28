import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setFilterByStatus, TasksFilters } from "../../features/filterSlice.ts";

const TasksFilter = () => {
	const dispatch = useDispatch();

	const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setFilterByStatus(e.target.value));
	};

	return (
		<div>
			<select onChange={handleFilterChange}>
				{Object.values(TasksFilters).map((o) => (
					<option key={o}>{o}</option>
				))}
			</select>
		</div>
	);
};

export default TasksFilter;
