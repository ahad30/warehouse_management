import apiSlice from "../API/apiSlice";

const findProductsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleProduct: builder.query({
      query: () => ({
        url: "/product/search",
      }),
    })
  }),
});

export const { useGetSingleProductQuery } = findProductsSlice;
