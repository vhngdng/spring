import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const todosApi = createApi({
	reducerPath: "todoList",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8090/api/v1/todos" }),
	tagTypes: "Rerender",
	endpoints: (builder) => ({
		fetchTodo: builder.query({
			query: () => "",
			// transformResponse: (response, meta, arg) => response.data,
			// transformErrorResponse: (response, meta, arg) => response.status,
			providesTags: ["Rerender"],
		}),
		addTodo: builder.mutation({
			query: (body) => ({
				method: "POST",
				body,
			}),
			invalidatesTags: ["Rerender"],
		}),
		updateTodos: builder.mutation({
			query: ({ id, ...todoUpdated }) => ({
				url: `/${id}`,
				method: "PUT",
				body: todoUpdated,
			}),
			invalidatesTags: ["Rerender"],
		}),
		deleteTodo: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Rerender"],
		}),
	}),
});

export const {
	useFetchTodoQuery,
	useAddTodoMutation,
	useDeleteTodoMutation,
	useUpdateTodosMutation,
} = todosApi;
