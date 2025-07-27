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

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InviteMemberModal({
  open,
  onOpenChange,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const { inviteMember } = useChatStore();

  const handleInvite = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // await inviteMember(email.trim());
      setEmail("");
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to invite member", err);
      setError("Failed to invite member");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={isLoading}
        />
        {error && <div className="text-xs text-red-500">{error}</div>}
        <Button onClick={handleInvite} disabled={isLoading || !email.trim()}>
          {isLoading ? "Inviting..." : "Invite"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
