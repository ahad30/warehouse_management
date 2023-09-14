import { headers } from "../../utils/hooks/headers";
import apiSlice from "../API/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        // url: "/register",
        url: "/posts",
        headers: headers,
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        // url: "/users",
        url: "/posts",
        headers: headers,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        method: "PUT",
        // url: "/users",
        url: `/posts/${id}`,
        headers: headers,
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        headers: headers,
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
