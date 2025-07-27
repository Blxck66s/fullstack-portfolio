import { useAuthStore } from "@/store/auth.store";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UserAvatar from "./user-avatar";
import UserProfile from "./user-profile";

function AuthModal() {
  const { user } = useAuthStore();
  return (
    user && (
      <Dialog>
        <DialogTrigger>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <UserAvatar user={user} size="md" />
            <DialogTitle className="" />
            <DialogDescription className="sr-only" />
          </motion.div>
        </DialogTrigger>
        <DialogContent className="bg-muted max-w-2xl">
          <UserProfile />
        </DialogContent>
      </Dialog>
    )
  );
}

export default AuthModal;
