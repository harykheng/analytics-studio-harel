const OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
]

export default function RangeSelector({ value, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-outline-variant bg-surface-1 p-1">
      {OPTIONS.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              'px-4 py-1.5 rounded-full text-[13px] font-medium tracking-[0.1px] transition-all duration-200',
              active
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-3',
            ].join(' ')}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
