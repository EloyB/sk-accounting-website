'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/over-ons', label: 'Over ons' },
  { href: '/diensten', label: 'Diensten' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-[#f7f4ef]'
      }`}
    >
      {/* Thin gold rule at very top */}
      <div className="h-[2px] bg-[#b8965a] w-full" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span
                className="text-white text-[13px] tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                SK
              </span>
            </div>
            <span
              className="text-charcoal text-[21px] tracking-wide"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              SK Accounting
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[12px] font-sans font-medium uppercase tracking-[0.18em] text-charcoal/60 hover:text-primary transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <Link
              href="/contact"
              className="ml-2 font-sans text-[12px] font-medium uppercase tracking-[0.18em] border border-primary text-primary px-6 py-2.5 hover:bg-primary hover:text-white transition-all duration-300"
            >
              Afspraak maken
            </Link>
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Sluit menu' : 'Open menu'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="md:hidden border-t border-charcoal/10 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm uppercase tracking-[0.18em] text-charcoal/70 hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="font-sans text-sm uppercase tracking-[0.18em] border border-primary text-primary px-6 py-3 text-center hover:bg-primary hover:text-white transition-all mt-2"
              onClick={() => setOpen(false)}
            >
              Afspraak maken
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
