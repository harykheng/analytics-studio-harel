import { useState } from 'react'
import TopAppBar from './components/TopAppBar.jsx'
import SectionHeader from './components/SectionHeader.jsx'
import KPIRow from './components/KPIRow.jsx'
import HourlyChart from './components/HourlyChart.jsx'
import DailyChart from './components/DailyChart.jsx'
import TopPagesTable from './components/TopPagesTable.jsx'
import TrafficSources from './components/TrafficSources.jsx'
import DeviceChart from './components/DeviceChart.jsx'
import CountriesList from './components/CountriesList.jsx'
import TopEvents from './components/TopEvents.jsx'
import ErrorCard from './components/ErrorCard.jsx'
import { SectionSkeleton } from './components/SkeletonLoader.jsx'
import { useGA4 } from './hooks/useGA4.js'

const PROPERTIES = [
  { key: 'harel', name: 'Studio Harel', domain: 'studioharel.id', endpoint: '/api/ga4-harel' },
  { key: 'ordi', name: 'Ordi', domain: 'ordi.studioharel.id', endpoint: '/api/ga4-ordi' },
]

function Panel({ title, children, delay = 0 }) {
  return (
    <div
      className="elevation-1 card-hover animate-fadeInUp rounded-xl p-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-[18px] leading-[24px] font-semibold text-on-surface mb-3">{title}</h3>
      {children}
    </div>
  )
}

function PropertySection({ property, range }) {
  const { data, loading, error, lastUpdated, refetch, secondsToRefresh } = useGA4(property.endpoint, range)

  const dataMatchesRange = data && (range === 'today' ? data.pageviewsByHour : data.pageviewsByDay)

  if (!error && !dataMatchesRange) {
    return <SectionSkeleton />
  }

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        name={property.name}
        domain={property.domain}
        isLive={range === 'today'}
        lastUpdated={lastUpdated}
        secondsToRefresh={secondsToRefresh}
      />

      {error ? (
        <ErrorCard message={error} onRetry={refetch} />
      ) : (
        <>
          <KPIRow data={data} />

          <Panel title={range === 'today' ? 'Pageviews by Hour' : 'Pageviews by Day'} delay={80}>
            {range === 'today' ? (
              <HourlyChart data={data.pageviewsByHour} />
            ) : (
              <DailyChart data={data.pageviewsByDay} />
            )}
          </Panel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Panel title="Top Pages" delay={120}>
              <TopPagesTable pages={data.topPages} />
            </Panel>
            <Panel title="Traffic Sources" delay={140}>
              <TrafficSources sources={data.trafficSources} />
            </Panel>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Panel title="Devices" delay={160}>
              <DeviceChart devices={data.deviceCategory} />
            </Panel>
            <Panel title="Top Countries" delay={180}>
              <CountriesList countries={data.topCountries} />
            </Panel>
          </div>

          <Panel title="Top Events" delay={200}>
            <TopEvents events={data.topEvents} />
          </Panel>
        </>
      )}
    </section>
  )
}

export default function App() {
  const [range, setRange] = useState('today')
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="min-h-screen bg-bg text-on-surface">
      <TopAppBar
        range={range}
        onRangeChange={setRange}
        onRefresh={() => setRefreshKey((k) => k + 1)}
      />

      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp" key={refreshKey}>
          {PROPERTIES.map((property) => (
            <PropertySection key={property.key} property={property} range={range} />
          ))}
        </div>
      </main>
    </div>
  )
}
