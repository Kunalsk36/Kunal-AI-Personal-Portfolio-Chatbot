export default function TypingIndicator() {
  return (
    <div className="flex w-full justify-start animate-fade-in">
      <article className="max-w-[90%] rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] flex items-center gap-2">
        <div className="flex items-center space-x-1.5 h-6">
          <div className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-[bounce_1s_infinite_0ms]"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-[bounce_1s_infinite_200ms]"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-[bounce_1s_infinite_400ms]"></div>
        </div>
      </article>
    </div>
  );
}
