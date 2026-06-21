import { suggestedQuestions } from "@/data/mockChat";

export default function EmptyState({ onSuggestionClick }) {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-176px)] w-full max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold leading-8 text-[var(--color-text)] sm:text-3xl">
          Hi, I&apos;m Kunal AI
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--color-muted)]">
          Ask me anything about my skills, projects, experience, education, research and achievements.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onSuggestionClick(question)}
              className="min-h-12 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left text-sm leading-5 text-[var(--color-text)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-message)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

