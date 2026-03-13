import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

const fallbackMembers = [
  {
    id: 'fallback-1',
    name: 'Stef Kempenaers',
    role: 'Zaakvoerder & Erkend Boekhouder',
    bio: 'Stef richtte SK Accounting op in 2008 met een eenvoudig principe: elke klant verdient een boekhouder die écht beschikbaar is. Met meer dan 20 jaar ervaring in de Belgische boekhoudwetgeving is hij de stuwende kracht achter het kantoor. Hij helpt zelfstandigen en kmo\'s niet alleen met hun cijfers, maar denkt actief mee over de toekomst van hun onderneming.',
    photo: null,
    initials: 'SK',
  },
  {
    id: 'fallback-2',
    name: 'Lien Martens',
    role: 'Senior Boekhouder',
    bio: 'Lien is gespecialiseerd in btw-optimalisatie en loonadministratie. Ze staat bekend om haar oog voor detail en haar rustige, heldere manier van communiceren. Klanten waarderen haar directheid — ze legt complexe fiscale materie uit in begrijpelijke taal, zonder jargon. Ze is al acht jaar een vaste waarde bij SK Accounting.',
    photo: null,
    initials: 'LM',
  },
  {
    id: 'fallback-3',
    name: 'Thomas Wouters',
    role: 'Boekhouder & Fiscaal Adviseur',
    bio: 'Thomas brengt een frisse kijk op fiscale optimalisatie voor startende ondernemers en groeibedrijven. Hij volgde een gespecialiseerde opleiding vennootschapsbelasting en houdt zijn kennis permanent bij. Zijn passie ligt bij bedrijfsoprichting en groeibegeleiding — hij begeleidt nieuwe klanten van nul tot een gezond financieel fundament.',
    photo: null,
    initials: 'TW',
  },
  {
    id: 'fallback-4',
    name: 'Sofie Declercq',
    role: 'Boekhouder',
    bio: 'Sofie verzorgt de dagelijkse boekhouding voor een vaste portefeuille van klanten in de horeca en de bouwsector. Ze is gekend voor haar proactieve opvolging: klanten hoeven nooit zelf te vragen of er iets ontbreekt. Haar warme aanpak zorgt ervoor dat ook klanten die vroeger moeite hadden met boekhoudkundige verplichtingen, zich nu volledig op hun gemak voelen.',
    photo: null,
    initials: 'SD',
  },
  {
    id: 'fallback-5',
    name: 'Marie Bogaert',
    role: 'Administratief Medewerker',
    bio: 'Marie is het eerste aanspreekpunt voor nieuwe klanten en zorgt voor een vlotte administratieve werking van het kantoor. Ze coördineert afspraken, verwerkt documenten en houdt het digitale platform up-to-date. Haar toegankelijkheid en efficiëntie zorgen ervoor dat klanten altijd snel en vriendelijk geholpen worden.',
    photo: null,
    initials: 'MB',
  },
]

type PayloadMember = {
  id: string | number
  name: string
  role: string
  bio?: string | null
  photo?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
}

