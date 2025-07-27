import { updateUserStatus } from "@/lib/api/user.api";
import { ACCESS_TOKEN_REFRESH_TIME } from "@/types/auth";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";

export function AccessTokenAutoRefresh() {
  const {
    accessTokenTimeLeft,
    refreshToken,
    checkAuthStatus,
    decrementAccessTokenTimeLeft,
  } = useAuthStore();

  useEffect(() => {
    const { user } = useAuthStore.getState();
    const handleUnload = async () => {
      if (user && user.id) await updateUserStatus(user.id, false);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  useEffect(() => {
    if (accessTokenTimeLeft <= 0) {
      checkAuthStatus(true);
      return;
    }

    if (accessTokenTimeLeft > ACCESS_TOKEN_REFRESH_TIME) {
      return () =>
        clearTimeout(
          setTimeout(
            () => refreshToken(),
            (accessTokenTimeLeft - ACCESS_TOKEN_REFRESH_TIME) * 1000,
          ),
        );
    }
  }, [accessTokenTimeLeft, refreshToken, checkAuthStatus]);

  useEffect(() => {
    if (accessTokenTimeLeft <= 0) return;
    const interval = setInterval(() => {
      decrementAccessTokenTimeLeft();
    }, 1000);
    return () => clearInterval(interval);
  }, [accessTokenTimeLeft, decrementAccessTokenTimeLeft]);

  return null;
}
