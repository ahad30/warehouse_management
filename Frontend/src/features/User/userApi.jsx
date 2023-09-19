import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        headers: headers,
        // url: "/register",
        url: "/posts",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getUsers: builder.query({
      query: () => ({
        headers: headers,
        // url: "/users",
        url: "/posts",
      }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        method: "PUT",
        headers: headers,
        // url: "/users",
        url: `/posts/${id}`,
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        url: `/posts/${id}`,
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
