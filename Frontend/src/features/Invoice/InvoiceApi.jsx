import apiSlice from "../API/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceInfos: builder.query({
      query: () => ({
        url: "/invoice/create",
      }),
      providesTags: ["Invoices"],
    }),
    newInvoice: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/invoice/store",
        // url: "/posts",
        body: data,
      }),
      invalidatesTags: ["Invoices", "Dashboard"],
    }),
    getInvoices: builder.query({
      query: () => ({
        url: "/invoice/list",
        // url: "/posts",
      }),
      providesTags: ["Invoices"],
    }),

    getInvoice: builder.query({
      query: (id) => ({
        url: `/invoice/edit/${id}`,
        // url: `/posts/${id}`,
      }),
      providesTags: ["Invoices"],
    }),
    updateInvoice: builder.mutation({
      query: ({ id, invoiceData }) => ({
        method: "PUT",
        url: `/invoice/update/${id}`,
        // url: `/posts/${id}`,
        body: invoiceData,
      }),
      invalidatesTags: ["Invoices"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/invoice/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Invoices"],
    }),
  }),
});

export const {
  useGetInvoiceInfosQuery,
  useNewInvoiceMutation,
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
