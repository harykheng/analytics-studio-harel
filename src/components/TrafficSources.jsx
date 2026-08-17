import { formatNumber, formatPercent } from '../lib/format.js'

export default function TrafficSources({ sources }) {
  if (!sources?.length) {
    return <p className="text-[13px] text-on-surface-variant">No traffic source data available.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[12px] leading-[16px] font-medium tracking-[0.5px] text-on-surface-variant uppercase">
            <th className="pb-2 pr-3 font-medium">Source / Medium</th>
            <th className="pb-2 pr-3 font-medium">Channel</th>
            <th className="pb-2 pr-3 font-medium text-right">Sessions</th>
            <th className="pb-2 pr-3 font-medium text-right">New Users</th>
            <th className="pb-2 pr-3 font-medium text-right">Engagement</th>
            <th className="pb-2 font-medium text-right">% of Total</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((s) => (
            <tr
              key={`${s.source}/${s.medium}`}
              className="border-t border-outline-variant/60 hover:bg-surface-2 transition-colors"
            >
              <td className="py-2 pr-3 text-[13px] text-on-surface">
                {s.source}
                <span className="text-on-surface-variant"> / {s.medium}</span>
              </td>
              <td className="py-2 pr-3">
                <span className="chip bg-secondary-container text-on-secondary-container text-[11px] whitespace-nowrap">
                  {s.channelGroup || '—'}
                </span>
              </td>
              <td className="py-2 pr-3 text-[14px] text-on-surface text-right tabular-nums">
                {formatNumber(s.sessions)}
              </td>
              <td className="py-2 pr-3 text-[13px] text-on-surface-variant text-right tabular-nums">
                {formatNumber(s.newUsers)}
              </td>
              <td className="py-2 pr-3 text-[13px] text-on-surface-variant text-right tabular-nums">
                {s.engagementRate}
              </td>
              <td className="py-2 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[13px] text-on-surface-variant tabular-nums w-12">
                    {formatPercent(s.percentage)}
                  </span>
                  <div className="w-14 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-[width] duration-700 ease-out"
                      style={{ width: `${Math.min(s.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
