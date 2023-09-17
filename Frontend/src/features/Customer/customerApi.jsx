import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addCustomer: build.mutation({
      query: (data) => ({
        method: "POST",
        headers: headers,
        url: "/posts",
        body: data,
      }),
    }),
    getCustomers: build.query({
      query: () => ({
        headers: headers,
        // url: "/customers",
        url: "/posts",
      }),
    }),
    updateCustomer: build.mutation({
      query: ({ id, customerData }) => ({
        method: "PUT",
        headers: headers,
        url: `/posts/${id}`,
        body: customerData,
      }),
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        // url: `/customers/delete/${id}`,
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
