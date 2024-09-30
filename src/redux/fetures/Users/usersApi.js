import { baseApi } from "../../api/baseApi";

export const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            providesTags: ["all-users"],
            query: () => {                
                return {
                    url: "/auth",
                    method: "GET",
                };                
            }
        }),

        deleteUser: builder.mutation({
            query: (arrayOfIds) => {
                return {
                    url: `/auth`,
                    method: "DELETE",
                    body : arrayOfIds
                }
            },
            invalidatesTags: ["all-users", "Projects"],
        }),

        logOutUser: builder.mutation({
            query: (email) => {                
                return {
                    url: `/auth/logOut`,
                    method: "PUT",
                    body : email
                }
            },
            invalidatesTags: ["all-users"],
        }),

    }),
});
