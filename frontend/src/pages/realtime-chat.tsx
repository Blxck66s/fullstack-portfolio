import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

function RealtimeChat() {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    (async () => {
      await checkAuthStatus();
    })();
  }, [checkAuthStatus]);

  return <div>realtime-chat</div>;
}

export default RealtimeChat;
export const metadata = {
  title: "Realtime Chat",
  description: "A real-time chat application built with WebSockets.",
};
