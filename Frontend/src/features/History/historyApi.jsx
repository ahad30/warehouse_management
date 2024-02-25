import apiSlice from "../API/apiSlice";

const historyApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addHistory: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/productshift/store",
        header: {
          // "Content-type": "application/json"
        },
        body: data,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),

    getHistory: build.query({
      query: () => ({
        url: "/history",
      }),
      providesTags: ["Histories"],
    }),
  }),
});

export const {
  useAddHistoryMutation,
  useGetHistoryQuery,
  //   useUpdateStoreMutation,
  //   useDeleteStoreMutation,
} = historyApi;
