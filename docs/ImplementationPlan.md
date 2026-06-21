# ImplementationPlan.md

# Kunal AI – Personal Portfolio Chatbot

Version: 1.0

Status: Draft

Owner: Kunal Shrikant Kavathekar

Related Documents:

* PRD.md
* TechSpec.md
* Design.md
* Rules.md
* Tracker.md

---

# 1. Overview

This document defines the complete implementation roadmap for Version 1 of Kunal AI.

The implementation must follow a phased approach.

Each phase should be completed, verified, and tested before moving to the next phase.

The coding agent must update Tracker.md whenever a task is completed.

No phase should be skipped.

---

# 2. Development Strategy

Implementation Order:

```text
Environment Verification
        ↓
Project Structure
        ↓
Frontend Foundation
        ↓
Backend Foundation
        ↓
Knowledge Base
        ↓
Ollama Integration
        ↓
Prompt Engineering
        ↓
Chat Functionality
        ↓
Theme System
        ↓
Error Handling
        ↓
Testing
        ↓
Documentation
```

---

# Phase 0 — Environment Verification

Objective:

Verify that all required tools and services are properly configured before implementation begins.

---

## Task 0.1

Verify Next.js Application

Checklist:

* Project starts successfully
* No build errors
* No dependency conflicts
* App Router is functioning
* Tailwind CSS is configured correctly

Validation:

```bash
npm run dev
```

Expected:

* Development server starts
* Homepage loads successfully

---

## Task 0.2

Verify Node.js Environment

Checklist:

* Node.js installed
* npm installed
* Versions documented

Validation:

```bash
node -v
npm -v
```

---

## Task 0.3

Verify Ollama Installation

Checklist:

* Ollama installed
* Ollama service running

Validation:

```bash
ollama list
```

Expected:

Successful response.

---

## Task 0.4

Verify AI Model

Checklist:

* qwen2.5:1.5b installed

Validation:

```bash
ollama run qwen2.5:1.5b
```

Expected:

Model responds successfully.

---

## Exit Criteria

All environment checks pass.

---

# Phase 1 — Project Structure Setup

Objective:

Create clean and maintainable folder structure.

---

## Task 1.1

Create documentation structure.

```text
docs/
```

Files:

* PRD.md
* TechSpec.md
* Design.md
* Rules.md
* Tracker.md
* ImplementationPlan.md

---

## Task 1.2

Create frontend folders.

```text
src/components
src/hooks
src/services
src/context
```

---

## Task 1.3

Create backend folders.

```text
backend/src/routes
backend/src/controllers
backend/src/services
backend/src/utils
backend/src/config
```

---

## Task 1.4

Create knowledge base folders.

```text
knowledge-base/json
knowledge-base/documents
```

---

## Exit Criteria

Folder structure matches TechSpec.

---

# Phase 2 — Frontend Foundation

Objective:

Create application shell.

---

## Task 2.1

Create Layout Structure

Components:

* Header
* Chat Area
* Input Area

---

## Task 2.2

Create Header Component

Requirements:

* Kunal AI title
* Status text
* Theme toggle placeholder

---

## Task 2.3

Create Empty State

Requirements:

* Welcome message
* Suggested questions

---

## Task 2.4

Create Message Component

Requirements:

* User message style
* Assistant message style

---

## Task 2.5

Create Chat Input

Requirements:

* Auto resizing textarea
* Send button
* Keyboard support

---

## Exit Criteria

UI structure visible.

No backend integration yet.

---

# Phase 3 — Backend Foundation

Objective:

Create API layer.

---

## Task 3.1

Initialize Express Application

Requirements:

* Express setup
* CORS setup
* Environment variables

---

## Task 3.2

Create Health Endpoint

Endpoint:

```text
GET /api/health
```

Expected:

```json
{
  "status": "ok"
}
```

---

## Task 3.3

Create Chat Endpoint Skeleton

Endpoint:

```text
POST /api/chat
```

Temporary Response:

```json
{
  "success": true
}
```

---

## Exit Criteria

Frontend can communicate with backend.

---

