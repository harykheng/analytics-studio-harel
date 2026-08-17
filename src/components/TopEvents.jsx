import { formatNumber, formatPercent } from '../lib/format.js'

function formatEventName(name) {
  if (!name) return '—'
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function TopEvents({ events }) {
  if (!events?.length) {
    return <p className="text-[13px] text-on-surface-variant">No event data available.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {events.map((e) => (
        <div key={e.event} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-on-surface font-medium">{formatEventName(e.event)}</span>
            <span className="text-on-surface-variant tabular-nums">
              {formatNumber(e.count)} · {formatPercent(e.percentage)}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${Math.min(e.percentage, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
