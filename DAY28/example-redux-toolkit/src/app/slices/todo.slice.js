import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.push(action.payload);
		},
		deleteTodo: (state, action) => {
			const { id } = action.payload; //Lấy ra id trong object
			const index = state.findIndex((todo) => todo.id === id); // tìm index của todo cần xoá trong state
			state.splice(index, 1); // Xoá trong state
		},
		updateTodo: (state, action) => {
			const { id } = action.payload; //Lấy ra id trong object
			const index = state.findIndex((todo) => todo.id === id); // tìm index của todo cần xoá trong state;
			state[index] = action.payload;
		},
	},
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
