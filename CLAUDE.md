# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SK Accounting — a marketing/brochure website for a Belgian bookkeeping firm. Built as a client project by Studio Swyft. The site showcases the firm's services, team, and expertise. Dutch language only.

## Tech Stack

- **Framework**: Next.js (App Router)
- **CMS**: Payload CMS 3.x (embedded in Next.js)
- **Database**: PostgreSQL with Drizzle ORM adapter (`@payloadcms/db-postgres`)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Scaleway

## Local Development

PostgreSQL runs in a Docker container on port 5434 (to avoid conflicts with other local PG instances):

```bash
docker compose up -d    # Start local PostgreSQL container (port 5434)
npm run dev             # Start development server (Next.js + Payload)
```

The Payload admin panel is available at `/admin`. On first run, it will prompt to create an admin user.

## Common Commands

```bash
npm run dev             # Start development server (Next.js + Payload)
npm run build           # Production build
npm run start           # Start production server
npm run generate:types  # Regenerate Payload TypeScript types
docker compose up -d    # Start local PostgreSQL
docker compose down     # Stop local PostgreSQL
```

## Architecture

Payload CMS 3.x runs embedded inside Next.js — no separate backend server.

- `payload.config.ts` — Central Payload configuration (collections, globals, plugins, DB adapter)
- `src/collections/` — Payload collection definitions (each file defines a content type with fields, hooks, access control)
- `src/globals/` — Payload global definitions (singleton content types)
- `src/app/(frontend)/` — Next.js frontend routes (public-facing pages)
- `src/app/(payload)/` — Payload admin panel routes (auto-generated, don't edit)

### Key Concepts

- **Collections** map to DB tables — define fields, hooks, and access control
- **Access control** is per-collection/per-field using functions returning `boolean` or `Where` query
- **Hooks** (beforeChange, afterChange, etc.) handle business logic on collections
- **Payload Local API** (`payload.find()`, `payload.create()`, etc.) is used server-side — no REST calls needed
- Generated types live in `payload-types.ts` at project root — regenerate after changing schemas

## Project Scope

### Pages

| Page | Description |
|------|-------------|
| Home | Hero section, value proposition, services overview, team preview, CTA |
| About | Firm story, mission/values, why choose this firm |
| Services | Overview of bookkeeping services offered |
| Team | Team members with photo, role, and bio |
| Contact | Contact info + working contact form |

### CMS-Managed Content (Payload Collections & Globals)

- **Team Members** (collection) — name, photo, role, bio
- **Services** (collection) — title, description, icon/image
- **Contact Submissions** (collection) — form entries stored in admin + email notification sent to firm
- **Site Settings** (global) — contact info (phone, email, address, office hours)
- **Page Content** (global or per-page globals) — hero texts, section headings, CTAs

Page layouts are hardcoded in Next.js components; content within them is CMS-driven.

### Design Direction

- **Primary color**: `#034c22` (dark green)
- **Style**: Modern, professional yet approachable — clean layouts, generous whitespace, professional photography, subtle animations
- **Reference sites**: lievyns.be and hoskens-accountancy.be — Belgian accounting firms with similar aesthetic
- Logo is a placeholder until the final version is provided
