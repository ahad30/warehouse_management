import apiSlice from "../API/apiSlice";

const productReport = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsReport: builder.query({
      query: ({ startDate, endDate, date }) => ({
        url: `/product-report/${startDate}/${endDate}/${date}`,
      }),
      providesTags: ["Invoices"],
    }),
  }),
});

export const { useGetProductsReportQuery } = productReport;
