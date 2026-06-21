"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { currentTheme, toggleTheme, mounted } = useTheme();
  
  // Render a placeholder or just use 'dark' as default during SSR
  const theme = mounted ? currentTheme : "dark";
  const nextThemeLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <header className="fixed left-0 right-0 top-0 z-20 h-16 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-4 min-w-0">
          <div className="min-w-0 flex flex-col">
            <h1 className="truncate text-base font-bold tracking-tight text-[var(--color-text)] sm:text-xl">
              Kunal Kavathekar
            </h1>
            <p className="truncate text-xs font-medium text-[var(--color-muted)] sm:text-sm">
              Software Developer • MCA Student
            </p>
          </div>
          <div className="hidden md:flex items-center rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent)]">
            AI-Powered Interactive Portfolio
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={nextThemeLabel}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-message)] px-3 text-sm font-medium text-[var(--color-text)] transition-colors duration-200 hover:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
          <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
        </button>
      </div>
    </header>
  );
}
