Initial plan

Claude assumed: working system w/ Claude API wired up, system prompts, and transcript context. 

What I want: Fully scripted prototype. Hardcoded agent replies tied to specific inputs. No LLM calls. 

---
Claude assumed: agent needs three modes (sequencer, q&a responder, socratic coach) that flips between based on what the learner does. 

What I want: no modes. one linear scripted path of pre-written messages. chips and typed input advance to the next message.

---
Claude assumed: video embeds need to be timestamp-aware so the agent can reference specific moments

What i want: a plain youtube embed inside a chat card. play, watch, move on.

---
Claude assumed: transcripts need to be chunked and passed to the agent as context.

what i want: no transcript. the agent never reads anything. it just shows the next scripted message.

---
claude assumed: mock course module should be structured JSON so the agent can sequence dynamically. 

what i want: one hardcoded script - an array of turns w/ agent text, input type, and what each input routes to. no dynamic sequencing.

---
claude assumed: right things to defer are real coursera api, auth, db persistence, catalogue browser, transcription and mobile. 

what i want: defer all of that plus the entire agent backend - claude api, system prompts, transcripts, code execution, mode-switching. for this prototype, those are not 'later', they're 'faked'.

---
claude assumed: the open questions worht asking are about coursera api access, stack constraints, transcript source, demo audience, and simulator scope. 

what i want: the only open questions are react vs next.js, tailwind yes/no, monaco vs simpler code block, and any design system match.

---
claude didn't mention: reset button to re-run the demo cleanly, and a fallback so any typed input still advances the script ( chips are the primary path; typing shouldn't be able to break the demo). 

what i want: both, included from the start.