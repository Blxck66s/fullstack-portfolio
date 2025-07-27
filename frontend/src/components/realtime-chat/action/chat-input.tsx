import { useChatStore } from "@/store/chat.store";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

function ChatInput() {
  const { selectedRoom, sendMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(newMessage);
      } catch (error) {
        console.log("Failed to send message:", error);
      }

      setNewMessage("");
    }
  };

  return (
    selectedRoom && (
      <div className="border-t p-2">
        <div className="flex gap-2">
          <Input
            placeholder={`Message #${selectedRoom?.name}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newMessage.trim()) handleSendMessage();
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="h-9 w-9"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  );
}

export default ChatInput;
