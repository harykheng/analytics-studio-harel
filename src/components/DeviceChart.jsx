import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { deviceColors } from '../theme/colors.js'
import { colors } from '../theme/colors.js'
import { formatNumber, formatPercent } from '../lib/format.js'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="elevation-3 rounded-md px-3 py-2 text-[12px]">
      <div className="text-on-surface capitalize font-medium">{d.device}</div>
      <div className="text-on-surface-variant">
        {formatNumber(d.sessions)} sessions · {formatPercent(d.percentage)}
      </div>
    </div>
  )
}

export default function DeviceChart({ devices }) {
  if (!devices?.length) {
    return <p className="text-[13px] text-on-surface-variant">No device data available.</p>
  }

  const total = devices.reduce((sum, d) => sum + d.sessions, 0)

  return (
    <div>
      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={devices}
              dataKey="sessions"
              nameKey="device"
              innerRadius="65%"
              outerRadius="90%"
              paddingAngle={2}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-out"
            >
              {devices.map((d) => (
                <Cell key={d.device} fill={deviceColors[d.device] ?? colors.outline} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center">
            <div className="text-[22px] leading-[28px] font-medium text-on-surface tabular-nums">
              {formatNumber(total)}
            </div>
            <div className="text-[11px] text-on-surface-variant uppercase tracking-[0.5px]">Sessions</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {devices.map((d) => (
          <span
            key={d.device}
            className="chip bg-surface-2 text-on-surface-variant capitalize border border-outline-variant"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: deviceColors[d.device] ?? colors.outline }}
            />
            {d.device} · {formatPercent(d.percentage)}
          </span>
        ))}
      </div>
    </div>
  )
}
