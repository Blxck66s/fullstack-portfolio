import { useAuthStore } from "@/store/auth.store";
import { ACCESS_TOKEN_EXPIRE_TIME } from "@/types/auth";
import { Progress } from "@radix-ui/react-progress";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Clock, RefreshCw, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function UserProfile({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  dayjs.extend(relativeTime);
  const { user, accessTokenTimeLeft, logout, refreshToken } = useAuthStore();

  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-primary/10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="text-primary h-10 w-10" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-medium">{user?.name}</h3>
            <p className="text-muted-foreground">{user?.email}</p>
            <Badge className="mt-2" variant="secondary">
              {user?.provider}
            </Badge>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-start gap-2 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
              </span>
              <span
                className={
                  accessTokenTimeLeft < 300 ? "font-medium text-yellow-500" : ""
                }
              >
                {"Token expires " +
                  dayjs().add(accessTokenTimeLeft, "second").fromNow() +
                  ` (${Math.floor(accessTokenTimeLeft / 60)}m
                ${accessTokenTimeLeft % 60}s)`}
              </span>
            </div>
            <Progress
              value={(accessTokenTimeLeft / ACCESS_TOKEN_EXPIRE_TIME) * 100}
              className={
                accessTokenTimeLeft < 0
                  ? "bg-red-500"
                  : accessTokenTimeLeft < 300
                    ? "bg-yellow-500"
                    : ""
              }
            />
          </div>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={async () => {
                setIsLoading(true);
                await refreshToken();
                setIsLoading(false);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh Token
            </Button>
            <Button
              variant="destructive"
              className="flex-1 cursor-pointer"
              onClick={logout}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign Out"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
