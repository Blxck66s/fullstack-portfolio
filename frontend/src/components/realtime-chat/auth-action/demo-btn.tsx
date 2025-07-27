import { useAuthStore } from "@/store/auth.store";
import { RefreshCw, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

function DemoBtn() {
  const { login, isCheckingAuth } = useAuthStore();
  const [localIsLoading, setLocalIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLocalIsLoading(true);
    try {
      await login({ provider: "demo" });
    } finally {
      setLocalIsLoading(false);
    }
  };

  const isLoading = isCheckingAuth || localIsLoading;

  return (
    <Button
      variant="outline"
      className="flex w-fit min-w-3xs cursor-pointer items-center justify-center gap-2"
      onClick={handleDemoLogin}
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
