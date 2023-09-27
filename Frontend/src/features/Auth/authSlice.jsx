import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// WITHOUT CSRF TOKEN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const request = await axios.post(
      `${import.meta.env.VITE_REACT_APP_PORT}/jwt/login`,
      { email, password }
    );
    const response = request.data;

    if (response.status) {
      localStorage.setItem(
        "access_token",
        JSON.stringify(response?.user?.jwt_token)
      );
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
    access_token: "",
    error: null,
  },
  reducers: {
    getUser: (state, action) => {
      console.log(action);
      let access_token = JSON.parse(localStorage.getItem("access_token"));
      if (access_token) {
        state.access_token = access_token;
        state.user = action.payload;
      }
    },
    logOut: (state) => {
      localStorage.removeItem("access_token");
      state.user = null;
      state.access_token = "";
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
        state.user = action.payload.user;
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
