import apiSlice from "../API/apiSlice";

const productReport = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsReport: builder.query({
      query: ({ startDate, endDate, date }) => ({
        url: `/product-report/${date}/${startDate}/${endDate}`,
      }),
      providesTags: ["Products Report"],
    }),
  }),
});

export const { useGetProductsReportQuery } = productReport;
