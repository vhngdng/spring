import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
	reducerPath: "userList",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8079/api/v1/users",
	}),
	tagTypes: "Post",
	endpoints: (builder) => ({
		fetchUsers: builder.query({ query: () => "/all", providesTags: ["Post"] }),
		fetchUserWithId: builder.query({
			query: (id) => `/${id}`,
		}),
		createUser: builder.mutation({
			query: (body) => {
				method: "POST";
				body;
			},
			invalidatesTags: ["Post"],
		}),
	}),
});

export const {
	useFetchUsersQuery,
	useFetchUserWithIdQuery,
	useCreateUserMutation,
} = userApi;
