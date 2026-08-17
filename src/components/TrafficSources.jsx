import { formatNumber, formatPercent } from '../lib/format.js'

export default function TrafficSources({ sources }) {
  if (!sources?.length) {
    return <p className="text-[13px] text-on-surface-variant">No traffic source data available.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {sources.map((s) => (
        <div key={`${s.source}/${s.medium}`} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-on-surface font-medium">
              {s.source} <span className="text-on-surface-variant font-normal">/ {s.medium}</span>
            </span>
            <span className="text-on-surface-variant tabular-nums">
              {formatNumber(s.sessions)} · {formatPercent(s.percentage)}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${Math.min(s.percentage, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
