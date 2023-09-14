import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const invoiceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    newInvoice: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/posts",
        headers: headers,
        body: data,
      }),
    }),
    getInvoices: build.query({
      query: () => ({
        url: "/posts",
        headers: headers,
      }),
    }),
  }),
});

export const { useNewInvoiceMutation, useGetInvoicesQuery } = invoiceApi;
