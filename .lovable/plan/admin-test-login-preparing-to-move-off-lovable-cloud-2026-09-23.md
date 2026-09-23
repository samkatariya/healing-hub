# Admin test login + preparing to move off Lovable Cloud

## 1. Create the administrator account

- Email: `admin@healingemotions.co`, password: `Admin@123`.
- Sign-up is currently closed and a breach-check blocks weak passwords, so the steps are:
  1. Briefly allow sign-up and skip email confirmation.
  2. Turn off the leaked-password check (`Admin@123` appears in public breach lists and would otherwise be rejected).
  3. Create the account, then give it the administrator role.
  4. Close sign-up again immediately so nobody else can register.
- Result: you can sign in at `/auth` and reach the workspace at `/admin`.
- Note: this password is weak by design for testing. Before launch it should be changed, and the breach check turned back on.

## 2. Verify the admin panel end to end

Signed in as that account, check:
- Overview counts and recent journal activity.
- Create, edit, publish/unpublish, feature, and delete an article; confirm a draft stays hidden on the public blog and a published one appears.
- Add and edit a service, program, FAQ, and testimonial (including the consent switch).
- Sign out, and confirm `/admin` redirects to sign-in when signed out.
- Mobile layout of the workspace.

## 3. Make the data layer swappable (for your own backend later)

Today, pages and the admin panel talk to the hosted backend in several places. The change:
- Introduce a single content layer that defines every read and write the site needs (articles, categories, services, programs, FAQs, testimonials, settings, auth session).
- Move all current backend calls behind that layer, with the hosted backend as one implementation.
- Pages, the blog, and the admin panel only ever call the content layer — so swapping to your own database/API later means writing one new implementation, not touching the site.
- Also produce an export pack: the full table structure plus the current content as SQL, so your own database can be created with the same shape and data.

## 4. Remaining polish (after the above)

- Cover-image upload in the article editor (currently images are fixed per article).
- Drag-or-number reordering for services, programs, and FAQs.
- Real legal wording for Privacy, Terms, and Disclaimer (currently draft text).
- Testimonials with written consent before the page goes live.

## Technical details

- Account creation via a temporary `disable_signup: false` + `auto_confirm_email: true` + `password_hibp_enabled: false` window, one `signUp` call, an `INSERT INTO public.user_roles (user_id, role) VALUES (..., 'admin')`, then settings restored to closed sign-up. `auth.users` is never edited directly.
- Content layer: `src/lib/content/` with a typed `ContentRepository` interface plus `supabase.repository.ts`. `content.functions.ts` / `admin.functions.ts` become thin server functions delegating to the repository; route components keep using the existing query options.
- Export pack: `docs/schema.sql` (DDL, RLS policies, grants, triggers) and `docs/seed.sql` (current rows), plus a short migration README.
