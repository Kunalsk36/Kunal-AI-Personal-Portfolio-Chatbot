# Design.md

# Kunal AI – Personal Portfolio Chatbot

Version: 1.0

Status: Draft

Owner: Kunal Shrikant Kavathekar

Related Documents:

* PRD.md
* TechSpec.md
* Rules.md
* ImplementationPlan.md

---

# 1. Design Philosophy

The application should feel modern, professional, clean, and trustworthy.

The design should follow principles inspired by:

* ChatGPT
* Claude
* Gemini

The interface should prioritize readability and conversation.

The chatbot is the product.

There should be no unnecessary sections, cards, dashboards, or visual clutter.

Users should immediately understand that they can start asking questions.

---

# 2. Design Goals

## Primary Goals

* Simple
* Minimal
* Professional
* Fast
* Responsive
* Easy to read

---

## Secondary Goals

* Demonstrate frontend skills
* Showcase attention to detail
* Feel production-ready
* Recruiter-friendly experience

---

# 3. Layout Structure

The application contains three main sections:

```text
+--------------------------------+
|            Header              |
+--------------------------------+
|                                |
|                                |
|                                |
|         Chat Messages          |
|                                |
|                                |
|                                |
+--------------------------------+
|         Input Section          |
+--------------------------------+
```

The chat area should occupy most of the screen.

---

# 4. Page Layout

The application uses a single-page layout.

No sidebar.

No navigation menu.

No multiple pages.

Everything exists within a single chat interface.

---

# 5. Header Design

Position:

Fixed at top.

Height:

64px

---

Contents:

Left Side:

* Kunal AI
* Status Text

Right Side:

* Theme Toggle

---

Header Example

```text
Kunal AI
Personal Portfolio Assistant
```

---

Status Text

Default:

```text
Ask me about my projects, skills and experience
```

---

Header Behavior

* Always visible
* Sticky on scroll
* Subtle border at bottom

---

# 6. Chat Area

The chat area is the primary content region.

Messages should scroll independently.

The input area must remain visible.

---

Chat Area Behavior

* Auto-scroll to latest message
* Smooth scrolling
* Preserve conversation history during session

---

# 7. Empty State

When no messages exist:

Display centered welcome section.

---

Title

```text
Hi, I'm Kunal AI
```

---

Subtitle

```text
Ask me anything about my skills,
projects, experience, education,
research and achievements.
```

---

Suggested Questions

Display example prompts.

Example:

```text
Tell me about yourself

What projects have you worked on?

What skills do you have?

Tell me about your internship

What is PathReco?
```

---

Behavior

Clicking a suggestion automatically sends it.

---

# 8. Message Design

Messages should resemble modern AI applications.

---

User Messages

Alignment:

Right

Appearance:

* Filled bubble
* Orange accent background
* White text

---

Assistant Messages

Alignment:

Left

Appearance:

* Neutral surface color
* Rounded corners
* High readability

---

Message Width

Desktop:

Maximum 800px

Mobile:

90% width

---

Message Spacing

Vertical:

16px

Horizontal:

16px

---

Message Border Radius

16px

---

# 9. Typing Indicator

When waiting for a response:

Display typing indicator.

Example:

```text
● ● ●
```

Animated.

---

Behavior

Visible only while response is loading.

---

# 10. Input Area

Position:

Fixed at bottom.

Always visible.

---

Structure

```text
+-----------------------------------+
|                                   |
| Enter your message...             |
|                           [Send]  |
+-----------------------------------+
```

---

Input Features

* Single line input
* Expands to multiple lines
* Maximum 6 visible lines
* Enter to send
* Shift + Enter for newline

---

Placeholder

```text
Ask Kunal AI anything...
```

---

Send Button

State:

Enabled only when input exists.

---

# 11. Theme System

The application supports:

* Dark Theme
* Light Theme

---

# 12. Dark Theme

Primary Background

```css
#0F0F0F
```

---

Secondary Surface

```css
#171717
```

---

Message Surface

```css
#212121
```

---

Border

```css
#2A2A2A
```

---

Primary Text

```css
#FFFFFF
```

---

Secondary Text

```css
#A1A1AA
```

---

Accent

```css
#F97316
```

---

# 13. Light Theme

Primary Background

```css
#FFFFFF
```

---

Secondary Surface

```css
#F8F8F8
```

---

Message Surface

```css
#F2F2F2
```

---

Border

```css
#E5E5E5
```

---

Primary Text

```css
#111111
```

---

Secondary Text

```css
#6B7280
```

---

Accent

```css
#F97316
```

---

# 14. Typography

Font Family

```css
Inter
```

Fallback

```css
sans-serif
```

---

Heading

Weight:

600

---

Body Text

Weight:

400

---

Message Text

Weight:

400

---

Line Height

1.6

---

# 15. Spacing System

Base Unit

```css
4px
```

Spacing Scale

```css
4px
8px
12px
16px
24px
32px
48px
64px
```

All components must use this spacing scale.

---

# 16. Responsive Design

Mobile First.

---

Mobile

Width:

320px+

Behavior:

* Full width layout
* Compact spacing
* Larger tap targets

---

Tablet

Width:

768px+

Centered content.

---

Desktop

Width:

1024px+

Messages centered.

Maximum content width:

1200px

---

# 17. Animations

Use subtle animations only.

---

Message Appearance

Fade In

Duration:

200ms

---

Theme Switch

Transition:

200ms

---

Typing Indicator

Smooth looping animation.

---

# 18. Accessibility

Minimum contrast ratio:

WCAG AA

---

Keyboard Support

Users must be able to:

* Navigate using keyboard
* Send messages
* Switch themes

---

Focus States

Visible on all interactive elements.

---

# 19. Loading States

While waiting for AI response:

* Disable Send Button
* Show Typing Indicator

Do not freeze UI.

---

# 20. Error States

Display friendly error messages.

Example:

```text
Unable to connect to Kunal AI.
Please try again.
```

---

# 21. Future Design Enhancements

Not part of Version 1.

* Voice Input
* Voice Output
* Chat Export
* Message Search
* Conversation History
* User Profiles
* Attachments
* Avatar Support
* Streaming Responses

---

# 22. Final Design Principles

Every UI decision should follow:

1. Conversation First
2. Minimal Visual Noise
3. High Readability
4. Professional Appearance
5. Mobile Responsiveness
6. Accessibility
7. Consistency
8. Performance

If a feature does not improve the conversation experience, it should not be included in Version 1.
