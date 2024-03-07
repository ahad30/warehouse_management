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
      query: ({
        pageNumber,
        query,
        brand_id,
        category_id,
        to_warehouse,
        starting_date,
        ending_date,
        from_warehouse,
      }) => ({
        url: `/histories?page=${
          pageNumber ? pageNumber : 1
        }&&query=${query}&brand_id=${brand_id}&category_id=${category_id}&&from_warehouse=${from_warehouse}&&to_warehouse=${to_warehouse}&starting_date=${starting_date}&&ending_date=${ending_date}`,
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
