import { useState, useEffect, useRef } from 'react'
import { script } from './script.js'
import { Highlight, themes } from 'prism-react-renderer'

const scriptMap = Object.fromEntries(script.map(t => [t.id, t]))

function AgentBubble({ children }) {
  return (
    <div className="flex gap-3 items-start max-w-2xl">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cds-blue-700 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        </svg>
      </div>
      <div className="bg-white border border-cds-neutral-stroke rounded-2xl rounded-tl-sm px-4 py-3 text-body-primary text-cds-neutral-primary shadow-sm">
        {children}
      </div>
    </div>
  )
}

function LearnerBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div className="bg-cds-blue-700 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-body-primary max-w-sm shadow-sm">
        {children}
      </div>
    </div>
  )
}

function parseMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-gray-100 text-cds-blue-950 text-sm font-mono px-1 rounded">{part.slice(1, -1)}</code>
    return part
  })
}

function AgentText({ content }) {
  return <p>{parseMarkdown(content)}</p>
}

function AgentVideo({ title, youtubeId }) {
  return (
    <div className="space-y-2">
      <p className="text-subtitle-md font-semibold text-cds-neutral-primary">{title}</p>
      <div className="rounded-xl overflow-hidden border border-cds-neutral-stroke" style={{ aspectRatio: '16/9', width: '100%', minWidth: 340 }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

function AgentCode({ language, content }) {
  return (
    <Highlight theme={themes.github} code={content} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className="rounded-xl overflow-x-auto text-sm p-4 bg-gray-50 border border-gray-200 font-mono leading-relaxed" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

function AgentMessage({ msg }) {
  if (msg.type === 'text')  return <AgentText content={msg.content} />
  if (msg.type === 'video') return <AgentVideo title={msg.title} youtubeId={msg.youtubeId} />
  if (msg.type === 'code')  return <AgentCode language={msg.language} content={msg.content} />
  return null
}

function ChipBar({ chips, onChip }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {chips.map(chip => (
        <button
          key={chip.nextId}
          onClick={() => onChip(chip)}
          className="px-4 py-2 rounded-full border-2 border-cds-blue-700 text-cds-blue-700 text-action-secondary font-semibold hover:bg-cds-blue-700 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cds-interactive-focus"
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([])   // {from: 'agent'|'learner', content: jsx|string, raw: turn}
  const [currentId, setCurrentId] = useState('intro')
  const [inputValue, setInputValue] = useState('')
  const [inputLocked, setInputLocked] = useState(false)
  const bottomRef = useRef(null)

  // Advance to a turn and append the agent message
  function showTurn(id) {
    const turn = scriptMap[id]
    if (!turn) return
    setCurrentId(id)
    setInputLocked(false)
    setMessages(prev => [...prev, { from: 'agent', turn }])
    if (turn.inputType === 'none' && turn.fallbackNextId) {
      setInputLocked(true)
      setTimeout(() => showTurn(turn.fallbackNextId), 900)
    }
  }

  // Init: show first turn
  useEffect(() => { showTurn('intro') }, [])

  // Scroll to bottom on new messages
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function handleChip(chip) {
    if (inputLocked) return
    setInputLocked(true)
    setMessages(prev => [...prev, { from: 'learner', text: chip.label }])
    setTimeout(() => showTurn(chip.nextId), 400)
  }

  function handleTextSubmit(e) {
    e.preventDefault()
    const turn = scriptMap[currentId]
    if (!turn || inputLocked || !inputValue.trim()) return
    const typed = inputValue.trim()
    setInputValue('')
    setInputLocked(true)
    setMessages(prev => [...prev, { from: 'learner', text: typed }])
    if (turn.fallbackNextId) setTimeout(() => showTurn(turn.fallbackNextId), 400)
  }

  function reset() {
    setMessages([])
    setInputValue('')
    setInputLocked(false)
    setTimeout(() => showTurn('intro'), 50)
  }

  const currentTurn = scriptMap[currentId]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-cds-neutral-stroke px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-cds-blue-700 font-bold text-subtitle-lg tracking-tight">coursera</span>
          <span className="text-cds-neutral-divider">|</span>
          <span className="text-body-secondary text-cds-neutral-primary">Python Functions · Part 1</span>
        </div>
        <button
          onClick={reset}
          className="text-action-secondary text-cds-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-cds-interactive-focus rounded px-2 py-1"
        >
          ↺ Restart
        </button>
      </header>

      {/* Chat thread */}
      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-4 max-w-3xl w-full mx-auto">
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1
          if (msg.from === 'learner') {
            return <LearnerBubble key={i}>{msg.text}</LearnerBubble>
          }
          return (
            <AgentBubble key={i}>
              <AgentMessage msg={msg.turn.agent} />
              {isLast && msg.turn.inputType === 'chips' && !inputLocked && (
                <ChipBar chips={msg.turn.chips} onChip={handleChip} />
              )}
            </AgentBubble>
          )
        })}
        <div ref={bottomRef} />
      </main>

      {/* Text input — only shown when current turn expects text */}
      {currentTurn?.inputType === 'text' && (
        <div className="bg-white border-t border-cds-neutral-stroke px-6 py-4 sticky bottom-0">
          <form onSubmit={handleTextSubmit} className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type your answer…"
              disabled={inputLocked}
              className="flex-1 border border-cds-neutral-stroke rounded-xl px-4 py-3 text-body-primary focus:outline-none focus:ring-2 focus:ring-cds-interactive-focus disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={inputLocked || !inputValue.trim()}
              className="bg-cds-blue-700 text-white px-6 py-3 rounded-xl text-action-primary font-semibold hover:bg-cds-blue-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cds-interactive-focus"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
