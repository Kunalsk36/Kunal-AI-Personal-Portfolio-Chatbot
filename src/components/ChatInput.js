"use client";

import { useEffect, useRef } from "react";

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
      className="fixed bottom-0 left-0 right-0 z-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 px-4 py-4 backdrop-blur sm:px-6"
    >
      <div className={`mx-auto flex w-full max-w-3xl items-end gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-2 transition-colors duration-200 focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent)]/25 ${isLoading ? 'opacity-70' : ''}`}>
        <textarea
          ref={textareaRef}
          value={value}
          rows={1}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Kunal AI anything..."
          disabled={isLoading}
          className="max-h-36 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-6 text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)] sm:text-base disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={!canSend}
          className="h-10 shrink-0 rounded-lg bg-[var(--color-accent)] px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center min-w-[70px]"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Send"
          )}
        </button>
      </div>
    </form>
  );
}

