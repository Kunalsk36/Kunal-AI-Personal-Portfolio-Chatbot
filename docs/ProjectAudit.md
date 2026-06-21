# Project Audit
**Kunal AI - Version 1.0**

## Frontend Architecture
The frontend is built natively on **Next.js (App Router)** leveraging React functional components. The `src/` directory manages state using pure React Context (`ThemeContext.js`) rather than third-party management, aligning with lightweight requirements. Styling is strictly managed via **Tailwind CSS**, keeping the footprint minimal and the design responsive.

## Backend Architecture
The backend is powered by a robust **Express.js** routing system. Key features include:
- **Centralized Error Handling**: A dedicated `errorHandler.js` middleware isolates HTTP fail cases from business logic.
- **Controller/Service/Util Split**: Business logic is cleanly delineated, keeping routing controllers thin.
- **REST APIs**: `GET /api/health` and `POST /api/chat` offer clear integration points for the client.

## Knowledge Base Architecture
The project foregoes a database in favor of a filesystem-based knowledge base (`knowledge-base/json/` & `documents/`). 
- **Decoupled Configuration**: Data is separated by category (`experience.json`, `education.json`).
- **Data Validation**: A `jsonLoader.js` parsing layer guarantees JSON integrity before routing it to the LLM context.

## AI Pipeline
The AI architecture uses a simplified **RAG (Retrieval-Augmented Generation)** methodology:
1. **Keyword Matcher**: Detects user intent and assigns a category.
2. **Context Assembly**: Concatenates only the relevant JSON and plain text.
3. **Prompt Formulation**: Imposes strict conversational rules and factual constraints.
4. **Ollama Execution**: A local instance of `qwen2.5:1.5b` executes the inference.

## Strengths
- **Zero External Dependencies**: The local-first design avoids variable cloud costs, API key leaks, and latency from internet routing.
- **Modular Maintainability**: Updating Kunal's work experience or projects is as simple as tweaking a JSON file—no code redeploys required for data changes.
- **Extremely Fast Fetching**: Using local file streams to read context guarantees near-zero latency in the retrieval step.

## Remaining Risks
- **Ollama Process Dependency**: If the host machine's Ollama daemon crashes or stops, the application becomes read-only (which is safely handled by UI but fundamentally breaks the AI feature).
- **Hardcoded Matcher Scalability**: As the knowledge base expands, the `keywordMatcher.js` will require frequent manual tuning to resolve keyword overlaps.

## Maintenance Recommendations
- Automate a script to check that `Ollama` is running on startup.
- Implement a logging rotation strategy for `tasks` and internal backend server logs to prevent disk bloat.
- Consider adopting a small, embedded SQLite or Vector Search (e.g., Faiss) to replace `keywordMatcher.js` when the knowledge base exceeds ~20 documents.
