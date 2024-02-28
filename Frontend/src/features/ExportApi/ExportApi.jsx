import apiSlice from "../API/apiSlice";

const ExportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExports: builder.mutation({
      query: () => ({
        url: "/export",
        method: "POST",
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
    getExport: builder.mutation({
      query: (id) => ({
        url: `/export-By-Warehouse/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
  }),
});
export const { useGetAllExportsMutation, useGetExportMutation } = ExportApi;
