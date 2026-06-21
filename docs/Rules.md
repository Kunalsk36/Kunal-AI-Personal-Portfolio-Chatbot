# Rules.md

# Kunal AI – Personal Portfolio Chatbot

Version: 1.0

Status: Active

Owner: Kunal Shrikant Kavathekar

Related Documents:

* PRD.md
* TechSpec.md
* Design.md
* ImplementationPlan.md
* Tracker.md

---

# Purpose

This document defines mandatory development rules for all contributors, AI coding agents, assistants, and future maintainers.

These rules take precedence over implementation preferences.

If there is a conflict between generated code and these rules, these rules must be followed.

---

# 1. General Development Principles

## Rule 1.1

Always follow:

```text id="t31lvm"
PRD → TechSpec → Design → ImplementationPlan → Rules
```

in that order.

Do not implement features that are not defined within project documentation.

---

## Rule 1.2

Prefer simplicity over complexity.

The simplest working solution should be selected.

Avoid unnecessary abstractions.

---

## Rule 1.3

Do not over-engineer.

Version 1 must remain lightweight and maintainable.

---

## Rule 1.4

Code should prioritize:

* Readability
* Maintainability
* Predictability
* Consistency

over clever implementations.

---

# 2. Scope Control Rules

## Rule 2.1

Only implement Version 1 requirements.

Do not implement future features.

---

## Rule 2.2

The following features are explicitly prohibited in Version 1:

* Authentication
* User Accounts
* Database Integration
* Voice Input
* Voice Output
* File Uploads
* Image Uploads
* Image Generation
* Multi-user Support
* Chat History Storage
* Internet Search
* Web Scraping
* Embeddings
* Vector Databases
* ChromaDB
* Pinecone
* FAISS
* Semantic Search
* RAG Frameworks
* LangChain
* LlamaIndex
* Agent Frameworks
* Function Calling
* Tool Calling
* Streaming Responses
* Analytics Dashboard

These features must not be added without explicit approval.

---

## Rule 2.3

Do not introduce additional dependencies unless necessary.

Every dependency must have a clear purpose.

---

# 3. Frontend Rules

## Rule 3.1

Frontend framework:

```text id="3rw10m"
Next.js
```

---

## Rule 3.2

Language:

```text id="y6b3z0"
JavaScript
```

TypeScript is prohibited.

---

## Rule 3.3

Styling:

```text id="50ic11"
Tailwind CSS
```

Only.

---

## Rule 3.4

Use functional React components exclusively.

Class components are prohibited.

---

## Rule 3.5

Components must remain small and reusable.

A component should have a single responsibility.

---

## Rule 3.6

Do not place business logic inside UI components.

Business logic belongs in hooks, services, or utilities.

---

## Rule 3.7

No hardcoded personal information inside components.

All portfolio information must originate from the knowledge base.

---

# 4. Backend Rules

## Rule 4.1

Backend framework:

```text id="ck7d4k"
Express.js
```

---

## Rule 4.2

Use REST APIs.

GraphQL is prohibited.

---

## Rule 4.3

Controllers must remain thin.

Business logic belongs in services.

---

## Rule 4.4

All routes must validate incoming requests.

---

## Rule 4.5

Use async/await.

Avoid promise chains.

---

## Rule 4.6

Handle all possible failures.

Never assume external services are available.

---

# 5. AI Integration Rules

## Rule 5.1

Model:

```text id="o2q6tq"
qwen2.5:1.5b
```

is the default production model.

---

## Rule 5.2

The chatbot must answer as Kunal.

Responses should be written in first person when appropriate.

Example:

```text id="rrqqh4"
My name is Kunal Kavathekar.
```

Not:

```text id="pbk8jh"
Kunal Kavathekar's name is...
```

---

## Rule 5.3

Use provided context only.

The model must not invent information.

---

## Rule 5.4

If information is unavailable:

Respond honestly.

Example:

```text id="8n3vdl"
I don't have enough information to answer that question.
```

---

## Rule 5.5

Never fabricate:

* Skills
* Experience
* Projects
* Education
* Certifications
* Research Contributions
* Awards

---

## Rule 5.6

The chatbot must never claim capabilities that Kunal does not possess.

---

# 6. Knowledge Base Rules

## Rule 6.1

Knowledge base is the source of truth.

---

## Rule 6.2

All personal information must be stored inside:

```text id="g3mg6f"
knowledge-base/
```

---

## Rule 6.3

Never duplicate information across multiple files unnecessarily.

---

## Rule 6.4

Structured information belongs in JSON.

Examples:

* Skills
* Education
* Experience
* Projects

---

## Rule 6.5

Long-form content belongs in TXT files.

Examples:

* Resume
* LinkedIn Profile
* Research Paper

---

# 7. Design Rules

## Rule 7.1

Follow Design.md strictly.

---

## Rule 7.2

The application must remain chat-first.

The chatbot is the product.

---

## Rule 7.3

No sidebars.

No dashboards.

No analytics pages.

No profile pages.

No settings pages.

---

## Rule 7.4

UI must remain minimal.

Avoid visual clutter.

---

## Rule 7.5

Theme colors must follow Design.md.

Do not invent new color systems.

---

# 8. Responsive Design Rules

## Rule 8.1

Mobile-first development.

---

## Rule 8.2

All features must work on:

* Mobile
* Tablet
* Desktop

---

## Rule 8.3

No horizontal scrolling.

---

# 9. Performance Rules

## Rule 9.1

Keep bundle size small.

---

## Rule 9.2

Avoid unnecessary re-renders.

---

## Rule 9.3

Load only what is required.

---

## Rule 9.4

Avoid expensive computations on the client.

---

# 10. Error Handling Rules

## Rule 10.1

Every API request must handle failures.

---

## Rule 10.2

Every async operation must include error handling.

---

## Rule 10.3

Display user-friendly error messages.

Never expose stack traces.

---

# 11. Documentation Rules

## Rule 11.1

Any architectural change must be documented.

---

## Rule 11.2

Any new dependency must be documented.

---

## Rule 11.3

Documentation must remain synchronized with implementation.

---

# 12. Tracker Rules

## Rule 12.1

Tracker.md must be updated after completing each implementation task.

---

## Rule 12.2

Task status must use:

```text id="ozxv3p"
[ ] Not Started
[-] In Progress
[x] Completed
```

---

## Rule 12.3

Completed work must never remain marked as incomplete.

---

# 13. Git Rules

## Rule 13.1

Create small focused commits.

---

## Rule 13.2

Commit messages should be descriptive.

Example:

```text id="kkh3if"
feat: add chat input component

fix: handle ollama connection failure

refactor: simplify prompt builder
```

---

## Rule 13.3

Do not commit:

* node_modules
* .env
* build artifacts

---

# 14. Definition of Success

The implementation is considered successful when:

* PRD requirements are fulfilled.
* TechSpec architecture is respected.
* Design requirements are implemented.
* Rules are followed.
* Tracker is fully updated.
* Chatbot answers accurately.
* UI is responsive.
* Ollama integration is stable.

Any implementation that violates these rules should be considered incomplete.
