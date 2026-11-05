import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'

const suggestions = [
  'What did Sarah say about the API docs?',
  'Who was assigned the deployment task?',
  'Summarize my action items for this week.',
]

const initialMessages = [
  { role: 'user', text: 'What did Sarah say about the API docs?' },
  { role: 'ai', text: 'In the Sprint Planning Q3 meeting, Sarah said she can have the API docs ready by Wednesday. She was also assigned the action item to create the API documentation.' },
]

function AIChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  // Scroll to the newest message whenever the list changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = (text) => {
    const message = text || input
    if (!message.trim()) return
    setMessages(prev => [
      ...prev,
      { role: 'user', text: message },
      { role: 'ai', text: 'I am searching through your meetings for that information...' },
    ])
    setInput('')
  }

  return (
    <div className="flex flex-col h-screen p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-white text-base font-semibold">AI Meeting Chat</h1>
          <p className="text-white/50 text-xs">Ask anything about your meetings</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-5">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => send(s)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/10 text-white/70 hover:text-blue-400 hover:ring-blue-500/40 transition-all"
          >
            <Sparkles size={12} />
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 mb-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} className="text-blue-400" />
              </div>
            )}
            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-sm shadow-lg shadow-blue-600/20'
                : 'bg-white/[0.04] ring-1 ring-white/10 text-white/80 rounded-bl-sm shadow-lg shadow-black/40'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3 pt-5 border-t border-white/10">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about your meetings..."
          className="flex-1 px-4 py-3 rounded-lg bg-white/[0.04] ring-1 ring-white/10 text-white text-sm placeholder-white/30 outline-none focus:ring-blue-500/50 shadow-md shadow-black/30 transition-all"
        />
        <button
          onClick={() => send()}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Send size={15} />
          Send
        </button>
      </div>

    </div>
  )
}

export default AIChat