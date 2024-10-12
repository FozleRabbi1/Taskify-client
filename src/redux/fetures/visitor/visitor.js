import { baseApi } from "../../api/baseApi";

export const VisitorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getVisitorCounter: builder.query({
            providesTags: ["visitor"],
            query: () => {                
                return {
                    url: "/visitor",
                    method: "GET",
                };                
            }
        }),

        createVisitor: builder.mutation({
            invalidatesTags: ["visitor"],
            query: (data) => {
                console.log({data});
                
                return {
                    url: "/visitor",
                    method: "PATCH",
                    body : data
                };                
            }
        }),

    }),
});
