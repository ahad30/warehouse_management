import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        method: "POST",
        headers: headers,
        url: "/categories/store",
        // url: "/posts",
        body: data,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        headers: headers,
        url: "/categories",
        // url: "/posts",
      }),
    }),
    getCategory: builder.query({
      query: (id) => ({
        headers: headers,
        // url: `/categories/edit/${id}`,
        url: `/posts/${id}`,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        method: "PUT",
        headers: headers,
        // url: `/categories/update/${id}`,
        url: `/posts/${id}`,
        body: categoryData,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        // url: `/categories/delete/${id}`,
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
