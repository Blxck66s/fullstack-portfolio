import ChatInput from "@/components/realtime-chat/action/chat-input";
import ChatRoomMessage from "@/components/realtime-chat/chat-room-message";
import ChatRoomsList from "@/components/realtime-chat/chat-rooms-list";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useChatStore } from "@/store/chat.store";
import { useEffect } from "react";

function RealtimeChat({ params }: { params: { roomId?: string } }) {
  const { setSelectedRoom, rooms } = useChatStore();

  useEffect(() => {
    if (params.roomId && rooms.length) {
      setSelectedRoom(params.roomId);
    }
  }, [params.roomId, rooms.length, setSelectedRoom]);

  return (
    <>
      <CardHeader>
        <div className="flex items-start gap-4">
          <h2 className="min-w-26 text-sm font-semibold md:min-w-34 md:text-lg">
            My Chat Rooms
          </h2>
        </div>
      </CardHeader>
      <Separator className="" />
      <CardContent className="flex h-max flex-col p-0">
        <div className="flex flex-1">
          <div className="h-full w-1/4 border-r p-2">
            <ChatRoomsList />
          </div>
          <div className="flex min-h-full w-3/4 flex-col justify-between">
            <ChatRoomMessage />
            <ChatInput />
          </div>
        </div>
      </CardContent>
    </>
  );
}

export default RealtimeChat;
