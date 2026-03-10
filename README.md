# SK Accounting

Marketing website for SK Accounting, a Belgian bookkeeping firm. Built by [Studio Swyft](https://studioswyft.be).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS 3.x (embedded) |
| Database | PostgreSQL 16 + Drizzle ORM |
| Styling | Tailwind CSS v4 |
| Language | TypeScript / React 19 |
| Deployment | Scaleway |

## Getting Started

### Prerequisites

- Node.js `^18.20.2` or `>=20.9.0`
- Docker (for local PostgreSQL)

### Local development

1. **Clone the repo and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in the required values:

   ```
   DATABASE_URL=postgresql://payload:payload@localhost:5434/sk_accounting
   PAYLOAD_SECRET=your-secret-here
   ```

3. **Start the database**

   ```bash
   docker compose up -d
   ```

   This starts a PostgreSQL 16 container on port `5434`.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The site is available at [http://localhost:3000](http://localhost:3000).
   The Payload admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin).
   On first run, Payload will prompt you to create an admin user.

## Commands

```bash
npm run dev               # Start development server
npm run build             # Production build
npm run start             # Start production server
npm run generate:types    # Regenerate Payload TypeScript types after schema changes
npm run generate:importmap # Regenerate admin import map after adding globals/collections
docker compose up -d      # Start local PostgreSQL
docker compose down       # Stop local PostgreSQL
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/       # Public-facing Next.js pages
│   └── (payload)/        # Payload admin panel (auto-generated)
├── collections/
│   ├── Users.ts          # Admin users (auth)
│   ├── Media.ts          # Image uploads
│   ├── TeamMembers.ts    # Team member profiles
│   ├── Services.ts       # Services offered
│   └── ContactSubmissions.ts  # Contact form entries
├── globals/
│   ├── SiteSettings.ts   # Contact info, office hours
│   └── HomepageContent.ts # Hero text, stats, CTA labels
└── payload.config.ts     # Central Payload configuration
```

## CMS Content

Managed via the Payload admin panel at `/admin`:

| Content | Type | Notes |
|---|---|---|
| Team Members | Collection | Name, role, bio, photo, display order |
| Services | Collection | Title, description, display order |
| Contact Submissions | Collection | Form entries; admin-only read |
| Site Settings | Global | Phone, email, address, office hours |
| Homepage Content | Global | Hero heading, subtext, CTA label, stats |

## Design

- **Primary color**: `#034c22` (dark green)
- Dutch language only (`lang="nl"`)
- Modern, professional aesthetic — reference sites: [lievyns.be](https://lievyns.be), [hoskens-accountancy.be](https://hoskens-accountancy.be)
