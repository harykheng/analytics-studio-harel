import KPICard from './KPICard.jsx'
import { formatNumber } from '../lib/format.js'

export default function KPIRow({ data }) {
  const cards = [
    { icon: 'pageviews', label: 'Pageviews', value: formatNumber(data.totalPageviews), accent: true },
    { icon: 'visitors', label: 'Unique Visitors', value: formatNumber(data.totalUsers) },
    { icon: 'sessions', label: 'Sessions', value: formatNumber(data.totalSessions) },
    { icon: 'bounce', label: 'Bounce Rate', value: data.bounceRate ?? '—' },
    { icon: 'duration', label: 'Avg. Duration', value: data.avgSessionDuration ?? '—' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((c, i) => (
        <KPICard key={c.label} {...c} delay={i * 60} />
      ))}
    </div>
  )
}
