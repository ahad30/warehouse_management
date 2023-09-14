import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const salesReportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReports: builder.query({
      query: () => ({
        url: "/posts",
        headers: headers,
      }),
    }),
    getSalesReport: builder.query({
      query: (id) => ({
        // url: `/report/${id}`,
        url: `/posts/${id}`,
        headers: headers,
      }),
    }),
    updateSalesReport: builder.mutation({
      query: ({ id, reportData }) => ({
        method: "PUT",
        // url: `/report/${id}`,
        url: `/posts/${id}`,
        headers: headers,
        body: reportData,
      }),
    }),
    deleteSalesReport: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
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
