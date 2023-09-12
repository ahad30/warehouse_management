import { useToken } from "../../utils/hooks/useToken";
import apiSlice from "../API/apiSlice";

const token = useToken();

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        // url: "/products/store",
        url: "/posts",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        // url: "/products",
        url: "/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAddProductMutation, useGetProductsQuery } = productApi;
