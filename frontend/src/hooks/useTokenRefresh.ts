import { useAuthStore } from "@/store/auth.store";
import { ACCESS_TOKEN_REFRESH_TIME } from "@/types/auth";
import { useEffect } from "react";

export const useTokenRefresh = () => {
  const {
    accessTokenTimeLeft,
    refreshToken,
    checkAuthStatus,
    decrementAccessTokenTimeLeft,
  } = useAuthStore();

  useEffect(() => {
    if (accessTokenTimeLeft <= 0) {
      checkAuthStatus(true);
      return;
    }

    if (accessTokenTimeLeft > ACCESS_TOKEN_REFRESH_TIME) {
      const timeout = setTimeout(
        () => refreshToken(),
        (accessTokenTimeLeft - ACCESS_TOKEN_REFRESH_TIME) * 1000,
      );
      return () => clearTimeout(timeout);
    }
  }, [accessTokenTimeLeft, refreshToken, checkAuthStatus]);

  useEffect(() => {
    if (accessTokenTimeLeft <= 0) return;

    const interval = setInterval(() => {
      decrementAccessTokenTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, [accessTokenTimeLeft, decrementAccessTokenTimeLeft]);
};
