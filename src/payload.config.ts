import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { TeamMembers } from './collections/TeamMembers'
import { Services } from './collections/Services'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { HomepageContent } from './globals/HomepageContent'
import { OverOnsContent } from './globals/OverOnsContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    theme: 'light',
    meta: {
      titleSuffix: '— SK Accounting',
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
    },
  },
  collections: [Users, Media, TeamMembers, Services, ContactSubmissions],
  globals: [SiteSettings, HomepageContent, OverOnsContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    // S3 storage for media uploads (Scaleway Object Storage is S3-compatible)
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'nl-ams',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
      acl: 'public-read', // Make uploaded files publicly accessible
    }),

    // SEO fields on team and services pages
    seoPlugin({
      collections: ['team-members', 'services'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title ?? doc?.name ?? ''} — SK Accounting`,
      generateURL: ({ doc }) => `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/${doc?.slug ?? ''}`,
    }),

    // Full-text search across services and team members
    searchPlugin({
      collections: ['services', 'team-members'],
      defaultPriorities: {
        services: 10,
        'team-members': 20,
      },
    }),

    // Redirects management (old URLs → new)
    redirectsPlugin({
      collections: ['services', 'team-members'],
    }),

// Form builder for additional forms beyond the contact form
    formBuilderPlugin({
      fields: {
        payment: false,
      },
    }),
  ],
})
