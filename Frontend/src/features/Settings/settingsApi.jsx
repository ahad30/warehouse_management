import apiSlice from "../API/apiSlice";

const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyInfo: builder.query({
      query: () => ({
        url: `/company/info`,
      }),
      providesTags: ["Company"],
    }),
    updateCompanyInfo: builder.mutation({
      query: (data) => ({
        method: "PUT",
        url: `/company/update`,
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/profile/update",
      }),
      providesTags: ["Profile"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `/profile/update/${id}`,
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
