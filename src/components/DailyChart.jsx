import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { colors } from '../theme/colors.js'
import { formatDayLabel, formatNumber } from '../lib/format.js'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="elevation-3 rounded-md px-3 py-2 text-[12px]">
      <div className="text-on-surface-variant">{formatDayLabel(label)}</div>
      <div className="text-on-surface font-medium">{formatNumber(payload[0].value)} pageviews</div>
    </div>
  )
}

export default function DailyChart({ data }) {
  return (
    <div className="h-64 -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.outlineVariant} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDayLabel}
            stroke={colors.outline}
            tick={{ fill: colors.onSurfaceVariant, fontSize: 11 }}
            axisLine={{ stroke: colors.outlineVariant }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke={colors.outline}
            tick={{ fill: colors.onSurfaceVariant, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: colors.outlineVariant, opacity: 0.2 }} />
          <Bar dataKey="pageviews" fill={colors.primary} radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
