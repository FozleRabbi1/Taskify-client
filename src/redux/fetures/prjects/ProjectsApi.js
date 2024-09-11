import { baseApi } from './../../api/baseApi';

export const ProjectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllProjects: builder.query({
            providesTags: ["Projects",],
            query: (query) => {                
                return {
                    url: "/projects",
                    method: "GET",
                    params : query,
                };
            },
            pollingInterval: 10000
        }),
        
        getAllFavouriteProjects: builder.query({
            query: (query) => {                
                return {
                    url: "/projects/favourite",
                    method: "GET",
                    params : query,
                };
            },
            invalidatesTags: ["Projects"],
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
        updateProjectsInFo : builder.mutation({
            query: (args) => {
                return {
                    url: `/projects/${args?.id}`,
                    method: "PUT",
                    body : args.data
                }
            },
            invalidatesTags: ["Projects"],
        }),
    }),
});
