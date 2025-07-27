import { AuthLogin, AuthUser } from "@/types/auth";
import api from ".";

export const getProfile = async () =>
  await api
    .get<AuthUser>("/auth/profile")
    .then((res) => ({ ...res.data, isOnline: true }));

export const register = async (email: string, password: string) =>
  await api.post("/auth/local/register", { email, password });

export const login = async ({ provider, email, password }: AuthLogin) =>
  await api
    .post<AuthUser>(`/auth/${provider}/login`, { email, password })
    .then((res) => res.data);

export const logout = async () => await api.post("/auth/logout");

export const refreshToken = async () =>
  await api.post<AuthUser>("/auth/refresh");
