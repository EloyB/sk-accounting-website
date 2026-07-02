import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  hooks: {
    // Contact info appears in the shared layout (header/footer) and on /contact.
    afterChange: [revalidateGlobal(['/'], { layout: true })],
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'officeHours',
      type: 'textarea',
    },
    {
      name: 'companyNumber',
      type: 'text',
      label: 'Ondernemingsnummer (KBO/BTW)',
      admin: { description: 'Bijv. "BE 0790.380.051". Verschijnt in de footer en het privacybeleid.' },
    },
  ],
}
