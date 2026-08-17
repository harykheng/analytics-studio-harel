function Icon({ name }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
  switch (name) {
    case 'pageviews':
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'visitors':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
          <path d="M16.5 5.5a3.5 3.5 0 0 1 0 7" strokeLinecap="round" />
          <path d="M15 13.2c2.9.4 6 2 6 6.8" strokeLinecap="round" />
        </svg>
      )
    case 'sessions':
      return (
        <svg {...common}>
          <path d="M4 5h16v11H4z" strokeLinejoin="round" />
          <path d="M8 21h8M12 16v5" strokeLinecap="round" />
        </svg>
      )
    case 'bounce':
      return (
        <svg {...common}>
          <path d="M4 19V9l8-6 8 6v10" strokeLinejoin="round" />
          <path d="M9 21v-6h6v6" strokeLinejoin="round" />
        </svg>
      )
    case 'duration':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

export default function KPICard({ icon, label, value, trend }) {
  return (
    <div className="elevation-1 rounded-xl p-4 flex flex-col gap-3 min-w-0">
      <div className="h-9 w-9 rounded-full bg-primary-container/60 text-on-primary-container grid place-items-center">
        <Icon name={icon} />
      </div>
      <div className="min-w-0">
        <div className="text-[28px] leading-[36px] font-normal text-on-surface truncate tabular-nums">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[12px] leading-[16px] font-medium tracking-[0.5px] text-on-surface-variant uppercase">
            {label}
          </span>
          {trend !== undefined && trend !== null && (
            <span className={trend >= 0 ? 'text-success text-[11px]' : 'text-error text-[11px]'}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
