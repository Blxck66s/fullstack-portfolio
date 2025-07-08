import { GitHubConfig } from "@/types/auth";

export const GITHUB_CONFIG: GitHubConfig = {
  owner: "your-github-username",
  repo: "auth-examples",
  branch: "main",
  paths: {
    server: "server.js",
    routes: "routes/auth.js",
    middleware: "middleware/auth.js",
  },
};

export const TOKEN_DURATION = 3600; // 1 hour in seconds
export const TOKEN_WARNING_THRESHOLD = 300; // 5 minutes in seconds

export const DEMO_USERS = {
  google: {
    name: "John Doe",
    email: "john.doe@gmail.com",
    provider: "Google",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  demo: {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    provider: "Demo",
    avatar: "/placeholder.svg?height=80&width=80",
  },
};
