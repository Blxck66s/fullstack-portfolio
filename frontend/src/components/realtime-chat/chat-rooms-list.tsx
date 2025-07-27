import { useChatStore } from "@/store/chat.store";
import clsx from "clsx";
import { Hash } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import ChatActionDropdown from "./action/chat-action-dropdown";
import ChatMemberDropdown from "./action/chat-member-dropdown";

export function HydrateFallback() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-8" />
    </div>
  );
}

function ChatRoomsList() {
  const { rooms, selectedRoom, setRoomsPagination, roomsPagination } =
    useChatStore();

  useEffect(() => {
    const rooms = useChatStore.getState().rooms;
    if (!rooms.length) useChatStore.getState().getRooms();
  }, []);

  const [isHasMore, setIsHasMore] = useState(
    rooms.length < roomsPagination.totalCount,
  );

  useEffect(() => {
    setIsHasMore(rooms.length < roomsPagination.totalCount);
  }, [roomsPagination, rooms.length]);

  const fetchMoreRooms = async () => {
    await setRoomsPagination({
      page: roomsPagination.page + 1,
    });
  };

  return (
    <div className="flex h-full flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between gap-2">
        <div
          className={clsx(
            "",
            selectedRoom ? "w-[calc(75%-theme(space.1))]" : "w-full",
          )}
        >
          <ChatActionDropdown />
        </div>
        {selectedRoom && (
          <ChatMemberDropdown className="w-[calc(25%-theme(space.1))]" />
        )}
      </div>

      <div
        id="scrollableDiv"
        className="h-max w-full scroll-smooth"
        style={{
          overflow: "auto",
          flexDirection: "column-reverse",
        }}
      >
        <InfiniteScroll
          dataLength={rooms.length}
          next={fetchMoreRooms}
          hasMore={isHasMore}
          loader={<Skeleton className="h-8 w-full" />}
          scrollableTarget="scrollableDiv"
          height={400}
          className="flex flex-col gap-2 scroll-smooth p-2"
        >
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/realtime-chat/${room.id}`}
              className={`hover:bg-accent flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                selectedRoom?.id === room.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Hash className="size-4" />
              {room.name}
            </Link>
          ))}
          {rooms.length < 10 && isHasMore && (
            <div style={{ minHeight: (10 - rooms.length) * 48 }} />
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ChatRoomsList;
