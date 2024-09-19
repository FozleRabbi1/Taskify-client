import { baseApi } from './../../api/baseApi';

export const TodosApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        getAllTodos: builder.query({
            providesTags: ["Projects", "favourite-Projects", "todos"],
            query: () => {                
                return {
                    url: "/todos",
                    method: "GET",
                };
            },
            transformResponse: (response) => {
                return {
                  data: response.data,
                  meta: response.meta,
                };
              },
            pollingInterval: 10000
        }),

        checkedTodos: builder.mutation({
            invalidatesTags: ["Projects", "favourite-Projects", "todos"],
            query: ({id}) => {
                return {
                    url: `/todos/${id}`,
                    method: "PATCH",
                };
            },
        }),

        updateTodos: builder.mutation({
            invalidatesTags: ["todos"],            
            query: (args) => {
                return {
                    url: `/todos/updateTodo/${args?.id}`,
                    method: "PATCH",
                    body : args?.formData
                };
            },
        }),

        deleteTodos: builder.mutation({
            invalidatesTags: ["todos"],            
            query: (idArray) => {
                return {
                    url: `/todos`,
                    method : "DELETE",
                    body : idArray
                };
            },
        }),
    }),
});
