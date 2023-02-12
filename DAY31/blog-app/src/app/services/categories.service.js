import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
	reducerPath: "categoryApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/api/v1/admin/categories",
	}),
	tagTypes: ["Post"],
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => "",
			providesTags: ["Post"],
		}),
		getCategoryById: builder.query({
			query: (id) => `/${id}`,
		}),
		getOwnCategory: builder.query({
			query: () => `/categories/own-blogs`,
		}),
		createCategory: builder.mutation({
			query: ({ ...body }) => ({
				url: "",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Posts"],
		}),
		updateCategory: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Posts"],
		}),
		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Posts"],
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetCategoriesQuery,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useCreateCategoryMutation,
} = categoryApi;
