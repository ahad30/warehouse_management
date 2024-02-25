import apiSlice from "../API/apiSlice";

const ImportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    setImport: build.mutation({
      query: (data) => ({
        method: "POST",
        url: "/import",
        header: {
          "Content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Stores", "Products"],
    }),
  }),
});

export const { useSetImportMutation } = ImportApi;
