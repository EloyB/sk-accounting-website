import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

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

const values = [
  {
    num: '01',
    title: 'Integriteit',
    desc: 'We werken transparant en eerlijk — geen verrassingen op de factuur, geen verborgen kosten. U weet altijd waar u aan toe bent.',
  },
  {
    num: '02',
    title: 'Betrokkenheid',
    desc: 'Uw onderneming is meer dan een dossier voor ons. We investeren in een langdurige relatie en kennen uw situatie door en door.',
  },
  {
    num: '03',
    title: 'Kwaliteit',
    desc: 'We volgen permanente vorming en blijven op de hoogte van de laatste fiscale en boekhoudkundige ontwikkelingen in België.',
  },
  {
    num: '04',
    title: 'Bereikbaarheid',
    desc: 'U krijgt altijd een snel en duidelijk antwoord. Geen wachttijden, geen doorverwijzingen naar een anoniem callcenter.',
  },
]

const milestones = [
  { year: '2008', event: 'Oprichting van het kantoor door Stef Kempenaers in Antwerpen.' },
  { year: '2012', event: 'Uitbreiding van het team met een tweede vennoot en focus op kmo\'s.' },
  { year: '2016', event: 'Introductie van volledig digitale dossierverwerking voor alle klanten.' },
  { year: '2021', event: 'Verhuis naar een nieuw, modern kantoor in het centrum van de stad.' },
  { year: '2024', event: 'Meer dan 200 actieve klanten en een team van vijf ervaren medewerkers.' },
]

export default async function OverOnsPage() {
  const payload = await getPayload({ config: configPromise })
  const content = await payload.findGlobal({ slug: 'over-ons-content' })

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
          <SectionLabel>Over ons</SectionLabel>
          <h1
            className="text-white max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1 }}
          >
            Een kantoor<br />gebouwd op<br /><em>vertrouwen</em>
          </h1>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-start">
            <div>
              <SectionLabel>Ons verhaal</SectionLabel>
              <h2
                className="text-charcoal mb-8"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05 }}
              >
                {content.onsVerhaalTitle || 'Al meer dan 15 jaar uw partner in cijfers'}
              </h2>
            </div>
            <div className="lg:pt-20">
              {content.onsVerhaalDescription && (
                <div className="font-sans text-charcoal/60 text-[15px] leading-relaxed space-y-5 [&_strong]:text-charcoal [&_em]:italic">
                  <RichText data={content.onsVerhaalDescription} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats banner ─────────────────────────────────────────── */}
      <section className="bg-primary-dark">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '15+', label: 'Jaar ervaring' },
              { value: '200+', label: 'Tevreden klanten' },
              { value: '5', label: 'Medewerkers' },
              { value: '100%', label: 'Digitaal platform' },
            ].map((s) => (
              <div key={s.label} className="py-12 px-8 first:pl-0">
                <div
                  className="text-white mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2.5rem', lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div
                  className="text-white/35 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '10px' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waarden ──────────────────────────────────────────────── */}
      <section className="bg-surface py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <SectionLabel>Onze waarden</SectionLabel>
            <h2
              className="text-charcoal"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1 }}
            >
              Waar we voor staan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-gold/25">
            {values.map((v, i) => (
              <div
                key={v.num}
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
                  {v.num}
                </span>
                <h3
                  className="text-charcoal mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.5rem' }}
                >
                  {v.title}
                </h3>
                <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tijdlijn ─────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28">
            <div>
              <SectionLabel>Onze geschiedenis</SectionLabel>
              <h2
                className="text-charcoal"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05 }}
              >
                Hoe we zijn gekomen waar we zijn
              </h2>
            </div>
            <div>
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex gap-8 ${i < milestones.length - 1 ? 'pb-8 border-b border-charcoal/8 mb-8' : ''}`}>
                  <div
                    className="text-gold flex-shrink-0 w-12"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '1.1rem' }}
                  >
                    {m.year}
                  </div>
                  <p className="font-sans text-sm text-charcoal/60 leading-relaxed pt-0.5">{m.event}</p>
                </div>
              ))}
            </div>
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
          <SectionLabel>Maak kennis</SectionLabel>
          <h2
            className="text-white mb-8 max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1 }}
          >
            Benieuwd wat we<br />voor u kunnen doen?
          </h2>
          <p className="font-sans text-white/50 text-lg mb-12 max-w-md leading-relaxed">
            Plan een vrijblijvend kennismakingsgesprek en ontdek hoe SK Accounting uw
            onderneming kan ondersteunen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] bg-white text-primary px-8 py-4 hover:bg-surface transition-colors duration-300"
            >
              Neem contact op
            </Link>
            <Link
              href="/team"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] border border-white/20 text-white px-8 py-4 hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              Ontmoet ons team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
