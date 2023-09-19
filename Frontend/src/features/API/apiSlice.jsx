import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../../utils/axios/axios";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_PORT,
  }),
  tagTypes: ["Users", "Customers", "Categories", "Products", "Invoices"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
