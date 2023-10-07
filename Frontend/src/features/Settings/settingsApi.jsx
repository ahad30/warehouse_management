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
        url: `/company/info/update`,
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const { useGetCompanyInfoQuery, useUpdateCompanyInfoMutation } =
  settingsApi;
