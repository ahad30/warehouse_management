import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlice from "../features/Invoice/InvoiceSlice";
import authSlice from "../features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    invoice: InvoiceSlice,
  },
});
