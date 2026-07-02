import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Footer() {
  // Contactgegevens uit Site Settings (CMS). Valt terug op nette placeholders
  // zolang de gegevens nog niet zijn ingevuld.
  let phone: string | null = null
  let email: string | null = null
  let address: string | null = null
  let companyNumber: string | null = null
  let itaaNumber: string | null = null

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    phone = settings.phone || null
    email = settings.email || null
    address = settings.address || null
    companyNumber = settings.companyNumber || null
    itaaNumber = settings.itaaNumber || null
  } catch {
    // Geen DB-verbinding (bv. tijdens build) — toon de placeholders hieronder.
  }

  return (
    <footer className="bg-primary-dark text-white/70">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top — brand + CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-20 pb-14 border-b border-white/10">
          <div>
            <Link href="/" className="inline-flex items-center mb-5">
              <Image
                src="/logo.svg"
                alt="SK Accounting"
                width={298}
                height={172}
                unoptimized
                className="h-10 w-auto"
              />
            </Link>
            <p className="font-sans text-sm leading-relaxed max-w-xs text-white/50">
              Uw betrouwbare partner voor boekhouding en fiscaal advies. Persoonlijk, proactief en
              digitaal.
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
              {[
                ['Over ons', '/over-ons'],
                ['Diensten', '/diensten'],
                ['Team', '/team'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
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
              {[
                'Boekhouding',
                'Btw-aangiftes',
                'Loonadministratie',
                'Fiscaal advies',
                'Bedrijfsoprichting',
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="/diensten"
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
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
              <li className="font-sans text-sm text-white/60 whitespace-pre-line">
                {address || 'Adres nog in te stellen, België'}
              </li>
              {phone && (
                <li>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${email || 'info@sk-accounting.be'}`}
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                >
                  {email || 'info@sk-accounting.be'}
                </a>
              </li>
              <li className="font-sans text-sm text-white/40 pt-1">
                BTW {companyNumber || 'BE 0790.380.051'}
              </li>
              {itaaNumber && (
                <li className="font-sans text-sm text-white/40">
                  ITAA {itaaNumber}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom — copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
            <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">
              © {new Date().getFullYear()} SK Accounting — Alle rechten voorbehouden
            </p>
            <Link
              href="/privacy"
              className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30 hover:text-white/70 transition-colors"
            >
              Privacybeleid
            </Link>
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">
            Gebouwd door{' '}
            <a href="https://studio-swyft.be" className="hover:text-white/70 transition-colors">
              Studio Swyft
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