export default async function TeamPage() {
  const payload = await getPayload({ config: configPromise })
  const teamResult = await payload.find({
    collection: 'team-members',
    sort: 'order',
    depth: 1,
    limit: 20,
  })

  const hasCmsMembers = teamResult.docs.length > 0
  const cmsMembers: PayloadMember[] = teamResult.docs as PayloadMember[]

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
          <div className="anim-1">
            <SectionLabel>Ons team</SectionLabel>
          </div>
          <h1
            className="text-white max-w-2xl anim-2"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1 }}
          >
            De mensen<br />achter <em>SK Accounting</em>
          </h1>
          <p className="font-sans text-white/55 text-lg leading-relaxed mt-8 max-w-lg anim-3">
            Boekhouding is mensenwerk. Elk lid van ons team draagt bij aan een persoonlijke,
            betrokken aanpak die verder gaat dan de cijfers.
          </p>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">
            <div>
              <SectionLabel>Onze filosofie</SectionLabel>
              <h2
                className="text-charcoal"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05 }}
              >
                Geen dossier,<br />maar een <em>relatie</em>
              </h2>
            </div>
            <div className="lg:pt-16 space-y-5 font-sans text-[15px] text-charcoal/60 leading-relaxed">
              <p>
                Bij SK Accounting werkt u altijd met een vaste contactpersoon die uw onderneming
                door en door kent. We geloven dat goede boekhouding begint bij een echte vertrouwensrelatie —
                niet bij een anoniem ticketsysteem of een wisselend team van gezichten.
              </p>
              <p>
                Elk teamlid volgt permanente vorming en is gespecialiseerd in specifieke sectoren
                en thema's. Zo combineert u de voordelen van een persoonlijk kantoor met de kennis
                en slagkracht van een volledig team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team members ──────────────────────────────────────────── */}
      <section className="bg-surface py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <SectionLabel>Het team</SectionLabel>
            <h2
              className="text-charcoal"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1 }}
            >
              Maak kennis met iedereen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/20">
            {hasCmsMembers
              ? cmsMembers.map((member, i) => (
                  <MemberCard
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    bio={member.bio ?? undefined}
                    photoUrl={member.photo?.url ?? undefined}
                    photoAlt={member.photo?.alt ?? member.name}
                    index={i}
                  />
                ))
              : fallbackMembers.map((member, i) => (
                  <MemberCard
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    bio={member.bio}
                    initials={member.initials}
                    index={i}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-px h-16 bg-gold/40 mx-auto mb-12" />
            <blockquote
              className="text-charcoal"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.2 }}
            >
              "Een goede boekhouder kent uw cijfers.<br />
              Een <em>uitstekende</em> boekhouder kent uw verhaal."
            </blockquote>
            <div className="w-px h-16 bg-gold/40 mx-auto mt-12 mb-6" />
            <p className="font-sans text-charcoal/40 text-[11px] uppercase tracking-[0.28em]">
              Stef Kempenaers — Zaakvoerder SK Accounting
            </p>
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
          <SectionLabel>Samenwerken</SectionLabel>
          <h2
            className="text-white mb-8 max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1 }}
          >
            Klaar om uw vaste<br /><em>boekhouder te ontmoeten?</em>
          </h2>
          <p className="font-sans text-white/50 text-lg mb-12 max-w-md leading-relaxed">
            Neem contact op voor een vrijblijvend kennismakingsgesprek.
            We koppelen u aan het teamlid dat het beste bij uw sector en noden past.
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

// ─── Member card ───────────────────────────────────────────────────────────────

function MemberCard({
  name,
  role,
  bio,
  photoUrl,
  photoAlt,
  initials,
  index,
}: {
  name: string
  role: string
  bio?: string
  photoUrl?: string
  photoAlt?: string
  initials?: string
  index: number
}) {
  return (
    <div className="bg-white group hover:bg-primary/[0.015] transition-colors duration-500">
      {/* Photo area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/6">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={photoAlt ?? name}
            fill
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Subtle texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #034c22 0, #034c22 1px, transparent 0, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />
            <span
              className="relative text-charcoal/20 select-none"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '5rem', lineHeight: 1 }}
            >
              {initials ?? name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
        )}
        {/* Index number overlay */}
        <div className="absolute top-6 right-6">
          <span
            className="text-charcoal/15 select-none"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '1rem' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10">
        <div className="w-8 h-px bg-gold mb-6" />

        <h3
          className="text-charcoal mb-1"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(22px, 2.5vw, 28px)', lineHeight: 1.1 }}
        >
          {name}
        </h3>
        <p
          className="text-gold text-[10px] uppercase tracking-[0.25em] mb-6"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {role}
        </p>

        {bio && (
          <p className="font-sans text-sm text-charcoal/55 leading-relaxed">
            {bio}
          </p>
        )}
      </div>
    </div>
  )
}
