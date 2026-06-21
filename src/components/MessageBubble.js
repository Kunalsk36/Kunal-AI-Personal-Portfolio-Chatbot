export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <article
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[800px] sm:text-base ${
          isUser
            ? "bg-[var(--color-accent)] text-white"
            : "border border-[var(--color-border)] bg-[var(--color-message)] text-[var(--color-text)]"
        }`}
      >
        {message.content}
      </article>
    </div>
  );
}

