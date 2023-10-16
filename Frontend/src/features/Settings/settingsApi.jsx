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
        method: "POST",
        url: `/company/info/update`,
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    getDefaultSettings: builder.query({
      query: () => ({
        url: `/settings`,
      }),
      providesTags: ["Default"],
    }),
    updateDefaultSettings: builder.mutation({
      query: (data) => ({
        method: "PUT",
        url: `/settings/update`,
        body: data,
      }),
      invalidatesTags: ["Default"],
    }),
  }),
});

export const {
  useGetCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
  useGetDefaultSettingsQuery,
  useUpdateDefaultSettingsMutation,
} = settingsApi;
