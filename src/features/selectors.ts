import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getTaskBySearchQuery } from "../helpers/getTaskBySearchQuery";
import { getTaskByFilterName } from "../helpers/getTaskByFilterName";
import { getTaskByUserId } from "../helpers/getTaskByUserId";

export const tasksSelector = (state: RootState) => state.todos;

export const usersSelector = (state: RootState) => state.users;

export const getTasksByUserId = (userId: string) =>
	createSelector([tasksSelector, tasksFiltersSelector, searchSelector], (tasks, filter, searchQuery) => {
		return tasks.filter(
			(task) =>
				getTaskByUserId(task, userId) && getTaskByFilterName(task, filter) && getTaskBySearchQuery(task, searchQuery),
		);
	});

export const getUserNameByUserId = (userId: string) =>
	createSelector([usersSelector], (users) => {
		return users.find((user) => user.id === userId)?.name;
	});

export const tasksFiltersSelector = (state: RootState) => state.filters;

export const searchSelector = (state: RootState) => state.search;
