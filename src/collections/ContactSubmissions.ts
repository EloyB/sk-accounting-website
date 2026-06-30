import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Alleen bij een nieuwe inzending een notificatie sturen.
        if (operation !== 'create') return

        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) {
          // Geen key geconfigureerd → stilletjes overslaan (inzending is wel opgeslagen).
          req.payload.logger.info(
            'Contactformulier: RESEND_API_KEY ontbreekt, geen notificatie verzonden.',
          )
          return
        }

        // Ontvanger: expliciete env-var, anders het e-mailadres uit Site Settings.
        let to = process.env.CONTACT_NOTIFICATION_TO
        if (!to) {
          try {
            const settings = await req.payload.findGlobal({ slug: 'site-settings' })
            to = settings.email || undefined
          } catch {
            /* negeer — valt door naar de check hieronder */
          }
        }

        // Afzender moet een geverifieerd domein op Resend zijn (bv. noreply@sk-accounting.be).
        const from = process.env.CONTACT_NOTIFICATION_FROM
        if (!to || !from) {
          req.payload.logger.warn(
            'Contactformulier: CONTACT_NOTIFICATION_TO/FROM ontbreekt, geen notificatie verzonden.',
          )
          return
        }

        try {
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from,
              to,
              reply_to: doc.email,
              subject: `Nieuw contactbericht van ${doc.name}`,
              text: [
                `Naam: ${doc.name}`,
                `E-mail: ${doc.email}`,
                `Telefoon: ${doc.phone || '—'}`,
                '',
                'Bericht:',
                doc.message,
              ].join('\n'),
            }),
          })

          if (!res.ok) {
            const detail = await res.text()
            req.payload.logger.error(`Contactformulier: Resend gaf ${res.status} — ${detail}`)
          }
        } catch (err) {
          // Een mislukte mail mag de opslag van de inzending nooit breken.
          req.payload.logger.error(`Contactformulier: notificatie versturen mislukt — ${String(err)}`)
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
