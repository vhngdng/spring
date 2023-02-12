import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const provinceApi = createApi({
	reducerPath: "provinceList",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://vapi.vnappmob.com/api/province/",
	}),
	tagTypes: "Post",
	endpoints: (builder) => ({
		fetchProvince: builder.query({ query: () => "", providesTags: ["Post"] }),
	}),
});

export const { useFetchProvinceQuery } = provinceApi;
