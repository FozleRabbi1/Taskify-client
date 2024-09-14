import { baseApi } from './../../api/baseApi';

export const TagsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllTags: builder.query({
            providesTags: ["tags",],
            query: (query) => {                
                return {
                    url: "/tags",
                    method: "GET",
                    params : query,
                };
            },
            pollingInterval: 10000
        }),
        deleteTags: builder.mutation({
            invalidatesTags: ["tags",],
            query: (arrayOfId) => {                
                return {
                    url: "/tags",
                    method: "DELETE",
                    body : arrayOfId,
                };
            },
        }),

        updateSingleTags : builder.mutation({
            query: (args) => {                                          
                return {
                    url: `/tags/${args?.id}`,
                    method: "PATCH",
                    body : args.data
                }
            },
            invalidatesTags: ["tags"],
        }),

    }),
});
