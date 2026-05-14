// Each turn: id, agent message, input type, chips, fallbackNextId
export const script = [
  {
    id: 'intro',
    agent: { type: 'text', content: "Hey! I'm your Coursera learning assistant. Today we're covering **Python Functions** — one of the most important building blocks you'll use every day as a developer. Ready to dive in?" },
    inputType: 'chips',
    chips: [
      { label: "Let's go!", nextId: 'what-is-function' },
      { label: 'Give me some context first', nextId: 'context' },
    ],
    fallbackNextId: 'what-is-function',
  },
  {
    id: 'context',
    agent: { type: 'text', content: "Functions let you package up a block of code and reuse it. Instead of writing the same logic ten times, you write it once and call it by name. Most of the Python you'll write professionally lives inside functions." },
    inputType: 'chips',
    chips: [{ label: 'Got it, keep going', nextId: 'what-is-function' }],
    fallbackNextId: 'what-is-function',
  },
  {
    id: 'what-is-function',
    agent: { type: 'text', content: "Let's start with a short video that covers the basics. Watch this, then we'll write some code together." },
    inputType: 'none',
    chips: [],
    fallbackNextId: 'video',
  },
  {
    id: 'video',
    agent: {
      type: 'video',
      title: 'Python Functions — The Basics',
      youtubeId: 'NSbOtYzIQI0',
    },
    inputType: 'chips',
    chips: [
      { label: 'That made sense', nextId: 'code-intro' },
      { label: 'Can you explain more?', nextId: 'explain-more' },
    ],
    fallbackNextId: 'code-intro',
  },
  {
    id: 'explain-more',
    agent: { type: 'text', content: "No problem. A function has three parts: a **name** (how you call it), **parameters** (optional inputs it receives), and a **return value** (optional output it gives back). You define it once with `def`, then call it as many times as you want." },
    inputType: 'chips',
    chips: [{ label: 'Makes sense now', nextId: 'code-intro' }],
    fallbackNextId: 'code-intro',
  },
  {
    id: 'code-intro',
    agent: { type: 'text', content: "Here's the simplest possible function. It takes a name and returns a greeting:" },
    inputType: 'none',
    chips: [],
    fallbackNextId: 'code-example',
  },
  {
    id: 'code-example',
    agent: {
      type: 'code',
      language: 'python',
      content: `def greet(name):
    return f"Hello, {name}!"

print(greet("Alex"))   # Hello, Alex!
print(greet("Jordan")) # Hello, Jordan!`,
    },
    inputType: 'chips',
    chips: [
      { label: 'I see how that works', nextId: 'practice-prompt' },
      { label: "What's the f before the string?", nextId: 'fstring' },
    ],
    fallbackNextId: 'practice-prompt',
  },
  {
    id: 'fstring',
    agent: { type: 'text', content: 'Good catch! The `f` before the string makes it an **f-string** — it lets you drop variables directly into the string using `{}`. So `f"Hello, {name}!"` inserts whatever `name` holds at that moment.' },
    inputType: 'chips',
    chips: [{ label: 'Got it', nextId: 'practice-prompt' }],
    fallbackNextId: 'practice-prompt',
  },
  {
    id: 'practice-prompt',
    agent: { type: 'text', content: "Your turn. How would you write a function called `add` that takes two numbers and returns their sum? Take a shot — type anything and I'll show you the answer." },
    inputType: 'text',
    chips: [],
    fallbackNextId: 'practice-answer',
  },
  {
    id: 'practice-answer',
    agent: {
      type: 'code',
      language: 'python',
      content: `def add(a, b):
    return a + b

print(add(3, 4))  # 7
print(add(10, 20)) # 30`,
    },
    inputType: 'chips',
    chips: [
      { label: 'That matches what I wrote', nextId: 'wrap-up' },
      { label: 'Ah, I see what I missed', nextId: 'wrap-up' },
    ],
    fallbackNextId: 'wrap-up',
  },
  {
    id: 'wrap-up',
    agent: { type: 'text', content: "Nice work! You've covered the core of Python functions: defining them with `def`, passing in parameters, and returning values. Next up we'll look at **default parameters** and **keyword arguments** — two patterns you'll see everywhere in real codebases. Ready to continue?" },
    inputType: 'chips',
    chips: [
      { label: "Yes, keep going", nextId: 'end' },
      { label: 'Take a break', nextId: 'end' },
    ],
    fallbackNextId: 'end',
  },
  {
    id: 'end',
    agent: { type: 'text', content: "Great session! You've completed **Python Functions — Part 1**. Your progress is saved. Come back anytime to continue with default parameters." },
    inputType: 'none',
    chips: [],
    fallbackNextId: null,
  },
]
