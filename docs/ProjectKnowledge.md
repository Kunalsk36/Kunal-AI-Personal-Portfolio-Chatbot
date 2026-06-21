# Project Knowledge

This document serves as the complete technical reference and architectural deep-dive for the **Kunal AI – Personal Portfolio Chatbot** project. It is intended for onboarding new developers, guiding future maintenance, and providing a comprehensive overview of the system's internal workings.

---

## 1. Project Overview

**Kunal AI** is an intelligent, interactive personal portfolio application built to showcase the professional background, skills, and achievements of Kunal Shrikant Kavathekar. Rather than relying on a traditional static resume or website, this project offers an interactive chatbot interface. 

It was built to solve the "static portfolio problem" where recruiters or clients must manually hunt for specific information. By leveraging Artificial Intelligence, users can query exactly what they want to know (e.g., *"What is your experience with Next.js?"* or *"Tell me about your patents."*) and receive concise, factual, and context-aware responses instantly. The primary target audience includes recruiters, hiring managers, potential clients, and other developers.

---

## 2. Goals and Objectives

The project was driven by four primary objectives:
1. **Interactive Portfolio Representation:** Replace standard scrolling web pages with a dynamic, conversational interface that mimics a real-time interview.
2. **AI-Powered Question Answering:** Use an advanced Large Language Model (LLM) to intelligently interpret user queries and synthesize readable, first-person answers.
3. **Offline Capability & Complete Privacy:** Run the entire AI stack locally without relying on external cloud APIs like OpenAI or Anthropic. This eliminates latency caused by internet routing, prevents API billing surprises, and guarantees absolute data privacy.
4. **Personal Branding:** Demonstrate technical competence in Full-Stack Web Development (Next.js, Node.js) and AI engineering (Prompt Engineering, RAG architectures).

---

## 3. System Architecture

Kunal AI utilizes a streamlined **Retrieval-Augmented Generation (RAG)** architecture. It operates entirely on the local machine and does not rely on third-party API keys or cloud databases.

### Execution Flow:
1. **User Request:** The user types a message in the Next.js frontend UI.
2. **Next.js Frontend:** The frontend appends the user's message to the local chat state as a user bubble and sends an HTTP POST request to the Express backend.
3. **Express Backend:** The backend receives the query and validates it (rejecting empty or invalid strings).
4. **Knowledge Retrieval Layer:** A keyword matcher parses the query, identifies the core intent, and selects the most relevant document (e.g., matching "skills" or "projects" to their respective JSON files).
5. **Prompt Builder:** The selected knowledge context and the user's question are injected into a strict, pre-defined System Prompt template.
6. **Ollama (qwen2.5:1.5b):** The Express backend sends the compiled prompt via HTTP POST to the local Ollama daemon. The model processes the prompt and generates a response.
7. **Response Generation:** The backend receives the generated text, formats it as a JSON object, and sends it back to the client.
8. **Frontend Rendering:** The frontend updates the React state to display the AI's response in the chat interface.

---

## 4. Technology Stack

### Frontend
- **Next.js & React.js:** Chosen for efficient routing, Server-Side Rendering (SSR) capabilities, and robust state management.
- **Tailwind CSS:** Selected for utility-first styling, enabling rapid, responsive UI development, and effortless implementation of dark/light modes.

### Backend
- **Node.js & Express.js:** Provides a lightweight, fast, and unopinionated routing framework to handle HTTP API requests and interface with the AI daemon seamlessly.

### AI Infrastructure
- **Ollama:** An open-source tool for running LLMs locally. It handles hardware orchestration and exposes a simple REST API.
- **Model (`qwen2.5:1.5b`):** Selected for its extremely low RAM footprint, rapid inference speeds on consumer hardware, and excellent reasoning capabilities relative to its small parameter count.

### Knowledge Base
- **JSON & TXT Files:** Used as a static database. Selected to avoid the overhead of setting up SQL/NoSQL databases while still allowing highly structured data storage. 

### Documentation
- **Markdown:** Ensures documentation is platform-agnostic, easily readable in IDEs, and renders natively on GitHub.

