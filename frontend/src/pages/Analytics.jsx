const stats = [
  { label: 'Total Meetings', value: '48', color: 'text-purple-400' },
  { label: 'Hours Recorded', value: '124h', color: 'text-blue-400' },
  { label: 'Avg Length', value: '3.2h', color: 'text-teal-400' },
  { label: 'Action Items', value: '84', color: 'text-pink-400' },
]

const speakers = [
  { name: 'Lois', pct: 38, from: 'from-purple-600', to: 'to-purple-400' },
  { name: 'Emmanuel', pct: 29, from: 'from-blue-600', to: 'to-blue-400' },
  { name: 'John', pct: 19, from: 'from-teal-600', to: 'to-teal-400' },
  { name: 'Sarah', pct: 14, from: 'from-violet-600', to: 'to-violet-400' },
]

const days = [
  { day: 'Mon', meetings: 6 },
  { day: 'Tue', meetings: 9 },
  { day: 'Wed', meetings: 4 },
  { day: 'Thu', meetings: 11 },
  { day: 'Fri', meetings: 7 },
  { day: 'Sat', meetings: 3 },
  { day: 'Sun', meetings: 5 },
]

const maxMeetings = Math.max(...days.map(d => d.meetings))

const topics = [
  { label: 'Frontend', count: 14, color: 'bg-purple-500' },
  { label: 'Backend', count: 11, color: 'bg-blue-500' },
  { label: 'Design', count: 8, color: 'bg-teal-500' },
  { label: 'Planning', count: 9, color: 'bg-pink-500' },
  { label: 'Deployment', count: 6, color: 'bg-violet-500' },
]

function Analytics() {
  return (
    <div className="relative p-6 min-h-screen overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-40px] w-72 h-72 bg-blue-600 opacity-10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[60px] w-60 h-60 bg-purple-700 opacity-10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-medium tracking-tight">Analytics</h1>
          <p className="text-white/40 text-sm mt-1">Your meeting insights at a glance</p>
        </div>
        <button className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/40 text-xs hover:text-white/60 transition-colors">
          Last 30 days ↓
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 text-center">
            <p className="text-white/35 text-xs uppercase tracking-wider mb-2">{label}</p>
            <p className={`text-3xl font-medium tracking-tight ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-5 gap-3 mb-3">

        {/* Bar chart */}
        <div className="col-span-3 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
          <p className="text-white/70 text-sm font-medium mb-4">Meetings per day</p>
          <div className="flex items-end gap-2 h-32">
            {days.map(({ day, meetings }, i) => {
              const height = (meetings / maxMeetings) * 100
              const gradients = [
                'from-purple-600 to-purple-400',
                'from-blue-600 to-blue-400',
                'from-teal-600 to-teal-400',
                'from-purple-600 to-purple-400',
                'from-blue-600 to-blue-400',
                'from-teal-600 to-teal-400',
                'from-violet-600 to-violet-400',
              ]
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <p className="text-white/30 text-xs">{meetings}</p>
                  <div className="w-full flex items-end" style={{ height: '90px' }}>
                    <div
                      className={`w-full rounded-t-lg bg-gradient-to-t ${gradients[i]} opacity-80`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <p className="text-white/30 text-xs">{day}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Speaker breakdown */}
        <div className="col-span-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
          <p className="text-white/70 text-sm font-medium mb-4">Top speakers</p>
          <div className="flex flex-col gap-3">
            {speakers.map(({ name, pct, from, to }) => (
              <div key={name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/60 text-xs">{name}</span>
                  <span className="text-white/30 text-xs">{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${from} ${to} rounded-full`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topics discussed */}
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
        <p className="text-white/70 text-sm font-medium mb-4">Topics discussed</p>
        <div className="flex items-end gap-3 h-24">
          {topics.map(({ label, count, color }) => {
            const height = (count / Math.max(...topics.map(t => t.count))) * 100
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-2">
                <p className="text-white/30 text-xs">{count}</p>
                <div className="w-full flex items-end" style={{ height: '70px' }}>
                  <div
                    className={`w-full rounded-t-lg ${color} opacity-70`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <p className="text-white/40 text-xs">{label}</p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Analytics 