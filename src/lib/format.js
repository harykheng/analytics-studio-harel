export function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${Number(value).toFixed(1).replace('.', ',')}%`
}

export function getWibNow() {
  const now = new Date()
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000
  return new Date(utcMs + 7 * 60 * 60000)
}

export function formatWibClock(date) {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss} WIB`
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function formatWibDate(date) {
  return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

export function formatHourLabel(hour) {
  return String(hour).padStart(2, '0')
}

export function formatDayLabel(isoDate) {
  const d = new Date(`${isoDate}T00:00:00`)
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()].slice(0, 3)}`
}

export function formatUpdatedAt(date) {
  if (!date) return '—'
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

export function formatCountdown(seconds) {
  const mm = Math.floor(seconds / 60)
  const ss = seconds % 60
  return `${mm}:${String(ss).padStart(2, '0')}`
}
