import { ITask } from "../store/slice/taskSlice.ts";

export const getTaskBySearchQuery = (task: ITask, searchQuery: string) => {
	return task.name.toLowerCase().includes(searchQuery.toLowerCase());
};
