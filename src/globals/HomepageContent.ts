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
  ],
}
