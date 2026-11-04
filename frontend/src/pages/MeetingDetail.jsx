import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, ListChecks, ScrollText, Calendar } from 'lucide-react'
import ActionItem from '../components/ActionItem'

const card = 'bg-white/[0.04] ring-1 ring-white/10 rounded-xl shadow-lg shadow-black/40'

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
  ],
}

function MeetingDetail() {
  const navigate = useNavigate()

  return (
    <div className="p-8 min-h-screen">

      {/* Back button and title */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate('/meetings')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] ring-1 ring-white/10 text-white/60 text-sm hover:text-white hover:ring-white/20 transition-all"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <h1 className="text-white text-2xl font-semibold tracking-tight">{meeting.title}</h1>
        <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 ring-1 ring-green-500/25 font-medium">
          Transcribed
        </span>
      </div>

      <p className="text-white/50 text-sm mb-8 flex items-center gap-2">
        <Calendar size={14} />
        {meeting.date}
      </p>

      {/* Top grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        {/* AI Summary */}
        <div className={`${card} p-5`}>
          <p className="text-white text-sm font-medium mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            AI Summary
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-5">{meeting.summary}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Participants</p>
          <div className="flex flex-wrap gap-2">
            {meeting.participants.map((p) => (
              <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] ring-1 ring-white/10 text-white/80">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Action items */}
        <div className={`${card} p-5`}>
          <p className="text-white text-sm font-medium mb-4 flex items-center gap-2">
            <ListChecks size={16} className="text-blue-400" />
            Action items
          </p>
          <div className="flex flex-col gap-4">
            {meeting.actionItems.map(({ person, task }) => (
              <ActionItem key={person} person={person} task={task} />
            ))}
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className={`${card} p-5 max-h-72 overflow-y-auto`}>
        <p className="text-white text-sm font-medium mb-4 flex items-center gap-2">
          <ScrollText size={16} className="text-blue-400" />
          Transcript
        </p>
        <div className="flex flex-col gap-4">
          {meeting.transcript.map(({ name, text }, i) => (
            <div key={i}>
              <p className="text-blue-400 text-xs font-medium mb-1">{name}</p>
              <p className="text-white/70 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default MeetingDetail