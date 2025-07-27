import { getProfile, login, logout, refreshToken, register } from "@/lib/api";
import { AuthLogin, AuthUser } from "@/types/auth";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  user: AuthUser | null;
  accessTokenTimeLeft: number;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isReadyToRegister: { email: string; isReady: boolean };
  decrementAccessTokenTimeLeft: () => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setIsReadyToRegister: (isReady: boolean) => void;
  checkAuthStatus: (isRefresh?: boolean) => Promise<void>;
  login: ({ provider, email, password }: AuthLogin) => Promise<void>;
  logout: () => Promise<void>;
  localRegister: (email: string, password: string) => Promise<void>;
  refreshToken: () => Promise<void>;
  authError: { error: string | null; provider: string | null };
  setAuthError: (authError: {
    error: string | null;
    provider: string | null;
  }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessTokenTimeLeft: 0,
      isAuthenticated: false,
      isCheckingAuth: false,
      isReadyToRegister: { email: "", isReady: false },
      authError: { error: null, provider: null },
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsReadyToRegister: (isReady) =>
        set((state) => ({
          isReadyToRegister: { ...state.isReadyToRegister, isReady },
        })),
      setAuthError: (authError) => {
        let { error } = authError;
        if (error && authError.provider) {
          switch (error) {
            case "user_not_found":
              error = "Invalid email or password. Please try again.";
              break;
          }

          if (authError.provider === "google") {
            switch (error) {
              case "access_denied":
                error = "Google authentication was denied. Please try again.";
                break;
              default:
                error =
                  "An unknown error occurred during Google authentication.";
            }
          } else if (authError.provider === "local") {
            switch (error) {
              case "invalid_credentials":
                error = "Invalid email or password. Please try again.";
                break;
              default:
                error = "An unknown error occurred during authentication.";
            }
          }
        }
        set({ authError });
      },
      decrementAccessTokenTimeLeft: () =>
        set((state) => ({
          accessTokenTimeLeft:
            state.accessTokenTimeLeft > 0 ? state.accessTokenTimeLeft - 1 : 0,
        })),
      checkAuthStatus: async (isRefresh = false) => {
        const { accessTokenTimeLeft } = get();
        if (accessTokenTimeLeft > 0 && isRefresh === false) return;
        set({ isCheckingAuth: true });
        try {
          const user = await getProfile();
          set({
            user: { ...user, isOnline: true },
            isAuthenticated: !!user,
            accessTokenTimeLeft: dayjs.unix(user.exp).diff(dayjs(), "second"),
          });
        } catch (error) {
          console.error("Error checking auth status:", error);
          set({
            user: null,
            isAuthenticated: false,
            accessTokenTimeLeft: 0,
          });
          return;
        } finally {
          set({ isCheckingAuth: false });
        }
      },
      localRegister: async (email: string, password: string) => {
        try {
          await register(email, password);
          await get().checkAuthStatus();
        } catch (error: unknown | AxiosError) {
          if (error instanceof AxiosError) {
            get().setAuthError({
              error: error.response?.data?.message || "registration_failed",
              provider: "local",
            });
            return;
          }
          console.error("Registration failed:", error);
        }
      },
      login: async ({ provider, email, password }: AuthLogin) => {
        if (provider === "google") {
          window.location.href =
            import.meta.env.VITE_API_URL + "/auth/" + provider + "/login";
        } else if (provider === "local" || provider === "demo") {
          try {
            await login({ provider, email, password });
            await get().checkAuthStatus();
          } catch (error: unknown | AxiosError) {
            if (error instanceof AxiosError && error.response?.status === 401) {
              if (error.response?.data?.message === "user_not_found" && email) {
                set({ isReadyToRegister: { email, isReady: true } });
                return;
              }
              get().setAuthError({
                error: error.response?.data?.message || "login_failed",
                provider: "local",
              });
              return;
            }
            console.log("Login failed:", error);
          }
        }
      },
      logout: async () => {
        try {
          await logout();
          set({ user: null, isAuthenticated: false, accessTokenTimeLeft: 0 });
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      refreshToken: async () => {
        try {
          await refreshToken();
          await get().checkAuthStatus(true);
        } catch (error) {
          console.error("Token refresh failed");
          set({ user: null, isAuthenticated: false, accessTokenTimeLeft: 0 });
          return Promise.reject(error);
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessTokenTimeLeft: state.accessTokenTimeLeft,
        isReadyToRegister: state.isReadyToRegister,
      }),
    },
  ),
);
