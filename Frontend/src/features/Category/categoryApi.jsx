import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        method: "POST",
        // url: "/categories/store",
        url: "/posts",
        headers: headers,
        body: data,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        // url: "/categories",
        url: "/posts",
        headers: headers,
      }),
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categoryApi;
