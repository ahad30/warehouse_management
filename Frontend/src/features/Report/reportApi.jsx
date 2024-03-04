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
      query: () => ({
        url: `/company/info`,
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
