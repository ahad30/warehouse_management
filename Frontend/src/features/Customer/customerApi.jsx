import apiSlice from "../API/apiSlice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addCustomer: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/customers/store",
        // url: "/posts",
        body: data,
      }),
      invalidatesTags: ["Customers", "Invoices", "Dashboard"],
    }),
    getCustomers: build.query({
      query: () => ({
        url: "/customers",
        // url: "/posts",
      }),
      providesTags: ["Customers"],
    }),
    updateCustomer: build.mutation({
      query: (customerData) => ({
        method: "PUT",
        url: `/customers/update`,
        // url: `/posts/${id}`,
        body: customerData,
      }),
      invalidatesTags: ["Customers", "Invoices"],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/customers/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Customers", "Invoices", "Dashboard"],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
