import { create } from 'zustand'

const useMeetingStore = create((set) => ({
  meetings: [
    { id: 1, title: 'Sprint Planning Q3', meta: 'Today · 45 min · 4 participants', items: '3 action items', status: 'Done', color: 'from-purple-600 to-purple-400' },
    { id: 2, title: 'Design Review', meta: 'Yesterday · 30 min · 2 participants', items: '1 action item', status: 'Processing', color: 'from-blue-600 to-blue-400' },
    { id: 3, title: 'Backend API Discussion', meta: '2 days ago · 60 min · 2 participants', items: '5 action items', status: 'Done', color: 'from-teal-600 to-teal-400' },
    { id: 4, title: 'Client Onboarding Call', meta: 'Last week · 90 min · 4 participants', items: '7 action items', status: 'Done', color: 'from-violet-600 to-violet-400' },
    { id: 5, title: 'Team Standup', meta: '3 days ago · 15 min · 5 participants', items: '2 action items', status: 'Done', color: 'from-pink-600 to-pink-400' },
  ],

  addMeeting: (meeting) =>
    set((state) => ({ meetings: [meeting, ...state.meetings] })),
}))

export default useMeetingStore