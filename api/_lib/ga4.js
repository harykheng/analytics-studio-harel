import { BetaAnalyticsDataClient } from '@google-analytics/data'

let client

function getClient() {
  if (client) return client

  const clientEmail = process.env.GA4_CLIENT_EMAIL
  const privateKey = (process.env.GA4_PRIVATE_KEY || '').replace(/\\n/g, '\n')

  if (!clientEmail || !privateKey) {
    throw new Error('Missing GA4 service account credentials in environment')
  }

  client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  })
  return client
}

function dateRangeFor(range) {
  if (range === 'today') return { startDate: 'today', endDate: 'today' }
  if (range === '30d') return { startDate: '30daysAgo', endDate: 'today' }
  return { startDate: '7daysAgo', endDate: 'today' }
}

function pct(part, total) {
  if (!total) return 0
  return Math.round((part / total) * 1000) / 10
}

function formatDuration(totalSeconds) {
  const seconds = Math.round(Number(totalSeconds) || 0)
  const mm = Math.floor(seconds / 60)
  const ss = seconds % 60
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}

async function runReport(propertyId, request) {
  const analyticsClient = getClient()
  const [response] = await analyticsClient.runReport({
    property: propertyId,
    ...request,
  })
  return response
}

function rowValue(row, index, type = 'metric') {
  const values = type === 'metric' ? row.metricValues : row.dimensionValues
  return values?.[index]?.value
}

export async function getGA4Dashboard(propertyId, range) {
  const dateRange = [dateRangeFor(range)]

  const [
    totalsResp,
    breakdownResp,
    topPagesResp,
    trafficSourcesResp,
    topCountriesResp,
    deviceResp,
    topEventsResp,
  ] = await Promise.all([
    runReport(propertyId, {
      dateRanges: dateRange,
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'eventCount' },
      ],
    }),
    range === 'today'
      ? runReport(propertyId, {
          dateRanges: dateRange,
          dimensions: [{ name: 'hour' }],
          metrics: [{ name: 'screenPageViews' }],
          orderBys: [{ dimension: { dimensionName: 'hour' } }],
        })
      : runReport(propertyId, {
          dateRanges: dateRange,
          dimensions: [{ name: 'date' }],
          metrics: [{ name: 'screenPageViews' }],
          orderBys: [{ dimension: { dimensionName: 'date' } }],
        }),
    runReport(propertyId, {
      dateRanges: dateRange,
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    }),
    runReport(propertyId, {
      dateRanges: dateRange,
      dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    }),
    runReport(propertyId, {
      dateRanges: dateRange,
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 5,
    }),
    runReport(propertyId, {
      dateRanges: dateRange,
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),
    runReport(propertyId, {
      dateRanges: dateRange,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 12,
    }),
  ])

  const totalsRow = totalsResp.rows?.[0]
  const totalPageviews = Number(rowValue(totalsRow, 0) ?? 0)
  const totalSessions = Number(rowValue(totalsRow, 1) ?? 0)
  const totalUsers = Number(rowValue(totalsRow, 2) ?? 0)
  const bounceRateRaw = Number(rowValue(totalsRow, 3) ?? 0)
  const avgSessionDurationRaw = Number(rowValue(totalsRow, 4) ?? 0)
  const totalEvents = Number(rowValue(totalsRow, 5) ?? 0)

  let pageviewsByHour
  let pageviewsByDay

  if (range === 'today') {
    const byHour = new Map()
    for (const row of breakdownResp.rows || []) {
      const hour = Number(rowValue(row, 0, 'dimension'))
      const views = Number(rowValue(row, 0, 'metric') ?? 0)
      byHour.set(hour, views)
    }
    pageviewsByHour = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      pageviews: byHour.get(hour) ?? 0,
    }))
  } else {
    pageviewsByDay = (breakdownResp.rows || []).map((row) => {
      const raw = rowValue(row, 0, 'dimension')
      const date = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`
      return { date, pageviews: Number(rowValue(row, 0, 'metric') ?? 0) }
    })
  }

  const topPages = (topPagesResp.rows || []).map((row) => {
    const pageviews = Number(rowValue(row, 0, 'metric') ?? 0)
    return {
      path: rowValue(row, 0, 'dimension'),
      pageviews,
      percentage: pct(pageviews, totalPageviews),
    }
  })

  const trafficSources = (trafficSourcesResp.rows || []).map((row) => {
    const sessions = Number(rowValue(row, 0, 'metric') ?? 0)
    return {
      source: rowValue(row, 0, 'dimension'),
      medium: rowValue(row, 1, 'dimension'),
      sessions,
      percentage: pct(sessions, totalSessions),
    }
  })

  const topCountries = (topCountriesResp.rows || []).map((row) => {
    const sessions = Number(rowValue(row, 0, 'metric') ?? 0)
    return {
      country: rowValue(row, 0, 'dimension'),
      sessions,
      percentage: pct(sessions, totalSessions),
    }
  })

  const deviceCategory = (deviceResp.rows || []).map((row) => {
    const sessions = Number(rowValue(row, 0, 'metric') ?? 0)
    return {
      device: rowValue(row, 0, 'dimension'),
      sessions,
      percentage: pct(sessions, totalSessions),
    }
  })

  const topEvents = (topEventsResp.rows || []).map((row) => {
    const count = Number(rowValue(row, 0, 'metric') ?? 0)
    return {
      event: rowValue(row, 0, 'dimension'),
      count,
      percentage: pct(count, totalEvents),
    }
  })

  return {
    totalPageviews,
    totalSessions,
    totalUsers,
    bounceRate: `${(bounceRateRaw * 100).toFixed(1)}%`,
    avgSessionDuration: formatDuration(avgSessionDurationRaw),
    pageviewsByHour,
    pageviewsByDay,
    topPages,
    trafficSources,
    topCountries,
    deviceCategory,
    topEvents,
  }
}