---

## 5. Folder Structure

The repository is modularly divided into four core sectors:

```text
kunal-ai-personal-portfolio-chatbot/
├── backend/                  # The Node.js API server
│   ├── src/
│   │   ├── config/           # Environment and Ollama config mappings
│   │   ├── controllers/      # Route logic (receives req, sends res)
│   │   ├── middleware/       # Express middlewares (errorHandler)
│   │   ├── routes/           # API Endpoint definitions
│   │   ├── services/         # Core logic (Ollama fetching, Retrieval)
│   │   └── utils/            # Helper scripts (JSON parser, Keyword Matcher)
│   └── package.json
├── docs/                     # Project specifications, tracking, and logs
│   ├── Design.md             # UI/UX guidelines
│   ├── PRD.md                # Product Requirements Document
│   ├── ProjectKnowledge.md   # [This Document]
│   └── Tracker.md            # Execution checklists and history
├── knowledge-base/           # Local Data Store
│   ├── documents/            # Unstructured text context (Resume, LinkedIn)
│   └── json/                 # Structured context (skills, education, etc.)
└── src/                      # Next.js Frontend Application
    ├── app/                  # Next.js app router pages and layouts
    ├── components/           # Reusable UI elements (ChatInput, Header)
    ├── context/              # React Context providers (ThemeContext)
    └── styles/               # Global CSS and Tailwind directives
```

---

## 6. Knowledge Base Design

The application substitutes a traditional database with a local filesystem structure (`knowledge-base/`). It separates data into domain-specific categories.

### Structured JSON
- `profile.json`: Basic biographical data.
- `education.json`: Degrees, institutions, CGPA, and final semester CGPI.
- `skills.json`: Grouped arrays of programming languages and tools.
- `experience.json`: Internship details, durations, and responsibilities.
- `projects.json`: Full technical breakdown of built applications.
- `research.json`: Academic papers, patents, and copyrights.
- `achievements.json`: Awards, rankings, and extracurricular leadership.
- `conversation-examples.json`: Explicit Q&A pairs injected into the prompt to guide the AI's tone and resolve ambiguous facts (e.g., differentiating CGPA vs CGPI).

### Unstructured TXT
- `resume.txt` & `linkedin-profile.txt`: Provide a broader, holistic view of the candidate's background. Used as a fallback when specific JSON structures do not perfectly match the user's intent.

**Why both?** JSON is excellent for strict extraction and formatting, ensuring the LLM doesn't hallucinate dates or metrics. TXT files provide flowing, semantic context that helps the LLM construct naturally phrased paragraphs about Kunal's general career trajectory.

---

## 7. Retrieval System

V1 of Kunal AI uses a **Keyword Matching Heuristic** rather than a Vector Database. 

### How Keyword Matching Works (`keywordMatcher.js`)
When a user asks a question, the text is normalized (lowercase, punctuation removed). The `detectCategory(question)` function iterates through a dictionary mapping domain categories (`skills`, `projects`, `experience`) to arrays of relevant keywords.
Each matching keyword increments a score. Specific high-value keywords (like exact project names or the word "projects") receive score boosts (e.g., `+5`) to forcefully resolve ambiguities where multiple intents are detected. The category with the highest score wins.

### Category Routing & Context Selection
Once a category is detected, the `retrieval.service.js` selects only the corresponding JSON/TXT files from the knowledge base and concatenates them into a single string. This string becomes the isolated "Context" injected into the LLM prompt.

### Why Avoid Vector Databases?
Vector databases (e.g., ChromaDB, Pinecone) and embedding pipelines (Sentence-Transformers) add immense weight, latency, and complexity. For a dataset as small and distinct as a personal portfolio, exact-match and boosted-keyword heuristics are mathematically faster, require zero extra RAM, and perfectly route 95%+ of standard recruiter queries.

---

## 8. Prompt Engineering

The behavior of the AI relies heavily on the **System Prompt** designed in `PromptEngineering.md`.

