import apiSlice from "../API/apiSlice";

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.api_token?.plainTextToken;

console.log(token);

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
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categoryApi;
