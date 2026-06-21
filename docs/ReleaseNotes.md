# Kunal AI - Release Notes

## Project Summary
Kunal AI is a personalized, AI-powered portfolio chatbot that answers professional queries about Kunal Kavathekar using local, domain-specific knowledge. It acts as an interactive resume, replacing static portfolios with dynamic conversations.

## Technology Stack
- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Model**: Ollama (qwen2.5:1.5b)
- **Data Source**: Local JSON/TXT Knowledge Base
- **Architecture**: Retrieval-Augmented Generation (RAG) using zero-dependency parsing.

## Features Implemented
- **Intelligent Chat Interface**: A modern, dark-themed UI that simulates a messaging app.
- **Dynamic Retrieval**: Keyword-based intent classification matching questions to the exact domain (e.g., `projects`, `education`, `skills`).
- **Offline Reliability**: The entire architecture runs locally without requiring cloud LLM APIs.
- **Robust Error Handling**: Graceful fallback UI for Ollama downtime or network failures.
- **Theme Support**: Centralized Context-driven light/dark mode with dynamic CSS variables.
- **Responsive Design**: Tailored experiences for Mobile, Tablet, and Desktop.

## Architecture Overview
The architecture is structured natively with a Next.js frontend making HTTP calls to an Express.js backend. The backend parses a collection of local JSON files to extract relevant context based on user queries, then constructs a strict prompt sent to the local Ollama service to generate concise, factual responses.

## Known Limitations
- The system depends heavily on keyword matching (`keywordMatcher.js`). Complex, multi-intent semantic questions might not trigger the ideal category without advanced embedding models like LangChain.
- Cold start penalties (8-10 seconds) exist for the very first query while Ollama loads the model into RAM.

## Future Enhancements
- Transition from Keyword-based matching to a Vector Database (e.g., ChromaDB) with Embeddings.
- Implement streaming responses to reduce perceived latency.
- Add conversational memory (history context) so the AI remembers prior messages in the same session.

## Lessons Learned
- **Prompt Strictness**: Deeply enforced system prompts ("Answer strictly using the provided context") are critical to prevent lightweight models (1.5b) from hallucinating details outside the knowledge base.
- **Error Centralization**: Implementing an Express error-handling middleware reduces redundant try-catch logic across endpoints and standardizes failure modes for the frontend.

## Version 1 Release Status
**Status:** ✅ PRODUCTION READY
All core functional and architectural requirements from the PRD have been successfully implemented and validated.
