import { useState } from 'react'

function ActionItem({ person, task }) {
  const [done, setDone] = useState(false)

  return (
    <div
      onClick={() => setDone(!done)}
      className="flex items-start gap-3 cursor-pointer group"
    >
      <div className={`w-4 h-4 mt-0.5 rounded-md border flex items-center justify-center text-[10px] flex-shrink-0 transition-all ${
        done
          ? 'bg-purple-600 border-purple-600 text-white'
          : 'border-white/20 group-hover:border-purple-400'
      }`}>
        {done && '✓'}
      </div>
      <p className={`text-sm transition-all ${done ? 'text-white/25 line-through' : 'text-white/60'}`}>
        <span className="text-white font-medium">{person}</span> → {task}
      </p>
    </div>
  )
}

export default ActionItem