import { useNavigate } from 'react-router-dom'

function MeetingCard({ id, title, meta, items, status, color }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/meetings/${id}`)}
      className="flex items-center justify-between px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl cursor-pointer hover:bg-white/[0.06] transition-all"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} opacity-80 flex items-center justify-center text-white text-base`}>
          🗂
        </div>
        <div>
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-white/35 text-xs mt-0.5">{meta} · {items}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          status === 'Done'
            ? 'bg-green-500/15 text-green-400 border border-green-500/25'
            : 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25'
        }`}>
          {status}
        </span>
        <span className="text-white/20 text-sm">›</span>
      </div>
    </div>
  )
}

export default MeetingCard