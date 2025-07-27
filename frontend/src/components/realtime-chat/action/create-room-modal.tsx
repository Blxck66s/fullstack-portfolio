import { useChatStore } from "@/store/chat.store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateRoomModal({
  open,
  onOpenChange,
}: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createRoom } = useChatStore();

  const handleCreate = async () => {
    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await createRoom(roomName.trim());
      setRoomName("");
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to create room", err);
      setError("Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
          disabled={isLoading}
        />
        {error && <div className="text-xs text-red-500">{error}</div>}
        <Button onClick={handleCreate} disabled={isLoading || !roomName.trim()}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
