import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { AccessTokenAutoRefresh } from "./components/realtime-chat/actoken-autorefresh";
import { ThemeProvider } from "./components/theme-provider";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <AccessTokenAutoRefresh />
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
