import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlice from "../features/Invoice/InvoiceSlice";
import authSlice from "../features/Auth/authSlice";
import categorySlice from "../features/Category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    invoice: InvoiceSlice,
    category: categorySlice,
  },
});
