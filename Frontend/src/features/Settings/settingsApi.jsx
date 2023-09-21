import apiSlice from "../API/apiSlice";
import { headers } from "../../utils/hooks/headers";

const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyInfo: builder.query({
      query: () => ({
        headers: headers,
        url: `/company/info`,
      }),
      providesTags: ["Company"],
    }),
    updateCompanyInfo: builder.mutation({
      query: (data) => ({
        method: "PUT",
        headers: headers,
        url: `/company/update`,
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        headers: headers,
        url: "/profile/update",
      }),
      providesTags: ["Profile"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        headers: headers,
        url: "/",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
  useUpdateUserProfileMutation,
} = settingsApi;
