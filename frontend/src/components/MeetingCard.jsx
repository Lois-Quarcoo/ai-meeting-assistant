import { useNavigate } from 'react-router-dom'
import { FileText, ChevronRight } from 'lucide-react'

function MeetingCard({ id, title, meta, items, status }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/meetings/${id}`)}
      className="flex items-center justify-between px-4 py-3.5 bg-white/[0.04] ring-1 ring-white/10 rounded-xl shadow-lg shadow-black/40 cursor-pointer transition-all hover:-translate-y-0.5 hover:ring-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600/15 flex items-center justify-center">
          <FileText size={18} className="text-blue-400" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-white/40 text-xs mt-0.5">{meta} · {items}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          status === 'Done'
            ? 'bg-green-500/15 text-green-400 ring-1 ring-green-500/25'
            : 'bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/25'
        }`}>
          {status}
        </span>
        <ChevronRight size={16} className="text-white/30" />
      </div>
    </div>
  )
}

export default MeetingCard