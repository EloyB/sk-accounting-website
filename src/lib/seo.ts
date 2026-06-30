/**
 * Centrale SEO-/site-constanten.
 *
 * NEXT_PUBLIC_SERVER_URL wordt in productie ingesteld (zie .env). Lokaal valt
 * alles terug op de dev-poort zodat metadata, sitemap en robots ook in
 * development geldige absolute URL's opleveren.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4837'
).replace(/\/$/, '')

export const SITE_NAME = 'SK Accounting'

export const SITE_DESCRIPTION =
  "SK Accounting begeleidt zelfstandigen en kmo's met heldere boekhouding, " +
  'btw-aangiftes, loonadministratie en persoonlijk fiscaal advies in België.'

/** Absolute URL voor een (relatief) pad. */
export const absoluteUrl = (path = '') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
