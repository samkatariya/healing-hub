// Static content shown when the database is unreachable or not yet
// configured. Mirrors the repository output shape so pages render exactly
// as they would with live data — the admin workspace still manages the
// database copy once the connection is added.
import { placeholderTestimonials } from '@/lib/site-data';
import { fallbackServices } from '@/lib/site-data';

export const fallbackCategories = [
  { id: 'cat-everyday', name: 'Everyday Mental Health', slug: 'everyday-mental-health', description: 'Gentle reflections on daily emotional life.' },
  { id: 'cat-relationships', name: 'Relationships', slug: 'relationships', description: 'Couples, family and communication.' },
  { id: 'cat-work', name: 'Work & Burnout', slug: 'work-burnout', description: 'Stress, boundaries and recovery.' },
];

const categoryById = (id: string) => fallbackCategories.find((c) => c.id === id) ?? null;

export const fallbackArticles = [
  {
    id: 'article-notice-emotional-overload',
    title: 'How to notice when you are emotionally overloaded',
    slug: 'notice-emotional-overload',
    excerpt: 'Overload rarely announces itself. It shows up as small irritations, tired sleep and a short fuse — here is how to read the signals early.',
    content: `<p>Emotional overload seldom arrives all at once. It accumulates: one more obligation, one more difficult conversation, one more night of shortened sleep. Because each step feels survivable, we only notice the total when something small — a spilled cup, a delayed reply — tips us over.</p><p>Some signs are worth learning to read early. Irritation that arrives faster than it used to. Sleep that no longer feels restful. Finding less patience for the people you care about most. A sense that even restful activities feel like tasks.</p><p>None of these mean something is wrong with you. They mean your system is carrying more than it has room for. Naming the load is often the first relief: once you can see it, you can start deciding what stays and what waits.</p><p>If the weight has been sitting on you for weeks, a conversation with a psychologist can help you put it down in pieces rather than all at once. There is no threshold of suffering you must cross first.</p>`,
    category_id: 'cat-everyday',
    status: 'published' as const,
    featured: false,
    reading_minutes: 4,
    published_at: '2026-09-12T06:30:00.000Z',
    author_id: null,
    seo_title: 'Noticing emotional overload early — Healing Emotions',
    seo_description: 'Emotional overload builds quietly. Learn the early signals — irritability, restless sleep, short fuse — and when a conversation with a psychologist helps.',
    get categories() { return categoryById('cat-everyday'); },
  },
  {
    id: 'article-boundaries-without-guilt',
    title: 'Boundaries without guilt: saying no and staying kind',
    slug: 'boundaries-without-guilt',
    excerpt: 'A boundary is not a rejection of the person in front of you. It is honesty about what you can carry — and it can be said warmly.',
    content: `<p>Many of us were taught that saying no is unkind. So we say yes with our mouths and no with our bodies — showing up resentful, exhausted, and quietly counting what it cost us. A boundary is not a wall. It is a clear, honest statement of what you can genuinely offer.</p><p>Warm boundaries tend to have three parts: what you can do, what you cannot do right now, and what you can do instead. "I cannot take this on this week, and I would rather tell you now than cancel later. Can we look at next week?" That sentence rejects no one. It simply protects both of you from a yes you could not keep.</p><p>The guilt that follows a new boundary usually fades faster than the exhaustion of having none. The people who matter adjust. The relationships that only survived your over-giving were already costing you more than they gave.</p><p>If saying no leaves you anxious for days, that is a pattern worth exploring with support — not a personal failing.</p>`,
    category_id: 'cat-relationships',
    status: 'published' as const,
    featured: false,
    reading_minutes: 4,
    published_at: '2026-09-26T06:30:00.000Z',
    author_id: null,
    seo_title: 'Boundaries without guilt — Healing Emotions',
    seo_description: 'How to say no warmly and without guilt, protect your energy, and why the guilt of a boundary fades faster than the cost of having none.',
    get categories() { return categoryById('cat-relationships'); },
  },
  {
    id: 'article-burnout-is-not-a-badge',
    title: 'Burnout is not a badge of honour',
    slug: 'burnout-is-not-a-badge',
    excerpt: 'Exhaustion is often worn as proof of effort. But burnout is not a measure of commitment — it is a signal that recovery has fallen too far behind demand.',
    content: `<p>Somewhere along the way, tiredness became a credential. We compare workloads the way athletes compare training, and resting feels like admitting weakness. But burnout is not the price of serious work — it is what happens when recovery keeps losing to demand.</p><p>Burnout usually shows up in three layers. Emotional exhaustion: the work that once felt meaningful now feels heavy. Detachment: you start caring less, partly as self-protection. And a shrinking sense of effectiveness: effort stops translating into the feeling of progress.</p><p>None of these are fixed by trying harder. They recover the way the body recovers — with actual rest, restored boundaries, and often a re-examination of what you have been carrying that was never yours to carry.</p><p>If you recognise yourself in this, it is worth talking to someone before the next deadline. Burnout responds well to support; it responds poorly to being pushed through.</p>`,
    category_id: 'cat-work',
    status: 'published' as const,
    featured: false,
    reading_minutes: 5,
    published_at: '2026-10-10T06:30:00.000Z',
    author_id: null,
    seo_title: 'Burnout is not a badge of honour — Healing Emotions',
    seo_description: 'Burnout is not proof of commitment — it is a signal that recovery has fallen behind demand. The three layers of burnout and what actually helps.',
    get categories() { return categoryById('cat-work'); },
  },
];

