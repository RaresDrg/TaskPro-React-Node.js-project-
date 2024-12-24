import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, updateUser } from "./operations";

const initialState = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
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
  handleLogout: (state) => {
    state.isLoggedIn = false;
    state.user = {
      name: null,
      email: null,
      theme: null,
      profilePhotoUrl: null,
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
    handleGoogleAuth: (state, action) => {
      state.isLoggedIn = true;
      state.user = {
        name: action.payload.user.name,
        email: action.payload.user.email,
        theme: action.payload.user.theme,
        profilePhotoUrl: action.payload.user.profilePhotoUrl,
      };
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
        utils.handleLogout(state);
      })
      .addCase(logout.fulfilled, (state) => {
        utils.handlefulfilled(state);
        utils.handleLogout(state);
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

export const { setTheme, forceLogout, handleGoogleAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
