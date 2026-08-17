import { useEffect, useState } from 'react'
import RangeSelector from './RangeSelector.jsx'
import { formatWibClock, formatWibDate, getWibNow } from '../lib/format.js'

function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TopAppBar({ range, onRangeChange, onRefresh, refreshing }) {
  const [wibNow, setWibNow] = useState(getWibNow())

  useEffect(() => {
    const id = setInterval(() => setWibNow(getWibNow()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-20 elevation-2 border-b border-outline-variant/40 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-[28px] leading-[36px] font-normal text-on-surface">Command Center</h1>
          <p className="text-[13px] text-on-surface-variant mt-0.5">{formatWibDate(wibNow)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="chip bg-surface-2 text-on-surface-variant font-mono tabular-nums">
            {formatWibClock(wibNow)}
          </div>

          <RangeSelector value={range} onChange={onRangeChange} />

          <button
            onClick={onRefresh}
            aria-label="Refresh"
            className={[
              'h-10 w-10 grid place-items-center rounded-full bg-surface-2 text-on-surface-variant',
              'hover:bg-surface-3 hover:text-on-surface transition-colors',
              refreshing ? 'animate-spin' : '',
            ].join(' ')}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
