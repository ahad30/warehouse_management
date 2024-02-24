import apiSlice from "../API/apiSlice";

const findProductsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleProduct: builder.query({
      query: ({ scanCode }) => ({
        url: `/product/search?scan_code=${scanCode}`,
      }),
    }),
  }),
});

export const { useGetSingleProductQuery } = findProductsSlice;
