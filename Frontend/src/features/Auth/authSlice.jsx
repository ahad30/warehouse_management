import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const request = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      { email, password }
    );
    const response = request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    error: null,
  },
  reducers: {
    getUser: (state) => {
      let user = JSON.parse(localStorage.getItem("user"));
      state.user = user;
    },
    logOut: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = null;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = null;
        state.user = null;
        state.error = action.error.message;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default authSlice.reducer;

export const { getUser, logOut } = authSlice.actions;
