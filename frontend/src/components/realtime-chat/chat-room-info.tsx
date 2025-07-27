import { useChatStore } from "@/store/chat.store";
import { Hash } from "lucide-react";

function ChatRoomInfo() {
  const { selectedRoom } = useChatStore();

  return (
    selectedRoom && (
      <div className="border-b px-6 py-2">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-gray-500" />
          <span className="font-medium">{selectedRoom?.name}</span>
          <span className="text-sm text-gray-500">
            {selectedRoom?.members.length} members
          </span>
        </div>
      </div>
    )
  );
}

export default ChatRoomInfo;
