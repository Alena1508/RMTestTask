import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
	id: string;
	name: string;
}

const initialState: IUser[] = [
	{
		id: "unassigned",
		name: "unassigned",
	},
];

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		addUser: (state, action) => {
			state.push(action.payload);
		},
		deleteUser: (state, action) => {
			const index = state.findIndex((user) => user.id === action.payload);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
		changeUserOrder: (state, action) => {
			const { dropId, dragId } = action.payload;
			const oldIndex = state.findIndex(({ id }) => id === dropId);
			const newIndex = state.findIndex(({ id }) => id === dragId);
			const items = [...state];
			const [item] = items.splice(oldIndex, 1);
			items.splice(newIndex, 0, item);

			return items;
		},
	},
});

export const { addUser, deleteUser, changeUserOrder } = userSlice.actions;

export default userSlice.reducer;
