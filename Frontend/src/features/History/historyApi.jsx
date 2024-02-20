import apiSlice from "../API/apiSlice";

const historyApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // addStore: build.mutation({
    //   query: (data) => ({
    //     method: "POST",
    //     url: "/warehouses",
    //     header: {
    //       // "Content-type": "application/json"
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ["Stores", "Products"],
    // }),

    getHistory: build.query({
      query: () => ({
        url: "/history/index",
      }),
      providesTags: ["Histories"],
    }),
  }),
});

export const {
//   useAddStoreMutation,
  useGetHistoryQuery,
//   useUpdateStoreMutation,
//   useDeleteStoreMutation,
} = historyApi;