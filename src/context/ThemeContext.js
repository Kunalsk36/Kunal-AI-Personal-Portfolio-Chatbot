"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("dark"); // Default for SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const savedTheme = localStorage.getItem("kunal-ai-theme");
    let initialTheme = "dark";

    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    } else {
      initialTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    setCurrentTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  function toggleTheme() {
    setCurrentTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("kunal-ai-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  }

  // To prevent hydration mismatch, you could avoid rendering anything that depends on theme 
  // before mount, but since we use context, we can just provide it.

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
