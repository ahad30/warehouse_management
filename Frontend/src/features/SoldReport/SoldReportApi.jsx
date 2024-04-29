import apiSlice from "../API/apiSlice";


const SoldReportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    // addHistory: build.mutation({
    //   query: (data) => ({
    //     method: "POST",
    //     url: "/productshift/store",
    //     header: {
    //       // "Content-type": "application/json"
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ["getHistory"],
    // }),

    
    getSoldReport: build.query({
      query: ({
        pageNumber,
        brand_id,
        category_id,
        warehouse_id,
        product_code,
        starting_date,
        ending_date,
      }) => ({
        url: `/sale/report?page=${
          pageNumber ? pageNumber : 1
        }&&brand_id=${brand_id}&&category_id=${category_id}&&warehouse_id=${warehouse_id}&&product_code=${product_code}&&starting_date=${starting_date}&&ending_date=${ending_date}`,
      }),
      providesTags: ["SoldReport"],
    }),
  }),
});

export const {
//   useAddHistoryMutation,
  useGetSoldReportQuery,
  //   useUpdateStoreMutation,
  //   useDeleteStoreMutation,
} = SoldReportApi;
