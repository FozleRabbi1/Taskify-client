import { baseApi } from "../../api/baseApi";

export const ProductsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            providesTags: ["products"],
            query: () => {                
                return {
                    url: "/products",
                    method: "GET",
                };                
            },
            pollingInterval: 10000
        }),

        getPayment: builder.query({
            query: () => {                
                return {
                    url: "/products/payment",
                    method: "GET",
                };                
            },
            pollingInterval: 10000
        }),
    }),
});
