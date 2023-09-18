import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        headers: headers,
        url: "/products/store",
        // url: "/posts",
        body: data,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        headers: headers,
        url: "/products",
        // url: "/posts",
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        headers: headers,
        url: `/products/edit/${id}`,
        // url: `/posts/${id}`,
      }),
    }),
    updateProduct: builder.mutation({
      query: (id, productData) => ({
        method: "PUT",
        headers: headers,
        url: `/products/update/${id}`,
        // url: `/posts/${id}`,
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        url: `/products/delete/${id}`,
        // url: `/posts/${id}`,
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
