import { useToken } from "../../utils/hooks/useToken";
import apiSlice from "../API/apiSlice";

const token = useToken();

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/register",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAddUserMutation } = userApi;
