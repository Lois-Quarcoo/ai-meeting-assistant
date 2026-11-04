import { FileText, Clock, Timer, ListChecks, ChevronDown } from 'lucide-react'

const card = 'bg-white/[0.04] ring-1 ring-white/10 rounded-xl shadow-lg shadow-black/40'

const stats = [
  { label: 'Total Meetings', value: '48', icon: FileText },
  { label: 'Hours Recorded', value: '124h', icon: Clock },
  { label: 'Avg Length', value: '3.2h', icon: Timer },
  { label: 'Action Items', value: '84', icon: ListChecks },
]

const speakers = [
  { name: 'Lois', pct: 38, bar: 'bg-blue-500' },
  { name: 'Emmanuel', pct: 29, bar: 'bg-blue-500/75' },
  { name: 'John', pct: 19, bar: 'bg-blue-500/50' },
  { name: 'Sarah', pct: 14, bar: 'bg-blue-500/30' },
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

const topics = [
  { label: 'Frontend', count: 14 },
  { label: 'Backend', count: 11 },
  { label: 'Design', count: 8 },
  { label: 'Planning', count: 9 },
  { label: 'Deployment', count: 6 },
]

const maxMeetings = Math.max(...days.map(d => d.meetings))
const maxTopic = Math.max(...topics.map(t => t.count))

function Analytics() {
  return (
    <div className="p-8 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-white/50 text-sm mt-1">Your meeting insights at a glance</p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] ring-1 ring-white/10 text-white/60 text-xs hover:text-white hover:ring-white/20 transition-all">
          Last 30 days
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className={`${card} p-5 transition-all hover:-translate-y-0.5 hover:ring-white/20`}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center">
                <Icon size={16} className="text-blue-400" />
              </div>
            </div>
            <p className="text-white text-3xl font-semibold tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-4 mb-4">

        {/* Meetings per day */}
        <div className={`${card} col-span-3 p-5`}>
          <p className="text-white text-sm font-medium mb-6">Meetings per day</p>
          <div className="flex items-end gap-3">
            {days.map(({ day, meetings }) => {
              const isMax = meetings === maxMeetings
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <p className={`text-xs ${isMax ? 'text-blue-400 font-medium' : 'text-white/40'}`}>{meetings}</p>
                  <div className="w-full flex items-end" style={{ height: '110px' }}>
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        isMax ? 'bg-blue-500 shadow-lg shadow-blue-600/40' : 'bg-blue-500/30 hover:bg-blue-500/50'
                      }`}
                      style={{ height: `${(meetings / maxMeetings) * 100}%` }}
                    />
                  </div>
                  <p className="text-white/40 text-xs">{day}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top speakers */}
        <div className={`${card} col-span-2 p-5`}>
          <p className="text-white text-sm font-medium mb-6">Top speakers</p>
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
        </div>
      </div>

      {/* Topics discussed */}
      <div className={`${card} p-5`}>
        <p className="text-white text-sm font-medium mb-5">Topics discussed</p>
        <div className="flex flex-col gap-4">
          {topics.map(({ label, count }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="text-white/70 text-xs w-24">{label}</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(count / maxTopic) * 100}%` }}
                />
              </div>
              <span className="text-white/40 text-xs w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Analytics