import { useState } from 'react'
import { Search, Plus } from 'lucide-react'
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
    <div className="p-8 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold tracking-tight">All meetings</h1>
          <p className="text-white/50 text-sm mt-1">{allMeetings.length} meetings total</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0">
          <Plus size={16} />
          New meeting
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] ring-1 ring-white/10 rounded-lg shadow-md shadow-black/30 focus-within:ring-blue-500/50 transition-all">
          <Search size={16} className="text-white/40" />
          <input
            type="text"
            placeholder="Search meetings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm placeholder-white/30 outline-none w-full"
          />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                active === f
                  ? 'bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/30'
                  : 'bg-white/[0.04] text-white/50 ring-1 ring-white/10 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Meetings list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="text-white/40 text-sm text-center mt-10">No meetings found</p>
        ) : (
          filtered.map((m) => <MeetingCard key={m.id} {...m} />)
        )}
      </div>
    </div>
  )
}

export default Meetings