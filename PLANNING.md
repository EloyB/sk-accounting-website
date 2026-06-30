# PLANNING.md — SK Accounting

> Roadmap van skelet naar volwaardige, productieklare website.
> Opgesteld op basis van een volledige analyse van de codebase op **2 juni 2026**.

## Huidige situatie (samenvatting)

Het project is **verder dan een skelet** maar nog niet productieklaar. Wat er **al staat**:

- ✅ Alle 5 pagina's bestaan: Home, Over ons (`/over-ons`), Diensten (`/diensten`), Team (`/team`), Contact (`/contact`)
- ✅ Pagina's halen content uit Payload met nette **fallbacks** (hardcoded defaults als CMS leeg is)
- ✅ Werkend contactformulier (server action → slaat op in `contact-submissions`)
- ✅ Nav + Footer componenten, responsive, met eigen huisstijl (groen `#034c22`, gold accent, Cormorant Garamond + DM Sans)
- ✅ Payload plugins geconfigureerd: SEO, Search, Redirects, Form Builder, S3-storage (Scaleway)
- ✅ S3-opslag voor media klaar voor Scaleway
- ✅ Eén migratie aanwezig, migrations-first aanpak (geen push-mode)
- ✅ Toegangscontrole correct op collecties (contact-submissions afgeschermd)

Wat er **mist of stuk is** — uitgewerkt hieronder per prioriteit. Afgevinkte vakjes (`[x]`) zijn in code afgewerkt; openstaande vakjes (`[ ]`) zijn **wat jij nog moet doen** (echte data, API-keys, beslissingen, deploy).

---

## ✅ Afgewerkt in code (sessie 2 juni 2026)

Volgende punten zijn geïmplementeerd en de productie-build is groen (`npm run build`):

- **Footer** haalt contactgegevens uit `SiteSettings` (geen placeholders meer); e-maildomein gelijkgetrokken (`sk-accounting.be`)
- **E-mailnotificatie contactformulier** via Resend — dependency-vrije `afterChange`-hook op `ContactSubmissions` (`fetch` → Resend API). Faalt nooit de inzending; valt qua ontvanger terug op `SiteSettings.email`. → jij voegt nog `RESEND_API_KEY`, `CONTACT_NOTIFICATION_FROM`/`_TO` toe in `.env`
- **Spam-bescherming**: honeypot-veld op het contactformulier
- **Per-pagina SEO-metadata** op alle 5 pagina's (title, description, canonical) + OpenGraph/Twitter-defaults + title-template in de root layout
- **`sitemap.ts`, `robots.ts`, `manifest.ts`** toegevoegd
- **OG-afbeelding** (`opengraph-image.tsx`, 1200×630, huisstijl)
- **Favicon** (`src/app/icon.svg`, SK-monogram in huisstijl)
- **Structured data**: `AccountingService` JSON-LD (uit `SiteSettings`) in de layout
- **Google Search Console**: verificatie-hook via `GOOGLE_SITE_VERIFICATION` env-var (jij plaatst het token)
- **Frontend states**: `not-found.tsx` (404), `error.tsx`, `loading.tsx` in huisstijl
- **Over ons**: fallback-tekst voor lege rich text
- **Lettertypes via `next/font`** i.p.v. render-blocking CSS-`@import`
- **A11y**: zichtbare `:focus-visible`, `prefers-reduced-motion`, aria op contactformulier
- **`public/ie-incompatible.html`** aangemaakt (werd door `redirects.js` verwacht)

Resterend werk vereist **echte data, API-keys of beslissingen van jou** — zie hieronder.

---

## 🔴 Prioriteit 1 — Blokkeert lancering

### 1.1 Echte content in de database (Payload)
De collecties en globals bestaan, maar zijn (grotendeels) leeg — de site draait nu op hardcoded fallbacks.

- [ ] **SiteSettings** invullen: echt telefoonnummer, e-mailadres, fysiek adres, openingsuren
- [ ] **TeamMembers** aanmaken met echte namen, functies, bio's en foto's (uploaden naar Media → S3)
- [ ] **Services** aanmaken met echte titels/beschrijvingen + volgorde (`order`)
- [ ] **HomepageContent** invullen: hero-heading, subtext, CTA-label, stats (jaren, klanten)
- [ ] **OverOnsContent** invullen: "Ons verhaal" titel + rich text
- [ ] Overweeg een **seed-script** (`src/seed.ts`) zodat een verse DB reproduceerbaar gevuld kan worden (handig voor staging + nieuwe omgevingen)

