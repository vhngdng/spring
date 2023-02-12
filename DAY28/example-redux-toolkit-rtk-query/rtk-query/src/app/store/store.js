import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "../api";
import todoReducer from "../slice/todo.slice";
export const store = configureStore({
	reducer: {
		[todosApi.reducerPath]: todosApi.reducer,
		todos: todoReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(todosApi.middleware),
});
