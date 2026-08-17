import { formatNumber, formatPercent } from '../lib/format.js'

export default function ChannelGroups({ channels }) {
  if (!channels?.length) {
    return <p className="text-[13px] text-on-surface-variant">No channel data available.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {channels.map((c) => (
        <div key={c.channelGroup} className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-on-surface font-medium">{c.channelGroup}</span>
            <span className="text-on-surface-variant tabular-nums">
              {formatNumber(c.sessions)} sessions · {c.engagementRate} eng. · {formatPercent(c.percentage)}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${Math.min(c.percentage, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
