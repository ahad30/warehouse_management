import { useToken } from "../../utils/hooks/useToken";
import apiSlice from "../API/apiSlice";

const token = useToken();

const invoiceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    newInvoice: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    getInvoices: build.query({
      query: () => ({
        url: "/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useNewInvoiceMutation, useGetInvoicesQuery } = invoiceApi;
