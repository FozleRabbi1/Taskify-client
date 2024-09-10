import { baseApi } from "../../api/baseApi";

export const ProjectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllProjects: builder.query({
            providesTags: ["Projects"],
            query: (query) => {                
                return {
                    url: "/projects",
                    method: "GET",
                    params : query,
                };
            },
            pollingInterval: 10000
        }),

        deleteProject: builder.mutation({
            query: (arrayOfIds) => {
                return {
                    url: `/projects`,
                    method: "DELETE",
                    body : arrayOfIds
                }
            },
            invalidatesTags: ["Projects"],
        }),

        isFavouriteProject: builder.mutation({
            query: (args) => {
                return {
                    url: `/projects/${args?.id}`,
                    method: "PATCH",
                    body : args.data
                }
            },
            invalidatesTags: ["Projects"],
        }),

        updateStatusInProjects : builder.mutation({
            query: (args) => {
                return {
                    url: `/projects/${args?.id}`,
                    method: "PUT",
                    body : args.data
                }
            },
            invalidatesTags: ["Projects"],
        }),


        // getAllProjects: builder.query({
        //     providesTags: ["Projects"],
        //     query: (params) => {
        //         // Convert params to a query string
        //         console.log(params);
        //         const queryString = params ? `dates=${encodeURIComponent(params.dates)}` : '';
                
        //         return {
        //             url: `/projects?${queryString}`,
        //             method: "GET",
        //         };
        //     },
        //     pollingInterval: 10000
        // }),



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
