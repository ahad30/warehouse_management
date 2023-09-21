import apiSlice from "../API/apiSlice";

const salesReportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReports: builder.query({
      query: () => ({
        url: "/posts",
      }),
    }),
    getSalesReport: builder.query({
      query: (id) => ({
        // url: `/report/${id}`,
        url: `/posts/${id}`,
      }),
    }),
    updateSalesReport: builder.mutation({
      query: ({ id, reportData }) => ({
        method: "PUT",
        // url: `/report/${id}`,
        url: `/posts/${id}`,
        body: reportData,
      }),
    }),
    deleteSalesReport: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        // url: `/report/${id}`,
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const {
  useGetSalesReportsQuery,
  useGetSalesReportQuery,
  useUpdateSalesReportMutation,
  useDeleteSalesReportMutation,
} = salesReportApi;
