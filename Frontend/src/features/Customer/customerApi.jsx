import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addCustomer: build.mutation({
      query: (data) => ({
        method: "POST",
        headers: headers,
        url: "/customers/store",
        // url: "/posts",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
    getCustomers: build.query({
      query: () => ({
        headers: headers,
        url: "/customers",
        // url: "/posts",
      }),
      providesTags: ["Customers"],
    }),
    updateCustomer: build.mutation({
      query: (customerData) => ({
        method: "PUT",
        headers: headers,
        url: `/customers/update`,
        // url: `/posts/${id}`,
        body: customerData,
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        url: `/customers/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
