import React from 'react'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@payload-config'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from '@/lib/seo'

// Lettertypes via next/font — geen render-blocking @import, geen layout shift.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Boekhouding & fiscaal advies`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Boekhouding & fiscaal advies`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Boekhouding & fiscaal advies`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  // Zet GOOGLE_SITE_VERIFICATION in .env om het domein in Search Console te verifiëren.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
}

async function getLocalBusinessJsonLd() {
  let phone: string | null = null
  let email: string | null = null
  let address: string | null = null

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    phone = settings.phone || null
    email = settings.email || null
    address = settings.address || null
  } catch {
    // Tijdens build zonder DB-verbinding vallen we terug op enkel de basisgegevens.
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl('/opengraph-image'),
    areaServed: 'BE',
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(address ? { address: { '@type': 'PostalAddress', streetAddress: address, addressCountry: 'BE' } } : {}),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = await getLocalBusinessJsonLd()

  return (
    <html lang="nl" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
