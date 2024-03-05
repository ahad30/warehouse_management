import apiSlice from "../API/apiSlice";

const posApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsForPos: builder.query({
      query: ({ warehouseId, brandId, categoryId, scanCode, pageNumber }) => ({
        url: `/invoice/create?warehouse_id=${warehouseId}&&category_id=${categoryId}&&brand_id=${brandId}&&scan_code=${scanCode}&&page=${
          pageNumber ? pageNumber : 1
        }`,
      }),
      providesTags: ["Pos", "Products", "report"],
    }),
  }),
});

export const { useGetProductsForPosQuery } = posApi;
