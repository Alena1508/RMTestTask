import { ITask } from "../features/taskSlice";

export const getTaskByUserId = (task: ITask, userId: string) => {
	return task.userId === userId;
};
