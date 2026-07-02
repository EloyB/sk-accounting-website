import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description:
    'Lees hoe SK Accounting jouw persoonsgegevens verwerkt en beschermt: welke gegevens we verzamelen, waarvoor, hoe lang we ze bewaren en welke rechten je hebt.',
  alternates: { canonical: '/privacy' },
}

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

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-charcoal mt-12 mb-4 first:mt-0"
      style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.5rem' }}
    >
      {children}
    </h2>
  )
}

function Text({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-[15px] text-charcoal/70 leading-relaxed mb-4">{children}</p>
}

export default async function PrivacyPage() {
  const payload = await getPayload({ config })
  const [settings, privacy] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'privacy-content' }),
  ])

  const companyName = 'SK Accounting'
  const companyNumber = settings.companyNumber || 'BE 0790.380.051'
  const address = settings.address || null
  const email = settings.email || 'info@sk-accounting.be'

  const lastUpdated = privacy.lastUpdated
    ? new Date(privacy.lastUpdated).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

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
          <SectionLabel>Juridisch</SectionLabel>
          <h1
            className="text-white"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1 }}
          >
            Privacybeleid
          </h1>
          {lastUpdated && (
            <p className="font-sans text-sm text-white/50 mt-6">Laatst bijgewerkt: {lastUpdated}</p>
          )}
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-8">
          {privacy.body ? (
            <div className="privacy-richtext font-sans text-[15px] text-charcoal/70 leading-relaxed">
              <RichText data={privacy.body} />
            </div>
          ) : (
            <>
              <Text>
                Dit privacybeleid legt uit hoe {companyName} jouw persoonsgegevens verwerkt wanneer je
                onze website bezoekt of via het contactformulier met ons in contact treedt. We gaan
                zorgvuldig en vertrouwelijk om met je gegevens, in overeenstemming met de Algemene
                Verordening Gegevensbescherming (AVG/GDPR).
              </Text>

              <Heading>1. Wie is verantwoordelijk voor je gegevens?</Heading>
              <Text>
                De verwerkingsverantwoordelijke is:
                <br />
                {companyName}
                {address ? (
                  <>
                    <br />
                    {address}
                  </>
                ) : null}
                <br />
                Ondernemingsnummer: {companyNumber}
                <br />
                E-mail:{' '}
                <a href={`mailto:${email}`} className="text-primary hover:underline">
                  {email}
                </a>
              </Text>

              <Heading>2. Welke gegevens verzamelen we?</Heading>
              <Text>
                We verzamelen enkel de gegevens die je zelf aan ons bezorgt via het contactformulier:
                je <strong>naam</strong>, <strong>e-mailadres</strong>, (optioneel) je{' '}
                <strong>telefoonnummer</strong> en de <strong>inhoud van je bericht</strong>. Daarnaast
                worden er voor de technische werking en beveiliging van de website beperkte
                logbestanden bijgehouden (zoals je IP-adres), die niet gebruikt worden om je te
                identificeren.
              </Text>

              <Heading>3. Waarvoor gebruiken we je gegevens?</Heading>
              <Text>
                We gebruiken je gegevens uitsluitend om je vraag of aanvraag te beantwoorden en met je
                te communiceren. De rechtsgrond hiervoor is ons gerechtvaardigd belang om op jouw
                verzoek te reageren, en desgevallend het nemen van stappen vóór het sluiten van een
                overeenkomst. We gebruiken je gegevens niet voor marketing en verkopen ze nooit aan
                derden.
              </Text>

              <Heading>4. Hoe lang bewaren we je gegevens?</Heading>
              <Text>
                We bewaren je gegevens niet langer dan nodig. Berichten via het contactformulier worden
                bewaard tot je vraag volledig is afgehandeld en daarna maximaal <strong>1 jaar</strong>,
                waarna ze verwijderd worden — tenzij er een klantrelatie ontstaat, in welk geval de
                wettelijke bewaartermijnen voor onze dienstverlening gelden.
              </Text>

              <Heading>5. Met wie delen we je gegevens?</Heading>
              <Text>
                Om onze website en communicatie te laten werken, doen we een beroep op externe
                verwerkers die je gegevens uitsluitend in onze opdracht verwerken:
              </Text>
              <ul className="font-sans text-[15px] text-charcoal/70 leading-relaxed mb-4 list-disc pl-5 space-y-1">
                <li>
                  <strong>Resend</strong> — voor het versturen van de e-mailnotificatie van je bericht.
                </li>
                <li>
                  <strong>Scaleway</strong> — voor de hosting van de website, de database en de opslag
                  van bestanden (datacenters in de EU).
                </li>
              </ul>
              <Text>
                Waar gegevens buiten de Europese Economische Ruimte verwerkt zouden worden, gebeurt dit
                met de passende waarborgen die de AVG voorschrijft (zoals modelcontractbepalingen).
              </Text>

              <Heading>6. Cookies</Heading>
              <Text>
                Deze website gebruikt <strong>geen tracking- of analytische cookies</strong> en volgt je
                surfgedrag niet. Enkel strikt noodzakelijke, functionele cookies kunnen gebruikt worden
                voor de goede werking van de site. Hiervoor is geen toestemming vereist.
              </Text>

              <Heading>7. Beveiliging</Heading>
              <Text>
                We nemen passende technische en organisatorische maatregelen om je gegevens te
                beschermen tegen verlies of ongeoorloofde toegang, waaronder een beveiligde
                (HTTPS-)verbinding en toegangscontrole tot de gegevens.
              </Text>

              <Heading>8. Jouw rechten</Heading>
              <Text>
                Je hebt het recht op inzage, verbetering, verwijdering en beperking van je
                persoonsgegevens, het recht op bezwaar tegen de verwerking en het recht op
                overdraagbaarheid. Gaf je toestemming, dan kan je die op elk moment intrekken. Om een
                van deze rechten uit te oefenen, contacteer je ons via{' '}
                <a href={`mailto:${email}`} className="text-primary hover:underline">
                  {email}
                </a>
                .
              </Text>

              <Heading>9. Klacht indienen</Heading>
              <Text>
                Ben je niet tevreden over hoe we met je gegevens omgaan? Dan heb je het recht om klacht
                in te dienen bij de Belgische Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000
                Brussel —{' '}
                <a href="https://www.gegevensbeschermingsautoriteit.be" className="text-primary hover:underline">
                  gegevensbeschermingsautoriteit.be
                </a>
                .
              </Text>

              <Heading>10. Wijzigingen</Heading>
              <Text>
                We kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie vind je
                steeds op deze pagina.
              </Text>
            </>
          )}

          <div className="mt-16 pt-8 border-t border-charcoal/10">
            <Link
              href="/contact"
              className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary inline-flex items-center gap-3 hover:gap-5 transition-all duration-300"
            >
              Nog vragen? Neem contact op <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
