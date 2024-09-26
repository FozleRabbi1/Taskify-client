import { baseApi } from './../../api/baseApi';

export const ProjectsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllProjects: builder.query({
            providesTags: ["Projects", "favourite-Projects", "todos"],
            query: (query) => {                        
                return {
                    url: "/projects",
                    method: "GET",
                    params : query,
                };
            },
        }),

        addProject: builder.mutation({
            invalidatesTags: ["Projects", "all-users"],            
            query: (data) => {                
                return {
                    url: "/projects",
                    method: "POST",
                    body : data.data,
                };
            },
        }),
        
        getAllFavouriteProjects: builder.query({
            providesTags: ["favourite-Projects"],            
            query: (query) => {                
                return {
                    url: "/projects/favourite",
                    method: "GET",
                    params : query,
                };
            },
        }),  

        totalDataCount: builder.query({
            providesTags: ["Projects", "favourite-Projects", "todos"],
            query: (query) => {                
                return {
                    url: "/projects/totalDataCount",
                    method: "GET",
                    params : query,
                };
            },
        }),        
              
        isFavouriteProject: builder.mutation({
            query: (args) => {
                return {
                    url: `/projects/${args?.id}`,
                    method: "PATCH",
                    body : args.data
                }
            },
            invalidatesTags: ["favourite-Projects"],
        }),
        updateProjectsInFo : builder.mutation({
            query: (args) => {
                return {
                    url: `/projects/${args?.id}`,
                    method: "PUT",
                    body : args.data
                }
            },
            invalidatesTags: ["Projects", "all-users"],
        }),
        duplicateProjects : builder.mutation({
            query: (args) => {                                          
                return {
                    url: `/projects/${args?.id}`,
                    method: "POST",
                    body : args
                }
            },
            invalidatesTags: ["Projects", "all-users"],
        }),
        updateSingleProjects : builder.mutation({
            query: (args) => {                                          
                return {
                    url: `/projects/singleProject/${args?.id}`,
                    method: "PATCH",
                    body : args.data
                }
            },
            invalidatesTags: ["Projects", "all-users"],
        }),
        deleteProject: builder.mutation({
            query: (arrayOfIds) => {
                return {
                    url: `/projects`,
                    method: "DELETE",
                    body : arrayOfIds
                }
            },
            invalidatesTags: ["Projects", "all-users"],
        }),

    }),
});
