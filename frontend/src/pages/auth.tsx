import SignBox from "@/components/realtime-chat/sign-box";
import UserProfile from "@/components/realtime-chat/user-profile";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/auth.store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

function Auth() {
  dayjs.extend(relativeTime);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { setAuthError } = useAuthStore();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const provider = searchParams.get("provider");

  useEffect(() => {
    if (error && provider) {
      setAuthError({ error, provider });
      navigate("/realtime-chat/auth");
    }
  }, [error, provider, navigate, setAuthError, isAuthenticated]);

  return (
    <>
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-between gap-4">
          <CardTitle className="text-2xl">
            Authentication Card Showcase
          </CardTitle>
          <CardDescription className="flex w-full justify-around">
            <ul className="w-full list-disc pl-5">
              <li>Access, Refresh tokens with Jwt strategy</li>
              <li>Bcrypt hashing for password storage</li>
              <li>Google OAuth2</li>
            </ul>
            <ul className="w-full list-disc pl-5">
              <li>Uses httpOnly cookies for token storage</li>
              <li>Strong password policy</li>
              <li>Rate limiting</li>
            </ul>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="py-6">
        {!isAuthenticated ? <SignBox /> : <UserProfile />}
      </CardContent>
    </>
  );
}

export default Auth;
