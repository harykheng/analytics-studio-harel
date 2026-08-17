import { formatCountdown, formatUpdatedAt } from '../lib/format.js'

export default function SectionHeader({ name, domain, isLive, lastUpdated, secondsToRefresh }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-[22px] leading-[28px] font-medium text-on-surface">{name}</h2>
          <a
            href={`https://${domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-on-surface-variant hover:text-primary transition-colors"
          >
            {domain}
          </a>
        </div>
        {isLive && (
          <span className="chip bg-primary-container/50 text-success border border-success/20 animate-fadeInUp">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-pulseLive" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Live
          </span>
        )}
      </div>

      <div className="text-right text-[12px] text-on-surface-variant leading-tight">
        <div>Last updated: {formatUpdatedAt(lastUpdated)}</div>
        {isLive && <div>Next refresh in {formatCountdown(secondsToRefresh)}</div>}
      </div>
    </div>
  )
}
