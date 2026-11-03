import { useState } from 'react'
import MeetingCard from '../components/MeetingCard'
import useMeetingStore from '../store/useMeetingStore'

const filters = ['All', 'Done', 'Processing']

function Meetings() {
  const allMeetings = useMeetingStore((state) => state.meetings)
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('All')

  const filtered = allMeetings.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = active === 'All' || m.status === active
    return matchSearch && matchFilter
  })

  return (
    <div className="relative p-6 min-h-screen overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute top-[-60px] right-[40px] w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-medium tracking-tight">All meetings</h1>
          <p className="text-white/40 text-sm mt-1">{allMeetings.length} meetings total</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-lg shadow-purple-700/30 hover:opacity-90 transition-opacity">
          + New meeting
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl">
          <span className="text-white/30">🔍</span>
          <input
            type="text"
            placeholder="Search meetings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm placeholder-white/25 outline-none w-full"
          />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                active === f
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                  : 'bg-white/[0.04] text-white/40 border border-white/[0.08] hover:text-white/60'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Meetings list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-white/30 text-sm text-center mt-10">No meetings found</p>
        ) : (
          filtered.map((m) => <MeetingCard key={m.id} {...m} />)
        )}
      </div>
    </div>
  )
}

export default Meetings