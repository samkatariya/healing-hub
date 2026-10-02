# Client feedback round: booking flow, wellness services, hospital maps

## What changes for visitors

1. **Spelling fix** – "Lokmudra" becomes "Lopmudra" everywhere (hospital cards, professionals, booking options).
2. **Second phone number** – 9168611716 added alongside 9158011716 in the header/footer contact area, contact page and hospital cards.
3. **New homepage section: "Wellness Services We Provide"** – a clear grid of the therapies themselves (Psychotherapy, Occupational Therapy, Physiotherapy, Speech Therapy, Music Therapy, Dance & Movement Therapy, Expressive Art, Assessments). Each card has a short "how it works / who it's for" line, kept roomy and easy to scan, sitting next to the existing "who we help" section (Adults, Kids, Couples, Seniors, Sports, Corporate).
4. **Faded background photos** – the plain white "who we help" and wellness sections get soft, low-contrast photos (child, sports player, couple, senior) behind them so the page feels less empty but stays readable.
5. **Smarter booking flow (per segment)**

```text
Step 1  Who is it for?     Child | Adult | Couple/Family | Senior | Sports | Corporate
Step 2  Which specialist?  list changes by segment
        e.g. Child -> Psychologist, Child Therapist, Speech Therapist, Occupational Therapist
        + note: "Book your 1st appointment with our senior psychologist for better guidance"
Step 3  How to meet?       Clinic/Hospital visit | Home visit | Online consultation
Step 4a Hospital chosen -> that hospital's map, address, phone, timings + short form
Step 4b Online chosen   -> direct "Book online slot" link + short form
Step 4c Home visit      -> area + short form
```

   The form is saved (not just sent to WhatsApp), and still offers a WhatsApp/call shortcut after submitting.
6. **Locations page** – every hospital gets its own embedded Google map, full address, phone, and specific visiting days/timings, with a "Get directions" link. Content follows Google's guidance (consistent name, address and phone; visible hours).
7. **Admin panel** – new tabs to manage **Hospitals** (name, address, phone, map, timings, active) and view **Booking requests** (newest first). Per-segment specialist lists are also editable there, so Yash can fill them in when he sends the final list.

## Content still needed from you (I'll use clear placeholders until then)

- Final specialist list per segment (child, adult, senior, sports, corporate).
- "How it works and who it's for" text for each wellness service.
- Exact timings for each hospital, and confirmation of the hospital addresses.
- The online booking link (e.g. Calendly / Google Calendar appointment page).

## Technical details

- New tables (with grants + RLS): `hospitals` (public read active, admin manage), `booking_requests` (insert only via a server function with validation; admin read/update), `segment_specialists` or a `site_settings` JSON entry for per-segment lists. Seed current 8 hospitals with the corrected Lopmudra names.
- Extend `ContentRepository` / Drizzle repository + `content.functions.ts` / `admin.functions.ts`; UI keeps going through query options only.
- Maps: keyless `https://www.google.com/maps?q=<address>&output=embed` iframe per hospital (lazy-loaded), so no API key or cost; can switch to the Maps connector later if needed.
- Booking modal refactored into segment-driven config; submission via a public server function with Zod validation and simple length limits; WhatsApp message prefilled after save.
- Background images generated into `src/assets/` and applied with low opacity overlays using design tokens.
- Owner email notifications are not included (needs a verified email domain); submissions are visible in admin.
