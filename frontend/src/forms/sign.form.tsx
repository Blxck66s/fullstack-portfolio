import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validatePassword } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

function SignForm() {
  const {
    login,
    isReadyToRegister,
    localRegister,
    setIsReadyToRegister,
    isCheckingAuth,
    isAuthenticated,
  } = useAuthStore();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    provider: "local",
  });
  const [localIsLoading, setLocalIsLoading] = useState(false);
  const navigate = useNavigate();

  const isLoading = isCheckingAuth || localIsLoading;

  useEffect(() => {
    const isValid = formRef?.current?.checkValidity();
    if (isValid || (isReadyToRegister.isReady && !confirmPassword)) {
      if (isReadyToRegister.isReady) {
        const errors = validatePassword(authData.password);
        const confirm =
          confirmPassword && authData.password !== confirmPassword
            ? "Passwords do not match"
            : null;
        setPasswordErrors(errors);
        setConfirmError(confirm);
        if (confirm || !confirmPassword.length) {
          setCanSubmit(false);
          return;
        }
        if (errors.length || confirm) {
          setCanSubmit(false);
          return;
        }
        setCanSubmit(true);
        return;
      }
      setPasswordErrors([]);
      setConfirmError(null);
      setCanSubmit(true);
    } else setCanSubmit(false);
  }, [
    authData.password,
    confirmPassword,
    isReadyToRegister.isReady,
    confirmError,
  ]);

  useEffect(() => {
    if (
      isReadyToRegister.isReady &&
      (authData.password.length || confirmPassword.length)
    ) {
      setAuthData((prev) => ({
        ...prev,
        password: "",
      }));
      setConfirmPassword("");
    }
  }, [isReadyToRegister.isReady]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalIsLoading(true);
    if (isReadyToRegister.isReady) {
      setConfirmError(
        confirmPassword && authData.password !== confirmPassword
          ? "Passwords do not match"
          : null,
      );
      const errors = validatePassword(authData.password);
      setPasswordErrors(errors);
      if (errors.length || confirmError) return;
      else {
        await localRegister(authData.email, authData.password);
        setLocalIsLoading(false);
        return;
      }
    }
    await login(authData);
    setLocalIsLoading(false);
    if (isAuthenticated) navigate("/realtime-chat");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-center gap-2"
    >
      <div className="flex w-full max-w-3xs flex-col items-center gap-2">
        <Input
          type="email"
          id="email"
          autoComplete="email"
          required
          value={authData.email}
          onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
          placeholder="Email"
        />
        <Input
          className={clsx({
            hidden: isReadyToRegister.isReady,
          })}
          type="password"
          id="password"
          autoComplete="current-password"
          required={!isReadyToRegister.isReady}
          value={authData.password}
          onChange={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
          placeholder="Password"
        />
        <Input
          className={clsx({
            hidden: !isReadyToRegister.isReady,
          })}
          type="password"
          id="new-password"
          autoComplete="new-password"
          placeholder="Password"
          required={isReadyToRegister.isReady}
          value={authData.password}
          onChange={(e) => {
            setAuthData({ ...authData, password: e.target.value.trim() });
          }}
        />
        <Input
          className={clsx({
            hidden: !isReadyToRegister.isReady,
          })}
          type="password"
          id="confirm-new-password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          required={isReadyToRegister.isReady}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value.trim())}
        />
        {isReadyToRegister.isReady && (
          <ul className="w-full list-disc pl-5 text-xs text-red-500">
            {passwordErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
            {confirmError && <li>{confirmError}</li>}
          </ul>
        )}
      </div>
      <div className="flex w-full max-w-3xs items-center justify-center gap-2">
        <Button
          className={clsx("w-[calc(33%-2px)]", {
            "cursor-not-allowed": isLoading || !canSubmit,
            "opacity-50": isLoading || !canSubmit,
          })}
          variant={isReadyToRegister.isReady ? "default" : "secondary"}
          disabled={isLoading || !canSubmit}
          type="submit"
        >
          {isReadyToRegister.isReady ? "Register" : "Sign In"}
        </Button>
        <Button
          className="w-[calc(66%-2px)]"
          variant="link"
          onClick={(e) => {
            e.preventDefault();
            setIsReadyToRegister(!isReadyToRegister.isReady);
          }}
        >
          {isReadyToRegister.isReady ? "Cancel" : "Create an account"}
        </Button>
      </div>
    </form>
  );
}

export default SignForm;
