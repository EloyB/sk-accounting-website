import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

// ─── Decorative divider ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <div className="w-7 h-px bg-gold" />
      <span
        className="text-gold text-[10px] uppercase tracking-[0.28em]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {children}
      </span>
    </div>
  )
}

// ─── Defaults (shown when CMS fields are empty) ───────────────────────────────

const defaultServices = [
  { id: '01', title: 'Boekhouding & jaarrekeningen', description: 'Volledige verwerking van uw boekhouding en de opmaak van uw jaarrekening, conform de Belgische wetgeving.' },
  { id: '02', title: 'Btw-aangiftes', description: 'Correcte en tijdige indiening van uw btw-aangiftes, met proactieve opvolging en optimalisatie van uw btw-positie.' },
  { id: '03', title: 'Loonadministratie', description: 'Van loonfiches tot dimona-aangiften — wij beheren de volledige sociale administratie voor uw personeel.' },
  { id: '04', title: 'Fiscale optimalisatie', description: 'We analyseren uw fiscale situatie en zoeken legale mogelijkheden om uw belastingdruk structureel te verlagen.' },
  { id: '05', title: 'Bedrijfsoprichting', description: 'Begeleiding bij de oprichting van uw vennootschap: rechtsvorm, statuten, financieel plan en administratieve opstart.' },
  { id: '06', title: 'Financieel advies', description: 'Strategisch advies over investeringen, financiering en de financiële gezondheid van uw onderneming op lange termijn.' },
]

