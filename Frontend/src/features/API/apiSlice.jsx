import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_PORT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.access_token;
      console.log(token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Customers",
    "Categories",
    "Products",
    "Invoices",
    "Company",
    "Profile",
    "Dashboard",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