### 1.2 Placeholder-contactgegevens in Footer ✅ afgewerkt
- [x] Footer contactgegevens uit **SiteSettings** halen (zoals de contactpagina al doet) i.p.v. hardcoden
- [x] Inconsistent e-maildomein oplossen (`skaccounting.be` → `sk-accounting.be`)

### 1.3 E-mailnotificaties bij contactformulier
Notificatie verloopt via een dependency-vrije `afterChange`-hook (`fetch` → Resend API).

- [x] `afterChange`-hook op `ContactSubmissions` die notificatie stuurt naar het kantoor
- [x] Resend-credentials gedocumenteerd in `.env.example`
- [ ] **Jij:** `RESEND_API_KEY`, `CONTACT_NOTIFICATION_FROM` (geverifieerd domein) en evt. `CONTACT_NOTIFICATION_TO` in `.env` zetten
- [ ] Optioneel: bevestigingsmail naar de indiener (nog niet geïmplementeerd)

### 1.4 Echte logo & favicon
- [x] `public/`-map aangemaakt
- [x] Favicon — `src/app/icon.svg` (SK-monogram in huisstijl)
- [ ] **Jij:** definitief logo plaatsen (huidige is placeholder) — `src/components/admin/Logo.tsx` + frontend (`Nav`, `Footer`)
- [ ] Optioneel: `apple-icon.png` / hoge-resolutie PNG-icon naast de SVG

---

## 🟠 Prioriteit 2 — SEO & vindbaarheid

### 2.1 Per-pagina metadata ✅ afgewerkt
- [x] Statische `metadata`-export op elke pagina: Home, Over ons, Diensten, Team, Contact
- [x] Unieke, Nederlandstalige `title` + `description` per pagina
- [x] OpenGraph + Twitter card tags (titel, beschrijving, OG-afbeelding)
- [x] Canonical URLs instellen
- [ ] Optioneel: titels/teksten lokaal aanscherpen (bv. "Boekhouder in [stad]") zodra de regio bekend is

### 2.2 Sitemap & robots ✅ afgewerkt
- [x] `src/app/sitemap.ts` — alle 5 pagina's
- [x] `src/app/robots.ts` — `/admin` en `/api` disallowed, sitemap-verwijzing
- [x] `src/app/manifest.ts` — PWA/web-app manifest (naam, kleuren, icon)

### 2.3 Structured data (schema.org / JSON-LD)
- [x] `AccountingService` schema (naam, beschrijving, telefoon/e-mail/adres uit `SiteSettings`)
- [ ] Optioneel: `openingsuren` + geo-coördinaten toevoegen aan het schema zodra bekend
- [ ] Optioneel: `BreadcrumbList` waar relevant

### 2.4 Google Search Console & Analytics — **jij**
- [x] Verificatie-mechanisme klaar via `GOOGLE_SITE_VERIFICATION` env-var (meta-tag wordt automatisch gerenderd)
- [ ] **Jij:** token plaatsen + domein verifiëren in **Google Search Console**
- [ ] **Jij:** sitemap indienen bij Search Console
- [ ] **Jij:** **Google Business Profile** aanmaken/claimen (cruciaal voor lokale boekhouder-SEO)
- [ ] **Jij:** analytics koppelen (GA4 of privacy-vriendelijk zoals Plausible/Umami) — nog niet in code
- [ ] **Jij:** cookie-/consent-banner indien analytics met cookies (GDPR — verplicht in België)

### 2.5 OG-afbeelding ✅ afgewerkt
- [x] `src/app/opengraph-image.tsx` (1200×630, huisstijl)

---

## 🟡 Prioriteit 3 — Pagina's & content afwerken

### 3.1 Ontbrekende error/loading states (frontend) ✅ afgewerkt
- [x] `src/app/(frontend)/not-found.tsx` — gestylede 404 in huisstijl
- [x] `src/app/(frontend)/error.tsx` — foutpagina
- [x] `src/app/(frontend)/loading.tsx` — laadstate

### 3.2 Content-/datamodel verrijken
- [x] **Over ons** rich-text: fallback toegevoegd voor lege `onsVerhaalDescription`
- [ ] **Jij/optioneel:** **Services** uitbreiden: rich-text beschrijving, icoon/afbeelding, eventueel categorieën
- [ ] **Jij/optioneel:** hardcoded timeline (2008–2024) en waarden op Over ons CMS-driven maken
- [ ] **Jij:** quote op teampagina uit CMS halen + naam-inconsistentie oplossen (**"Steven Kaers"** op teampagina vs **"Stef Kempenaers"** in fallback-data — kies de juiste echte naam)

