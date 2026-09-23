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
- **Backend / Database**: Supabase backend (or swappable database) accessed via typed server functions and repository pattern.
- **Routing**: File-based routing located strictly under `src/routes/`.
  - Main entry shell: `src/routes/__root.tsx`.
  - Public routes: `/` (Home), `/about`, `/services`, `/programs`, `/testimonials`, `/faqs`, `/contact`, `/terms`, `/privacy`, `/disclaimer`, `/blog`, `/blog/$slug`.
  - Auth route: `/auth`.
  - Protected admin route: `/_authenticated.admin.tsx` (mapped to `/admin`).

## 2. Decoupled Content Layer Pattern
- **Repository Interface**: [`src/lib/content/types.ts`](file:///mnt/b59dbab6-291b-4239-8971-96328b29345d/healing-hub/src/lib/content/types.ts) defines `ContentRepository` (public reads) and `AdminContentRepository` (admin reads/writes).
- **Implementation**: [`src/lib/content/supabase.repository.server.ts`](file:///mnt/b59dbab6-291b-4239-8971-96328b29345d/healing-hub/src/lib/content/supabase.repository.server.ts) implements repository methods.
- **Server Functions**:
  - Public: [`src/lib/content.functions.ts`](file:///mnt/b59dbab6-291b-4239-8971-96328b29345d/healing-hub/src/lib/content.functions.ts) (`getPublicContent`, `getPublicArticle`).
  - Admin: [`src/lib/admin.functions.ts`](file:///mnt/b59dbab6-291b-4239-8971-96328b29345d/healing-hub/src/lib/admin.functions.ts) (`getAdminContent`, `saveArticle`, `saveSimpleContent`, `deleteContent`) protected with `requireSupabaseAuth` middleware and `assertAdmin()`.
- **UI Decoupling**: Components and pages must never query backend tables directly; always interact through query options and server functions / repository.

## 3. Key Entities & Database Collections
- **Articles (`articles`)**: `id`, `title`, `slug`, `excerpt`, `content`, `category_id`, `status` (`draft` | `published`), `featured`, `reading_minutes`, `scheduled_for`, `seo_title`, `seo_description`.
- **Categories (`categories`)**: `id`, `name`, `slug`, `description`.
- **Services (`services`)**: `id`, `title`, `slug`, `summary`, `body`, `icon`, `active`, `sort_order`.
- **Programs (`programs`)**: `id`, `title`, `slug`, `summary`, `body`, `schedule_text`, `active`, `sort_order`.
- **FAQs (`faqs`)**: `id`, `question`, `answer`, `active`, `sort_order`.
- **Testimonials (`testimonials`)**: `id`, `quote`, `attribution`, `context`, `consent_confirmed`, `active`, `sort_order`.
- **Site Settings (`site_settings`)**: Key-value configuration for brand, contacts, metadata.

## 4. Development & Safety Guidelines
- **Git History**: Do not force-push, rebase, squash, or amend published commits. Keep `main` working to stay in sync with Lovable.
- **Code Style**:
  - Keep server functions isolated to server-only code (use dynamic imports or `.server.ts` where necessary to avoid client bundle leakage).
  - Preserve error logging and monitoring utilities (`src/lib/error-capture.ts`, `src/lib/lovable-error-reporting.ts`).
  - Follow the calm, minimal, high-whitespace aesthetic with earth/sage palette tokens.
