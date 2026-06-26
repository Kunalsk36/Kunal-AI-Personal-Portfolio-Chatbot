import { 
  FolderKanban, 
  BriefcaseBusiness, 
  GraduationCap, 
  BookOpenText, 
  Award, 
  Code2, 
  ArrowUpRight 
} from "lucide-react";

function StatItem({ label, value, isLast }) {
  return (
    <div className={`${isLast ? "col-span-2 md:col-span-1" : ""} flex flex-col items-center justify-center`}>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">{label}</dt>
      <dd className="mt-1.5 text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl relative pb-1.5">
        {value}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[var(--color-accent)] opacity-70" />
      </dd>
    </div>
  );
}

export default function EmptyState({ onSuggestionClick }) {
  const quickActions = [
    {
      title: "Projects",
      icon: FolderKanban,
      description: "Explore projects & work",
      query: "Tell me about your projects",
    },
    {
      title: "Experience",
      icon: BriefcaseBusiness,
      description: "View internships & industry work",
      query: "What is your work experience?",
    },
    {
      title: "Education",
      icon: GraduationCap,
      description: "Academic journey & achievements",
      query: "Tell me about your education",
    },
    {
      title: "Research",
      icon: BookOpenText,
      description: "Publications & intellectual property",
      query: "Do you have any research or patents?",
    },
    {
      title: "Achievements",
      icon: Award,
      description: "Awards & recognitions",
      query: "What are your achievements?",
    },
    {
      title: "Skills",
      icon: Code2,
      description: "Technical toolkit & technologies",
      query: "What technical skills do you have?",
    },
  ];

  const stats = [
    { label: "Experience", value: "7 mos" },
    { label: "Projects Built", value: "10+" },
    { label: "Internships", value: "2" },
    { label: "Research", value: "3" },
    { label: "BSc CGPA", value: "9.5", isLast: true },
  ];

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-176px)] w-full max-w-4xl flex-col items-center justify-center px-4 pt-4 text-center animate-fade-in gap-6">
      
      {/* Hero Section */}
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Kunal Shrikant Kavathekar
        </h2>
        <h3 className="mt-2 text-base font-medium text-[var(--color-muted)] sm:text-lg">
          Software Developer <span className="mx-2 opacity-50">|</span> Full Stack Developer
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--color-muted)]">
          Building digital products with logic, design and impact.
        </p>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-4xl">
        <dl className="grid grid-cols-2 gap-6 rounded-2xl bg-[var(--color-surface)] p-6 border border-[var(--color-border)] md:grid-cols-5 shadow-sm">
          {stats.map((stat) => (
            <StatItem 
              key={stat.label}
              label={stat.label}
              value={stat.value}
              isLast={stat.isLast}
            />
          ))}
        </dl>
      </div>

      {/* Quick Actions Grid */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.title}
                type="button"
                onClick={() => onSuggestionClick(action.query)}
                className="group relative flex flex-col justify-start rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left h-28 w-full transition-all duration-250 hover:border-[var(--color-accent)] hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <IconComponent className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-semibold text-[var(--color-text)] text-base">
                      {action.title}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--color-accent)] opacity-0 -translate-x-1 translate-y-1 transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
                
                <p className="mt-3 text-sm text-[var(--color-muted)] line-clamp-2 leading-relaxed">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
