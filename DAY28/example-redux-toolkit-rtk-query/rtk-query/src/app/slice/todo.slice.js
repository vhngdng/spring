import { createSlice } from "@reduxjs/toolkit";
import {
	useFetchTodoQuery,
	useAddTodoMutation,
	useDeleteTodoMutation,
	useUpdateTodosMutation,
} from "../api";

// const {
// 	isLoading: fetchTodoLoading,
// 	data: todos,
// 	error: fetchTodoError,
// } = useFetchTodoQuery();
// const {
// 	isLoading: addLoading,
// 	data: addData,
// 	error: addError,
// } = useAddTodoMutation();
// const {
// 	isLoading: updateLoading,
// 	data: updateData,
// 	error: updateError,
// } = useUpdateTodosMutation();
// const {
// 	isLoading: deleteLoading,
// 	data: deleteData,
// 	error: deleteError,
// } = useDeleteTodoMutation();
const initialState = [];

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducer: (builder) => {
		builder.addCase(useFetchTodoQuery().isSuccess, (state, action) => {
			state = action.payload;
			return state;
		});
		builder.addCase(useAddTodoMutation().isSuccess, (state, action) => {
			state.push(action.payload);
		});
		builder.addCase(useUpdateTodosMutation().isSuccess, (state, action) => {
			const { id } = action.payload;
			const index = state.findIndex((todo) => todo.id === id);
			state[index] = action.payload;
		});
		builder.addCase(useDeleteTodoMutation().isSuccess, (state, action) => {
			const id = action.payload;
			const index = state.findIndex((todo) => todo.id === id);
			state.splice(index, 1);
		});
	},
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;
