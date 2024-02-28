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
      invalidatesTags: ["getHistory"],
    }),
    getHistory: build.query({
      query: ({ pageNumber, query }) => ({
        url: `/histories?page=${pageNumber ? pageNumber : 1}&query=${query}`,
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
