# MyFolio CMS — Next.js portfolio

A full-stack portfolio rebuild based on the uploaded MyFolio HTML template. The public site reads editable content from PostgreSQL when available and includes sensible starter content so the design can be previewed before seeding. The admin area supports login, dashboard metrics, project CRUD, profile settings, and contact-message triage.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS v4 and shadcn/ui-compatible configuration
- PostgreSQL + Prisma ORM
- Signed HTTP-only admin session cookie (`jose`) and bcrypt password hashing
- Zod input validation

## Requirements

- Node.js 20.9+ (Node 22 LTS recommended)
- PostgreSQL database (Neon, Supabase PostgreSQL, or managed PostgreSQL)
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```
2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell use `Copy-Item .env.example .env`. Set `DATABASE_URL` to your PostgreSQL connection string. Set `SESSION_SECRET` to a cryptographically random secret of at least 32 characters. For example, generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`.
3. Generate Prisma Client and apply the first migration:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Create the first administrator. Do not commit credentials or put them in client-side environment variables:

   **PowerShell**

   ```powershell
   $env:ADMIN_EMAIL="you@example.com"
   $env:ADMIN_NAME="Site Admin"
   $env:ADMIN_PASSWORD="use-a-unique-password-of-at-least-12-characters"
   npm run create-admin
   ```

   **macOS/Linux**

   ```bash
   ADMIN_EMAIL="you@example.com" ADMIN_NAME="Site Admin" ADMIN_PASSWORD="use-a-unique-password-of-at-least-12-characters" npm run create-admin
   ```
5. Run the app:

   ```bash
   npm run dev
   ```

   This generates Prisma Client before starting the development server.

   Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the CMS.

## CMS features currently implemented

- Authentication: signed JWT session in an HTTP-only cookie, 8-hour expiry, bcrypt password hash, server-side session verification.
- Dashboard metrics and recent enquiries.
- Projects: create/edit/publish/draft/delete, featured flag, sort order, external links and image URL.
- Profile/site settings: name, headline, about, contact details, social links, image, résumé URL and display counters.
- Contact form: validation, honeypot, basic IP-based rate limiting and persisted inbox.
- Messages: read/unread/archive status.
- Skills: create and delete entries, edit categories and proficiency at creation.
- Experience: create and delete role history.
- Services: create and delete service cards.
- Testimonials: create, publish/draft and delete entries.

## Production hardening checklist

This is a working starter scaffold, not a claim that the project has been penetration-tested or deployed. Before public production launch:

1. **Rate limiting:** replace the in-memory contact limiter with Redis/Upstash or provider-level rate limiting. In-memory limits reset on restart and are not shared between instances.
2. **Media:** configure an object storage provider (S3, Cloudinary, UploadThing, etc.) for authenticated uploads. The initial project uses image URLs/local public assets, not a production media upload pipeline.
3. **Admin protections:** add MFA if required, login throttling, audit logs, security alerts and an admin password reset process. Put an edge/WAF limit in front of the login route.
4. **CSRF/origin:** validate `Origin`/`Host` on state-changing endpoints and actions according to your deployment environment.
5. **Email delivery:** configure a transactional provider (Resend, Postmark, SES, etc.) if visitors should also trigger email notifications. Messages are currently stored in the database only.
6. **Monitoring:** configure error tracking, structured logs, uptime monitoring and database backups.
7. **Security review:** verify HTTPS, secrets, database network access, dependency updates, CSP/security headers, and least-privilege database credentials.
8. Run `npm run typecheck`, `npm run lint`, `npm run build` and test all CRUD flows against a staging database before deploying.

## shadcn/ui

`components.json` is included and configured. The UI currently uses tailored Tailwind components to keep the generated starter self-contained. To add shadcn primitives, run for example:

```bash
npx shadcn@latest add button card input textarea table dialog dropdown-menu sidebar sonner
```

Review generated components and align their styles with `src/app/globals.css`.

## Deployment

Deploy to Vercel or another Next.js-capable host. Set `DATABASE_URL`, `SESSION_SECRET`, and `SITE_URL` in the hosting environment. Run `npm run db:deploy` as a release/migration step, and provision the initial admin securely as a one-off task. Do not run schema migrations from every application instance at startup.

## Original template and attribution

The supplied `LICENSE.txt` says the free HTML Codex template is distributed under CC BY 4.0 and requires retaining the “Designed by HTML Codex” credit unless separately licensed/authorized otherwise. The footer preserves that credit. Confirm the license for every included image before public commercial use.

## Structure

```text
src/
  app/
    api/contact/route.ts
    admin/
      login/
      projects/
      messages/
      settings/
    globals.css
    layout.tsx
    page.tsx
  components/
  lib/
prisma/schema.prisma
scripts/create-admin.ts
```

# Portfolio
