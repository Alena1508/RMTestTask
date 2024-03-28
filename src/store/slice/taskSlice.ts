import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ITask {
	id: string;
	name: string;
	completed: boolean;
	userId: string;
}

const taskSlice = createSlice({
	name: "todos",
	initialState: [] as ITask[],
	reducers: {
		addTask: (state, action: PayloadAction<ITask>) => {
			state.push(action.payload);
		},
		reorderTask: (state, action) => {
			const { dropId, dragId } = action.payload;
			const oldIndex = state.findIndex(({ id }) => id === dropId);
			const newIndex = state.findIndex(({ id }) => id === dragId);

			const dropTaskUserId = state[oldIndex].userId;
			const items = state.map((task) => {
				if (dragId === task.id) {
					return {
						...task,
						userId: dropTaskUserId,
					};
				}
				return task;
			});
			const [item] = items.splice(oldIndex, 1);
			items.splice(newIndex, 0, item);

			return items;
		},
		moveTaskToUser: (state, action) => {
			const { userId, dragId } = action.payload;
			const items = [...state];
			const index = state.findIndex(({ id }) => id === dragId);
			const [item] = items.splice(index, 1);
			items.push({
				...item,
				userId,
			});

			return items;
		},
		toggleComplete: (state, action) => {
			state.map((task) => {
				if (action.payload.ids.includes(task.id)) {
					task.completed = action.payload.completed;
				}
			});
		},
		deleteTask: (state, action) => {
			return state.filter((task) => {
				return !action.payload.includes(task.id);
			});
		},
	},
});
export const { addTask, moveTaskToUser, toggleComplete, deleteTask, reorderTask } = taskSlice.actions;
export default taskSlice.reducer;
