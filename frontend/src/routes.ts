import { type RouteConfig, prefix, route } from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("/", "./pages/home.tsx"),
  ...prefix("/realtime-chat", [
    route("/", "./pages/realtime-chat.tsx"),
    route("/auth", "./pages/auth.tsx"),
  ]),
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
