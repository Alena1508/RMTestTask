import { createSlice } from "@reduxjs/toolkit";

export const TasksFilters = {
	SHOW_ALL: "All",
	SHOW_COMPLETED: "Completed",
	SHOW_ACTIVE: "Active",
};

const filterSlice = createSlice({
	name: "filters",
	initialState: TasksFilters.SHOW_ALL,
	reducers: {
		setTasksFilter(state, action) {
			return action.payload;
		},
	},
});

export const { setTasksFilter } = filterSlice.actions;

export default filterSlice.reducer;
