
import apiSlice from "../API/apiSlice";

const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/brands/store",
        header: {
          "Content-type": "application/json"
        },
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    getBrands: builder.query({
      query: () => ({
        url: "/brands",
      }),
      providesTags: ["Brands"],
    }),
    getBrand: builder.query({
      query: (id) => ({
        url: `/brands/edit/${id}`,
      }),
      providesTags: ["Brands"],
    }),
    
    updateBrand: builder.mutation({
      query: ({data,id}) => ({
        method: "POST",
        url: `/brands/update/${id}`,
        headers: {
          contentType : "multipart/form-data",
          },
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/brands/delete/${id}`,
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetBrandsQuery,
  useGetBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
