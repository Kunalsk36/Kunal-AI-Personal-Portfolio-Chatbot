"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!message.content) return;
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className={`group flex w-full ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <article
        className={`relative max-w-[90%] sm:max-w-4xl shadow-sm ${
          isUser
            ? "rounded-2xl rounded-br-sm px-5 py-3 bg-[var(--color-accent)] text-white text-base leading-6"
            : "rounded-2xl rounded-bl-sm px-5 py-4 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        ) : message.content === "" ? (
          <div className="flex items-center gap-2.5 h-5 select-none animate-fade-in">
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] animate-[bounce_1s_infinite_0ms]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] animate-[bounce_1s_infinite_200ms]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] animate-[bounce_1s_infinite_400ms]"></div>
            </div>
            <span className="text-xs sm:text-sm font-medium text-[var(--color-muted)]">Generating response</span>
          </div>
        ) : (
          <>
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
            
            <button
              onClick={handleCopy}
              className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-message)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-all duration-[250ms] hover:shadow-sm opacity-0 pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0"
              aria-label="Copy response"
              title={copied ? "Copied" : "Copy response"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </>
        )}
      </article>
    </div>
  );
}
