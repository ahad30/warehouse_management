import apiSlice from "../API/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data, token) => ({
        method: "POST",
        url: "/categories/store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
  }),
});

export const { useAddCategoryMutation } = categoryApi;
