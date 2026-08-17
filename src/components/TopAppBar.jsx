import { useEffect, useRef, useState } from 'react'
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

function BrandMark() {
  return (
    <div className="h-10 w-10 rounded-2xl bg-primary text-on-primary grid place-items-center shadow-sm shadow-primary/30 shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19V10M10 19V5M16 19v-7M22 19H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function TopAppBar({ range, onRangeChange, onRefresh }) {
  const [wibNow, setWibNow] = useState(getWibNow())
  const [spinning, setSpinning] = useState(false)
  const spinTimeout = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setWibNow(getWibNow()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => () => clearTimeout(spinTimeout.current), [])

  const handleRefresh = () => {
    setSpinning(true)
    onRefresh()
    clearTimeout(spinTimeout.current)
    spinTimeout.current = setTimeout(() => setSpinning(false), 650)
  }

  return (
    <header className="sticky top-0 z-20 elevation-2 border-b border-outline-variant/60 backdrop-blur">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <h1 className="text-[24px] leading-[30px] font-semibold text-on-surface">Command Center</h1>
            <p className="text-[13px] text-on-surface-variant mt-0.5">{formatWibDate(wibNow)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="chip bg-surface-2 text-on-surface-variant font-mono tabular-nums border border-outline-variant">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulseLive" />
            {formatWibClock(wibNow)}
          </div>

          <RangeSelector value={range} onChange={onRangeChange} />

          <button
            onClick={handleRefresh}
            aria-label="Refresh"
            className={[
              'h-10 w-10 grid place-items-center rounded-full bg-surface-2 text-on-surface-variant border border-outline-variant',
              'transition-all duration-200 hover:bg-primary-container hover:text-on-primary-container hover:-translate-y-0.5 active:scale-95',
              spinning ? 'animate-spin' : '',
            ].join(' ')}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
