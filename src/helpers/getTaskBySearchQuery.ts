import { ITask } from "../features/taskSlice";

export const getTaskBySearchQuery = (task: ITask, searchQuery: string) => {
	return task.name.toLowerCase().includes(searchQuery.toLowerCase());
};
