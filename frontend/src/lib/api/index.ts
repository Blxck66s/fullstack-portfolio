import axios from "axios";
import { refreshToken } from "./auth.api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(null, async (error) => {
  const originalRequest = error.config;
  const isRefresh = originalRequest?.url?.includes("/auth/refresh");
  if (
    error.response.status === 401 &&
    error.response.data?.message === "Unauthorized" &&
    !originalRequest._retry &&
    !isRefresh
  ) {
    originalRequest._retry = true;
    try {
      await refreshToken();
      return api.request(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  const location = window.location.pathname;

  if (location !== "/realtime-chat/auth" && isRefresh) {
    window.location.href = "/realtime-chat/auth";
  }
  return Promise.reject(error);
});

export default api;
export * from "./auth.api";
export * from "./chat.api";
