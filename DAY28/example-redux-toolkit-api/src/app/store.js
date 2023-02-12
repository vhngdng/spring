import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo.slice";
const store = configureStore({
	reducer: {
		todos: todoReducer,
	},
});

export default store;
