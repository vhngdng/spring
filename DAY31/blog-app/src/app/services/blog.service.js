import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
	reducerPath: "blogApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/admin" }),
	tagTypes: ["Blogs"],
	endpoints: (builder) => ({
		getBlogs: builder.query({
			query: () => "blogs",
			providesTags: ["Blogs"],
		}),
		getBlogById: builder.query({
			query: (id) => `blogs/${id}`,
		}),
		getBlogsPaging: builder.query({
			query: (page, size) =>
				size !== undefined
					? `blogs/publicBlogs?page=${page}&size=${size}`
					: `blogs/publicBlogs?page=${page}`,
		}),
		getOwnBlog: builder.query({
			query: () => `blogs/own-blogs`,
		}),
		createBlog: builder.mutation({
			query: (body) => ({ url: `blogs`, method: "POST", body }),
			invalidatesTags: ["Blogs"],
		}),
		updateBlog: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `blogs/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Post"],
		}),
		deleteBlog: builder.mutation({
			query: (id) => ({
				url: `blogs/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetBlogsQuery,
	useGetBlogByIdQuery,
	useGetOwnBlogQuery,
	useCreateBlogMutation,
	useDeleteBlogMutation,
	useUpdateBlogMutation,
	useGetBlogsPagingQuery,
} = blogApi;
