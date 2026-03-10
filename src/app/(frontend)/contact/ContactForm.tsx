'use client'

import { useActionState } from 'react'
import { submitContactForm, type FormState } from './actions'

const initial: FormState = { status: 'idle' }

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initial)

  if (state.status === 'success') {
    return (
      <div className="border border-gold/30 bg-gold/5 p-10">
        <div className="w-7 h-px bg-gold mb-6" />
        <h3
          className="text-charcoal mb-3"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.5rem' }}
        >
          Bericht ontvangen
        </h3>
        <p className="font-sans text-sm text-charcoal/55 leading-relaxed">
          Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/50 mb-2">
            Naam <span className="text-gold">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-primary transition-colors duration-200"
            placeholder="Jan Janssen"
          />
        </div>
        <div>
          <label className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/50 mb-2">
            E-mailadres <span className="text-gold">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-primary transition-colors duration-200"
            placeholder="jan@voorbeeld.be"
          />
        </div>
      </div>

      <div>
        <label className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/50 mb-2">
          Telefoonnummer
        </label>
        <input
          name="phone"
          type="tel"
          className="w-full border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-primary transition-colors duration-200"
          placeholder="+32 499 00 00 00"
        />
      </div>

      <div>
        <label className="block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/50 mb-2">
          Bericht <span className="text-gold">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full border border-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
          placeholder="Waarmee kunnen we u helpen?"
        />
      </div>

      {state.status === 'error' && (
        <p className="font-sans text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] bg-primary text-white px-8 py-4 hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50"
      >
        {pending ? 'Verzenden…' : 'Verstuur bericht'}
      </button>
    </form>
  )
}
