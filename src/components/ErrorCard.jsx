export default function ErrorCard({ message, onRetry }) {
  return (
    <div className="elevation-1 rounded-xl p-6 flex flex-col items-center text-center gap-3 border border-error/30">
      <div className="h-10 w-10 rounded-full bg-error/15 text-error grid place-items-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <div>
        <p className="text-[14px] font-medium text-on-surface">Couldn't load data</p>
        <p className="text-[13px] text-on-surface-variant mt-1">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="rounded-full bg-primary-container text-on-primary-container px-4 py-1.5 text-[13px] font-medium hover:opacity-90 transition-opacity"
      >
        Retry
      </button>
    </div>
  )
}
