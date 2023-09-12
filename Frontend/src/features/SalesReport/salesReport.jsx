import { useToken } from "../../utils/hooks/useToken";
import apiSlice from "../API/apiSlice";
const token = useToken();

const salesReport = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSalesReports: build.query({
      query: () => ({
        url: "/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetSalesReportsQuery } = salesReport;
