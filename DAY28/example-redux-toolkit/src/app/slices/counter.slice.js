import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
};

const counterSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		increment: (state, action) => {
			state.value += 1;
		},
		decrement: (state, action) => {
			state.value -= 1;
		},
	},
});

// increment, decrement : action creator
// name + increment = > action type : "counter/increment"
// Thay đổi trực tiếp state => sử dụng Immer.js (đây là thư viện)

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
