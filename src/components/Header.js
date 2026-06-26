"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const { currentTheme, toggleTheme, mounted } = useTheme();
  
  // Render a placeholder or just use 'dark' as default during SSR
  const theme = mounted ? currentTheme : "dark";
  const nextThemeLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <>
      <style>{`
        @keyframes theme-icon-spin-fade {
          from {
            opacity: 0;
            transform: rotate(-30deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }
        .animate-theme-icon {
          animation: theme-icon-spin-fade 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-status-dot {
          animation: status-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
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
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 h-8 rounded-full border border-[var(--color-accent)]/35 bg-transparent px-2.5 text-[13px] font-medium text-[var(--color-muted2)] shrink-0">
              <span className="animate-status-dot h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shrink-0" aria-hidden="true"></span>
              <span>AI Portfolio Assistant</span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={nextThemeLabel}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-message)] px-3 text-sm font-medium text-[var(--color-text)] transition-colors duration-[250ms] hover:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
            >
              {theme === "dark" ? (
                <Sun key="sun-icon" className="h-4 w-4 animate-theme-icon text-[var(--color-accent)]" aria-hidden="true" />
              ) : (
                <Moon key="moon-icon" className="h-4 w-4 animate-theme-icon text-[var(--color-accent)]" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
