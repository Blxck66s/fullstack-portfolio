import {
  type RouteConfig,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("/", "./pages/home.tsx"),

  layout("./layout/realtime-chat.tsx", [
    ...prefix("/realtime-chat", [
      route("/", "./pages/realtime-chat.tsx", {
        id: "realtime-chat-root",
      }),
      route("/:roomId", "./pages/realtime-chat.tsx", {
        id: "realtime-chat-room",
      }),
      route("/auth", "./pages/auth.tsx"),
    ]),
  ]),

  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
