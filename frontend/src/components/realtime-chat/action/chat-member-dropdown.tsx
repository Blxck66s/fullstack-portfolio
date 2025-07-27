import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatStore } from "@/store/chat.store";
import { Plus, Users } from "lucide-react";
import { Button } from "../../ui/button";
import UserAvatar from "../user-avatar";

function ChatMemberDropdown({ className }: { className?: string }) {
  const { selectedRoom } = useChatStore();

  return (
    selectedRoom && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <Users className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 min-w-fit">
          <DropdownMenuLabel>
            Room Members ({selectedRoom.members.length})
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {selectedRoom.members.map((member) => (
            <DropdownMenuItem
              key={member.id}
              className="flex w-full items-center gap-4"
            >
              <UserAvatar user={member.user} size="xs" />
              <span className="flex-1">{member.user.name}</span>
              <span className="text-xs text-gray-500">
                {member.user.isOnline ? "Online" : "Offline"}
              </span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            Invite Members
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

export default ChatMemberDropdown;
