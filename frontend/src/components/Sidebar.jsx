import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, MessageSquare, BarChart3, Mic } from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/meetings', icon: FileText, label: 'Meetings' },
  { to: '/chat', icon: MessageSquare, label: 'AI Chat' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
]

function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-black/40 border-r border-white/10 flex flex-col px-3 py-5 shadow-2xl shadow-black/50">

      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40">
          <Mic size={18} className="text-white" />
        </div>
        <span className="text-white font-semibold text-sm tracking-tight">MeetAI</span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 ring-1 ring-blue-500/30 shadow-md shadow-blue-600/10'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 pt-4 px-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white/10">
          LQ
        </div>
        <div>
          <p className="text-white text-sm font-medium leading-tight">Lois</p>
          <p className="text-white/40 text-xs">Frontend</p>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar