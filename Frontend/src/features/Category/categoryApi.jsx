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
      invalidatesTags: ["Categories"],
    }),
    getCategories: builder.query({
      query: () => ({
        headers: headers,
        url: "/categories",
        // url: "/posts",
      }),
      providesTags: ["Categories"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        headers: headers,
        url: `/categories/edit/${id}`,
        // url: `/posts/${id}`,
      }),
      providesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (categoryData) => ({
        method: "PUT",
        headers: headers,
        url: `/categories/update`,
        // url: `/posts/${id}`,
        body: categoryData,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        url: `/categories/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Categories"],
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
