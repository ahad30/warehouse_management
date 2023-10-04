import apiSlice from "../API/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/jwt/register",
        // url: "/posts",
        body: data,
      }),
      invalidatesTags: ["Users", "Dashboard"],
    }),
    getUserRoles: builder.query({
      query: () => ({
        url: "/roles",
        // url: "/posts",
      }),
      providesTags: ["Users"],
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
    updateUserProfile: builder.mutation({
      query: (data) => ({
        method: "PUT",
        url: `/profile/updateProfile`,
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/users/delete/${id}`,
        // url: `/posts/${id}`,
      }),
      invalidatesTags: ["Users"],
    }),
    findLoggedInUser: builder.query({
      query: () => ({
        url: `/profile/findLoggedInUser`,
      }),
      providesTags: ["Users"],
    }),
    userLogOut: builder.mutation({
      query: () => ({
        method: "POST",
        url: `/jwt/logout`,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useGetUserRolesQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useFindLoggedInUserQuery,
  useUserLogOutMutation,
} = userApi;
