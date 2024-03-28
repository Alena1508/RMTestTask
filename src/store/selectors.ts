import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store.ts";
import { getTaskBySearchQuery } from "../helpers/getTaskBySearchQuery";
import { getTaskByFilterName } from "../helpers/getTaskByFilterName";
import { getTaskByUserId } from "../helpers/getTaskByUserId";

export const tasksSelector = (state: RootState) => state.todos;

export const usersSelector = (state: RootState) => state.users;

export const getTasksByUserId = (userId: string) =>
	createSelector([tasksSelector, filterByStatusSelector, searchSelector], (tasks, filter, searchQuery) => {
		return tasks.filter(
			(task) =>
				getTaskByUserId(task, userId) && getTaskByFilterName(task, filter) && getTaskBySearchQuery(task, searchQuery),
		);
	});

export const getUserNameByUserId = (userId: string) =>
	createSelector([usersSelector], (users) => {
		return users.find((user) => user.id === userId)?.name;
	});

export const filterByStatusSelector = (state: RootState) => state.filters.filterByStatus || "";

export const searchSelector = (state: RootState) => state.filters.searchQuery || "";
