import React from 'react'

export function HeadingBadge({
  children, ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e8ff47]">
          {children}
        </p>

    </div>
  )
}

export default HeadingBadge
