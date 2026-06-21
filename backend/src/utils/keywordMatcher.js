const categoryKeywords = {
  profile: [
    "name",
    "who are you",
    "about yourself",
    "introduce",
    "background",
    "location",
    "from",
    "contact",
    "email",
    "career objective",
  ],
  education: [
    "education",
    "study",
    "studying",
    "degree",
    "college",
    "university",
    "mca",
    "bsc",
    "cgpa",
    "hsc",
    "ssc",
    "graduation",
  ],
  skills: [
    "skill",
    "skills",
    "technology",
    "technologies",
    "tech stack",
    "programming",
    "language",
    "java",
    "javascript",
    "python",
    "react",
    "next",
    "node",
    "tailwind",
  ],
  experience: [
    "experience",
    "internship",
    "intern",
    "company",
    "work",
    "worked",
    "momento",
    "humora",
    "satchitanand",
    "rpa",
    "industry",
  ],
  projects: [
    "project",
    "projects",
    "pathreco",
    "learnbetter",
    "arthshastra",
    "blog aura",
    "kknotes",
    "tech4bharat",
    "sahyadri",
    "portfolio",
    "application",
  ],
  achievements: [
    "achievement",
    "achievements",
    "award",
    "awards",
    "gold medal",
    "rank",
    "first rank",
    "competition",
    "phoenix",
    "general secretary",
    "cyber warrior",
  ],
  research: [
    "research",
    "paper",
    "publication",
    "patent",
    "copyright",
    "journal",
    "ijsrst",
    "indipathreco",
    "pathreco",
  ],
};

export function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreKeyword(normalizedQuestion, keyword) {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return 0;
  }

  let score = 0;
  if (normalizedKeyword.includes(" ")) {
    score = normalizedQuestion.includes(normalizedKeyword) ? normalizedKeyword.split(" ").length + 1 : 0;
  } else {
    score = normalizedQuestion.split(" ").includes(normalizedKeyword) ? 1 : 0;
  }

  // Prioritize project over work/worked
  if (score > 0 && (normalizedKeyword === "project" || normalizedKeyword === "projects")) {
    score += 5;
  }

  return score;
}

export function detectCategory(question) {
  const normalizedQuestion = normalizeText(question);
  const researchSpecificWords = ["research", "paper", "publication", "patent", "copyright", "journal"];
  const projectNames = [
    "pathreco",
    "learnbetter",
    "arthshastra",
    "blog aura",
    "kknotes",
    "tech4bharat",
    "sahyadri",
    "portfolio",
  ];

  if (
    projectNames.some((projectName) => normalizedQuestion.includes(normalizeText(projectName))) &&
    !researchSpecificWords.some((keyword) => normalizedQuestion.includes(keyword))
  ) {
    return "projects";
  }

  const scores = Object.entries(categoryKeywords).map(([category, keywords]) => ({
    category,
    score: keywords.reduce(
      (totalScore, keyword) => totalScore + scoreKeyword(normalizedQuestion, keyword),
      0,
    ),
  }));
  const bestMatch = scores.sort((a, b) => b.score - a.score)[0];

  return bestMatch && bestMatch.score > 0 ? bestMatch.category : "profile";
}

export function includesKeyword(question, keyword) {
  return normalizeText(question).includes(normalizeText(keyword));
}
