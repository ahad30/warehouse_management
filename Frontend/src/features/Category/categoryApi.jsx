import apiSlice from "../API/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/categories/store",
        header: {
          contentType : "application/json"
        },
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    getCategories: builder.query({
      query: () => ({
        url: "/categories",

      }),
      providesTags: ["Categories"],
    }),

    
    getCategory: builder.query({
      query: (id) => ({
        url: `/categories/edit/${id}`,
        
      }),
      providesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/categories/update`,
        header: {
          contentType : "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
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
