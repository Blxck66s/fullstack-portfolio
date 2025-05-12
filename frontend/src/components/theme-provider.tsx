import { createContext, useContext, useEffect, useState } from "react";

export type ThemeValue = "dark" | "light" | "system";
type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeValue;
  storageKey?: string;
};

type ThemeProviderState = {
  themeValue: ThemeValue;
  theme: Theme;
  setTheme: (theme: ThemeValue) => void;
};

const initialState: ThemeProviderState = {
  themeValue: "dark",
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [themeValue, setThemeValue] = useState<ThemeValue>(defaultTheme);
  const [theme, setTheme] = useState<Theme>("dark");

  // Get theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as ThemeValue | null;
    if (storedTheme) setThemeValue(storedTheme);
  }, [storageKey]);

  // Resolve and apply the theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let effectiveTheme: Theme;

    if (themeValue === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = themeValue as Theme;
    }

    setTheme(effectiveTheme);
    root.classList.add(effectiveTheme);
  }, [themeValue]);

  // Listen for system theme changes when using system preference
  useEffect(() => {
    if (themeValue !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme: Theme = mediaQuery.matches ? "dark" : "light";
      setTheme(newTheme);

      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeValue]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        themeValue,
        theme,
        setTheme: (value: ThemeValue) => {
          localStorage.setItem(storageKey, value);
          setThemeValue(value);
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
