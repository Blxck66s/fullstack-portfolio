import { AccessTokenAutoRefresh } from "@/components/realtime-chat/actoken-autorefresh";
import AuthFooter from "@/components/realtime-chat/auth-footer";
import { Card } from "@/components/ui/card";
import { Outlet } from "react-router";

function RealtimeChatLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <AccessTokenAutoRefresh />
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
