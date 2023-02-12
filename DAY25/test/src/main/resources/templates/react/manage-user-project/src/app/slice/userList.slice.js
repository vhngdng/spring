import { createSlice } from "@reduxjs/toolkit";
import {
	useFetchUsersQuery,
	useFetchUserWithIdQuery,
	useCreateUserMutation,
} from "../api/userApi";
const initialUserListState = [];
const userListSlice = createSlice({
	name: "users",
	initialUserListState,
	reducers: {},
	extraReducer: (builder) => {
		builder.addMatcher(
			useFetchUsersQuery().matchFulfilled,
			(state, { payload }) => {
				state = payload;
				return state;
			}
		);
		builder.addMatcher(
			useFetchUserWithIdQuery().matchFulfilled,
			(state, { payload }) => {
				state.find((users) => users.id === payload);
			}
		);
		builder.addMatcher(
			useCreateUserMutation().matchFulfilled,
			(state, { payload }) => state.push(payload)
		);
	},
});

// export const userSlice = createSlice({
// 	name: "user",
// 	initialUserState,
// 	reducers: {},
// 	extraReducer: (builder) => {
// 		builder.addMatcher(
// 			useCreateUserMutation().matchFulfilled,
// 			(state, { payload }) => (state = payload)
// 		);
// 		// builder.addMatcher(
// 		// 	useFetchUserWithIdQuery().matchFulfilled,
// 		// 	(state, { payload }) => {
// 		// 		state.find((users) => users.id === payload);
// 		// 	}
// 		// );
// 	},
// });

export const {} = userSlice.actions;

export default userListSlice.reducer;