### System Prompt & Constraints
The AI is given a strict persona:
*"You are Kunal AI, a digital version of Kunal Shrikant Kavathekar. You are speaking directly to the user in the first person ('I', 'my')."*

To prevent **Hallucination** (the AI making up fake jobs or skills), severe constraints are applied:
*"CRITICAL RULE: You must base your answer ONLY on the provided context. If the answer is not in the context, explicitly state 'I do not have information about that.' DO NOT invent information."*

### Context Injection Example
The prompt dynamically injects the output of the retrieval system:
```text
[CONTEXT_START]
(Injected JSON string of experience.json)
[CONTEXT_END]

[USER_QUESTION]
Where did you do your RPA internship?
```
This forces the model to treat the `[CONTEXT_START]` block as absolute ground truth before generating the response.

---

## 9. Ollama Integration

The `ollama.service.js` file handles communication with the local Ollama daemon.

### The Request Lifecycle
The backend utilizes the native Node.js `fetch` API to send a POST request to `http://localhost:11434/api/generate`. It bypasses heavier libraries like LangChain to reduce overhead.

```javascript
const requestBody = {
  model: env.ollamaModel, // "qwen2.5:1.5b"
  prompt: finalPrompt,
  stream: false,
  options: {
    temperature: 0.2, // Low temperature for factual consistency
    top_p: 0.8
  }
};
```

### Why `qwen2.5:1.5b`?
1.5 billion parameter models represent the "sweet spot" for text retrieval tasks. They are small enough to load into standard system RAM (requiring less than 2GB) and run fast on CPUs, yet sophisticated enough to parse JSON strings and formulate grammatically correct, conversational English responses.

---

## 10. Frontend Architecture

The React-based frontend is built for simplicity and responsiveness.

- **`ChatContainer`**: The primary stateful component. It manages an array of message objects (`{ sender: "user" | "ai", text: "..." }`) and handles the asynchronous fetching from the backend API.
- **`ChatInput`**: Handles text input, prevents empty submissions, and listens for the "Enter" key to trigger sends.
- **`MessageBubble`**: A stateless rendering component that dynamically styles itself differently depending on the `sender` prop (e.g., orange for the AI, gray for the user).
- **`Header`**: Contains the project title and the Theme Toggle button.
- **`EmptyState`**: Displays introductory text and suggested starter questions when the chat array is empty.

Message Flow: User clicks "Send" -> `ChatContainer` adds user message to state -> Calls `POST /api/chat` -> Awaits response -> Adds AI response to state -> React triggers a re-render.

---

## 11. Backend Architecture

The Express server employs a classic Model-View-Controller (MVC) style separation of concerns.

- **Routes (`api.routes.js`)**: Maps HTTP methods and paths (`POST /chat`) to specific controller functions.
- **Controllers (`chat.controller.js`)**: Extracts the `message` from the HTTP request body, passes it to the services, and handles HTTP response formatting (`res.json()`). 
- **Services (`retrieval.service.js`, `ollama.service.js`)**: Executes the heavy lifting—reading files, matching keywords, and pinging the local AI.
- **Utilities (`jsonLoader.js`)**: Abstracted helper functions designed to safely parse files and handle `ENOENT` (File Not Found) errors locally.

---

## 12. Error Handling

A robust error handling strategy ensures the application never crashes completely.

- **Empty Input:** The frontend inherently disables the "Send" button for empty text. If bypassed, the backend immediately returns a `400 Bad Request` with `"Message is required."`
- **Centralized Handling (`errorHandler.js`):** All unhandled exceptions thrown in controllers are passed via `next(error)` to a central Express middleware. This prevents stack traces from leaking to the frontend.
- **Ollama Offline (`ECONNREFUSED`):** If the Ollama daemon isn't running, the backend traps the fetch failure and returns a safe 503 error: *"Ollama is currently unavailable. Please ensure the Ollama service is running."*
- **Network Failure:** The frontend `try-catch` blocks safely trap cross-origin or connectivity failures and render a red error bubble in the chat UI, keeping user history intact.

---

## 13. Theme System

