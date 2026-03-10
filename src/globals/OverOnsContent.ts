import type { GlobalConfig } from 'payload'

export const OverOnsContent: GlobalConfig = {
  slug: 'over-ons-content',
  access: { read: () => true },
  fields: [
    { name: 'onsVerhaalTitle', type: 'text' },
    { name: 'onsVerhaalDescription', type: 'richText' },
  ],
}
