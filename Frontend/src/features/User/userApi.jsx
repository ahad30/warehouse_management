import { useToken } from "../../utils/hooks/useToken";
import apiSlice from "../API/apiSlice";

const token = useToken();

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        // url: "/register",
        url: "/posts",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        // url: "/users",
        url: "/posts",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAddUserMutation, useGetUsersQuery } = userApi;
