import { createSlice } from "@reduxjs/toolkit";

export const TasksFilters = {
	SHOW_ALL: "All",
	SHOW_COMPLETED: "Completed",
	SHOW_UNCOMPLETED: "Uncompleted",
};

interface FilterStore {
	filterByStatus: string;
	searchQuery: string;
}

const initialState: FilterStore = {
	filterByStatus: TasksFilters.SHOW_ALL,
	searchQuery: "",
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setFilterByStatus(state: FilterStore, action) {
			state.filterByStatus = action.payload;
		},
		setSearchQuery(state, action) {
			state.searchQuery = action.payload;
		},
	},
});

export const { setSearchQuery, setFilterByStatus } = filterSlice.actions;

export default filterSlice.reducer;
