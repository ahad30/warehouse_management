import apiSlice from "../API/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/products/store",
        body: data,
        header: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Products", "Invoices", "Dashboard"],
    }),
    getProducts: builder.query({
      query: ({ pageNumber }) => {
        return {
          url: `/products?page=${pageNumber ? pageNumber : 1}`,
        };
      },
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
        method: "POST",
        // url: `/posts/${id}`,
        body: productData,
      }),
      invalidatesTags: ["Products", "Invoices"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/products/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Products", "Invoices", "Dashboard"],
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
