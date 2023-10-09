import apiSlice from "../API/apiSlice";

const dashboardSummaryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => ({
        url: "/dashboard",
      }),
      providesTags: ["Dashboard"],
    }),
    getRevenueAndSellByDate: builder.query({
      query: () => ({
        url: "/dashboard/revenue-graph",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery, useGetRevenueAndSellByDateQuery } =
  dashboardSummaryApi;
