import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'
import { colors } from '../theme/colors.js'
import { formatHourLabel, formatNumber, getWibNow } from '../lib/format.js'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="elevation-3 rounded-md px-3 py-2 text-[12px]">
      <div className="text-on-surface-variant">{formatHourLabel(label)}:00 WIB</div>
      <div className="text-on-surface font-medium">{formatNumber(payload[0].value)} pageviews</div>
    </div>
  )
}

export default function HourlyChart({ data }) {
  const currentHour = getWibNow().getHours()

  const chartData = data.map((d) => ({
    hour: d.hour,
    actual: d.hour <= currentHour ? d.pageviews : null,
    future: d.hour >= currentHour ? (d.hour === currentHour ? d.pageviews : 0) : null,
  }))

  const currentPoint = chartData.find((d) => d.hour === currentHour)

  return (
    <div className="h-64 -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="pvFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.primary} stopOpacity={0.35} />
              <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.outlineVariant} vertical={false} />
          <XAxis
            dataKey="hour"
            tickFormatter={formatHourLabel}
            stroke={colors.outline}
            tick={{ fill: colors.onSurfaceVariant, fontSize: 11 }}
            axisLine={{ stroke: colors.outlineVariant }}
            tickLine={false}
            interval={1}
          />
          <YAxis
            stroke={colors.outline}
            tick={{ fill: colors.onSurfaceVariant, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.outline, strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="actual"
            stroke={colors.primary}
            strokeWidth={2}
            fill="url(#pvFill)"
            connectNulls={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="future"
            stroke={colors.outline}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            connectNulls
            isAnimationActive={false}
          />
          {currentPoint && (
            <ReferenceDot
              x={currentPoint.hour}
              y={currentPoint.actual ?? 0}
              r={5}
              fill={colors.primary}
              stroke={colors.bg}
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
