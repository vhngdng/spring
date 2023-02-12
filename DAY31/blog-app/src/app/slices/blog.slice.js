import { createSlice } from "@reduxjs/toolkit";
// import { blogApi } from "../services/blog.service";

// const getBlogs = useGetBlogsQuery;
const initialState = [];
const blogSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {},
	// extraReducers: (builder) => {
	// 	builder.addMatcher(
	// 		blogApi.endpoints.getBlogs.matchFulfilled,
	// 		(state, { payload }) => {
	// 			state.loading = true;
	// 			state.data = payload;
	// 		}
	// 	);
	// 	builder.addMatcher(
	// 		blogApi.endpoints.getBlogById.matchFulfilled,
	// 		(state, { payload }) => state.find((blog) => blog.id === payload)
	// 	);
	// },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
