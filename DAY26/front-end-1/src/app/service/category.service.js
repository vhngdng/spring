import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/admin',
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories',
            providesTags: ['Category'],
        }),
        getCategoryId: builder.query({
            query: (id) => `categories/${id}`,
        }),
        getCategoryTop5: builder.query({
            query: () => 'categories/top5',
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryIdQuery,
    useGetCategoryTop5Query,
} = categoryApi;
