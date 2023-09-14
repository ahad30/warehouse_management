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
        // url: "/customers",
        url: "/posts",
        headers: headers,
      }),
    }),
    updateCustomer: build.mutation({
      query: ({ id, customerData }) => ({
        method: "PUT",
        url: `/posts/${id}`,
        headers: headers,
        body: customerData,
      }),
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        method: "DELETE",
        // url: `/customers/delete/${id}`,
        url: `/posts/${id}`,
        headers: headers,
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
