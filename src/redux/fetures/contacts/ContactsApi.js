import { baseApi } from './../../api/baseApi';

export const ContactsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // getAllNotes: builder.query({
        //     providesTags: ["notes"],
        //     query: () => {                
        //         return {
        //             url: "/notes",
        //             method: "GET",
        //         };
        //     },
        //     pollingInterval: 10000
        // }),


        createContact: builder.mutation({
            invalidatesTags: ["contacts"],
            query: (data) => {                
                return {
                    url: "/contacts",
                    method: "POST",
                    body : data,
                };
            }
        }),

        // deleteNote: builder.mutation({
        //     invalidatesTags: ["notes",],
        //     query: ({id}) => {                                
        //         return {
        //             url: `/notes/${id}`,
        //             method: "DELETE",
        //         };
        //     },
        // }),
        

        // updateSingleNote : builder.mutation({
        //     query: (args) => {                                          
        //         return {
        //             url: `/notes/${args?.id}`,
        //             method: "PATCH",
        //             body : args.formData
        //         }
        //     },
        //     invalidatesTags: ["notes"],
        // }),

    }),
});
