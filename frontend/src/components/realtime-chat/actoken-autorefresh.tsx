import { ACCESS_TOKEN_REFRESH_TIME } from "@/types/auth";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";

export function AccessTokenAutoRefresh() {
  const { accessTokenTimeLeft, isAuthenticated, refreshToken } = useAuthStore();
  useEffect(() => {
    if (!isAuthenticated) return;
    if (
      accessTokenTimeLeft > 0 &&
      accessTokenTimeLeft < ACCESS_TOKEN_REFRESH_TIME
    ) {
      refreshToken();
    }
  }, [accessTokenTimeLeft, isAuthenticated, refreshToken]);

  return null;
}
