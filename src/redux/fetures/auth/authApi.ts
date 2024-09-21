import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (user) => {
        return {        
            url: "/auth/create-user",
            method: "POST",
            body: {user},         
        }
      },
      invalidatesTags: ["all-users"],
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),



    // getALlUsers: builder.query({
    //   query: () => ({
    //     url: "/auth/all-users",
    //     method: "GET",
    //   }),
    //   providesTags: ["all-users"],
    // }),
    // updateUsersRole: builder.mutation({
    //   query: ({ role, id }) => ({
    //     url: `/auth/all-users`,
    //     method: "PATCH",
    //     body: { role, id },
    //   }),
    //   invalidatesTags: ["all-users"],
    // }),
    // deleteUser: builder.mutation({
    //   query: (id) => ({
    //     url: `/auth/all-users/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["all-users"],
    // }),

  }),
});

export default authApi;
