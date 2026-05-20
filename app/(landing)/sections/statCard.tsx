type StatCardProps = {
  value: string
  label: string
  sub?: string
}

export function StatCard({ value, label, sub }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/7 bg-white/3 px-6 py-5 backdrop-blur-sm">
      <span className="text-3xl font-bold tracking-tight text-white">
        {value}
      </span>
      <span className="text-sm font-medium text-[#e8ff47]">
        {label}
      </span>
      {sub && <span className="text-xs text-white/40">{sub}</span>}
    </div>
  )
}