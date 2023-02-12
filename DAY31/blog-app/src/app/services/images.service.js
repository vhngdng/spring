import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const imagesApi = createApi({
	reducerPath: "imagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
	endpoints: (builder) => ({
		uploadImage: builder.mutation({
			query: (body) => ({
				url: `images`,
				method: "POST",
				body,
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUploadImageMutation } = imagesApi;
