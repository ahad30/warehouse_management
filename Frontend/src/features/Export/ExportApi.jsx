import apiSlice from "../API/apiSlice";

const ExportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    setExport: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/export",
        header: {
          "Content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
  }),
});

export const { useSetExportMutation } = ExportApi;