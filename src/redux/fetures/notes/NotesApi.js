import { baseApi } from './../../api/baseApi';

export const NotesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllNotes: builder.query({
            providesTags: ["notes"],
            query: () => {                
                return {
                    url: "/notes",
                    method: "GET",
                };
            },
            pollingInterval: 10000
        }),


        createNotes: builder.mutation({
            invalidatesTags: ["notes"],
            query: (data) => {                
                return {
                    url: "/notes",
                    method: "POST",
                    body : data,
                };
            }
        }),






        // deleteTags: builder.mutation({
        //     invalidatesTags: ["tags",],
        //     query: (arrayOfId) => {                
        //         return {
        //             url: "/tags",
        //             method: "DELETE",
        //             body : arrayOfId,
        //         };
        //     },
        // }),

        // updateSingleTags : builder.mutation({
        //     query: (args) => {                                          
        //         return {
        //             url: `/tags/${args?.id}`,
        //             method: "PATCH",
        //             body : args.data
        //         }
        //     },
        //     invalidatesTags: ["tags"],
        // }),

    }),
});
