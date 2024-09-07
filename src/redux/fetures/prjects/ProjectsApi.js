import { baseApi } from "../../api/baseApi";

export const ProjectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllProjects: builder.query({
            providesTags: ["Products"],
            query: (query) => {
                return {
                    url: "/projects",
                    method: "GET",
                    query,
                };
            },
            pollingInterval: 10000
        }),



        // updateProduct: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: `/products`,
        //             method: "PATCH",
        //             body: data
        //         };
        //     },
        //     invalidatesTags: ["Products"],
        // }),

        // deleteProduct: builder.mutation({
        //     query: (id) => ({
        //         url: `/products/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ["Products"],
        // }),

        // addProduct: builder.mutation({
        //     query: (data) => ({
        //         url: "/products",
        //         method: "POST",
        //         body: data
        //     }),
        //     invalidatesTags: ["Products"],
        // }),


    }),
});
