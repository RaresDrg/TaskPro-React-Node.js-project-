import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser, updateUser } from "./operations";

const initialState = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  token: null,
  user: {
    name: null,
    email: null,
    profilePhotoUrl: null,
    theme: null,
  },
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
  handlefulfilled: (state) => {
    state.isLoading = false;
    state.error = null;
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.user.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // *Register
      .addCase(register.pending, utils.handlePending)
      .addCase(register.rejected, utils.handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        utils.handlefulfilled(state);
        state.isLoggedIn = true;
        state.token = action.payload.data.token;
        state.user = {
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          theme: action.payload.data.user.theme,
        };
      })
      // *Login
      .addCase(login.pending, utils.handlePending)
      .addCase(login.rejected, utils.handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        utils.handlefulfilled(state);
        state.isLoggedIn = true;
        state.token = action.payload.data.token;
        state.user = {
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          theme: action.payload.data.user.theme,
          profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
        };
      })
      // *Logout
      .addCase(logout.pending, utils.handlePending)
      .addCase(logout.rejected, (state, action) => {
        utils.handleRejected(state, action);
        state.isLoggedIn = false;
        state.token = null;
        state.user = {
          name: null,
          email: null,
          theme: null,
          profilePhotoUrl: null,
        };
      })
      .addCase(logout.fulfilled, (state) => {
        utils.handlefulfilled(state);
        state.isLoggedIn = false;
        state.token = null;
        state.user = {
          name: null,
          email: null,
          theme: null,
          profilePhotoUrl: null,
        };
      })
      // *Refresh User
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = {
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          theme: action.payload.data.user.theme,
          profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
        };
      })
      // *Update User
      .addCase(updateUser.rejected, utils.handleRejected)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = {
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
          theme: action.payload.data.user.theme,
        };
      });
  },
});

export const { setTheme } = authSlice.actions;
export const authReducer = authSlice.reducer;
