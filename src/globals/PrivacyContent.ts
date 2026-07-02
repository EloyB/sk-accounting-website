import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const PrivacyContent: GlobalConfig = {
  slug: 'privacy-content',
  label: 'Privacybeleid — pagina',
  hooks: {
    afterChange: [revalidateGlobal(['/privacy'])],
  },
  access: { read: () => true },
  fields: [
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Laatst bijgewerkt',
      admin: { description: 'Wordt onder de titel getoond. Leeg = niet tonen.' },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Inhoud',
      admin: {
        description:
          'Laat leeg om de standaard privacytekst te tonen (met bedrijfsgegevens uit Site Settings). Vul je hier iets in, dan vervangt dat de volledige standaardtekst.',
      },
    },
  ],
}
