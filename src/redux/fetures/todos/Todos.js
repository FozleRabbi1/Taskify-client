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



    }),
});
