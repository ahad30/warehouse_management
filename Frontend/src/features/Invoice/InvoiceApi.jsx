import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newInvoice: builder.mutation({
      query: (data) => ({
        method: "POST",
        headers: headers,
        url: "/posts",
        body: data,
      }),
    }),
    getInvoices: builder.query({
      query: () => ({
        headers: headers,
        // url: "/invoice/list",
        url: "/posts",
      }),
    }),

    getInvoice: builder.query({
      query: (id) => ({
        headers: headers,
        // url: `/categories/edit/${id}`,
        url: `/posts/${id}`,
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, invoiceData }) => ({
        method: "PUT",
        headers: headers,
        // url: `/categories/update/${id}`,
        url: `/posts/${id}`,
        body: invoiceData,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        // url: `/categories/delete/${id}`,
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const { useNewInvoiceMutation, useGetInvoicesQuery } = invoiceApi;
