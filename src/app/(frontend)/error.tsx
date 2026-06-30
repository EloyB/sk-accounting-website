'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log naar de console; in productie kan dit naar een monitoringtool gestuurd worden.
    console.error(error)
  }, [error])

  return (
    <section className="bg-primary relative overflow-hidden min-h-[70vh] flex items-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 90% 10%, rgba(2,45,20,0.8) 0%, transparent 50%), radial-gradient(ellipse at 5% 80%, rgba(4,90,40,0.4) 0%, transparent 50%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-8 py-24">
        <div className="flex items-center gap-4 mb-7">
          <div aria-hidden="true" className="w-7 h-px bg-gold" />
          <span className="text-gold text-[10px] uppercase tracking-[0.28em] font-sans">
            Er ging iets mis
          </span>
        </div>
        <h1
          className="text-white mb-8 max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.05 }}
        >
          Onverwachte fout
        </h1>
        <p className="font-sans text-white/55 text-lg leading-relaxed mb-12 max-w-md">
          Er liep iets mis bij het laden van deze pagina. Probeer het opnieuw, of neem contact met
          ons op als het probleem blijft aanhouden.
        </p>
        <button
          onClick={reset}
          className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] bg-white text-primary px-8 py-4 hover:bg-surface transition-colors duration-300"
        >
          Probeer opnieuw
        </button>
      </div>
    </section>
  )
}
