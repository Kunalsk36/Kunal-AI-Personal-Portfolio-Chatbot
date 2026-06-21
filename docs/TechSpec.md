# TechSpec.md

# Kunal AI – Personal Portfolio Chatbot

Version: 1.0

Status: Draft

Owner: Kunal Shrikant Kavathekar

Related Documents:

* PRD.md
* Design.md
* Rules.md
* ImplementationPlan.md

---

# 1. Technical Overview

Kunal AI is a local-first AI-powered chatbot that answers questions about Kunal Kavathekar using a curated knowledge base and a locally running Large Language Model (LLM) through Ollama.

The application consists of:

* Next.js Frontend
* Express.js Backend
* Ollama LLM Service
* File-Based Knowledge Base

The system follows a Retrieval + Generation architecture where relevant information is extracted from the knowledge base and provided to the LLM as context before generating a response.

No database is required in Version 1.

---

# 2. Technology Stack

## Frontend

* Next.js 15+
* JavaScript
* Tailwind CSS
* React Hooks
* Fetch API

---

## Backend

* Node.js
* Express.js
* CORS
* dotenv
* fs/promises

---

## AI Layer

* Ollama
* qwen2.5:1.5b

Ollama Endpoint:

```text
http://localhost:11434
```

---

## Storage

Structured Data:

```text
JSON Files
```

Unstructured Data:

```text
TXT Files
```

---

# 3. System Architecture

```text
+---------------------+
|      User           |
+----------+----------+
           |
           v
+---------------------+
|   Next.js Client    |
+----------+----------+
           |
           v
+---------------------+
|   Express Backend   |
+----------+----------+
           |
    +------+------+
    |             |
    v             v
Knowledge      Ollama
Base          qwen2.5
    |             |
    +------+------+
           |
           v
      Response
```

---

# 4. Project Structure

```text
kunal-ai-chatbot/

├── src/
│
├── backend/
│
├── knowledge-base/
│
├── docs/
│
└── README.md
```

---

# 5. Frontend Structure

```text
src/ (at root)

├── src/
│
├── app/
│   ├── page.js
│   ├── layout.js
│
├── components/
│   ├── ChatContainer.js
│   ├── MessageBubble.js
│   ├── ChatInput.js
│   ├── Header.js
│   ├── ThemeToggle.js
│
├── hooks/
│   └── useChat.js
│
├── services/
│   └── api.js
│
├── context/
│   └── ThemeContext.js
│
└── styles/
```

---

# 6. Backend Structure

```text
backend/

├── src/
│
├── routes/
│   └── chat.routes.js
│
├── controllers/
│   └── chat.controller.js
│
├── services/
│   ├── knowledge.service.js
│   ├── prompt.service.js
│   └── ollama.service.js
│
├── utils/
│   ├── fileReader.js
│   └── contextBuilder.js
│
├── config/
│   └── ollama.js
│
├── app.js
└── server.js
```

---

# 7. Knowledge Base Structure

```text
knowledge-base/

├── json/
│
│   profile.json
│   skills.json
│   education.json
│   projects.json
│   experience.json
│   achievements.json
│   research.json
│
└── documents/
│
    resume.txt
    linkedin-profile.txt
    research-paper.txt
```

---

# 8. Knowledge Retrieval Strategy

Version 1 will use keyword-based retrieval.

Process:

1. Receive user question.
2. Load knowledge files.
3. Search matching content.
4. Build context.
5. Send context to Ollama.
6. Generate answer.

Example:

Question:

```text
Tell me about PathReco
```

System retrieves:

```text
projects.json

research.json
```

Context is assembled before generation.

---

# 9. Prompt Construction

System Prompt:

```text
You are Kunal AI.

You represent Kunal Kavathekar.

Answer questions as if you are Kunal.

Use only the provided context.

Do not invent information.

If information is unavailable,
say that you do not have enough information.
```

---

Prompt Format:

```text
SYSTEM PROMPT

CONTEXT

User Question

Generate Response
```

---

# 10. Ollama Integration

Endpoint:

```text
POST /api/generate
```

Backend calls:

```text
http://localhost:11434/api/generate
```

Payload:

{
"model": "qwen2.5:1.5b",
"prompt": "<constructed prompt>",
"stream": false
}

---

Expected Response:

{
"response": "Generated answer..."
}

---

# 11. API Design

Base URL:

```text
/api
```

---

## Chat Endpoint

### POST

```text
/api/chat
```

Request:

{
"message": "Tell me about your internship"
}

Response:

{
"success": true,
"answer": "..."
}

---

## Health Check Endpoint

### GET

```text
/api/health
```

Response:

{
"status": "ok"
}

---

# 12. Frontend State Management

State Variables:

messages

loading

error

theme

input

---

Message Structure:

{
id: string,
role: "user" | "assistant",
content: string,
timestamp: string
}

---

# 13. Conversation Flow

User sends message

↓

Frontend POST request

↓

Backend receives request

↓

Knowledge retrieval

↓

Prompt construction

↓

Ollama generation

↓

Response returned

↓

Message displayed

---

# 14. Theme System

Supported Themes:

Dark

Light

---

Dark Theme

Background:

```text
#0F0F0F
```

Surface:

```text
#171717
```

Border:

```text
#2A2A2A
```

Accent:

```text
#F97316
```

Text:

```text
#FFFFFF
```

---

Light Theme

Background:

```text
#FFFFFF
```

Surface:

```text
#F8F8F8
```

Border:

```text
#E5E5E5
```

Accent:

```text
#F97316
```

Text:

```text
#111111
```

---

# 15. Error Handling

Handle:

* Ollama unavailable
* Missing knowledge files
* Empty user message
* API timeout
* Invalid request payload

User-friendly messages must be displayed.

---

# 16. Performance Requirements

Chat response target:

< 5 seconds

Initial page load:

< 2 seconds

Theme switch:

Instant

---

# 17. Security Requirements

Version 1:

* Input sanitization
* Request validation
* Environment variables
* No sensitive secrets exposed

No authentication required.

---

# 18. Deployment Strategy

Frontend:

Vercel

Backend:

Railway
or
Render

Ollama:

Local Machine

Version 1 development environment assumes Ollama is running locally.

---

# 19. Future Architecture

Version 2 may introduce:

* Embeddings
* ChromaDB
* Vector Search
* Semantic Retrieval
* Advanced RAG
* Voice Support
* Authentication
* Analytics

These features are outside the scope of Version 1.
