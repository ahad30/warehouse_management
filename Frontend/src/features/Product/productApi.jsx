import apiSlice from "../API/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/products/store",
        body: data,
        header: {
          "Content-type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Products", "Invoices", "Dashboard", "Pos"],
    }),
    getProducts: builder.query({
      query: ({ pageNumber, query, warehouse_id }) => {
        return {
          url: `/products?page=${pageNumber ? pageNumber : 1}&query=${
            query ? query : ""
          }&warehouse_id=${warehouse_id ? warehouse_id : ""}`,
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

    updateProductImage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/update/image/${id}`,
        method: "POST",
        // url: `/posts/${id}`,
        headers: {
          contentType: "multipart/form-data",
        },
        body: data,
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
  useUpdateProductImageMutation,
} = productApi;
