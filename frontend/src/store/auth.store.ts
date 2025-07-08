import api from "@/lib/api";
import { AuthLogin, AuthUser } from "@/types/auth";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { create } from "zustand";

export interface AuthState {
  user: AuthUser | null;
  accessTokenTimeLeft: number;
  isAuthenticated: boolean;
  isReadyToRegister: { email: string; isReady: boolean };
  decrementAccessTokenTimeLeft: () => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setIsReadyToRegister: (isReady: boolean) => void;
  checkAuthStatus: () => Promise<void>;
  login: ({ provider, email, password }: AuthLogin) => Promise<void>;
  logout: () => Promise<void>;
  localRegister: (email: string, password: string) => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessTokenTimeLeft: 0,
  isAuthenticated: false,
  isReadyToRegister: { email: "", isReady: false },
  setIsReadyToRegister: (isReady) =>
    set((state) => ({
      isReadyToRegister: { ...state.isReadyToRegister, isReady },
    })),
  decrementAccessTokenTimeLeft: () =>
    set((state) => ({
      accessTokenTimeLeft:
        state.accessTokenTimeLeft > 0 ? state.accessTokenTimeLeft - 1 : 0,
    })),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  checkAuthStatus: async () => {
    try {
      const response = await api.get("/auth/profile");
      const user = response.data;
      set({
        user,
        isAuthenticated: !!user,
        accessTokenTimeLeft: dayjs.unix(user.exp).diff(dayjs(), "second"),
      });
    } catch (error: unknown | AxiosError) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        set({ user: null, isAuthenticated: false, accessTokenTimeLeft: 0 });
        return;
      }
      console.error("Error checking auth status:", error);
      set({ user: null, isAuthenticated: false, accessTokenTimeLeft: 0 });
    }
  },
  localRegister: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/local/register", {
        email,
        password,
      });
      if (response.status !== 201) {
        const errorMessage = response.data?.message || "Registration failed";

        window.location.href =
          "/realtime-chat/auth?provider=local&error=" +
          encodeURIComponent(errorMessage);
        return;
      }
      await get().checkAuthStatus();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  },
  login: async ({ provider, email, password }: AuthLogin) => {
    if (provider === "google" || provider === "facebook") {
      window.location.href =
        import.meta.env.VITE_API_URL + "/auth/" + provider + "/login";
    } else if (provider === "local") {
      try {
        await api.post("/auth/" + provider + "/login", {
          email,
          password,
        });

        await get().checkAuthStatus();
      } catch (error: unknown | AxiosError) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          if (error.response?.data?.message === "user_not_found" && email) {
            set({ isReadyToRegister: { email, isReady: true } });
            return;
          }
          window.location.href =
            "/realtime-chat/auth?provider=local&error=" +
            encodeURIComponent(error.response?.data?.message || "login_failed");
          return;
        }
        console.log("Login failed:", error);
      }
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null, isAuthenticated: false, accessTokenTimeLeft: 0 });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
  refreshToken: async () => {
    try {
      await api.post("/auth/refresh");
      await get().checkAuthStatus();
    } catch (error) {
      console.error("Token refresh failed:", error);
      set({ user: null, isAuthenticated: false, accessTokenTimeLeft: 0 });
      throw new Error("Token refresh failed");
    }
  },
}));
