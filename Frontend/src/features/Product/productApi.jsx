import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        // url: "/products/store",
        url: "/posts",
        body: data,
        headers: headers,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        // url: "/posts",
        headers: headers
      }),
    }),
  }),
});

export const { useAddProductMutation, useGetProductsQuery } = productApi;
