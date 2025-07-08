"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/auth.store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import SignBox from "./sign-box";
import UserProfile from "./user-profile";

export default function AuthCard(props: {
  error?: string | null;
  provider?: string | null;
}) {
  dayjs.extend(relativeTime);
  const { error, provider } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    error || null,
  );
  useEffect(() => {
    if (error && provider) {
      if (provider === "google") {
        switch (error) {
          case "access_denied":
            setErrorMessage(
              "Google authentication was denied. Please try again.",
            );
            break;
          default:
            setErrorMessage(
              "An unknown error occurred during Google authentication.",
            );
        }
        return;
      } else if (provider === "local") {
        switch (error) {
          case "invalid_credentials":
            setErrorMessage("Invalid username or password. Please try again.");
            break;
          default:
            setErrorMessage("An unknown error occurred during authentication.");
        }
        return;
      }
      setErrorMessage("An unknown error occurred during authentication.");
    }
  }, [error, provider]);

  const {
    isAuthenticated,
    accessTokenTimeLeft,
    decrementAccessTokenTimeLeft,
    checkAuthStatus,
  } = useAuthStore();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await checkAuthStatus();
      setIsLoading(false);
    })();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (accessTokenTimeLeft <= 0) return;
    const interval = setInterval(() => {
      decrementAccessTokenTimeLeft();
    }, 1000);
    return () => clearInterval(interval);
  }, [accessTokenTimeLeft, decrementAccessTokenTimeLeft]);

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              Authentication Card Showcase
            </CardTitle>
            <CardDescription>
              Secure authentication system with JWT, refresh tokens, and Google
              OAuth. Uses httpOnly cookies for token storage, strong password
              policy, and rate limiting. Designed with security best practices
              in mind.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isAuthenticated ? (
          <SignBox isLoading={isLoading} setIsLoading={setIsLoading} />
        ) : (
          <UserProfile isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-muted-foreground flex w-full justify-between text-sm">
          <div className="flex flex-col gap-2 font-medium">
            <div className="flex items-center gap-2">
              Status:
              {isLoading ? (
                <Badge variant="outline" className="text-muted-foreground">
                  Loading...
                </Badge>
              ) : isAuthenticated ? (
                <Badge
                  variant="outline"
                  className={`flex h-6 items-center gap-1 ${
                    accessTokenTimeLeft < 0
                      ? "border-red-500 text-red-500"
                      : accessTokenTimeLeft < 300
                        ? "border-yellow-500 text-yellow-500"
                        : ""
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      accessTokenTimeLeft < 0
                        ? "bg-red-500"
                        : accessTokenTimeLeft < 300
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  ></span>
                  {accessTokenTimeLeft < 0
                    ? "Access Token expired"
                    : accessTokenTimeLeft < 300
                      ? "Access Token expiring soon (Auto refresh in 3 minutes)"
                      : "Connected"}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Not authenticated
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {error && (
                <>
                  Error:
                  <Badge variant="destructive">{errorMessage}</Badge>
                </>
              )}
            </div>
          </div>
          {isAuthenticated && (
            <a className="text-primary hover:underline" href="/realtime-chat">
              Continue to Realtime Chat
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
