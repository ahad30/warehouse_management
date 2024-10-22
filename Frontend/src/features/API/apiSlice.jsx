import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_PORT,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.user?.jwt_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
  
      return headers;
    },
  }),
  tagTypes: [
    "Install",
    "Dashboard",
    "Users",
    "Customers",
    "Categories",
    "Brands",
    "Stores",
    "Products",
    "Invoices",
    "Products Report",
    "Company",
    "Settings",
    "Default",
    "Profile",
    "Pos",
    "report"
  ],
  endpoints: () => ({}),
});

export default apiSlice;
