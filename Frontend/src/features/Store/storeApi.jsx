import apiSlice from "../API/apiSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addStore: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/stores/store",
        body: data,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
    getStores: build.query({
      query: () => ({
        url: "/stores",
      }),
      providesTags: ["Stores"],
    }),
    updateStore: build.mutation({
      query: (customerData) => ({
        method: "PUT",
        url: `/stores/update`,
        body: customerData,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
    deleteStore: build.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/stores/delete/${id}`,
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
