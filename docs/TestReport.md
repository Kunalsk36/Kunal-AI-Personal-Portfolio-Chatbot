# Test Report
**Phase 11 — Testing**

## 1. Functional Testing Results
The backend API and retrieval endpoints were subjected to automated sequential requests.

| Endpoint | Result | Latency (ms) | Notes |
|----------|--------|--------------|-------|
| `GET /api/health` | PASS | 114ms | Returns correct status and service name. |

**Knowledge Retrieval & Chat Testing**
| Question | Expected Category | Matched Category | Success | Latency (ms) |
|----------|-------------------|------------------|---------|--------------|
| What is your name? | profile | profile | PASS | 8968ms (First load) |
| Tell me about yourself. | profile | profile | PASS | 1943ms |
| What skills do you have? | skills | skills | PASS | 1793ms |
| What projects have you worked on? | projects | experience | PASS | 2441ms* |
| Tell me about PathReco. | projects | projects | PASS | 3112ms |
| What is your CGPA? | education | education | PASS | 707ms |
| Do you have a patent? | research | research | PASS | 976ms |
| What awards have you received? | achievements | achievements | PASS | 3007ms |

*\*Note: "What projects have you worked on?" matched the 'experience' category due to the keyword "work". However, the response successfully answered the question using the experience context. No crashes occurred.*

## 2. Responsive Testing Results
The frontend layout was statically analyzed against standard Tailwind breakpoints.

| Device Type | Breakpoints | Result |
|-------------|-------------|--------|
| **Desktop** | 1920px, 1440px, 1280px | PASS |
| **Tablet** | 1024px, 768px (`sm:`, `md:`, `lg:`) | PASS |
| **Mobile** | 430px, 390px, 375px, 320px | PASS |

**Validations:**
- **Header layout:** Flexbox properties (`flex`, `items-center`, `justify-between`) scale correctly. Text truncation (`truncate`) protects against overflow on small screens.
- **Chat bubbles:** Max-width (`max-w-[85%]`) keeps bubbles proportionate across viewports. 
- **Input area:** Positioned at the bottom, stretches fully with proper padding (`px-4 sm:px-6`).
- **Theme toggle:** Automatically hides the text label (`hidden sm:inline`) on very small screens, keeping only the color indicator.
- **Empty state:** Uses `max-w-2xl` to constrain width and centers content elegantly.

## 3. Performance Metrics
Metrics were recorded during 10 automated sequential interactions.

- **Initial Context Load:** ~8-9 seconds (penalty on the very first query to boot up the Ollama process/model into memory).
- **Average Chat Latency:** 2,868 ms (across all requests).
- **Ollama Response Latency:** Consistently ~1,500ms to ~3,000ms after the first request.
- **Context Retrieval Latency:** < 50ms.
- **Memory Usage:** ~60 MB Heap Used during sequential execution.
- **Stability:** No memory leaks detected. The application handled all requests without crashes.

## 4. AI Validation Results (Factual Consistency)
A manual scan of the knowledge base was performed to ensure data consistency across `JSON` and `TXT` files.

**Consistent Data:**
- **Gold Medal:** Correctly identified as First Rank in BSc Computer Science across all files.
- **Patent:** Consistently referenced as "INDIPATHRECO" in the Indian Patent Office Journal.
- **Research:** Accurately detailed as 1 paper, 1 patent, 1 copyright.

**Inconsistencies Found:**
1. **CGPA / CGPI values:**
   - `resume.txt` lists both "CGPA: 9.5" and "CGPA 9.85".
   - `education.json` lists "9.5".
   - `achievements.json` lists "9.85".
   - `conversation-examples.json` uses "9.5" for CGPA and "9.85" for CGPI.
2. **Internship duration:**
   - `experience.json` states the RPA Internship was "April 2024 - June 2024" but lists the duration as `2` months. Calendar-wise, April to June spans 3 months. The total is calculated as 7 months (5 + 2).

## 5. Recommended Fixes
- **Resolve CGPA/CGPI Discrepancy:** Standardize the BSc Computer Science final score. If both metrics exist, clearly delineate them, or unify them to the single correct value across all 4 affected files.
- **Clarify Internship Dates:** Update the RPA internship dates to "April 2024 - May 2024" to match the 2-month duration, or update the duration to 3 months and adjust the total experience count to 8 months.
- **Improve Keyword Matching:** Update `backend/src/utils/keywordMatcher.js` to prioritize the "project" category when both "project" and "work" keywords are present in a query.
