import { useState } from 'react'
import { Check } from 'lucide-react'

function ActionItem({ person, task }) {
  const [done, setDone] = useState(false)

  return (
    <div
      onClick={() => setDone(!done)}
      className="flex items-start gap-3 cursor-pointer group"
    >
      <div className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
        done
          ? 'bg-blue-600 shadow-md shadow-blue-600/40'
          : 'ring-1 ring-white/20 group-hover:ring-blue-400'
      }`}>
        {done && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>
      <p className={`text-sm transition-all ${done ? 'text-white/30 line-through' : 'text-white/70'}`}>
        <span className={done ? 'text-white/40' : 'text-white font-medium'}>{person}</span> → {task}
      </p>
    </div>
  )
}

export default ActionItem