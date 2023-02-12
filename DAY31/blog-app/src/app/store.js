import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blog.service";
import { categoryApi } from "./services/categories.service";
import { imagesApi } from "./services/images.service";
// import blogReducer from "./slices/blog.slice";
// import categoryReducer from "./slices/category.slice";
const store = configureStore({
	reducer: {
		[imagesApi.reducerPath]: imagesApi.reducer,
		[blogApi.reducerPath]: blogApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		// blogs: blogReducer,
		// categories: categoryReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			blogApi.middleware,
			categoryApi.middleware,
			imagesApi.middleware
		),
});

export default store;
