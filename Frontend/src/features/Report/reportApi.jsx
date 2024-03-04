import apiSlice from "../API/apiSlice";

const reportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductsReport: builder.query({
      query: () => ({
        url: `/company/info`,
      }),
      providesTags: ["report"],
    }),
    getAllSalesReport: builder.query({
      query: ({ start_date, end_date, time_range }) => ({
        url: `/sale/report/?time_range=${time_range}&&start_date=${start_date}&&end_date=${end_date}`,
      }),
      providesTags: ["report"],
    }),
    getAllShiftReport: builder.query({
      query: () => ({
        url: `/company/info`,
      }),
      providesTags: ["report"],
    }),
  }),
});

export const {
  useGetAllProductsReportQuery,
  useGetAllShiftReportQuery,
  useGetAllSalesReportQuery,
} = reportApi;
