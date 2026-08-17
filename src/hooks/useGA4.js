import { useCallback, useEffect, useRef, useState } from 'react'

const AUTO_REFRESH_MS = 5 * 60 * 1000

export function useGA4(endpoint, range) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [secondsToRefresh, setSecondsToRefresh] = useState(AUTO_REFRESH_MS / 1000)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${endpoint}?range=${range}`)
      const json = await res.json()
      if (!res.ok || json.error) {
        throw new Error(json.message || 'Failed to load analytics data')
      }
      setData(json)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [endpoint, range])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refreshTimer = useRef(null)
  const countdownTimer = useRef(null)

  useEffect(() => {
    clearInterval(refreshTimer.current)
    clearInterval(countdownTimer.current)
    setSecondsToRefresh(AUTO_REFRESH_MS / 1000)

    if (range !== 'today') return undefined

    refreshTimer.current = setInterval(() => {
      fetchData()
      setSecondsToRefresh(AUTO_REFRESH_MS / 1000)
    }, AUTO_REFRESH_MS)

    countdownTimer.current = setInterval(() => {
      setSecondsToRefresh((s) => (s > 0 ? s - 1 : 0))
    }, 1000)

    return () => {
      clearInterval(refreshTimer.current)
      clearInterval(countdownTimer.current)
    }
  }, [range, fetchData])

  return { data, loading, error, lastUpdated, refetch: fetchData, secondsToRefresh }
}
