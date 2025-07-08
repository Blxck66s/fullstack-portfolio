import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const loginPath = "/realtime-chat/auth";
const redirectUrl = import.meta.env.VITE_BASE_URL + loginPath;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const orig = err.config;

    if (orig.url?.includes("/auth")) {
      return Promise.reject(err);
    }

    if (err.response.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        await useAuthStore.getState().refreshToken();
        return api(orig);
      } catch (refreshError) {
        console.log(refreshError);
        useAuthStore.getState().logout();
        if (!window.location.pathname.endsWith(loginPath)) {
          window.location.href = redirectUrl;
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  },
);

export default api;
