import apiSlice from "../API/apiSlice";

const dashboardSummaryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => ({
        url: "/dashboard",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardSummaryApi;
