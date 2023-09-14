import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const salesReportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSalesReports: build.query({
      query: () => ({
        url: "/posts",
        headers: {
          Authorization: headers,
        },
      }),
    }),
  }),
});

export const { useGetSalesReportsQuery } = salesReportApi;
