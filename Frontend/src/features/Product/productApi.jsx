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
      invalidatesTags: ["Products"],
    }),
    getProducts: builder.query({
      query: () => ({
        headers: headers,
        url: "/products",
        // url: "/posts",
      }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        headers: headers,
        url: `/products/edit/${id}`,
        // url: `/posts/${id}`,
      }),
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (productData) => ({
        headers: headers,
        url: `/products/update`,
        method: "PUT",
        // url: `/posts/${id}`,
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        url: `/products/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Products"],
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
