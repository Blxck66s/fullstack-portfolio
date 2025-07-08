import { useAuthStore } from "@/store/auth.store";
import { RefreshCw, User } from "lucide-react";
import { Button } from "../ui/button";

function DemoBtn({ isLoading }: { isLoading: boolean }) {
  const { login } = useAuthStore();

  return (
    <Button
      variant="outline"
      className="flex w-fit min-w-3xs cursor-pointer items-center justify-center gap-2"
      onClick={() => login({ provider: "demo" })}
      disabled={isLoading}
    >
      {isLoading ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <User className="h-5 w-5" />
      )}
      Generate Demo User
    </Button>
  );
}

export default DemoBtn;
