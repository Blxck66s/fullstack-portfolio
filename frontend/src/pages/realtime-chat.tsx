import ChatInput from "@/components/realtime-chat/chat-input";
import ChatMemberDropdown from "@/components/realtime-chat/chat-member-dropdown";
import ChatRoomInfo from "@/components/realtime-chat/chat-room-info";
import ChatRoomMessage from "@/components/realtime-chat/chat-room-message";
import ChatRoomsList from "@/components/realtime-chat/chat-rooms-list";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useChatStore } from "@/store/chat.store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function RealtimeChat({ params }: { params: { roomId?: string } }) {
  const { setSelectedRoom, rooms, getMessages } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.roomId && rooms.length) {
      setSelectedRoom(params.roomId);
      getMessages(params.roomId, { page: 1, take: 10 });
    } else if (!params.roomId && rooms.length) {
      navigate("/realtime-chat");
    }
  }, [params.roomId, setSelectedRoom, navigate, rooms.length, getMessages]);

  return (
    <>
      <CardHeader>
        <div className="flex items-start gap-4">
          <h2 className="min-w-26 text-sm font-semibold md:min-w-34 md:text-lg">
            My Chat Rooms
          </h2>
          <ChatRoomsList />
          <div className="flex gap-2">
            <ChatMemberDropdown />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[400px] flex-col p-0">
        <ChatRoomInfo />
        <ChatRoomMessage />
        <ChatInput />
      </CardContent>
    </>
  );
}

export default RealtimeChat;