const valueProps = [
  { num: '01', title: 'Persoonlijke aanpak', desc: 'Geen anoniem kantoor. U heeft één vaste boekhouder die uw dossier door en door kent en altijd bereikbaar is.' },
  { num: '02', title: 'Proactief advies', desc: 'We wachten niet tot er problemen zijn. We denken actief mee over opportuniteiten voor uw onderneming.' },
  { num: '03', title: 'Digitaal & efficiënt', desc: 'Via ons digitaal platform bezorgt u documenten eenvoudig en veilig. Minder papier, meer overzicht.' },
  { num: '04', title: 'Jarenlange ervaring', desc: "Met brede ervaring in diverse sectoren kennen we de uitdagingen van Belgische zelfstandigen en kmo's." },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [homepageContent, servicesResult, teamResult] = await Promise.all([
    payload.findGlobal({ slug: 'homepage-content' }),
    payload.find({ collection: 'services', sort: 'order', limit: 10 }),
    payload.find({ collection: 'team-members', sort: 'order', limit: 4 }),
  ])

  const heroHeading = homepageContent.heroHeading || null
  const heroSubtext = homepageContent.heroSubtext || null
  const heroCtaLabel = homepageContent.heroCtaLabel || 'Maak een afspraak'
  const statYears = homepageContent.statYears || '15+'
  const statClients = homepageContent.statClients || '200+'

  const services = servicesResult.docs.length > 0
    ? servicesResult.docs.map((s, i) => ({
        id: String(i + 1).padStart(2, '0'),
        title: s.title,
        description: s.description,
      }))
    : defaultServices

  const teamMembers = teamResult.docs

  return (
    <>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="relative bg-primary overflow-hidden flex flex-col"
        style={{ minHeight: 'calc(100vh - 74px)' }}
      >
        {/* Gradient depth layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 5% 65%, rgba(4,90,40,0.55) 0%, transparent 55%), radial-gradient(ellipse at 90% 5%, rgba(2,45,20,0.8) 0%, transparent 50%)',
          }}
        />

        {/* Subtle diagonal grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Content */}
        <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-8 py-24">
          <div className="max-w-4xl">

            <div className="anim-1">
              <SectionLabel>Boekhouding · Fiscaliteit · Advies</SectionLabel>
            </div>

            <h1
              className="text-white leading-[0.92] mb-10 anim-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(64px, 9vw, 104px)',
              }}
            >
              {heroHeading ? (
                heroHeading
              ) : (
                <>Boekhouding<br />die <em>werkt</em><br />voor u</>
              )}
            </h1>

            <p
              className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-lg anim-3"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {heroSubtext ||
                "SK Accounting begeleidt zelfstandigen en kmo's met heldere boekhouding, fiscaal advies en persoonlijke begeleiding — zodat u zich kunt focussen op waar u écht goed in bent."}
            </p>

            <div className="flex flex-wrap gap-4 anim-4">
              <Link
                href="/contact"
                className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] bg-white text-primary px-8 py-4 hover:bg-surface transition-colors duration-300"
              >
                {heroCtaLabel}
              </Link>
              <Link
                href="/diensten"
                className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] border border-white/25 text-white px-8 py-4 hover:border-white/60 hover:bg-white/5 transition-all duration-300"
              >
                Onze diensten
              </Link>
            </div>
          </div>
        </div>

        {/* Stats row anchored to bottom of hero */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-3 divide-x divide-white/10 anim-5">
              {[
                { value: statYears, label: 'Jaar ervaring' },
                { value: statClients, label: 'Tevreden klanten' },
                { value: '100%', label: 'Persoonlijke aanpak' },
              ].map((stat) => (
                <div key={stat.label} className="py-8 px-8 first:pl-0">
                  <div
                    className="text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2.25rem' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-white/40 uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '10px' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Waarom SK Accounting ─────────────────────────────────────── */}
      <section className="bg-surface py-28">
        <div className="max-w-7xl mx-auto px-8">

          <div className="mb-16">
            <SectionLabel>Onze aanpak</SectionLabel>
            <h2
              className="text-charcoal"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1 }}
            >
              Waarom SK Accounting?
            </h2>
          </div>

          {/* 2×2 framed grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-gold/25">
            {valueProps.map((prop, i) => (
              <div
                key={prop.num}
                className={[
                  'p-10 md:p-12 group hover:bg-primary/[0.03] transition-colors duration-300',
                  i % 2 === 0 ? 'md:border-r border-gold/25' : '',
                  i < 2 ? 'border-b border-gold/25' : '',
                ].join(' ')}
              >
                <span
                  className="block text-gold/30 mb-5 leading-none select-none"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '4rem' }}
                >
                  {prop.num}
                </span>
                <h3
                  className="text-charcoal mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.5rem' }}
                >
                  {prop.title}
                </h3>
                <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Diensten ─────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <SectionLabel>Wat we doen</SectionLabel>
              <h2
                className="text-charcoal"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1 }}
              >
                Onze diensten
              </h2>
            </div>
            <Link
              href="/diensten"
              className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary flex items-center gap-3 hover:gap-5 transition-all duration-300 self-start md:self-end whitespace-nowrap pb-1"
            >
              Alle diensten <span className="text-base">→</span>
            </Link>
          </div>

          {/* Editorial service list */}
          <div>
            {services.map((s) => (
              <div
                key={s.id}
                className="group flex items-start gap-6 md:gap-10 py-7 border-b border-charcoal/8 hover:pl-3 transition-all duration-300 cursor-default"
              >
                <span
                  className="text-gold/60 flex-shrink-0 w-8 pt-0.5"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '1rem' }}
                >
                  {s.id}
                </span>
                <div className="flex-1 md:flex md:items-baseline md:gap-10">
                  <h3
                    className="text-charcoal group-hover:text-primary transition-colors duration-200 mb-1 md:mb-0 md:w-72 flex-shrink-0"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.35rem' }}
                  >
                    {s.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/50 leading-relaxed">{s.description}</p>
                </div>
                <span className="text-charcoal/20 group-hover:text-primary transition-colors duration-200 self-center flex-shrink-0 text-lg">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team teaser ───────────────────────────────────────────────── */}
      <section className="bg-surface py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Text */}
            <div>
              <SectionLabel>Ons team</SectionLabel>
              <h2
                className="text-charcoal mb-8"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1.05 }}
              >
                Mensen die<br />u <em>echt</em> kennen
              </h2>
              <p className="font-sans text-charcoal/55 text-lg leading-relaxed mb-10">
                Bij SK Accounting werkt u altijd met een vaste contactpersoon
                die uw dossier door en door kent. Geen callcenter, geen
                doorverwijzingen — gewoon een vertrouwd aanspreekpunt.
              </p>

              <ul className="space-y-4 mb-12">
                {[
                  'Vaste persoonlijke boekhouder',
                  'Vlot bereikbaar via telefoon en e-mail',
                  'Proactieve opvolging van uw dossier',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 font-sans text-sm text-charcoal/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/team"
                className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary flex items-center gap-3 hover:gap-5 transition-all duration-300"
              >
                Ontmoet ons team <span className="text-base">→</span>
              </Link>
            </div>

            {/* Team photo grid — shows CMS members when available, falls back to placeholders */}
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.length > 0 ? (
                teamMembers.map((member, i) => (
                  <div
                    key={member.id}
                    className={`bg-charcoal/8 aspect-[3/4] flex flex-col justify-end p-4 ${i % 3 === 0 ? 'mt-10' : ''}`}
                  >
                    <div className="w-10 h-px bg-charcoal/25 mb-2" />
                    <p
                      className="text-charcoal/70 text-sm font-medium"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                    >
                      {member.name}
                    </p>
                    {member.role && (
                      <p className="font-sans text-charcoal/40 text-xs mt-0.5">{member.role}</p>
                    )}
                  </div>
                ))
              ) : (
                [
                  { offset: 'mt-10', label: 'Teamlid' },
                  { offset: '',      label: 'Teamlid' },
                  { offset: '',      label: 'Teamlid' },
                  { offset: 'mt-10', label: 'Teamlid' },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`bg-charcoal/8 aspect-[3/4] flex flex-col justify-end p-4 ${card.offset}`}
                  >
                    <div className="w-10 h-px bg-charcoal/25 mb-2" />
                    <p
                      className="text-charcoal/40 text-sm"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                    >
                      {card.label}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-dark py-32 relative overflow-hidden">
        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 80% 50%, rgba(4,90,40,0.35) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-8">
          <SectionLabel>Neem contact op</SectionLabel>

          <h2
            className="text-white mb-8 max-w-3xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1 }}
          >
            Klaar om samen<br /><em>te werken?</em>
          </h2>

          <p className="font-sans text-white/50 text-lg mb-12 max-w-md leading-relaxed">
            Neem vandaag nog contact op voor een vrijblijvend
            kennismakingsgesprek. We bekijken samen wat we voor u kunnen betekenen.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] bg-white text-primary px-8 py-4 hover:bg-surface transition-colors duration-300"
            >
              Neem contact op
            </Link>
            <Link
              href="/diensten"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] border border-white/20 text-white px-8 py-4 hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              Onze diensten
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
