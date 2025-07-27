export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: string;
  providers: { providerId: string; provider: string }[];
  exp: number;
  isOnline: boolean;
}

export interface AuthLogin {
  provider: string;
  email?: string;
  password?: string;
}

export interface JWTToken {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    sub: string;
    name?: string;
    email?: string;
    provider?: string;
    iat: number;
    exp: number;
  };
  signature: string;
}

export const ACCESS_TOKEN_EXPIRE_TIME = 15 * 60; // 15 minutes in seconds
export const ACCESS_TOKEN_REFRESH_TIME = 3 * 60; // 3 minutes in seconds
export const REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60; // 7 days in seconds
