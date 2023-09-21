import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// WITHOUT CSRF TOKEN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const request = await axios.post(
      `${import.meta.env.VITE_REACT_APP_PORT}/login`,
      { email, password }
    );
    const response = request.data;

    if (response.status) {
      localStorage.setItem("user", JSON.stringify(response));
      toast.success(response?.message, { id: 1 });
    }
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    api_token: "",
    error: null,
  },
  reducers: {
    getUser: (state) => {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user?.api_token;
      if (token) {
        state.user = user?.user;
        state.api_token = user?.api_token;
      }
    },
    logOut: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.api_token = "";
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
