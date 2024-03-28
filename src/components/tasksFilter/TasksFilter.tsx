import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setTasksFilter, TasksFilters } from "../../features/filterSlice";

const TasksFilter = () => {
	const dispatch = useDispatch();

	const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setTasksFilter(e.target.value));
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
