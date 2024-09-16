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

        deleteNote: builder.mutation({
            invalidatesTags: ["notes",],
            query: ({id}) => {                                
                return {
                    url: `/notes/${id}`,
                    method: "DELETE",
                };
            },
        }),
        

        updateSingleNote : builder.mutation({
            query: (args) => {                                          
                return {
                    url: `/notes/${args?.id}`,
                    method: "PATCH",
                    body : args.formData
                }
            },
            invalidatesTags: ["notes"],
        }),

    }),
});
