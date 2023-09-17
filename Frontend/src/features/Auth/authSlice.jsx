import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// WITHOUT CSRF TOKEN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const request = await axios.post(
      `${import.meta.env.VITE_REACT_APP_PORT}/login`,
      { email, password }
    );
    const response = request.data;
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

// WITH CSRF TOKEN
/* export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { getState }) => {
    const csrfToken = getState().auth.csrfToken; // Get the CSRF token from your Redux state
    const headers = {
      "X-CSRF-TOKEN": csrfToken,
      "X-Requested-With": "XMLHttpRequest",
    };

    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      { email, password },
      { headers }
    );

    const responseData = response.data;

    // Perform necessary actions with the response data
    localStorage.setItem("user", JSON.stringify(responseData));

    return responseData;
  }
);
*/

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
