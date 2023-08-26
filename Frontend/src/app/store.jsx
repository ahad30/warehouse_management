import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlice from "../features/Invoice/InvoiceSlice";

export const store = configureStore({
  reducer: {
    invoice: InvoiceSlice,
  },
});
