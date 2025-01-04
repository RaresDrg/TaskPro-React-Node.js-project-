import apiClient from "../../utils/config-axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const utils = {
  delay: (time) => new Promise((resolve) => setTimeout(resolve, time)),
};

const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      await utils.delay(2500);
      const response = await apiClient.post("/api/users/register", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    await utils.delay(2500);
    const response = await apiClient.post("/api/users/login", userData);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await utils.delay(1500);
    const response = await apiClient.delete("/api/users/logout");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const updateUser = createAsyncThunk(
  "auth/updateUserProfile",
  async (updates, thunkAPI) => {
    try {
      const response = await apiClient.put("/api/users/profile", updates, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const handleGoogleAuth = createAsyncThunk(
  "auth/handleGoogleAuth",
  async (validationToken, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `/api/users/google-auth/getUser?validationToken=${validationToken}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ validationToken, newPassword }, thunkAPI) => {
    try {
      const response = await apiClient.patch(
        `/api/users/update-password?validationToken=${validationToken}`,
        { newPassword }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateTheme = (theme) => apiClient.patch("/api/users/theme", { theme });
const reachCustomerSupport = async (comment) => {
  const response = await apiClient.post("/api/users/support", comment);
  return response.data;
};
const handleForgotPassword = async (email) => {
  const response = await apiClient.post("/api/users/forgot-password", email);
  return response.data;
};

export {
  register,
  login,
  logout,
  updateUser,
  handleGoogleAuth,
  changePassword,
  updateTheme,
  reachCustomerSupport,
  handleForgotPassword,
};
