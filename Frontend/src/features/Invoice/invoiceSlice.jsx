import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoiceInfo: {
    invoiceNo: 0,
    issueDate: "",
    dueDate: "",
  },
  company: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  customer: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  items: [],
  calculation: {
    subTotalPrice: 0,
    discountPrice: 0,
    shippingCost: 0,
    totalPrice: 0,
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
      state.items.push(action.payload);
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
