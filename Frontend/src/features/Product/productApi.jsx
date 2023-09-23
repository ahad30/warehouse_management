import apiSlice from "../API/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/products/store",
        // url: "/posts",
        body: data,
      }),
      invalidatesTags: ["Products", "Invoices", "Dashboard"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        // url: "/posts",
      }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/edit/${id}`,
        // url: `/posts/${id}`,
      }),
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (productData) => ({
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
