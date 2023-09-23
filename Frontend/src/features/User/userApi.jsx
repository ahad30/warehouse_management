import apiSlice from "../API/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/register",
        // url: "/posts",
        body: data,
      }),
      invalidatesTags: ["Users", "Dashboard"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        // url: "/posts",
      }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        method: "PUT",
        url: `/users/update`,
        // url: `/posts/${id}`,
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/users/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
