import { useState } from 'react'

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
    <div className="relative flex flex-col h-screen p-6 overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute bottom-[-40px] left-[100px] w-64 h-64 bg-purple-700 opacity-10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-[-40px] right-[60px] w-52 h-52 bg-blue-600 opacity-10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.07]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-base">
          🤖
        </div>
        <div>
          <h1 className="text-white text-sm font-medium">AI Meeting Chat</h1>
          <p className="text-white/35 text-xs">Ask anything about your meetings</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => send(s)}
            className="text-xs px-3 py-1.5 rounded-full bg-purple-600/15 border border-purple-600/25 text-purple-300 hover:bg-purple-600/25 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-3'}`}>
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">
                🤖
              </div>
            )}
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-purple-600/35 to-blue-600/30 border border-purple-600/40 text-purple-100 rounded-br-sm'
                : 'bg-white/[0.05] border border-white/[0.08] text-white/70 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 pt-4 border-t border-white/[0.07]">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about your meetings..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-white/25 outline-none focus:border-purple-600/50 transition-colors"
        />
        <button
          onClick={() => send()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-lg shadow-purple-700/30 hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default AIChat