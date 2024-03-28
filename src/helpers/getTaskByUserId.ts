import { ITask } from "../store/slice/taskSlice.ts";

export const getTaskByUserId = (task: ITask, userId: string) => {
	return task.userId === userId;
};
