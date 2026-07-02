import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const HomepageContent: GlobalConfig = {
  slug: 'homepage-content',
  hooks: {
    afterChange: [revalidateGlobal(['/'])],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroHeading',
      type: 'text',
    },
    {
      name: 'heroSubtext',
      type: 'textarea',
    },
    {
      name: 'heroCtaLabel',
      type: 'text',
    },
    {
      name: 'statYears',
      type: 'text',
      admin: {
        description: 'Bijv. "15+"',
      },
    },
    {
      name: 'statClients',
      type: 'text',
      admin: {
        description: 'Bijv. "200+"',
      },
    },
    {
      type: 'collapsible',
      label: 'Waarom SK Accounting? (Onze aanpak)',
      fields: [
        { name: 'aanpakLabel', type: 'text', label: 'Labeltje', defaultValue: 'Onze aanpak' },
        { name: 'aanpakHeading', type: 'text', label: 'Titel', defaultValue: 'Waarom SK Accounting?' },
        {
          name: 'aanpak',
          type: 'array',
          label: 'Punten',
          admin: { description: 'Laat leeg om de standaardpunten te tonen. Nummering gebeurt automatisch.' },
          fields: [
            { name: 'title', type: 'text', label: 'Titel', required: true },
            { name: 'description', type: 'textarea', label: 'Omschrijving', required: true },
          ],
        },
      ],
    },
  ],
}
