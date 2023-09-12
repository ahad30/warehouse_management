import { useToken } from "../../utils/hooks/useToken";
import apiSlice from "../API/apiSlice";

const token = useToken();

const customerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addCustomer: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    getCustomers: build.query({
      query: () => ({
        url: "/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAddCustomerMutation, useGetCustomersQuery } = customerApi;