export const fallbackFaqs = [
  { id: 'faq-1', question: 'How do I know if I need therapy?', answer: 'There is no required level of distress. If something has been weighing on you — worry, low mood, conflict, a decision you cannot settle — a conversation with a psychologist can help you understand it better. Reaching out early is a strength, not a last resort.', active: true, sort_order: 1 },
  { id: 'faq-2', question: 'What happens in the first session?', answer: 'The first session is a calm, unhurried conversation. The psychologist listens to what brings you here, asks gentle questions to understand your situation, and together you decide a direction. You will not be pushed to share anything before you are ready.', active: true, sort_order: 2 },
  { id: 'faq-3', question: 'Is what I share confidential?', answer: 'Yes. Everything you share stays between you and your psychologist, subject to the legal and professional responsibilities that apply to clinical practice. Sessions take place in private settings, and your information is never shared with employers or family without your consent.', active: true, sort_order: 3 },
  { id: 'faq-4', question: 'Do you offer online sessions?', answer: 'Yes. Online consultations are available for most services, and they cost less than in-clinic sessions (₹1,500 instead of ₹2,000 — 25% off). The quality of care is the same; many clients actually find it easier to speak from home.', active: true, sort_order: 4 },
  { id: 'faq-5', question: 'How do I book an appointment?', answer: 'You can call or WhatsApp us at +91 91686 11716, or use the booking option on this website. All appointments are pre-booked — we do not accept walk-ins, so every session starts on time in a private space.', active: true, sort_order: 5 },
];

export const fallbackTestimonials = placeholderTestimonials.map((t, i) => ({
  id: t.id, quote: t.quote, attribution: t.attribution, context: t.context ?? null,
  consent_confirmed: true, active: true, sort_order: i,
}));

export const fallbackServicesRows = fallbackServices.map((s, i) => ({
  id: `service-${s.slug}`, title: s.title, slug: s.slug, summary: s.summary, body: s.body,
  icon: null, active: true, sort_order: i,
}));

export function buildFallbackContent() {
  return {
    services: fallbackServicesRows,
    programs: [],
    faqs: fallbackFaqs,
    testimonials: fallbackTestimonials,
    articles: fallbackArticles,
    categories: fallbackCategories,
    settings: [],
  };
}

export function buildFallbackArticle(slug: string) {
  const article = fallbackArticles.find((a) => a.slug === slug);
  if (!article) throw new Error("Article not found");
  return article;
}
