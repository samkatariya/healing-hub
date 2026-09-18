# Healing Emotions website and content admin

## Goal
Build a calm, trustworthy mental-health website for Healing Emotions that helps visitors understand the practice and contact it by WhatsApp or phone, with a secure admin area for managing articles and public-site content.

## Public website
- Create separate, mobile-friendly pages for Home, About/Therapist, Services, Programs & Workshops, Testimonials, Blog, individual articles, FAQs, Contact, Privacy, Terms, and Disclaimer.
- Follow the selected **Serene clinical warmth** direction, refined into a high-whitespace minimal style with soft sage tones, warm neutrals, elegant editorial type, restrained motion, and accessible contrast.
- Use the supplied HE mark as the brand logo and favicon while softening the surrounding visual system so the blue mark feels intentional rather than dictating the entire palette.
- Make WhatsApp and phone the primary conversion paths throughout, including clear header actions and a tasteful persistent mobile contact action.
- Use real, cohesive practice-oriented imagery rather than generic placeholders; keep imagery quiet, human, and respectful.
- Present psychotherapy, life coaching, graphology, programs/workshops, therapist credentials, FAQs, testimonials, and recent articles with careful mental-health language and no unsupported medical claims.
- Carry over verified public information from the current Healing Emotions site where available. Any missing phone, address, therapist credentials, claims, or testimonials will be visibly treated as draft content rather than invented facts.

## Blog and content experience
- Build a searchable blog index with categories, featured articles, cover images, reading time, publication date, and responsive article pages.
- Add share controls and related articles without distracting from reading.
- Give each public page and article unique search/social titles and descriptions.
- Seed enough realistic draft/demo content for the complete experience to be reviewable immediately, while clearly separating unverified business facts.

## Secure admin
- Enable Lovable Cloud for persistent content, image storage, and administrator authentication.
- Use administrator email/password sign-in only; no separate user profile table or client accounts.
- Create a protected, collapsible admin workspace inspired by Bharat Showcase’s practical CRUD patterns, adapted to this project’s current architecture and security model.
- Dashboard: concise counts and recent editing activity.
- Blog management: create, edit, preview, save draft, publish/unpublish, feature, categorize, schedule publication, manage SEO fields and cover images, and delete with confirmation.
- Website content management: edit services, programs/workshops, therapist/about copy, FAQs, testimonials, contact details, and social links.
- Add validation, clear empty/loading/error states, unsaved-change protection, and image upload/reuse.

## Data and permissions
- Store articles, categories, services, programs, FAQs, testimonials, editable site settings, and media records in Lovable Cloud.
- Public visitors can read only published/active content.
- Authenticated administrators can manage content; authorization is enforced on the server and through row-level policies, never browser storage.
- Keep administrator access separate from editable public content and avoid exposing private contact or account data.

## Reuse from Bharat Showcase
- Reuse the proven admin information architecture and interaction ideas: collapsible navigation, dashboard summaries, list/table management, create/edit dialogs, ordering, active-state controls, and deletion confirmations.
- Rebuild those patterns using this TanStack project’s components and Lovable Cloud rather than copying Bharat Showcase’s legacy router, API layer, or browser-token authentication.

## Quality and verification
- Provide polished desktop and mobile navigation, keyboard access, readable focus states, reduced-motion support, and no overlapping fixed actions.
- Verify all public routes, blog filtering/search, WhatsApp and call links, administrator sign-in/out, content CRUD, drafts versus published visibility, image handling, and responsive layouts.
- Add route-specific metadata and use the supplied logo-derived favicon.

## Content needed before launch
The initial build can proceed with clearly marked draft values, but final launch content will need the confirmed therapist name/photo/credentials, phone and WhatsApp number, address/service mode, final service descriptions, legal wording, authentic testimonials with consent, and social links.

## Technical details
- TanStack Start routes for every public and admin page, with shared public and admin layouts.
- Lovable Cloud authentication, database, storage, server-side authorization, explicit grants, and row-level policies.
- Semantic Tailwind v4 design tokens using soft sage, warm neutral, and restrained blue brand accents; Playfair Display headings with a clean sans-serif body.
- Generated, locally served visual assets for the homepage and article seed content; the uploaded logo is stored through the project asset flow and separately optimized for the favicon.
