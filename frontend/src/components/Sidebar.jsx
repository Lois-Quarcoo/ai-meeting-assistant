import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', icon: '⊞', label: 'Dashboard' },
  { to: '/meetings', icon: '🗂', label: 'Meetings' },
  { to: '/chat', icon: '💬', label: 'AI Chat' },
  { to: '/analytics', icon: '📊', label: 'Analytics' },
]

function Sidebar() {
  return (
    <div className="w-52 min-h-screen bg-white/[0.03] border-r border-white/[0.07] flex flex-col px-3 py-5">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-sm">
          🎙
        </div>
        <span className="text-white font-medium text-sm tracking-tight">MeetAI</span>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/[0.07] pt-4 px-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white text-xs font-medium">
          LQ
        </div>
        <div>
          <p className="text-white text-xs font-medium">Lois</p>
          <p className="text-white/30 text-xs">Pro plan</p>
        </div>
      </div>

    </div>
  )
}

export default Sidebar