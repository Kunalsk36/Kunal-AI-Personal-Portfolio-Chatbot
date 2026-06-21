export default function EmptyState({ onSuggestionClick }) {
  const quickActions = [
    {
      title: "Projects",
      icon: "🚀",
      description: "Explore projects and work",
      query: "Tell me about your projects",
    },
    {
      title: "Experience",
      icon: "💼",
      description: "View internships and industry work",
      query: "What is your work experience?",
    },
    {
      title: "Education",
      icon: "🎓",
      description: "Academic journey and achievements",
      query: "Tell me about your education",
    },
    {
      title: "Research",
      icon: "📚",
      description: "Publications and intellectual property",
      query: "Do you have any research or patents?",
    },
    {
      title: "Achievements",
      icon: "🏆",
      description: "Awards and recognitions",
      query: "What are your achievements?",
    },
    {
      title: "Skills",
      icon: "⚙️",
      description: "Technical toolkit and technologies",
      query: "What technical skills do you have?",
    },
  ];

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-176px)] w-full max-w-4xl flex-col items-center justify-center px-4 py-8 text-center sm:py-12 animate-fade-in">
      
      {/* Hero Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
          Kunal Shrikant Kavathekar
        </h2>
        <h3 className="mt-4 text-lg font-medium text-[var(--color-muted)] sm:text-xl">
          Software Developer <span className="mx-2 opacity-50">|</span> Full Stack Developer
        </h3>
        
        {/* Personal Branding */}
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--color-muted)]">
          Building digital products with logic, design and impact.
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-sm font-semibold tracking-wide text-[var(--color-text)] uppercase sm:text-base">
          Ask my AI assistant anything about:
        </p>
      </div>

      {/* Stats Section */}
      <div className="mt-8 w-full max-w-4xl">
        <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-[var(--color-surface)] p-6 shadow-sm border border-[var(--color-border)] md:grid-cols-5 sm:gap-8">
          <div className="flex flex-col items-center justify-center">
            <dt className="text-sm font-medium text-[var(--color-muted)]">Experience</dt>
            <dd className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-accent)] sm:text-3xl">7+ mo</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="text-sm font-medium text-[var(--color-muted)]">Projects Built</dt>
            <dd className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-accent)] sm:text-3xl">10+</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="text-sm font-medium text-[var(--color-muted)]">Internships</dt>
            <dd className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-accent)] sm:text-3xl">2</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="text-sm font-medium text-[var(--color-muted)]">Research</dt>
            <dd className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-accent)] sm:text-3xl">3</dd>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <dt className="text-sm font-medium text-[var(--color-muted)]">BSc CGPA</dt>
            <dd className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-accent)] sm:text-3xl">9.5</dd>
          </div>
        </dl>
      </div>

      {/* Quick Actions Grid */}
      <div className="mt-10 w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => onSuggestionClick(action.query)}
              className="group relative flex flex-col items-start gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-left transition-all duration-200 hover:border-[var(--color-accent)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-message)] text-xl group-hover:bg-[var(--color-accent)]/10 transition-colors">
                  {action.icon}
                </span>
                <span className="font-semibold text-[var(--color-text)]">
                  {action.title}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      
    </section>
  );
}
