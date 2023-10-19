import apiSlice from "../API/apiSlice";

const installationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAlreadyInstall: build.query({
      query: () => ({
        url: "/already-install",
      }),
      providesTags: [],
    }),
    getStepOne: build.query({
      query: () => ({
        url: "/step-1",
      }),
      providesTags: [],
    }),
    getStepTwo: build.query({
      query: ({ requirementForStep1 }) => ({
        url: "/step-2",
        data: requirementForStep1,
      }),
      providesTags: [],
    }),
    postStepThree: build.mutation({
      query: (data) => ({
        method: "POST",
        url: `/step-3`,
        body: data,
      }),
      invalidatesTags: [],
    }),
    postStepFour: build.mutation({
      query: (data) => ({
        method: "POST",
        url: `/step-4`,
        body: data,
      }),
      invalidatesTags: [],
    }),
    finalStep: build.mutation({
      query: (data) => ({
        method: "POST",
        url: `/final-step`,
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetAlreadyInstallQuery,
  useGetStepOneQuery,
  useGetStepTwoQuery,
  usePostStepThreeMutation,
  usePostStepFourMutation,
  useFinalStepMutation,
} = installationApi;
