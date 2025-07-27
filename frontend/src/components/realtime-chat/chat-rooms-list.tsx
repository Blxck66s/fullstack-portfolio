import { useChatStore } from "@/store/chat.store";
import { Hash } from "lucide-react";
import { Link } from "react-router";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import ChatActionDropdown from "./chat-action-dropdown";

export function HydrateFallback() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-8" />
    </div>
  );
}

function ChatRoomsList() {
  const {
    rooms,
    selectedRoom,
    isFetchingRooms,
    setRoomsPagination,
    roomsPagination,
  } = useChatStore();

  if (isFetchingRooms) return <HydrateFallback />;
  return (
    <div className="flex h-full items-center gap-2">
      <ScrollArea
        className="w-48 rounded-md border whitespace-nowrap"
        onScroll={(e) => {
          const scrollLeft = e.currentTarget.scrollLeft;
          const scrollWidth = e.currentTarget.scrollWidth;
          const clientWidth = e.currentTarget.clientWidth;

          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            if (
              roomsPagination.page * roomsPagination.take <
              roomsPagination.totalCount
            ) {
              setRoomsPagination({ page: roomsPagination.page + 1 });
            }
          }
        }}
      >
        <div className="flex gap-2">
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
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <ChatActionDropdown />
    </div>
  );
}

export default ChatRoomsList;
