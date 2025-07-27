import { useAuthStore } from "@/store/auth.store";
import { useLocation } from "react-router";
import { Badge } from "../ui/badge";
import { CardFooter } from "../ui/card";
import AuthModal from "./auth-modal";

function AuthFooter() {
  const {
    isAuthenticated,
    accessTokenTimeLeft,
    authError,
    isCheckingAuth: isLoading,
  } = useAuthStore();
  const location = useLocation();
  const isAuthPath = location.pathname.includes("/auth");

  return (
    <CardFooter className="flex justify-between border-t pt-4">
      <div className="text-muted-foreground flex w-full items-center justify-between text-sm">
        <div className="flex flex-col gap-2 font-medium">
          <div className="flex items-center gap-2">
            Status:
            {isLoading ? (
              <Badge variant="outline" className="text-muted-foreground">
                Loading...
              </Badge>
            ) : isAuthenticated ? (
              <Badge
                variant="outline"
                className={`flex h-6 items-center gap-1 ${
                  accessTokenTimeLeft < 0
                    ? "border-red-500 text-red-500"
                    : accessTokenTimeLeft < 300
                      ? "border-yellow-500 text-yellow-500"
                      : ""
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    accessTokenTimeLeft < 0
                      ? "bg-red-500"
                      : accessTokenTimeLeft < 300
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                ></span>
                {accessTokenTimeLeft < 0
                  ? "Access Token expired"
                  : accessTokenTimeLeft < 300
                    ? "Access Token expiring soon (Auto refresh in 3 minutes)"
                    : "Connected"}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Not authenticated
              </Badge>
            )}
          </div>
          {authError.error && (
            <div className="flex items-center gap-2">
              Error:
              <Badge variant="destructive">{authError.error}</Badge>
            </div>
          )}
        </div>
        {isAuthenticated && isAuthPath ? (
          <a className="text-primary hover:underline" href="/realtime-chat">
            Continue to Realtime Chat
          </a>
        ) : null}
        {!isAuthenticated && !isAuthPath ? (
          <a
            className="text-primary hover:underline"
            href="/realtime-chat/auth"
          >
            Go to Authentication
          </a>
        ) : null}
        {isAuthenticated && !isAuthPath ? <AuthModal /> : null}
      </div>
    </CardFooter>
  );
}

export default AuthFooter;
