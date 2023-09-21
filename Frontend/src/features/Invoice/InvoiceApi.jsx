import apiSlice from "../API/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newInvoice: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/invoice/store",
        // url: "/posts",
        body: data,
      }),
    }),
    getInvoices: builder.query({
      query: () => ({
        url: "/invoice/list",
        // url: "/posts",
      }),
    }),

    getInvoice: builder.query({
      query: (id) => ({
        url: `/categories/edit/${id}`,
        // url: `/posts/${id}`,
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, invoiceData }) => ({
        method: "PUT",
        url: `/categories/update/${id}`,
        // url: `/posts/${id}`,
        body: invoiceData,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/categories/delete/${id}`,
        // url: `/posts/${id}`,
      }),
    }),
  }),
});

export const {
  useNewInvoiceMutation,
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
