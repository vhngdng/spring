/* eslint-disable no-unused-labels */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/admin',
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: (page) => ({
                url:
                    page === null || page === 0
                        ? 'blogs'
                        : `blogs?page=${page}`,
            }),
            providesTags: ['Blogs'],
        }),
        getBlogById: builder.query({
            query: (id) => `blogs/${id}`,
        }),
        getAllIdBlogs: builder.query({
            query: () => `blogs/all-id-blogs`,
        }),
        getBlogByCategoryId: builder.query({
            query: ({ id, page }) => ({
                url:
                    page === 0
                        ? `blogs/categories/${id}`
                        : `blogs/categories/${id}?page=${page}`,
            }),
        }),
        getSearchBlogs: builder.query({
            query: (body) => `blogs/search?keyword=${body}`,
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useGetAllIdBlogsQuery,
    useGetBlogByCategoryIdQuery,
    useLazyGetSearchBlogsQuery,
} = blogApi;
