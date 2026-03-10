import React from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  description: 'SK Accounting — uw partner in boekhouding en fiscaal advies.',
  title: 'SK Accounting',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased text-gray-900">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
