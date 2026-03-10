import { getPayload } from 'payload'
import config from '@payload-config'
import ContactForm from './ContactForm'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <div className="w-7 h-px bg-gold" />
      <span className="text-gold text-[10px] uppercase tracking-[0.28em]" style={{ fontFamily: 'var(--font-sans)' }}>
        {children}
      </span>
    </div>
  )
}

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="py-6 border-b border-charcoal/8 last:border-0">
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-charcoal/35 mb-1.5">{label}</p>
      {href ? (
        <a href={href} className="font-sans text-sm text-charcoal hover:text-primary transition-colors duration-200">
          {value}
        </a>
      ) : (
        <p className="font-sans text-sm text-charcoal whitespace-pre-line">{value}</p>
      )}
    </div>
  )
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  const phone       = settings.phone       || '+32 000 00 00 00'
  const email       = settings.email       || 'info@sk-accounting.be'
  const address     = settings.address     || 'Adres nog in te stellen'
  const officeHours = settings.officeHours || 'Ma – Vr: 9:00 – 17:00'

  return (
    <>
      {/* ── Page hero ────────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden py-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 90% 10%, rgba(2,45,20,0.8) 0%, transparent 50%), radial-gradient(ellipse at 5% 80%, rgba(4,90,40,0.4) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-8">
          <SectionLabel>Contact</SectionLabel>
          <h1
            className="text-white"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1 }}
          >
            Neem contact<br />met ons op
          </h1>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────── */}
      <section className="bg-surface py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 xl:gap-24">

            {/* Left — contact details */}
            <div className="lg:col-span-2">
              <SectionLabel>Gegevens</SectionLabel>
              <h2
                className="text-charcoal mb-8"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.05 }}
              >
                Hoe kunt u ons bereiken?
              </h2>
              <p className="font-sans text-sm text-charcoal/55 leading-relaxed mb-10">
                Heeft u vragen over onze diensten of wilt u een vrijblijvend
                kennismakingsgesprek? Neem gerust contact op — we helpen u graag verder.
              </p>

              <div>
                <ContactItem label="Telefoon" value={phone} href={`tel:${phone.replace(/\s/g, '')}`} />
                <ContactItem label="E-mail" value={email} href={`mailto:${email}`} />
                <ContactItem label="Adres" value={address} />
                <ContactItem label="Kantooruren" value={officeHours} />
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3 bg-white p-10 md:p-12 border border-charcoal/6">
              <SectionLabel>Stuur ons een bericht</SectionLabel>
              <h2
                className="text-charcoal mb-8"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2rem', lineHeight: 1 }}
              >
                Contactformulier
              </h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
