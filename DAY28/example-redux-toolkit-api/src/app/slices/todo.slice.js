import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8090/api/v1/todos";

//fetchTodos : Thunk actiion creatore
// Thunk action tra ve 1 promise
// todos/fetchTodos : action type

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
	const response = await axios.get(API_URL);
	return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodos", async (title) => {
	const response = await axios.post(API_URL, title);
	return response.data;
});

// updatedTodo : id, {title, status}
// updatedTodo : {id, title, status}
export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async (updatedTodo) => {
		const { id, ...data } = updatedTodo;
		const response = await axios.put(`${API_URL}/${id}`, data);
		return response.data;
	}
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
	await axios.delete(`${API_URL}/${id}`);
	return id;
});

const initialState = [];

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state = action.payload;
			return state;
		});
		builder.addCase(addTodo.fulfilled, (state, action) => {
			state.push(action.payload);
		});
		builder.addCase(updateTodo.fulfilled, (state, action) => {
			const { id } = action.payload;
			const index = state.findIndex((todo) => todo.id === id);
			state[index] = action.payload;
		});
		builder.addCase(deleteTodo.fulfilled, (state, action) => {
			const id = action.payload;
			const index = state.findIndex((todo) => todo.id === id);
			state.splice(index, 1);
		});
	},
});

export const {} = todoSlice.actions;

export default todoSlice.reducer;
