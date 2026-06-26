/**
 * Intent Detection & Multi-Category Keyword Matcher
 *
 * Detects user intent (greeting, portfolio, follow-up, off-topic)
 * and scores ALL knowledge categories, returning ranked results
 * instead of a single best match.
 */

// ── Intent patterns ──────────────────────────────────────────────────

const greetingPatterns = [
  "hi", "hello", "hey", "hii", "hiii", "hola", "namaste",
  "good morning", "good afternoon", "good evening",
  "how are you", "whats up", "sup", "yo",
];

const offTopicPatterns = [
  "weather", "news", "stock", "cricket", "football",
  "movie", "song", "recipe", "politics", "celebrity",
  "write me a", "write a poem", "tell me a joke",
  "code for me", "solve this", "help me with my",
  "what is the capital", "who is the president",
  "translate", "calculate",
];

// ── Category keywords (expanded with synonyms) ──────────────────────

const categoryKeywords = {
  profile: [
    "name", "who are you", "about yourself", "introduce", "background",
    "location", "from", "contact", "email", "career objective",
    "who is kunal", "tell me about kunal", "about you", "yourself",
    "what do you do", "describe yourself", "summary", "overview",
  ],
  education: [
    "education", "study", "studying", "degree", "college", "university",
    "mca", "bsc", "cgpa", "cgpi", "hsc", "ssc", "graduation",
    "academic", "school", "marks", "percentage", "topper",
    "qualification", "learned", "semester", "class",
  ],
  skills: [
    "skill", "skills", "technology", "technologies", "tech stack",
    "programming", "language", "languages", "java", "javascript",
    "python", "react", "next", "node", "tailwind", "tools",
    "frameworks", "database", "databases", "cloud", "aws",
    "know", "proficient", "expertise", "capable", "familiar with",
    "mongodb", "mysql", "express", "kotlin", "uipath",
  ],
  experience: [
    "experience", "internship", "intern", "company", "work",
    "worked", "momento", "humora", "satchitanand", "rpa",
    "industry", "job", "professional", "career", "workplace",
    "employer", "employment", "role", "responsibility",
    "months", "duration", "corporate",
  ],
  projects: [
    "project", "projects", "built", "build", "developed", "created",
    "made", "application", "app", "website", "platform",
    "pathreco", "learnbetter", "arthshastra", "blog aura",
    "kknotes", "tech4bharat", "sahyadri", "portfolio",
    "block banger", "tic tac toe", "kkmusic", "humora technology",
    "what have you built", "show me your work", "your work",
  ],
  achievements: [
    "achievement", "achievements", "award", "awards", "gold medal",
    "rank", "first rank", "competition", "phoenix", "general secretary",
    "cyber warrior", "recognition", "honor", "won", "winner",
    "medal", "accomplishment", "proud of",
  ],
  research: [
    "research", "paper", "publication", "patent", "copyright",
    "journal", "ijsrst", "indipathreco", "pathreco",
    "published", "intellectual property", "thesis",
    "sentence bert", "knowledge graph", "ai research",
  ],
};

// ── Normalization ────────────────────────────────────────────────────

export function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ── Intent Detection ─────────────────────────────────────────────────

/**
 * Detect the user's intent from their message.
 *
 * @param {string} question - The user's message
 * @param {Array} history - Conversation history
 * @returns {"greeting" | "portfolio" | "follow-up" | "off-topic"}
 */
export function detectIntent(question, history = []) {
  const normalized = normalizeText(question);

  // Pure greeting (short message with greeting words)
  const wordCount = normalized.split(" ").length;
  if (wordCount <= 4 && greetingPatterns.some((p) => normalized.includes(p))) {
    return "greeting";
  }

  // Off-topic detection
  const isOffTopic = offTopicPatterns.some((p) => normalized.includes(p));
  const hasPortfolioSignal = Object.values(categoryKeywords)
    .flat()
    .some((kw) => normalized.includes(normalizeText(kw)));

  if (isOffTopic && !hasPortfolioSignal) {
    return "off-topic";
  }

  // Follow-up detection: short questions + existing conversation
  if (history.length >= 2 && wordCount <= 6) {
    const followUpIndicators = [
      "more", "else", "detail", "elaborate", "explain",
      "what about", "how about", "and", "also", "tell me more",
      "which one", "why", "when", "where", "how",
      "can you", "what is", "anything else",
    ];
    if (followUpIndicators.some((ind) => normalized.includes(ind))) {
      return "follow-up";
    }
  }

  return "portfolio";
}

// ── Multi-Category Scoring ───────────────────────────────────────────

function scoreKeyword(normalizedQuestion, keyword) {
  const normalizedKeyword = normalizeText(keyword);
  if (!normalizedKeyword) return 0;

  // Multi-word phrase match (higher score)
  if (normalizedKeyword.includes(" ")) {
    return normalizedQuestion.includes(normalizedKeyword)
      ? normalizedKeyword.split(" ").length + 1
      : 0;
  }

  // Single-word exact match
  const words = normalizedQuestion.split(" ");
  return words.includes(normalizedKeyword) ? 1 : 0;
}

/**
 * Score all categories against the question and return ranked results.
 * Returns an array of { category, score } sorted descending by score.
 *
 * @param {string} question
 * @returns {Array<{ category: string, score: number }>}
 */
export function scoreAllCategories(question) {
  const normalizedQuestion = normalizeText(question);

  const scores = Object.entries(categoryKeywords).map(([category, keywords]) => {
    let score = keywords.reduce(
      (total, keyword) => total + scoreKeyword(normalizedQuestion, keyword),
      0,
    );
    return { category, score };
  });

  return scores.sort((a, b) => b.score - a.score);
}

/**
 * Detect the single best matching category (backward-compatible API).
 * Used when only one category is needed.
 */
export function detectCategory(question) {
  const scores = scoreAllCategories(question);
  return scores[0]?.score > 0 ? scores[0].category : "profile";
}

// ── Utility ──────────────────────────────────────────────────────────

export function includesKeyword(question, keyword) {
  return normalizeText(question).includes(normalizeText(keyword));
}
