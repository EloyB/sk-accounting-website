import Link from 'next/link'

export default function NotFound() {
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
            Pagina niet gevonden
          </span>
        </div>
        <h1
          className="text-white mb-8"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 1 }}
        >
          404
        </h1>
        <p className="font-sans text-white/55 text-lg leading-relaxed mb-12 max-w-md">
          De pagina die u zoekt bestaat niet of werd verplaatst. Geen zorgen — we helpen u graag
          verder op weg.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] bg-white text-primary px-8 py-4 hover:bg-surface transition-colors duration-300"
          >
            Naar de homepagina
          </Link>
          <Link
            href="/contact"
            className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] border border-white/20 text-white px-8 py-4 hover:border-white/50 hover:bg-white/5 transition-all duration-300"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    </section>
  )
}
