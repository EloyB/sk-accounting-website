import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const OverOnsContent: GlobalConfig = {
  slug: 'over-ons-content',
  hooks: {
    afterChange: [revalidateGlobal(['/over-ons'])],
  },
  access: { read: () => true },
  fields: [
    { name: 'onsVerhaalTitle', type: 'text' },
    { name: 'onsVerhaalDescription', type: 'richText' },
  ],
}
