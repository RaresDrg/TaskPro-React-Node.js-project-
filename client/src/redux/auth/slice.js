import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  updateUser,
  handleGoogleAuth,
  changePassword,
} from "./operations";

const initialState = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  user: null,
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
  handleFulfilled: (state) => {
    state.isLoading = false;
    state.error = null;
  },
  handleLogout: (state) => {
    state.isLoggedIn = false;
    state.user = null;
  },
  handleAuth: (state, action) => {
    state.isLoggedIn = true;
    state.user = {
      isGoogleUser: action.payload.data.user.isGoogleUser,
      name: action.payload.data.user.name,
      email: action.payload.data.user.email,
      theme: action.payload.data.user.theme,
      profilePhotoUrl: action.payload.data.user?.profilePhotoUrl ?? null,
    };
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.user.theme = action.payload;
    },
    forceLogout: (state) => {
      utils.handleLogout(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // *Register
      .addCase(register.pending, utils.handlePending)
      .addCase(register.rejected, utils.handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        utils.handleAuth(state, action);
      })
      // *Login
      .addCase(login.pending, utils.handlePending)
      .addCase(login.rejected, utils.handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        utils.handleAuth(state, action);
      })
      // *Logout
      .addCase(logout.pending, utils.handlePending)
      .addCase(logout.rejected, (state, action) => {
        utils.handleRejected(state, action);
        utils.handleLogout(state);
      })
      .addCase(logout.fulfilled, (state) => {
        utils.handleFulfilled(state);
        utils.handleLogout(state);
      })
      // *Update User
      .addCase(updateUser.rejected, utils.handleRejected)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = {
          ...state.user,
          name: action.payload.data.user.name,
          email: action.payload.data.user.email,
          profilePhotoUrl: action.payload.data.user.profilePhotoUrl,
        };
      })
      // *Handle Google Auth
      .addCase(handleGoogleAuth.rejected, utils.handleRejected)
      .addCase(handleGoogleAuth.fulfilled, (state, action) => {
        state.error = null;
        utils.handleAuth(state, action);
      })
      // *Change Password
      .addCase(changePassword.rejected, utils.handleRejected)
      .addCase(changePassword.fulfilled, (state, action) => {
        state.error = null;
        utils.handleAuth(state, action);
      });
  },
});

export const { setTheme, forceLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
