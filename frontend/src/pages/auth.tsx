import AuthCard from "@/components/realtime-chat/auth-card";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function Auth() {
  const [searchParams] = useSearchParams();
  const [authError, setAuthError] = useState<{
    error: string | null;
    provider: string | null;
  } | null>(null);
  const error = searchParams.get("error");
  const provider = searchParams.get("provider");
  const navigate = useNavigate();

  useEffect(() => {
    if (error || provider) {
      setAuthError({ error, provider });
      navigate("", { replace: true });
    }
  }, [error, provider, navigate]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="mb-8 w-full max-w-4xl text-center">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          Backend Authentication Portfolio
        </h1>
        <p className="text-muted-foreground">
          Showcase of OAuth integration with Google and Facebook
        </p>
      </div>
      <AuthCard error={authError?.error} provider={authError?.provider} />
    </main>
  );
}

export default Auth;
