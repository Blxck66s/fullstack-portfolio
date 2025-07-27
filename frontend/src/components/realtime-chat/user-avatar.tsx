import { useAuthStore } from "@/store/auth.store";
import { AuthUser } from "@/types/auth";
import { ChatUser } from "@/types/chat";
import clsx from "clsx";
import { Circle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

function UserAvatar({
  user,
  size,
}: {
  user: AuthUser | ChatUser;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const { isCheckingAuth, user: authUser } = useAuthStore();

  if (isCheckingAuth && authUser?.id == user.id) {
    return (
      <Skeleton
        className={clsx("rounded-full", {
          "h-6 w-6": size === "xs",
          "h-8 w-8": size === "sm",
          "h-10 w-10": size === "md",
          "h-12 w-12": size === "lg" || !size,
        })}
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <Avatar className={`h-${size || "full"} w-${size || "full"}`}>
        <AvatarImage
          src={user.avatarUrl || "/placeholder.svg?height=32&width=32"}
        />
        <AvatarFallback
          className={clsx(
            "bg-background",
            size === "xs"
              ? "text-[0.625rem]"
              : size === "sm"
                ? "text-xs"
                : size === "md"
                  ? "text-sm"
                  : "text-base",
          )}
        >
          {user.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Circle
        className={clsx("absolute -right-1 -bottom-1", {
          "h-2 w-2": size === "xs",
          "h-3 w-3": size === "sm" || size === "md" || size === "lg" || !size,
          "fill-green-500 text-green-500": user.isOnline,
          "fill-gray-400 text-gray-400": !user.isOnline,
        })}
      />
    </div>
  );
}

export default UserAvatar;
