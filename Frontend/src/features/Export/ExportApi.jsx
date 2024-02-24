import apiSlice from "../API/apiSlice";

const ExportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addExport: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/products",
        header: {
          "Content-type": "application/json",
        },
        // body: data,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
  }),
});

export const { useAddExportMutation } = ExportApi;
