"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function ChatInput({ value, onChange, onSend, isLoading }) {
  const textareaRef = useRef(null);
  const canSend = value.trim().length > 0 && !isLoading;

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
  }, [value]);

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) {
        onSend();
      }
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) {
          onSend();
        }
      }}
      className="fixed bottom-0 left-0 right-0 z-20 flex h-16 items-center border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 px-4 backdrop-blur sm:px-6"
    >
      <div className={`mx-auto flex w-full max-w-4xl items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-1 pl-3.5 pr-3 shadow-sm transition-all duration-200`}>
        <textarea
          ref={textareaRef}
          value={value}
          rows={1}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Kunal AI anything..."
          disabled={isLoading}
          className="max-h-32 flex-1 resize-none bg-transparent py-1.5 pr-2 text-sm leading-6 text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)] sm:text-base disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={!canSend}
          className="h-8 w-8 shrink-0 rounded-full bg-[var(--color-accent)] text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] disabled:bg-[var(--color-message)] disabled:text-[var(--color-muted)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  );
}

