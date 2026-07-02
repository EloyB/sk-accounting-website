import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const DienstenContent: GlobalConfig = {
  slug: 'diensten-content',
  label: 'Diensten — pagina',
  hooks: {
    afterChange: [revalidateGlobal(['/diensten'])],
  },
  access: { read: () => true },
  fields: [
    {
      type: 'collapsible',
      label: 'Hoe wij werken (Werkwijze)',
      fields: [
        { name: 'werkwijzeLabel', type: 'text', label: 'Labeltje', defaultValue: 'Werkwijze' },
        { name: 'werkwijzeHeading', type: 'text', label: 'Titel', defaultValue: 'Hoe wij werken' },
        {
          name: 'pijlers',
          type: 'array',
          label: 'Pijlers',
          admin: { description: 'Laat leeg om de standaardpijlers te tonen. Nummering gebeurt automatisch.' },
          fields: [
            { name: 'title', type: 'text', label: 'Titel', required: true },
            { name: 'description', type: 'textarea', label: 'Omschrijving', required: true },
          ],
        },
      ],
    },
  ],
}
