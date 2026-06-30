import type { CollectionConfig } from 'payload'
import { revalidateCollectionChange, revalidateCollectionDelete } from '../lib/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    // Services appear on /diensten and in the homepage overview.
    afterChange: [revalidateCollectionChange(['/diensten', '/'])],
    afterDelete: [revalidateCollectionDelete(['/diensten', '/'])],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lagere waarde = eerder getoond',
      },
    },
  ],
}
