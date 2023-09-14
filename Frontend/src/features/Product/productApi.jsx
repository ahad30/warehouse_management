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
        // url: "/products",
        url: "/posts",
        headers: headers,
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        // url: `/products/edit/${id}`,
        url: `/posts/${id}`,
        headers: headers,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        method: "PUT",
        // url: `/products/update/${id}`,
        url: `/posts/${id}`,
        headers: headers,
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        // url: `/products/delete/${id}`,
        url: `/posts/${id}`,
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
