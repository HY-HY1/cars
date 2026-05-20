"use client"
import { useState } from 'react'
import AnnouncementBar from './announcement'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Digital Playbook', href: '/dashboard' },
  { label: 'Mentoring Group', href: '/mentoring' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <AnnouncementBar />
      <nav className="w-full border-b border-white/6 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-white transition-colors hover:text-[#e8ff47]"
            >
              Car Flipping Playbook
            </Link>

            {/* Desktop nav */}
            <ul className="hidden sm:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex sm:hidden flex-col items-center justify-center gap-1.5 rounded p-2 text-white/60 transition-colors hover:text-white"
            >
              <span
                className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-200 ease-in-out ${
            open ? 'max-h-48 border-t border-white/6' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-1 bg-[#0a0a0a] px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
