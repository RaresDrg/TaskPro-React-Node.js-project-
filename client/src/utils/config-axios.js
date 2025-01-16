import axios from "axios";
import { handleForceLogout } from "./utils";

const apiClient = axios.create({
  baseURL: "https://taskproserver.vercel.app",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      !originalRequest.url.includes("/api/users/logout") &&
        handleForceLogout(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
