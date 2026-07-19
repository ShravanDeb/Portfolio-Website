"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "light", setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setThemeState(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
      document.documentElement.classList.toggle("light", stored === "light");
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
