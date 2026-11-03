import { useNavigate } from 'react-router-dom'
import ActionItem from '../components/ActionItem'

const meeting = {
  title: 'Sprint Planning Q3',
  date: 'Today · 45 min',
  participants: ['John', 'Sarah', 'Mike', 'Lois'],
  summary: 'The team discussed Q3 sprint goals focusing on frontend redesign and API integration. Decisions were made around deployment timelines and task ownership.',
  actionItems: [
    { person: 'John', task: 'Finish the login page' },
    { person: 'Sarah', task: 'Create API documentation' },
    { person: 'Mike', task: 'Deploy the staging server' },
  ],
  transcript: [
    { name: 'John', text: 'We need to wrap up the login page before the sprint ends.' },
    { name: 'Sarah', text: 'I can have the API docs ready by Wednesday.' },
    { name: 'Mike', text: 'I will deploy the staging server on Friday morning.' },
    { name: 'Lois', text: 'Let us confirm the deployment checklist by Thursday.' },
    { name: 'John', text: 'Sounds good. Let us also make sure all tests pass before Friday.' },
  ]
}

const colors = ['text-purple-400', 'text-blue-400', 'text-teal-400', 'text-pink-400']

function MeetingDetail() {
  const navigate = useNavigate()

  return (
    <div className="relative p-6 min-h-screen overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute top-[-60px] left-[100px] w-64 h-64 bg-purple-700 opacity-10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-40px] right-[60px] w-52 h-52 bg-blue-600 opacity-10 rounded-full blur-[80px] pointer-events-none" />

      {/* Back button and title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/meetings')}
          className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 text-sm hover:text-white/80 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-white text-xl font-medium tracking-tight">{meeting.title}</h1>
        <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/25 font-medium">
          Transcribed
        </span>
      </div>

      <p className="text-white/40 text-sm mb-5">{meeting.date}</p>

      {/* Top grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">

        {/* AI Summary */}
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
          <p className="text-white/70 text-sm font-medium mb-3">✦ AI Summary</p>
          <p className="text-white/60 text-sm leading-relaxed mb-4">{meeting.summary}</p>
          <p className="text-white/50 text-xs font-medium mb-2">Participants</p>
          <div className="flex flex-wrap gap-2">
            {meeting.participants.map((p, i) => (
              <span key={p} className={`text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] ${colors[i % colors.length]}`}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Action items */}
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
          <p className="text-white/70 text-sm font-medium mb-3">✓ Action items</p>
          <div className="flex flex-col gap-3">
            {meeting.actionItems.map(({ person, task }) => (
              <ActionItem key={person} person={person} task={task} />
            ))}
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 max-h-64 overflow-y-auto">
        <p className="text-white/70 text-sm font-medium mb-4">🗒 Transcript</p>
        <div className="flex flex-col gap-4">
          {meeting.transcript.map(({ name, text }, i) => (
            <div key={i}>
              <p className={`text-xs font-medium mb-1 ${colors[meeting.participants.indexOf(name) % colors.length]}`}>
                {name}
              </p>
              <p className="text-white/55 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default MeetingDetail