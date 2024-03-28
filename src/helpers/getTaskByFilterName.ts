import { ITask } from "../features/taskSlice";
import { TasksFilters } from "../features/filterSlice";

export const getTaskByFilterName = (task: ITask, filterName: string): boolean => {
	switch (filterName) {
		case TasksFilters.SHOW_COMPLETED:
			return task.completed;
		case TasksFilters.SHOW_ACTIVE:
			return !task.completed;
		default:
			return true; // all
	}
};
