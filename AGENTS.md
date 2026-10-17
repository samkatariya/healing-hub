<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Healing Emotions Web & Admin Spec

## 1. Project Overview & Architecture
- **Framework**: TanStack Start with Vite (`react@19`, `@tanstack/react-router`, `@tanstack/react-query`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), Radix UI primitives, Lucide icons, Sonner for notifications.
- **Backend / Database**: PostgreSQL via Drizzle ORM (`@neondatabase/serverless` / `postgres`) accessed via typed server functions and repository pattern.
- **Routing**: File-based routing located strictly under `src/routes/`:
  - Main entry shell: `src/routes/__root.tsx`.
  - Public routes: `/` (Home), `/about`, `/services`, `/programs`, `/locations`, `/testimonials`, `/faqs`, `/contact`, `/fees`, `/first-session`, `/professionals`, `/what-brings-you-here`, `/terms`, `/privacy`, `/disclaimer`, `/blog`, `/blog/$slug`.
  - Auth route: `/auth`.
  - Protected admin route: `/_authenticated.admin.tsx` (mapped to `/admin`).

## 2. Decoupled Content Layer Pattern
- **Repository Interface**: [`src/lib/content/types.ts`](file:///home/samyak/healing-hub/src/lib/content/types.ts) defines `ContentRepository` (public reads) and `AdminContentRepository` (admin reads/writes).
- **Implementation**: [`src/lib/content/drizzle.repository.server.ts`](file:///home/samyak/healing-hub/src/lib/content/drizzle.repository.server.ts) implements repository methods.
- **Server Functions**:
  - Public: [`src/lib/content.functions.ts`](file:///home/samyak/healing-hub/src/lib/content.functions.ts) (`getPublicContent`, `getPublicArticle`, `getHospitals`, `submitBookingRequest`).
  - Admin: [`src/lib/admin.functions.ts`](file:///home/samyak/healing-hub/src/lib/admin.functions.ts) (`getAdminContent`, `saveArticle`, `saveSimpleContent`, `deleteContent`, `saveHospital`, `setBookingStatus`) protected with `requireAuth` middleware and `assertAdmin()`.
- **UI Decoupling**: Components and pages must never query backend tables directly; always interact through query options ([`src/lib/content.queries.ts`](file:///home/samyak/healing-hub/src/lib/content.queries.ts)) and server functions / repository.

## 3. Key Entities & Database Schema
- **Articles (`articles`)**: `id`, `title`, `slug`, `excerpt`, `content`, `category_id`, `status` (`draft` | `published`), `featured`, `reading_minutes`, `scheduled_for`, `published_at`, `author_id`, `seo_title`, `seo_description`.
- **Categories (`categories`)**: `id`, `name`, `slug`, `description`.
- **Services (`services`)**: `id`, `title`, `slug`, `summary`, `body`, `icon`, `active`, `sort_order`.
- **Programs (`programs`)**: `id`, `title`, `slug`, `summary`, `body`, `schedule_text`, `active`, `sort_order`.
- **FAQs (`faqs`)**: `id`, `question`, `answer`, `active`, `sort_order`.
- **Testimonials (`testimonials`)**: `id`, `quote`, `attribution`, `context`, `consent_confirmed`, `active`, `sort_order`.
- **Hospitals (`hospitals`)**: `id`, `slug`, `name`, `area`, `address`, `phone`, `timings`, `map_query`, `services`, `active`, `sort_order`.
- **Booking Requests (`booking_requests`)**: `id`, `segment`, `specialist`, `visit_mode` (`clinic` | `home` | `online`), `hospital_slug`, `name`, `phone`, `area`, `preferred_time`, `notes`, `status` (`new` | `contacted` | `booked` | `closed`).
- **Site Settings (`site_settings`)**: Key-value configuration for brand, contacts, metadata.
- **Users (`users`)**: Admin credentials (`id`, `email`, `password_hash`).

## 4. Booking, Hospitals & Locations
- **Database & Fallback**: Hospitals and booking requests are stored in Drizzle tables (`hospitals`, `booking_requests`, migration `0003_hospitals_and_booking_requests.sql`). Public reads go through `getHospitals`, which falls back to [`src/lib/site-data.ts`](file:///home/samyak/healing-hub/src/lib/site-data.ts) if the database is unreachable or pending migration.
- **Config-Driven Flow**: Per-segment booking options, specialist categories, and wellness services are configured in [`src/lib/booking-config.ts`](file:///home/samyak/healing-hub/src/lib/booking-config.ts) — edit there, not in UI components.
- **Interactive Maps**: Maps use keyless Google embed iframes ([`src/components/hospital-map.tsx`](file:///home/samyak/healing-hub/src/components/hospital-map.tsx)) to avoid API keys and usage cost.
- **Admin Management**: Hospital listings and booking requests can be reviewed and updated via the admin dashboard ([`src/components/admin-extras.tsx`](file:///home/samyak/healing-hub/src/components/admin-extras.tsx)).

## 5. Database Migrations & Administration
- **Schema**: Defined in [`drizzle/schema.ts`](file:///home/samyak/healing-hub/drizzle/schema.ts).
- **Migration Files**: Located in [`drizzle/migrations/`](file:///home/samyak/healing-hub/drizzle/migrations/).
- **Migration Runner**: Helper script [`scripts/run-0003-migration.ts`](file:///home/samyak/healing-hub/scripts/run-0003-migration.ts) allows executing migrations against `DATABASE_URL` safely.
- **Seeding**: Initial data and admin user can be seeded via [`scripts/seed.ts`](file:///home/samyak/healing-hub/scripts/seed.ts).

## 6. Development & Safety Guidelines
- **Git History**: Do not force-push, rebase, squash, or amend published commits. Keep `main` working to stay in sync with Lovable.
- **Node Version**: Node 20+ (Node 22 or 24 recommended) for Vite/Rolldown build compatibility.
- **Code Style**:
  - Keep server functions isolated to server-only code (use dynamic imports or `.server.ts` where necessary to avoid client bundle leakage).
  - Preserve error logging and monitoring utilities ([`src/lib/error-capture.ts`](file:///home/samyak/healing-hub/src/lib/error-capture.ts), [`src/lib/lovable-error-reporting.ts`](file:///home/samyak/healing-hub/src/lib/lovable-error-reporting.ts)).
  - **Typography**: Warm Clinical Authority — Lora for warm, sturdy serif headings (`--font-serif`) and Plus Jakarta Sans for crisp, accessible UI/body copy (`--font-sans`).

## 7. Journal & Articles
- Journal recommendations and audience inference live in a shared pure helper ([`src/lib/journal.ts`](file:///home/samyak/healing-hub/src/lib/journal.ts)), while homepage and related-article grids reuse one card component ([`src/components/journal-cards.tsx`](file:///home/samyak/healing-hub/src/components/journal-cards.tsx)) to keep reading flows consistent.

