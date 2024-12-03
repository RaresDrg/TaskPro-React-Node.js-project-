import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://taskproserver.vercel.app";

const utils = {
  setAuthHeader: (token) =>
    (axios.defaults.headers.common.Authorization = `Bearer ${token}`),
  clearAuthHeader: () => delete axios.defaults.headers.common.Authorization,
  delay: (time) => new Promise((resolve) => setTimeout(resolve, time)),
};

const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      await utils.delay(2500);
      const response = await axios.post("/api/users/register", userData);

      utils.setAuthHeader(response.data.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    await utils.delay(2500);
    const response = await axios.post("/api/users/login", userData);

    utils.setAuthHeader(response.data.data.token);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await utils.delay(1500);
    const response = await axios.delete("/api/users/logout");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  } finally {
    utils.clearAuthHeader();
  }
});

const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      utils.setAuthHeader(persistedToken);
      const response = await axios.get("/api/users/current");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const updateUser = createAsyncThunk(
  "auth/updateUserProfile",
  async (updates, thunkAPI) => {
    try {
      const response = await axios.put("/api/users/profile", updates, {
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

export { register, login, logout, refreshUser, updateUser };

const updateTheme = (theme) => axios.patch("/api/users/theme", { theme });
const reachCustomerSupport = async (comment) => {
  const response = await axios.post("/api/users/support", comment);
  return response.data;
};

export { reachCustomerSupport, updateTheme };
