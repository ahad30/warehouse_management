import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addCustomer: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/posts",
        headers: headers,
        body: data,
      }),
    }),
    getCustomers: build.query({
      query: () => ({
        url: "/posts",
        headers: headers,
      }),
    }),
  }),
});

export const { useAddCustomerMutation, useGetCustomersQuery } = customerApi;
