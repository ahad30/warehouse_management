import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoiceInfo: {
    invoiceNo: 0,
    issueDate: "",
    dueDate: "",
  },
  company: {
    company_name: "",
    company_email: "",
    company_phone: "",
    company_address: "",
  },
  customer: {
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  },
  items: [],
  calculation: {
    subTotal: 0,
    discount: 0,
    shipping: 0,
    total: 0,
    paidAmount: 0,
    due: 0,
  },
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getInvoice: (state, action) => {
      state.invoiceInfo = action.payload;
    },
    getCompanyInfo: (state, action) => {
      state.company = action.payload;
    },
    getCustomerInfo: (state, action) => {
      state.customer = action.payload;
    },
    getItem: (state, action) => {
      state.items = action.payload;
    },
    deleteItem: (state, action) => {
      state.items = action.payload;
    },
    getTotalPrice: (state, action) => {
      state.calculation = action.payload;
    },

    resetState: (state) => {
      state.invoiceInfo = {};
      state.company = {};
      state.customer = {};
      state.items = [];
      state.calculation = {};
    },
  },
});

export const {
  getInvoice,
  getCompanyInfo,
  getCustomerInfo,
  getItem,
  deleteItem,
  getTotalPrice,
  resetState,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
