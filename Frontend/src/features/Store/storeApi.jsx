import apiSlice from "../API/apiSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addStore: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/warehouses",
        header: {
          // "Content-type": "application/json"
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
      query: ({ data, id }) => ({
        method: "POST",
        url: `/warehouses/${id}`,
        header: {
          contentType: "multipart/form-data",
        },
        body: data,
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
