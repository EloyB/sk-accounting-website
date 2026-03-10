import type { GlobalConfig } from 'payload'

export const HomepageContent: GlobalConfig = {
  slug: 'homepage-content',
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
