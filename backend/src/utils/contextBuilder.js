/**
 * Context Builder
 *
 * Converts raw JSON knowledge data into structured natural-language prose
 * that the LLM can read directly, instead of dumping raw JSON.stringify output.
 */

// ── Per-category formatters ──────────────────────────────────────────

function formatProfile(data) {
  const lines = [];
  lines.push(`Name: ${data.name || data.preferredName}`);
  if (data.location) lines.push(`Location: ${data.location}`);
  if (data.currentStatus) lines.push(`Current Status: ${data.currentStatus}`);
  if (data.headline) lines.push(`Headline: ${data.headline}`);
  if (data.summary) lines.push(`Summary: ${data.summary}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.careerObjective) lines.push(`Career Objective: ${data.careerObjective}`);
  if (data.interests) lines.push(`Interests: ${data.interests.join(", ")}`);
  return lines.join("\n");
}

function formatEducation(data) {
  const entries = data.education || data;
  if (!Array.isArray(entries)) return String(data);

  return entries
    .map((edu) => {
      const lines = [];
      const name = edu.degree || edu.shortName || edu.level;
      lines.push(`${name}`);
      if (edu.institution) lines.push(`  Institution: ${edu.institution}`);
      if (edu.boardOrUniversity) lines.push(`  University: ${edu.boardOrUniversity}`);
      if (edu.startYear && edu.endYear) lines.push(`  Duration: ${edu.startYear}–${edu.endYear}`);
      if (edu.year) lines.push(`  Year: ${edu.year}`);
      if (edu.status) lines.push(`  Status: ${edu.status}`);
      if (edu.cgpa) lines.push(`  CGPA: ${edu.cgpa}`);
      if (edu.cgpi) lines.push(`  Final Semester CGPI: ${edu.cgpi}`);
      if (edu.rank) lines.push(`  Rank: ${edu.rank}`);
      if (edu.award) lines.push(`  Award: ${edu.award}`);
      if (edu.percentage) lines.push(`  Percentage: ${edu.percentage}%`);
      if (edu.marksObtained && edu.totalMarks) lines.push(`  Marks: ${edu.marksObtained}/${edu.totalMarks}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

function formatSkills(data) {
  const categoryLabels = {
    programmingLanguages: "Programming Languages",
    frontend: "Frontend",
    backend: "Backend",
    databases: "Databases",
    cloudAndDeployment: "Cloud & Deployment",
    aiAndResearch: "AI & Research",
    automation: "Automation",
    tools: "Tools",
    softSkills: "Soft Skills",
  };

  return Object.entries(data)
    .filter(([, value]) => Array.isArray(value))
    .map(([key, items]) => {
      const label = categoryLabels[key] || key;
      return `${label}: ${items.join(", ")}`;
    })
    .join("\n");
}

function formatExperience(data) {
  const entries = data.experience || data;
  const lines = [];

  if (data.totalIndustryExperienceMonths) {
    lines.push(`Total Industry Experience: ${data.totalIndustryExperienceMonths} months`);
    lines.push("");
  }

  if (!Array.isArray(entries)) return String(data);

  for (const exp of entries) {
    lines.push(`${exp.role} at ${exp.company}`);
    lines.push(`  Duration: ${exp.duration} (${exp.months} months)`);
    if (exp.technologies?.length) lines.push(`  Technologies: ${exp.technologies.join(", ")}`);
    if (exp.projects?.length) lines.push(`  Projects: ${exp.projects.join(", ")}`);
    if (exp.responsibilities?.length) {
      lines.push("  Key Responsibilities:");
      for (const r of exp.responsibilities) {
        lines.push(`    - ${r}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

function formatProjects(data) {
  const entries = data.projects || data;
  if (!Array.isArray(entries)) return String(data);

  return entries
    .map((proj) => {
      const lines = [];
      lines.push(`${proj.name}`);
      if (proj.type) lines.push(`  Type: ${proj.type}`);
      if (proj.category) lines.push(`  Category: ${proj.category}`);
      if (proj.description) lines.push(`  Description: ${proj.description}`);
      if (proj.technologies?.length) lines.push(`  Technologies: ${proj.technologies.join(", ")}`);
      if (proj.responsibilities?.length) {
        lines.push("  Responsibilities:");
        for (const r of proj.responsibilities) {
          lines.push(`    - ${r}`);
        }
      }
      if (proj.achievements?.length) lines.push(`  Achievements: ${proj.achievements.join(", ")}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

function formatAchievements(data) {
  const entries = data.achievements || data;
  if (!Array.isArray(entries)) return String(data);

  return entries
    .map((ach) => {
      const lines = [];
      lines.push(`${ach.title}`);
      if (ach.category) lines.push(`  Category: ${ach.category}`);
      if (ach.description) lines.push(`  ${ach.description}`);
      if (ach.organization) lines.push(`  Organization: ${ach.organization}`);
      if (ach.year) lines.push(`  Year: ${ach.year}`);
      if (ach.duration) lines.push(`  Duration: ${ach.duration}`);
      if (ach.position) lines.push(`  Position: ${ach.position}`);
      if (ach.project) lines.push(`  Project: ${ach.project}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

function formatResearch(data) {
  const r = data.research || data;
  const lines = [];

  lines.push(`Project: ${r.projectName}`);
  lines.push(`Domain: ${r.domain}`);
  lines.push(`Description: ${r.description}`);
  if (r.technologies?.length) lines.push(`Technologies: ${r.technologies.join(", ")}`);

  if (r.researchPaper) {
    lines.push("");
    lines.push("Research Paper:");
    lines.push(`  Title: ${r.researchPaper.title}`);
    lines.push(`  Journal: ${r.researchPaper.journal}`);
    lines.push(`  Published: ${r.researchPaper.publicationDate}`);
    lines.push(`  Status: ${r.researchPaper.status}`);
    if (r.researchPaper.authors?.length) {
      lines.push(`  Authors: ${r.researchPaper.authors.map((a) => `${a.name} (${a.role})`).join(", ")}`);
    }
    if (r.researchPaper.abstract) lines.push(`  Abstract: ${r.researchPaper.abstract}`);
  }

  if (r.patent) {
    lines.push("");
    lines.push("Patent:");
    lines.push(`  Title: ${r.patent.title}`);
    lines.push(`  Type: ${r.patent.type}`);
    lines.push(`  Status: ${r.patent.status}`);
    if (r.patent.inventors?.length) lines.push(`  Inventors: ${r.patent.inventors.join(", ")}`);
  }

  if (r.copyright) {
    lines.push("");
    lines.push("Copyright:");
    lines.push(`  Title: ${r.copyright.title}`);
    lines.push(`  Registration: ${r.copyright.registrationNumber}`);
    lines.push(`  Date: ${r.copyright.registrationDate}`);
    lines.push(`  Status: ${r.copyright.status}`);
  }

  if (r.achievements?.length) {
    lines.push("");
    lines.push("Research Achievements:");
    for (const a of r.achievements) {
      lines.push(`  - ${a}`);
    }
  }

  return lines.join("\n");
}

// ── Category → formatter mapping ──────────────────────────────────────

const formatters = {
  profile: formatProfile,
  education: formatEducation,
  skills: formatSkills,
  experience: formatExperience,
  projects: formatProjects,
  achievements: formatAchievements,
  research: formatResearch,
};

// ── Public API ────────────────────────────────────────────────────────

/**
 * Build a human-readable context block from knowledge sections.
 *
 * @param {Array<{ title: string, category?: string, data: any }>} sections
 * @returns {string} Natural-language context block
 */
export function buildContextBlock(sections) {
  return sections
    .filter((section) => section.data !== undefined && section.data !== null)
    .map((section) => {
      const key = (section.category || section.title || "").toLowerCase().trim();
      const formatter = formatters[key];

      let content;
      if (typeof section.data === "string") {
        content = section.data;
      } else if (formatter) {
        content = formatter(section.data);
      } else {
        // Fallback: structured key-value extraction
        content = fallbackFormat(section.data);
      }

      return `## ${section.title}\n${content}`;
    })
    .join("\n\n");
}

/**
 * Fallback formatter that extracts key-value pairs from any object
 * in a readable way, avoiding raw JSON output.
 */
function fallbackFormat(data) {
  if (Array.isArray(data)) {
    return data.map((item, i) => {
      if (typeof item === "string") return `- ${item}`;
      return `Entry ${i + 1}:\n${fallbackFormat(item)}`;
    }).join("\n");
  }

  if (typeof data === "object" && data !== null) {
    return Object.entries(data)
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
        if (Array.isArray(value)) return `${label}: ${value.join(", ")}`;
        if (typeof value === "object") return `${label}:\n${fallbackFormat(value)}`;
        return `${label}: ${value}`;
      })
      .join("\n");
  }

  return String(data);
}
