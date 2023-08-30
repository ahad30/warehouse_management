import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlice from "../features/Invoice/InvoiceSlice";
import authSlice from "../features/Auth/authSlice";
import categorySlice from "../features/Category/categorySlice";
import apiSlice from "../features/API/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    invoice: InvoiceSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
