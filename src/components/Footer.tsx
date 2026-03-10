import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/70">

      <div className="max-w-7xl mx-auto px-8">

        {/* Top — brand + CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-20 pb-14 border-b border-white/10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-white/10 flex items-center justify-center flex-shrink-0">
                <span
                  className="text-white text-[13px] tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  SK
                </span>
              </div>
              <span
                className="text-white text-[22px] tracking-wide"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
              >
                SK Accounting
              </span>
            </Link>
            <p className="font-sans text-sm leading-relaxed max-w-xs text-white/50">
              Uw betrouwbare partner voor boekhouding en fiscaal advies.
              Persoonlijk, proactief en digitaal.
            </p>
          </div>
          <Link
            href="/contact"
            className="font-sans text-[12px] uppercase tracking-[0.18em] border border-white/30 text-white px-8 py-4 hover:bg-white hover:text-primary transition-all duration-300 flex-shrink-0 self-start md:self-auto"
          >
            Afspraak maken
          </Link>
        </div>

        {/* Mid — links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 border-b border-white/10">
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold mb-5">
              Navigatie
            </h3>
            <ul className="space-y-3">
              {[['Over ons', '/over-ons'], ['Diensten', '/diensten'], ['Team', '/team'], ['Contact', '/contact']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold mb-5">
              Diensten
            </h3>
            <ul className="space-y-3">
              {['Boekhouding', 'Btw-aangiftes', 'Loonadministratie', 'Fiscaal advies', 'Bedrijfsoprichting'].map((s) => (
                <li key={s}>
                  <Link href="/diensten" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="font-sans text-sm text-white/60">[Adres], België</li>
              <li>
                <a href="tel:+32" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                  +32 (0)…
                </a>
              </li>
              <li>
                <a href="mailto:info@skaccounting.be" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                  info@skaccounting.be
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom — copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">
            © {new Date().getFullYear()} SK Accounting — Alle rechten voorbehouden
          </p>
          <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">
            Gebouwd door{' '}
            <a href="https://studioswyft.be" className="hover:text-white/70 transition-colors">
              Studio Swyft
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
