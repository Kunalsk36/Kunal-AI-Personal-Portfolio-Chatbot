# PRD.md

# Kunal AI – Personal Portfolio Chatbot

Version: 1.0

Status: Draft

Owner: Kunal Shrikant Kavathekar

---

# 1. Product Overview

Kunal AI is a personal AI-powered chatbot designed to answer questions about Kunal Kavathekar's education, skills, projects, experience, achievements, research work, publications, and professional background.

The chatbot serves as an interactive digital representation of Kunal's portfolio and professional profile. Instead of navigating through multiple portfolio sections, recruiters, hiring managers, developers, and visitors can ask questions naturally and receive contextual responses.

The application will use a locally running Large Language Model (LLM) through Ollama and will answer exclusively from a curated knowledge base maintained by Kunal.

The chatbot must respond as Kunal and provide accurate information derived from supplied context.

---

# 2. Problem Statement

Traditional portfolio websites require visitors to manually browse multiple pages to understand a candidate's background.

Recruiters often spend limited time reviewing portfolios and may miss important achievements, projects, certifications, research contributions, or technical skills.

A conversational interface can significantly improve information accessibility and user engagement by allowing visitors to ask questions directly.

Example:

Instead of:

* Opening About Page
* Opening Projects Page
* Opening Resume
* Opening Research Section

A visitor can simply ask:

"Tell me about your internship."

or

"What technologies were used in PathReco?"

and immediately receive an answer.

---

# 3. Product Vision

Create an intelligent portfolio assistant that can communicate Kunal's professional profile in a conversational manner while maintaining accuracy, consistency, and simplicity.

The chatbot should feel like a direct conversation with Kunal.

---

# 4. Goals

## Primary Goals

* Provide accurate answers about Kunal.
* Improve recruiter and visitor engagement.
* Demonstrate AI integration skills.
* Showcase full-stack development capabilities.
* Present portfolio information conversationally.

## Secondary Goals

* Create a strong portfolio project.
* Demonstrate practical usage of local LLMs.
* Build a scalable foundation for future AI features.

---

# 5. Non-Goals

The following features are intentionally excluded from Version 1:

* Voice input
* Voice output
* User authentication
* User accounts
* Database integration
* File uploads
* Multi-user personalization
* Image generation
* Internet access
* Agentic workflows
* External APIs
* Model training
* Fine-tuning
* Mobile application

---

# 6. Target Users

## Primary Users

### Recruiters

Want quick information regarding:

* Skills
* Experience
* Projects
* Education
* Availability

### Hiring Managers

Want deeper project and technical discussions.

### Technical Interviewers

Want details about:

* Technology stack
* Research work
* Internship experience
* Project architecture

---

## Secondary Users

### Students

Interested in learning about projects and academic achievements.

### Developers

Interested in implementation details and technical work.

---

# 7. User Stories

## About Me

As a visitor,

I want to ask who Kunal is,

So that I can quickly understand his background.

---

## Skills

As a recruiter,

I want to ask about technical skills,

So that I can evaluate relevant expertise.

---

## Projects

As a hiring manager,

I want to ask about projects,

So that I can assess practical experience.

---

## Experience

As an interviewer,

I want to ask about internships and work experience,

So that I can understand industry exposure.

---

## Research

As a visitor,

I want to ask about research papers and patents,

So that I can understand academic contributions.

---

# 8. Core Features

## Feature 1: Conversational Chat Interface

Users can communicate with the chatbot using natural language.

Examples:

* What is your name?
* Tell me about yourself.
* What projects have you worked on?
* What skills do you have?
* What did you do during your internship?

---

## Feature 2: Context-Aware Responses

The chatbot must understand different variations of the same question.

Examples:

All of the following should produce similar responses:

* What is your name?
* What's your name?
* Can I know your name?
* What should I call you?
* Could you introduce yourself?

---

## Feature 3: Knowledge-Based Responses

Answers must be generated using information stored in the knowledge base.

Knowledge Sources:

* JSON files
* TXT documents

The chatbot must not invent information.

---

## Feature 4: Persistent Conversation Session

The chatbot should maintain conversation context during the current session.

Example:

User:

Tell me about PathReco.

User:

What technologies were used?

The chatbot should understand that the second question refers to PathReco.

---

## Feature 5: Theme Switching

The application must support:

* Dark Theme
* Light Theme

Theme selection should persist during the session.

---

# 9. Knowledge Base

The system will use structured and unstructured information.

## Structured Data

* profile.json
* education.json
* skills.json
* experience.json
* projects.json
* achievements.json
* research.json

## Text Documents

* resume.txt
* linkedin-profile.txt
* research-paper.txt

---

# 10. User Interface Requirements

## Layout

The interface should resemble modern AI chat applications.

### Header

Display:

* Kunal AI
* Short descriptive subtitle

Example:

"Kunal AI"

"Personal Portfolio Assistant"

---

### Chat Area

Display:

* User messages
* Assistant messages
* Conversation history

Messages should be visually distinguishable.

---

### Input Area

Display:

* Single text input field
* Send button

No voice controls.

No file upload controls.

---

## Theme

### Dark Mode

Primary Colors:

* Black
* Dark Grey
* Light Grey
* Orange Accent

### Light Mode

Primary Colors:

* White
* Grey
* Dark Text
* Orange Accent

---

# 11. Success Criteria

The product will be considered successful if:

* The chatbot answers portfolio-related questions accurately.
* Responses remain grounded in the provided knowledge base.
* Visitors can discover information faster than browsing manually.
* The interface feels professional and responsive.
* The application performs smoothly on local hardware.

---

# 12. Future Enhancements

The following may be considered after Version 1:

* Voice Input
* Voice Output
* Resume Upload
* Semantic Search
* Vector Database
* Advanced RAG
* Multi-language Support
* Public Deployment
* Analytics Dashboard
* Portfolio Integration
* Avatar-Based Interface

---

# 13. Release Scope

Version 1 includes:

* ChatGPT-style UI
* Local Ollama integration
* Qwen 2.5 1.5B model
* JSON knowledge base
* TXT document support
* Dark mode
* Light mode
* Responsive layout
* Context-aware conversation

No additional features are required for the initial release.
