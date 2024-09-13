import { baseApi } from "../../api/baseApi";

export const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllUsers: builder.query({
            providesTags: ["all-users"],
            query: () => {                
                return {
                    url: "/auth",
                    method: "GET",
                    // params : query,
                };                
            },
            pollingInterval: 10000
        }),

    }),
});
