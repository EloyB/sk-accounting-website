import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

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

const defaultServices = [
  {
    id: '01',
    title: 'Boekhouding & jaarrekeningen',
    description:
      'Volledige verwerking van uw boekhouding en de opmaak van uw jaarrekening, conform de Belgische wetgeving. U ontvangt heldere rapportages zodat u altijd weet waar uw onderneming staat.',
  },
  {
    id: '02',
    title: 'Btw-aangiftes',
    description:
      'Correcte en tijdige indiening van uw btw-aangiftes, met proactieve opvolging en optimalisatie van uw btw-positie. We bewaken de deadlines en vermijden dure boetes.',
  },
  {
    id: '03',
    title: 'Loonadministratie',
    description:
      'Van loonfiches tot dimona-aangiften — wij beheren de volledige sociale administratie voor uw personeel. Een complexe taak die u gerust aan ons kunt overlaten.',
  },
  {
    id: '04',
    title: 'Fiscale optimalisatie',
    description:
      'We analyseren uw fiscale situatie en zoeken legale mogelijkheden om uw belastingdruk structureel te verlagen. Proactief advies dat u geld bespaart, jaar na jaar.',
  },
  {
    id: '05',
    title: 'Bedrijfsoprichting',
    description:
      'Begeleiding bij de oprichting van uw vennootschap: rechtsvorm, statuten, financieel plan en administratieve opstart. We zorgen dat alles van bij het begin correct is geregeld.',
  },
  {
    id: '06',
    title: 'Financieel advies',
    description:
      'Strategisch advies over investeringen, financiering en de financiële gezondheid van uw onderneming op lange termijn. We denken met u mee, ver voorbij de loutere cijfers.',
  },
]

const pillars = [
  {
    num: '01',
    title: 'Volledig ontzorgd',
    desc: 'Wij nemen de administratieve last volledig van uw schouders, zodat u zich kunt concentreren op uw kernactiviteiten.',
  },
  {
    num: '02',
    title: 'Proactief advies',
    desc: 'We wachten niet op uw vragen. We signaleren kansen en risico\'s tijdig, zodat u altijd een stap voor bent.',
  },
  {
    num: '03',
    title: 'Digitaal platform',
    desc: 'Via ons beveiligd platform bezorgt u documenten eenvoudig en hebt u op elk moment toegang tot uw dossier.',
  },
]

export default async function DienstenPage() {
  const payload = await getPayload({ config })
  const servicesResult = await payload.find({ collection: 'services', sort: 'order', limit: 50 })

  const services = servicesResult.docs.length > 0
    ? servicesResult.docs.map((s, i) => ({
        id: String(i + 1).padStart(2, '0'),
        title: s.title,
        description: s.description,
      }))
    : defaultServices

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
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
          <SectionLabel>Wat we doen</SectionLabel>
          <h1
            className="text-white max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1 }}
          >
            Onze<br />diensten
          </h1>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">
            <div>
              <SectionLabel>Onze aanpak</SectionLabel>
              <h2
                className="text-charcoal"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05 }}
              >
                Meer dan<br />boekhouding
              </h2>
            </div>
            <div className="space-y-5 lg:pt-16">
              <p className="font-sans text-charcoal/60 text-[15px] leading-relaxed">
                Bij SK Accounting leveren we geen standaardpakket. We leren uw onderneming grondig
                kennen en bieden diensten op maat — van de dagelijkse boekhouding tot strategisch
                fiscaal advies.
              </p>
              <p className="font-sans text-charcoal/60 text-[15px] leading-relaxed">
                Of u nu pas start als zelfstandige of een groeiende kmo leidt: we schalen mee met
                uw noden en zorgen dat uw cijfers altijd kloppen en uw fiscale situatie optimaal is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diensten lijst ───────────────────────────────────────── */}
      <section className="bg-surface py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <SectionLabel>Volledig overzicht</SectionLabel>
            <h2
              className="text-charcoal"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1 }}
            >
              Alles wat we aanbieden
            </h2>
          </div>

          <div>
            {services.map((s) => (
              <div
                key={s.id}
                className="group grid grid-cols-1 md:grid-cols-[4rem_1fr] gap-4 md:gap-10 py-8 border-b border-charcoal/8 hover:pl-2 transition-all duration-300"
              >
                <span
                  className="text-gold/50 pt-1 select-none"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '1rem' }}
                >
                  {s.id}
                </span>
                <div>
                  <h3
                    className="text-charcoal group-hover:text-primary transition-colors duration-200 mb-3"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(22px, 2.5vw, 28px)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/55 leading-relaxed max-w-2xl">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pijlers ──────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <SectionLabel>Werkwijze</SectionLabel>
            <h2
              className="text-charcoal"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1 }}
            >
              Hoe wij werken
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-gold/25">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className={[
                  'p-10 md:p-12',
                  i < pillars.length - 1 ? 'md:border-r border-b md:border-b-0 border-gold/25' : '',
                ].join(' ')}
              >
                <span
                  className="block text-gold/30 mb-5 leading-none select-none"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '4rem' }}
                >
                  {p.num}
                </span>
                <h3
                  className="text-charcoal mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.4rem' }}
                >
                  {p.title}
                </h3>
                <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-primary-dark py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(4,90,40,0.35) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-8">
          <SectionLabel>Aan de slag</SectionLabel>
          <h2
            className="text-white mb-8 max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1 }}
          >
            Klaar om uw<br />boekhouding<br /><em>in goede handen</em><br />te geven?
          </h2>
          <p className="font-sans text-white/50 text-lg mb-12 max-w-md leading-relaxed">
            Neem contact op voor een vrijblijvend gesprek. We bekijken samen
            welke diensten het beste aansluiten bij uw situatie.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] bg-white text-primary px-8 py-4 hover:bg-surface transition-colors duration-300"
            >
              Neem contact op
            </Link>
            <Link
              href="/over-ons"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] border border-white/20 text-white px-8 py-4 hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              Over ons kantoor
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
