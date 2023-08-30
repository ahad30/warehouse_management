import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    const request = await axios.post(
      "http://127.0.0.1:8000/api/categories/store",
      data
    );
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: {},
});

export default categorySlice.reducer;

export const {} = categorySlice.actions;
