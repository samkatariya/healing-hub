# Journal engagement and safety updates

## What will change

- Add a slim reading-progress bar and visible reading-time cue to every journal article.
- Add a topic-aware next-step panel after each article, with child-focused, adult/burnout, relationship, senior, sports, or general guidance and a direct path into the existing booking flow.
- Add two or three related reflections chosen from the same category first, with graceful fallback to other recent articles.
- Add a three-article “From the Journal” section on the homepage using live published content, so new posts can appear without redesigning the page.
- Keep only **+91 91686 11716** across calls, WhatsApp links, hospital contact details, booking confirmations, and contact displays.
- Add a discreet footer safety note directing immediate-crisis visitors to Tele-MANAS at **14416**, clearly separated from routine appointment support.

## Technical details

- Expand the article query to include the published article list needed for related content, while preserving the existing repository/server-function boundary.
- Reuse the current booking dialog and pass the article’s inferred audience/support area into it.
- Build progress from the article’s actual scroll position, with reduced-motion-safe styling and no intrusive floating controls.
- Keep all visuals within the existing calm earth/sage design tokens and existing journal imagery.
- Update the canonical contact data once and remove every legacy number reference from visitor-facing code and seeded hospital defaults.

## Verification

- Check homepage, article, footer, booking dialog, WhatsApp, and phone links on desktop and mobile.
- Confirm related articles never include the current article and all links open correctly.
- Confirm the reading bar reaches completion and does not overlap the site header.
- Confirm the app builds without errors and no legacy phone number remains.