# Phase 4 — Knowledge Base Creation

Objective:

Create structured information source.

---

## Task 4.1

Create JSON Files

Files:

* profile.json
* education.json
* skills.json
* experience.json
* projects.json
* achievements.json
* research.json

---

## Task 4.2

Populate Initial Data

Source:

* Resume
* LinkedIn
* Portfolio
* Research Documents

---

## Task 4.3

Create TXT Documents

Files:

* resume.txt
* linkedin-profile.txt
* research-paper.txt

---

## Exit Criteria

Knowledge base contains real data.

---

# Phase 5 — Knowledge Retrieval Layer

Objective:

Retrieve relevant information.

---

## Task 5.1

Create File Reader Utility

Capabilities:

* Read JSON files
* Read TXT files

---

## Task 5.2

Create Retrieval Service

Responsibilities:

* Load knowledge files
* Search content
* Return relevant information

---

## Task 5.3

Create Context Builder

Responsibilities:

* Combine retrieved data
* Format context block

---

## Exit Criteria

Relevant context generated from user question.

---

# Phase 6 — Ollama Integration

Objective:

Connect local model.

---

## Task 6.1

Create Ollama Service

Responsibilities:

* Send requests
* Receive responses
* Handle errors

---

## Task 6.2

Test Ollama Connection

Validation:

Ask:

```text
Hello
```

Expected:

Valid AI response.

---

## Task 6.3

Integrate Context Pipeline

Flow:

Question

↓

Retrieval

↓

Prompt Construction

↓

Ollama

↓

Response

---

## Exit Criteria

Context-aware AI responses working.

---

# Phase 7 — Prompt Engineering

Objective:

Improve answer quality.

---

## Task 7.1

Create System Prompt

Requirements:

* Answer as Kunal
* Use provided context only
* Avoid hallucinations

---

## Task 7.2

Create Prompt Templates

Structure:

System Prompt

Context

Question

---

## Task 7.3

Validate Answers

Test:

* Name
* Skills
* Education
* Experience
* Projects

---

## Exit Criteria

Answers are accurate and consistent.

---

# Phase 8 — Chat Functionality

Objective:

Complete chat experience.

---

## Task 8.1

Connect Frontend to Backend

---

## Task 8.2

Display AI Responses

---

## Task 8.3

Add Loading State

---

## Task 8.4

Add Typing Indicator

---

## Task 8.5

Auto Scroll Messages

---

## Exit Criteria

Full chat workflow operational.

---

# Phase 9 — Theme System

Objective:

Implement dark/light mode.

---

## Task 9.1

Create Theme Context

---

## Task 9.2

Create Theme Toggle

---

## Task 9.3

Persist Theme Selection

---

## Exit Criteria

Theme switching functional.

---

# Phase 10 — Error Handling

Objective:

Create robust experience.

---

## Task 10.1

Handle Empty Input

---

## Task 10.2

Handle Ollama Offline

---

## Task 10.3

Handle API Failures

---

## Task 10.4

Handle Missing Knowledge Files

---

## Exit Criteria

Graceful error recovery.

---

# Phase 11 — Testing

Objective:

Validate application.

---

## Functional Testing

Verify:

* Chat works
* Theme works
* Retrieval works
* Responses accurate

---

## Responsive Testing

Devices:

* Mobile
* Tablet
* Desktop

---

## Performance Testing

Verify:

* Page load speed
* Response speed
* UI responsiveness

---

## Exit Criteria

No critical issues remain.

---

# Phase 12 — Documentation & Cleanup

Objective:

Prepare project for maintenance.

---

## Task 12.1

Review Documentation

---

## Task 12.2

Update Tracker.md

---

## Task 12.3

Remove Dead Code

---

## Task 12.4

Validate Folder Structure

---

## Exit Criteria

Project ready for release.

---

# Definition of Done

Version 1 is considered complete when:

* Chat interface is functional
* Ollama integration works
* Knowledge retrieval works
* Responses are context-aware
* Dark/light mode works
* Responsive design is complete
* Documentation is complete
* All Tracker.md items are marked completed
