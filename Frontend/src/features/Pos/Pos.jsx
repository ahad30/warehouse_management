import apiSlice from "../API/apiSlice";

const posApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsForPos: builder.query({
      query: ({ warehouseId, brandId, categoryId , scanCode }) => ({
        url: `/invoice/create?warehouse_id=${warehouseId}&&category_id=${categoryId}&&brand_id=${brandId}&&scan_code=${scanCode}`,
      }),
      providesTags: ["Pos"],
    }),
  }),
});

export const {
useGetProductsForPosQuery
} = posApi;