The application boasts a centralized, context-driven theme system.

- **`ThemeContext.js`**: A React Context provider that tracks the `theme` string (`"dark"` or `"light"`).
- **Persistence**: Upon mounting, a `useEffect` hook reads `localStorage` to retrieve the user's previously selected theme. Whenever the theme changes, it updates the document's `<html class="dark">` attribute, allowing Tailwind CSS's `dark:` pseudo-classes to take effect instantly.
- **CSS Variables**: Core background colors and text shades are defined in `globals.css` using CSS variables mapped directly to the active theme.

---

## 14. Testing Strategy

The project underwent rigorous testing phases documented in `TestReport.md`.

- **Functional Testing**: Validated `GET /api/health` and sequential `POST /api/chat` requests to ensure keyword routing succeeded across all 7 data categories without crashes.
- **Responsive Testing**: Statically verified Tailwind breakpoints (`sm:`, `md:`, `lg:`) to ensure optimal display on desktop, tablet, and mobile (down to 320px).
- **Performance Testing**: Measured average chat latency (~2.8 seconds on standard hardware) and verified that the backend maintains steady RAM usage without memory leaks.
- **AI Validation Testing**: Explicitly cross-referenced AI-generated answers against the raw JSON files. This led to Phase 11.5 fixes which disambiguated complex metrics (like CGPA vs CGPI) to ensure AI output was 100% factually accurate.

---

## 15. Challenges Faced

1. **Routing Without Embeddings**: Creating an accurate keyword heuristic was difficult when words overlapped (e.g., the word "work" could mean a project or job experience). *Solution: Implemented a weighted scoring system that boosts explicit words like "project" by +5.*
2. **Factual Consistency**: The LLM initially confused the overall BSc CGPA (9.5) with the final semester CGPI (9.85). *Solution: Standardized terminology across all files and injected hardcoded examples into `conversation-examples.json` to guide the model.*
3. **Theme Hydration Mismatches**: React occasionally threw server-client mismatch warnings when reading `localStorage` during SSR. *Solution: Implemented a `mounted` state toggle within `useEffect` to safely delay theme rendering until the client side took over.*

---

## 16. Key Learnings

- **Local AI Integration is Viable:** Utilizing tools like Ollama proves that privacy-first, local LLMs are highly capable of handling production-level text generation without cloud dependency.
- **Prompt Engineering is the New Backend:** Properly constraining an LLM via strict System Prompts is just as critical to app security and data integrity as traditional database validation.
- **Decoupling Data from Code:** Moving all resume data into isolated `knowledge-base/` files drastically simplified app maintenance. The portfolio content can now be updated entirely independently of the React UI or Node APIs.

---

## 17. Future Enhancements

The architectural groundwork laid in Version 1 opens the door for significant scaling:

- **V1.1 - Conversation Memory:** Implementing an array queue in the backend to store the last 5 messages, allowing the LLM to understand contextual follow-up questions (e.g., *"What technologies did you use for that?"*).
- **V1.2 - Admin Dashboard:** Creating an authenticated UI layer for Kunal to edit the underlying JSON knowledge base graphically instead of editing raw files.
- **V1.3 - Source Citations:** Modifying the prompt to force the AI to return the name of the file it extracted data from, rendering clickable citations in the frontend chat bubbles.
- **V1.4 - Vector Search:** Replacing `keywordMatcher.js` with ChromaDB and an embedding pipeline to allow for highly nuanced, semantic queries.
- **V2.0 - SaaS Platform:** Upgrading the architecture to support multiple users, turning the app into a platform where any developer can upload their resume and generate a customized portfolio chatbot.

---

## 18. Final Project Summary

The **Kunal AI – Personal Portfolio Chatbot** is a fully functional, highly optimized, local-first RAG application. By combining the speed and responsive design of Next.js with the robust routing of Express.js and the intelligence of Ollama's local LLMs, it successfully replaces the traditional static resume with a dynamic, conversational experience. It is robust, meticulously documented, gracefully handles systemic errors, and guarantees absolute data privacy.
