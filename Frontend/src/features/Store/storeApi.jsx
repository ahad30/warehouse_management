import apiSlice from "../API/apiSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addStore: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/warehouses",
        header: {
          contentType: "application/json"
        },
        body: data,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
    getStores: build.query({
      query: () => ({
        url: "/warehouses",
      }),
      providesTags: ["Stores"],
    }),
    updateStore: build.mutation({
      query: (customerData, id) => ({
        method: "PUT",
        url: `/warehouses/${id}`,
        body: customerData,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
    deleteStore: build.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/warehouses/${id}`,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
  }),
});

export const {
  useAddStoreMutation,
  useGetStoresQuery,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
