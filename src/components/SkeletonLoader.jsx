function Block({ className }) {
  return <div className={`skeleton animate-shimmer rounded-md ${className}`} />
}

export function KPIRowSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="elevation-1 rounded-xl p-4 flex flex-col gap-3">
          <Block className="h-9 w-9 rounded-full" />
          <Block className="h-7 w-3/4" />
          <Block className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="elevation-1 rounded-xl p-4">
      <Block className="h-5 w-40 mb-4" />
      <Block className="h-56 w-full" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="elevation-1 rounded-xl p-4">
      <Block className="h-5 w-32 mb-4" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Block key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  )
}

export function ListSkeleton() {
  return (
    <div className="elevation-1 rounded-xl p-4">
      <Block className="h-5 w-32 mb-4" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Block className="h-3.5 w-full" />
            <Block className="h-1.5 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DonutSkeleton() {
  return (
    <div className="elevation-1 rounded-xl p-4 flex flex-col items-center">
      <Block className="h-5 w-32 mb-4 self-start" />
      <div className="skeleton animate-shimmer h-52 w-52 rounded-full" />
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Block className="h-7 w-48" />
        <Block className="h-4 w-24" />
      </div>
      <KPIRowSkeleton />
      <ChartSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TableSkeleton />
        <ListSkeleton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DonutSkeleton />
        <ListSkeleton />
      </div>
    </div>
  )
}
