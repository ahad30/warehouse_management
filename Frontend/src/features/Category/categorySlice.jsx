import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.api_token?.plainTextToken;

    if (!token) {
      return console.log("Unauthorized User");
    } else {
      const request = await axios.post(
        `${import.meta.env.VITE_REACT_APP_PORT}/categories/store`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = request;
      // console.log(response);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {},
});

export default categorySlice.reducer;

// export const {} = categorySlice.actions;
