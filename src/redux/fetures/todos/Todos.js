import { baseApi } from './../../api/baseApi';

export const TodosApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodos: builder.query({
            providesTags: ["todos",],
            query: () => {                
                return {
                    url: "/todos",
                    method: "GET",
                };
            },
            pollingInterval: 10000
        }),
    }),
});
