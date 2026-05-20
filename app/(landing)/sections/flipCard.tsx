type FlipCardProps = {
  car: string
  bought: string
  sold: string
  profit: string
  days: number
}

export function FlipCard({
  car,
  bought,
  sold,
  profit,
  days,
}: FlipCardProps) {
  return (
    <div className="rounded-xl border border-white/7 bg-white/3 p-4 text-left">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-white/90">{car}</span>
        <span className="rounded-full bg-[rgba(232,255,71,0.12)] px-2 py-0.5 text-[11px] font-bold text-[#e8ff47]">
          +£{profit}
        </span>
      </div>

      <div className="flex gap-4 text-xs text-white/40">
        <span>Bought £{bought}</span>
        <span>→</span>
        <span>Sold £{sold}</span>
        <span>· {days}d</span>
      </div>
    </div>
  )
}