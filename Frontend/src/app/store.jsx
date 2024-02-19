import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlice from "../features/Invoice/invoiceSlice";
import authSlice from "../features/Auth/authSlice";
import categorySlice from "../features/Category/categorySlice";
import apiSlice from "../features/API/apiSlice";
import pageSlice from "../features/Page/pageSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    invoice: InvoiceSlice,
    category: categorySlice,
    pageSlice: pageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
