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

interface JoinRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function JoinRoomModal({
  open,
  onOpenChange,
}: JoinRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const { joinRoom } = useChatStore();

  const handleJoin = async () => {
    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // await joinRoom(roomName.trim());
      setRoomName("");
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to join room", err);
      setError("Failed to join room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
          disabled={isLoading}
        />
        {error && <div className="text-xs text-red-500">{error}</div>}
        <Button onClick={handleJoin} disabled={isLoading || !roomName.trim()}>
          {isLoading ? "Joining..." : "Join"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
