import { formatNumber, formatPercent } from '../lib/format.js'

export default function TopPagesTable({ pages }) {
  if (!pages?.length) {
    return <p className="text-[13px] text-on-surface-variant">No page data available.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[12px] leading-[16px] font-medium tracking-[0.5px] text-on-surface-variant uppercase">
            <th className="pb-2 pr-3 font-medium">Page Path</th>
            <th className="pb-2 pr-3 font-medium text-right">Pageviews</th>
            <th className="pb-2 font-medium text-right">% of Total</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.path} className="border-t border-outline-variant/40">
              <td className="py-2 pr-3 font-mono text-[13px] text-on-surface truncate max-w-[220px]" title={p.path}>
                {p.path}
              </td>
              <td className="py-2 pr-3 text-[14px] text-on-surface text-right tabular-nums">
                {formatNumber(p.pageviews)}
              </td>
              <td className="py-2 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[13px] text-on-surface-variant tabular-nums w-12">
                    {formatPercent(p.percentage)}
                  </span>
                  <div className="w-16 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.min(p.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