### 3.3 Ontbrekende standaardpagina's (juridisch — verplicht in BE) — **jij**
- [ ] **Privacybeleid** (`/privacy`) — GDPR-verplicht
- [ ] **Cookiebeleid** (indien tracking)
- [ ] **Algemene voorwaarden** (optioneel maar gebruikelijk)
- [ ] Verplichte ondernemingsgegevens in footer: **ondernemingsnummer (BTW/KBO)**, eventueel **ITAA-erkenning** (beroepsinstituut accountants)

---

## 🟢 Prioriteit 4 — Kwaliteit, toegankelijkheid, performance

### 4.1 Toegankelijkheid (a11y)
- [x] Zichtbare focus-states op interactieve elementen (`:focus-visible`)
- [x] Form-velden: `role="alert"`/`role="status"` + `prefers-reduced-motion` gerespecteerd
- [ ] **Jij:** kleurcontrast controleren (gold op groen, etc.) tegen WCAG AA
- [ ] **Jij:** toetsenbordnavigatie volledig testen (mobiel menu, formulier)
- [ ] Optioneel: resterende decoratieve elementen `aria-hidden` geven

### 4.2 Performance
- [x] Lettertypes via `next/font` i.p.v. CSS-`@import` (geen render-blocking + layout shift)
- [ ] **Jij:** Lighthouse-audit draaien (mobiel + desktop) na het vullen van content
- [ ] **Jij:** Core Web Vitals controleren in productie
- [ ] Optioneel: afbeelding-`sizes` nakijken zodra echte foto's geladen zijn

### 4.3 Spam-bescherming contactformulier
- [x] Honeypot-veld op het contactformulier
- [ ] Optioneel: rate-limiting of hCaptcha/Turnstile bij veel spam

---

## 🔵 Prioriteit 5 — Deployment & infra (Scaleway) — grotendeels **jij**

- [x] `ie-incompatible.html` toegevoegd (`public/`) — werd door `redirects.js` verwacht
- [x] Build groen geverifieerd (`npm run build` → alle routes gegenereerd)
- [ ] **Let op:** mismatch tussen `docker-compose.yml` (`payload/payload`, db `sk_accounting`) en je lokale `.env` (`sk_accounting_website_db`, ander wachtwoord) — rechttrekken
- [ ] **Jij:** `.env` productie volledig invullen: `PAYLOAD_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_SERVER_URL`, S3-credentials
- [ ] **Jij:** productie-database opzetten + migraties draaien (`payload migrate`)
- [ ] **Jij:** S3-bucket (Scaleway Object Storage) aanmaken + CORS/ACL controleren
- [ ] **Jij:** PM2 via `ecosystem.config.js` (poort 3001) → reverse proxy (Nginx/Caddy) + **HTTPS/SSL**
- [ ] **Jij:** domein koppelen + DNS
- [ ] **Jij:** eerste admin-user veilig aanmaken; backups instellen voor PostgreSQL

---

## 📋 Aanbevolen volgorde (resterend werk — jij)

1. **DB vullen** (1.1) → SiteSettings, Team, Services, Homepage, Over ons → site toont echte info (Footer & contact volgen automatisch)
2. **Resend-keys in `.env`** (1.3) → contactformulier verstuurt notificaties
3. **Definitief logo** plaatsen (1.4) + naam-inconsistentie team oplossen (3.2)
4. **Juridische pagina's** (3.3): privacy/cookies + KBO-nummer & ITAA in footer
5. **Analytics + evt. cookiebanner kiezen** (2.4)
6. **Deploy naar Scaleway** (5): env, migraties, S3, reverse proxy + SSL, DNS
7. **Na livegang**: Search Console verifiëren + sitemap indienen, Google Business Profile, Lighthouse/CWV + a11y-controle (2.4, 4.1, 4.2)

---

## Openstaande vragen / beslissingen

- Welke **echte contactgegevens, team- en dienstinhoud** levert SK Accounting aan?
- **Analytics**: GA4 of privacy-vriendelijk (Plausible/Umami)? Bepaalt of cookiebanner nodig is.
- **E-mailprovider**: bestaande SMTP van het kantoor, of Resend/Postmark?
- Moeten **diensten/teamleden detailpagina's** krijgen (SEO + Redirects-plugin zijn er al op voorzien), of blijven het overzichtssecties?
- Definitief **logo** beschikbaar?
