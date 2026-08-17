export default function PropertyTabs({ properties, active, onChange, isLive }) {
  return (
    <div className="inline-flex rounded-full border border-outline-variant bg-surface-1 p-1 mb-5">
      {properties.map((p) => {
        const isActive = p.key === active
        return (
          <button
            key={p.key}
            onClick={() => onChange(p.key)}
            className={[
              'flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-200',
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-3',
            ].join(' ')}
            aria-pressed={isActive}
          >
            {isLive && (
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className={[
                    'absolute inline-flex h-full w-full rounded-full animate-pulseLive',
                    isActive ? 'bg-white' : 'bg-success',
                  ].join(' ')}
                />
                <span className={['relative inline-flex h-1.5 w-1.5 rounded-full', isActive ? 'bg-white' : 'bg-success'].join(' ')} />
              </span>
            )}
            {p.name}
          </button>
        )
      })}
    </div>
  )
}
