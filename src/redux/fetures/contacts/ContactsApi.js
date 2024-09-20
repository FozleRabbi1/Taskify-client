import { baseApi } from './../../api/baseApi';

export const ContactsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllContacts: builder.query({
            providesTags: ["contacts"],
            query: (query) => { 
                console.log(query);
                return {
                    url: "/contacts",
                    method: "GET",
                    params : query,
                };
            },
            pollingInterval: 10000
        }),


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
        updateContacts : builder.mutation({
            invalidatesTags: ["contacts"],
            query: (args) => {                                          
                return {
                    url: `/contacts/${args?.id}`,
                    method: "PATCH",
                    body : args.data
                }
            },
        }),
        duplicateContacts : builder.mutation({
            query: (args) => {                                          
                return {
                    url: `/contacts/${args?.id}`,
                    method: "POST",
                    body : args
                }
            },
            invalidatesTags: ["contacts"],
        }),

        deleteContacts : builder.mutation({
            invalidatesTags: ["contacts"],
            query: (arrayOfIds) => {                
                return {
                    url: `/contacts`,
                    method: "DELETE",
                    body : arrayOfIds
                }
            },
        }),

    }),
});
