import { useAuthStore } from "@/store/auth.store";
import { useChatStore } from "@/store/chat.store";
import { ChatUser } from "@/types/chat";
import clsx from "clsx";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import UserAvatar from "./user-avatar";

export function HydrateFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );
}

function ChatRoomMessage() {
  const { selectedRoom, isFetchingRooms, setMessagesPagination, getMessages } =
    useChatStore();

  const [isHasMore, setIsHasMore] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedRoom) return;
    setIsHasMore(
      selectedRoom.messages.length < selectedRoom.messagesPagination.totalCount,
    );
  }, [selectedRoom, selectedRoom?.messagesPagination]);

  useEffect(() => {
    if (selectedRoom?.id && selectedRoom?.messages.length === 0) getMessages();
  }, [selectedRoom?.id, getMessages, selectedRoom?.messages.length]);

  const fetchMoreMessages = async () => {
    if (!selectedRoom) return;
    await setMessagesPagination({
      page: selectedRoom?.messagesPagination.page + 1,
    });
  };

  if (isFetchingRooms && !selectedRoom) return <HydrateFallback />;

  if (!selectedRoom) {
    return (
      <div className="h-full w-full gap-4">
        <div className="flex h-full flex-col justify-center text-center text-gray-500">
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
      </div>
    );
  }
  const { messages = [], members = [] } = selectedRoom;

  return (
    <div className="h-full w-full">
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMoreMessages}
        hasMore={isHasMore}
        loader={
          <div className="flex h-full w-full items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        }
        scrollableTarget="scrollableDiv"
        height={400}
        className="flex flex-col-reverse gap-2 scroll-smooth p-4"
        inverse
        endMessage={
          <p className="text-center text-gray-500">
            {messages.length !== 0
              ? "No more messages"
              : "No messages yet. Start the conversation!"}
          </p>
        }
      >
        {messages.map((message, MessageIndex) => {
          const currentMember = members.find(
            (member) => member.id === message.chatMemberId,
          ) || {
            user: {
              id: "deleted-user",
              name: "Deleted User",
              avatarUrl: "/placeholder.svg?height=32&width=32",
              isOnline: false,
            },
          };

          const prevMessage = messages[MessageIndex - 1];

          message.isOwn =
            currentMember.user.id === useAuthStore.getState().user?.id;

          return (
            <div
              key={message.id}
              className={`flex p-1 ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-xs items-start gap-2 ${
                  message.isOwn ? "flex-row-reverse" : ""
                }`}
              >
                <div className="min-h-10 min-w-10">
                  <UserAvatar
                    user={currentMember.user as ChatUser}
                    size="md"
                    className={clsx("", {
                      hidden:
                        prevMessage?.chatMemberId === message.chatMemberId,
                    })}
                  />
                </div>
                <div
                  className={clsx("flex flex-col", {
                    "items-end": message.isOwn,
                    "items-start": !message.isOwn,
                  })}
                >
                  <div
                    className={`rounded-lg px-3 py-1.5 ${
                      message.isOwn
                        ? "bg-blue-500 text-white"
                        : "border shadow-sm"
                    }`}
                  >
                    {!message.isOwn && (
                      <p className="mb-1 text-xs font-medium text-gray-600">
                        {currentMember.user.name}
                      </p>
                    )}
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {dayjs(message.createdAt).isSame(dayjs(), "day")
                      ? dayjs(message.createdAt).format("HH:mm")
                      : dayjs(message.createdAt).format("MMM D, HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default ChatRoomMessage;
