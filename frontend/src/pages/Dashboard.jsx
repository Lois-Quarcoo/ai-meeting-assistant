import { Upload, FileText, Clock, ListChecks, TrendingUp } from 'lucide-react'

// Shared card style: reuse this on every page so it all looks consistent
const card = 'bg-white/[0.04] ring-1 ring-white/10 rounded-xl shadow-lg shadow-black/40'

const stats = [
  { label: 'Total Meetings', value: '48', sub: '12% this month', icon: FileText },
  { label: 'Hours Recorded', value: '124h', sub: '8% this week', icon: Clock },
  { label: 'Action Items', value: '12', sub: '4 pending', icon: ListChecks },
]

const meetings = [
  { title: 'Sprint Planning Q3', meta: '45 min · 4 people', status: 'Done' },
  { title: 'Design Review', meta: '30 min · 2 people', status: 'Processing' },
  { title: 'API Discussion', meta: '60 min · 2 people', status: 'Done' },
]

const speakers = [
  { name: 'Lois', pct: 38, bar: 'bg-blue-500' },
  { name: 'Emmanuel', pct: 29, bar: 'bg-blue-500/75' },
  { name: 'John', pct: 19, bar: 'bg-blue-500/50' },
  { name: 'Sarah', pct: 14, bar: 'bg-blue-500/30' },
]

function Dashboard() {
  return (
    <div className="p-8 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold tracking-tight">Good morning, Lois</h1>
          <p className="text-white/50 text-sm mt-1">You have 3 meetings to review today</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0">
          <Upload size={16} />
          Upload meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className={`${card} p-5 transition-all hover:-translate-y-0.5 hover:ring-white/20`}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center">
                <Icon size={16} className="text-blue-400" />
              </div>
            </div>
            <p className="text-white text-3xl font-semibold tracking-tight">{value}</p>
            <p className="text-blue-400 text-xs mt-2 flex items-center gap-1">
              <TrendingUp size={12} />
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-5 gap-4">

        {/* Recent meetings */}
        <div className={`${card} col-span-3 p-5`}>
          <p className="text-white text-sm font-medium mb-4">Recent meetings</p>
          <div className="flex flex-col gap-2">
            {meetings.map(({ title, meta, status }) => (
              <div
                key={title}
                className="flex items-center justify-between px-3 py-3 rounded-lg bg-white/[0.03] ring-1 ring-white/5 cursor-pointer hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center">
                    <FileText size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{title}</p>
                    <p className="text-white/40 text-xs mt-0.5">{meta}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  status === 'Done'
                    ? 'bg-green-500/15 text-green-400 ring-1 ring-green-500/25'
                    : 'bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/25'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Speakers */}
        <div className={`${card} col-span-2 p-5`}>
          <p className="text-white text-sm font-medium mb-4">Top speakers</p>
          <div className="flex flex-col gap-4">
            {speakers.map(({ name, pct, bar }) => (
              <div key={name}>
                <div className="flex justify-between mb-2">
                  <span className="text-white/70 text-xs">{name}</span>
                  <span className="text-white/40 text-xs">{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${bar} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Live badge */}
          <div className="mt-6 p-3 rounded-lg bg-white/[0.03] ring-1 ring-white/10">
            <p className="text-white/50 text-xs mb-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live now
            </p>
            <p className="text-white text-sm">Team standup · 8 min</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard