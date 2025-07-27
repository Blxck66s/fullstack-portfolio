import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export const useOnlineStatus = () => {
  const { setOnlineStatus } = useAuthStore();

  useEffect(() => {
    const { user } = useAuthStore.getState();

    const handleUserStatusChange = async (status: boolean) => {
      if (user && user.id) {
        setOnlineStatus(status);
      }
    };

    const updateStatus = () => {
      if (navigator.onLine) handleUserStatusChange(true);
      else setOnlineStatus(false);
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, [setOnlineStatus]);
};
