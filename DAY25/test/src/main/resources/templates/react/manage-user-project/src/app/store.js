import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { provinceApi } from "./api/provinceAPi";
const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		[provinceApi.reducerPath]: provinceApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware, provinceApi.middleware),
});

export default store;
