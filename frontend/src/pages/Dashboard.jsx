const stats = [
  { label: 'Total Meetings', value: '48', sub: '↑ 12% this month', color: 'text-purple-400' },
  { label: 'Hours Recorded', value: '124h', sub: '↑ 8% this week', color: 'text-blue-400' },
  { label: 'Action Items', value: '12', sub: '4 pending', color: 'text-teal-400' },
]

const meetings = [
  { title: 'Sprint Planning Q3', meta: '45 min · 4 people', status: 'Done', color: 'bg-purple-600/20 text-purple-300' },
  { title: 'Design Review', meta: '30 min · 2 people', status: 'Processing', color: 'bg-yellow-600/20 text-yellow-300' },
  { title: 'API Discussion', meta: '60 min · 2 people', status: 'Done', color: 'bg-purple-600/20 text-purple-300' },
]

const speakers = [
  { name: 'Lois', pct: 38, from: 'from-purple-600', to: 'to-purple-400' },
  { name: 'Emmanuel', pct: 29, from: 'from-blue-600', to: 'to-blue-400' },
  { name: 'John', pct: 19, from: 'from-teal-600', to: 'to-teal-400' },
  { name: 'Sarah', pct: 14, from: 'from-violet-600', to: 'to-violet-400' },
]

function Dashboard() {
  return (
    <div className="relative p-6 min-h-screen overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute top-[-80px] left-[60px] w-72 h-72 bg-purple-700 opacity-10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-40px] right-[80px] w-52 h-52 bg-blue-600 opacity-10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-medium tracking-tight">Good morning, Lois ✦</h1>
          <p className="text-white/40 text-sm mt-1">You have 3 meetings to review today</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-lg shadow-purple-700/30 hover:opacity-90 transition-opacity">
          ↑ Upload meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {stats.map(({ label, value, sub, color }) => (
          <div key={label} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{label}</p>
            <p className={`text-3xl font-medium tracking-tight ${color}`}>{value}</p>
            <p className="text-green-400 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-5 gap-3">

        {/* Recent meetings */}
        <div className="col-span-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
          <p className="text-white/70 text-sm font-medium mb-3">Recent meetings</p>
          <div className="flex flex-col gap-2">
            {meetings.map(({ title, meta, status, color }) => (
              <div key={title} className="flex items-center justify-between px-3 py-2.5 bg-white/[0.03] border border-white/[0.05] rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-300 text-sm">🗂</div>
                  <div>
                    <p className="text-white text-sm font-medium">{title}</p>
                    <p className="text-white/35 text-xs mt-0.5">{meta}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${color}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Speakers */}
        <div className="col-span-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
          <p className="text-white/70 text-sm font-medium mb-3">Top speakers</p>
          <div className="flex flex-col gap-3">
            {speakers.map(({ name, pct, from, to }) => (
              <div key={name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/60 text-xs">{name}</span>
                  <span className="text-white/30 text-xs">{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${from} ${to} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Live badge */}
          <div className="mt-4 p-3 rounded-xl bg-red-500/[0.08] border border-red-500/20">
            <p className="text-white/40 text-xs mb-1">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
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