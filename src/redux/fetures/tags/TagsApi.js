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


    }),
});
