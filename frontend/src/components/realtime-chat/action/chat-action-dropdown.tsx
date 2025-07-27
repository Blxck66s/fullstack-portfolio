import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hash, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "../../ui/button";
import CreateRoomModal from "./create-room-modal";

function ChatActionDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  useEffect(() => {
    if (searchParams.get("joinOrCreate") === "true") setIsOpen(true);
  }, [searchParams]);
  return (
    <>
      <DropdownMenu
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          if (isOpen) setSearchParams({});
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Room Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setShowCreateRoom(true);
              setIsOpen(false);
            }}
          >
            <Hash className="mr-2 h-4 w-4" />
            Create Room
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            Join Room
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showCreateRoom && (
        <CreateRoomModal
          open={showCreateRoom}
          onOpenChange={setShowCreateRoom}
        />
      )}
    </>
  );
}

export default ChatActionDropdown;
