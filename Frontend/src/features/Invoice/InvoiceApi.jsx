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
      invalidatesTags: ["Invoices", "Dashboard", "Products Report"],
    }),
    getInvoices: builder.query({
      query: ({ startDate, endDate, date }) => ({
        url: `/invoice/list/${startDate}/${endDate}/${date}`,
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
      query: (invoiceData) => ({
        method: "PUT",
        url: `/invoice/update`,
        body: invoiceData,
      }),
      invalidatesTags: ["Invoices", "Dashboard"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/invoice/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Invoices", "Dashboard"],
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
