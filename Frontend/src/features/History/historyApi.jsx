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
        warehouse_id,
        starting_date,
        ending_date,
      }) => ({
        url: `/shifting/report?page=${
          pageNumber ? pageNumber : 1
        }&&query=${query}&&brand_id=${brand_id}&&category_id=${category_id}&&warehouse_id=${warehouse_id}&&starting_date=${starting_date}&&ending_date=${ending_date}`,
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
