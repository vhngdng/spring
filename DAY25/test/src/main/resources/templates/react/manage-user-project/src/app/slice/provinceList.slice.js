import { createSlice } from "@reduxjs/toolkit";
import { useFetchProvinceQuery } from "../api/provinceAPi";

const initialState = [];

const ProvinceListSlice = createSlice({
	name: "provinceList",
	initialState,
	reducers: {},
	extraReducer: (builder) => {
		builder.addMatcher(
			useFetchProvinceQuery().matchFulfilled,
			(state, { payload }) => {
				state = payload;
				return state;
			}
		);
	},
});

export const {} = ProvinceListSlice.actions;

export default ProvinceListSlice.reducer;
