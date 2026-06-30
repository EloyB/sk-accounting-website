import type { CollectionConfig } from 'payload'
import { revalidateCollectionChange, revalidateCollectionDelete } from '../lib/revalidate'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  hooks: {
    // Team members appear on /team and in the homepage preview.
    afterChange: [revalidateCollectionChange(['/team', '/'])],
    afterDelete: [revalidateCollectionDelete(['/team', '/'])],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
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
