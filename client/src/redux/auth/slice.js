import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refreshUser,
  updateTheme,
  updateUser,
} from "./operations";

const initialState = {
  isLoading: false,
  error: null,
  user: {
    name: null,
    email: null,
    profilePhotoUrl: null,
    theme: null,
  },

  token: null,
  isLoggedIn: false,
};

const utils = {
  handlePending: (state) => {
    state.isLoading = true;
  },

  handleRejected: (state, action) => {
    state.isLoading = false;
    state.error =
      action.payload?.response?.data?.message || "Internal server error";
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder

      // *Register
      .addCase(register.pending, utils.handlePending)
      .addCase(register.rejected, utils.handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.user = {
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          theme: action.payload.data.user.theme,
        };

        state.token = action.payload.data.token;
        state.isLoggedIn = true;
      })

      // *Login
      .addCase(login.pending, utils.handlePending)
      .addCase(login.rejected, utils.handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.user = {
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          theme: action.payload.data.user.theme,
          profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
        };

        state.token = action.payload.data.token;
        state.isLoggedIn = true;
      })

      // *Logout
      .addCase(logout.pending, utils.handlePending)
      .addCase(logout.rejected, utils.handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;

        state.user = {
          name: null,
          email: null,
          theme: null,
          profilePhotoUrl: null,
        };

        state.token = null;
        state.isLoggedIn = false;
      })

      // *Refresh User
      .addCase(refreshUser.rejected, utils.handleRejected)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoggedIn = true;

        state.user = {
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          theme: action.payload.data.user.theme,
          profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
        };
      })

      // *Update Theme
      .addCase(updateTheme.rejected, utils.handleRejected)
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.error = null;
        state.user.theme = action.payload.data.user.theme;
      })

      // *Update User
      .addCase(updateUser.rejected, utils.handleRejected)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;

        state.user = {
          theme: state.user.theme,

          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
        };
      });
  },
});

export const authReducer = authSlice.reducer;
