import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chat.store";
import dayjs from "dayjs";
import { Circle, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

export function HydrateFallback() {
  return (
    <ScrollArea className="h-full w-full flex-1 px-6 py-4">
      <div className="flex h-20 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    </ScrollArea>
  );
}

function ChatRoomMessage() {
  const { selectedRoom, isFetchingMessages } = useChatStore();
  useEffect(() => {
    const rooms = useChatStore.getState().rooms;
    if (!rooms.length) useChatStore.getState().getRooms();
  }, []);

  if (isFetchingMessages) return <HydrateFallback />;

  return (
    <ScrollArea className="flex-1 px-6 py-4">
      <div className="flex flex-col gap-4">
        {!selectedRoom && (
          <div className="text-center text-gray-500">
            <p>Select a chat room to see messages</p>
            <p className="text-sm">
              <Link
                to="?joinOrCreate=true"
                className="text-blue-500 hover:underline"
              >
                Join
              </Link>{" "}
              or{" "}
              <Link
                to="?joinOrCreate=true"
                className="text-blue-500 hover:underline"
              >
                Create
              </Link>{" "}
              a room to start chatting!
            </p>
          </div>
        )}
        {selectedRoom && selectedRoom.messages.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        {selectedRoom &&
          selectedRoom.messages.map((message) => (
            <div
              key={message.id}
              className={`flex p-1 ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-xs items-start gap-2 ${
                  message.isOwn ? "flex-row-reverse" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        message.chatMember.user.avatarUrl ||
                        "/placeholder.svg?height=32&width=32"
                      }
                    />
                    <AvatarFallback className="text-xs">
                      {message.chatMember.user.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Circle
                    className={`absolute -right-1 -bottom-1 h-3 w-3 ${
                      message.chatMember.user.isOnline
                        ? "fill-green-500 text-green-500"
                        : "fill-gray-400 text-gray-400"
                    }`}
                  />
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.isOwn
                      ? "bg-blue-500 text-white"
                      : "border shadow-sm"
                  }`}
                >
                  {!message.isOwn && (
                    <p className="mb-1 text-xs font-medium text-gray-600">
                      {message.chatMember.user.name}
                    </p>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <p
                    className={`mt-1 text-xs ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {dayjs(message.createdAt).format("HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </ScrollArea>
  );
}

export default ChatRoomMessage;
