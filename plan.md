Chat-Based Learning Experience — Plan
                                                          
 Context                                                

 Coursera's current UI is passive: watch a video, take a
 quiz, move on. This project reimagines the learner
 experience as a conversation. The chat agent is the
 primary UI — it sequences Coursera content, surfaces
 videos and code simulators inline, answers questions
 mid-lesson, and coaches learners through exercises
 Socratically. Target audience is working professionals
 learning tech/coding skills. Near-term goal: a
 compelling clickable prototype to show stakeholders.

 ---
 What I'd Build (for the demo)

 1. Chat Shell

 - Single-page chat interface (React + Tailwind)
 - Messages from the agent and learner render in a
 scrollable thread
 - Rich message types: text, video embed, code sandbox
 embed, multiple-choice prompt, progress nudge

 2. Inline Content Embeds

 - Video player: YouTube-style embed that appears as a
 chat "card" — learner can watch without leaving the
 conversation. Timestamp-aware so the agent can reference
  specific moments
 - Code simulator: Monaco editor card in the chat thread.
  Learner writes/runs code; agent sees output and reacts

 3. The Agent

 - Backed by Claude API (claude-sonnet-4-6)
 - System prompt gives the agent: the current course
 module, video transcript (chunked), exercise specs, and
 learner history for the session
 - Three modes the agent flips between:
   - Sequencer: decides what content to show next based
 on what the learner said
   - Q&A responder: answers questions about video content
  using the transcript as context
   - Socratic coach: when a learner submits code or an
 answer, never just gives the answer — asks a leading
 question or points to the relevant concept

 4. Mock Course Module

 - One hardcoded course to demo: e.g., "Intro to Python —
  Functions"
 - Content as simple JSON: ordered steps, each with type
 (video | exercise | checkpoint), title, transcript
 excerpt, starter code
 - No real Coursera API needed for the prototype

 ---
 What I'd Defer

 ┌────────────────────┬──────────────────────────────┐
 │      Deferred      │             Why              │
 ├────────────────────┼──────────────────────────────┤
 │ Real Coursera API  │ No public API; needs         │
 │ integration        │ partnership/internal access  │
 ├────────────────────┼──────────────────────────────┤
 │ User auth &        │ Session state in memory is   │
 │ accounts           │ enough for a demo            │
 ├────────────────────┼──────────────────────────────┤
 │ Progress           │ Not needed until internal    │
 │ persistence (DB)   │ dogfood stage                │
 ├────────────────────┼──────────────────────────────┤
 │ Full course        │ Distraction from the core    │
 │ catalog browser    │ chat experience              │
 ├────────────────────┼──────────────────────────────┤
 │ Video              │ Use manually prepared        │
 │ transcription      │ transcripts                  │
 │ pipeline           │                              │
 ├────────────────────┼──────────────────────────────┤
 │ Mobile             │ Desktop-first for            │
 │ responsiveness     │ stakeholder demo             │
 └────────────────────┴──────────────────────────────┘

 ---
 What's Still Unclear

 1. Coursera content access: Internal API or mock JSON?
 Changes whether this is a real integration or a demo
 skin.
 2. Stack constraints: Preference for Next.js vs. plain
 React? Needs to live inside existing Coursera frontend
 or standalone?
 3. Video transcript source: Existing subtitle files,
 YouTube captions, or a new speech-to-text step?
 4. Demo audience: Investors, internal product
 leadership, or eng? Determines fidelity bar.
 5. Simulator scope: Simple in-browser REPL vs.
 Docker-backed runner vs. domain-specific (SQL sandbox,
 terminal emulator)?