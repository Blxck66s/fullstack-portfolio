import AuthFooter from "@/components/realtime-chat/auth-footer";
import { Card } from "@/components/ui/card";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { connectSocket } from "@/lib/socket";
import { useEffect } from "react";
import { Outlet } from "react-router";

function RealtimeChatLayout() {
  useOnlineStatus();
  useTokenRefresh();

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="mx-auto flex w-full max-w-4xl flex-col">
          <Outlet />
          <AuthFooter />
        </Card>
      </div>
    </div>
  );
}

export default RealtimeChatLayout;
