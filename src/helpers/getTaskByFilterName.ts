import { ITask } from "../store/slice/taskSlice.ts";
import { TasksFilters } from "../store/slice/filterSlice.ts";

export const getTaskByFilterName = (task: ITask, filterName: string): boolean => {
	switch (filterName) {
		case TasksFilters.SHOW_COMPLETED:
			return task.completed;
		case TasksFilters.SHOW_UNCOMPLETED:
			return !task.completed;
		default:
			return true; // all
	}
};
