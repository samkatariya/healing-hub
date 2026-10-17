export type JournalArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category_id?: string | null;
  categoryId?: string | null;
  categories?: { name?: string; slug?: string } | null;
  category?: { name?: string; slug?: string } | null;
  reading_minutes?: number;
  readingMinutes?: number;
  cover_image_url?: string | null;
};

export function readingMinutes(article: JournalArticle) {
  return Math.max(1, article.reading_minutes ?? article.readingMinutes ?? Math.ceil((article.content ?? '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length / 200));
}

export function relatedReflections(current: JournalArticle, articles: JournalArticle[]) {
  const category = current.category_id ?? current.categoryId ?? current.categories?.slug ?? current.category?.slug;
  return articles.filter(a => a.slug !== current.slug).map((article, index) => ({
    article, index,
    sameCategory: Boolean(category && category === (article.category_id ?? article.categoryId ?? article.categories?.slug ?? article.category?.slug)),
  })).sort((a, b) => Number(b.sameCategory) - Number(a.sameCategory) || a.index - b.index).slice(0, 3).map(a => a.article);
}

export function articleNextStep(article: JournalArticle) {
  const topic = `${article.title} ${article.slug} ${article.excerpt ?? ''} ${article.categories?.name ?? article.category?.name ?? ''}`.toLowerCase();
  if (/\b(child|children|adhd|autism|paediatric|parenting|adolescent)\b/.test(topic)) {
    return { who: 'My Child', title: 'Looking for guidance for your child?', description: 'Book a conversation with our child specialists at ONP or Lopmudra. A senior psychologist can help you find the right starting point.', action: 'Explore child support' };
  }
  if (/\b(couple|relationship|family|marriage)\b/.test(topic)) {
    return { who: 'Couple', title: 'A little support for your relationship?', description: 'Make space for a confidential conversation with a couple or family therapist, online or in-clinic.', action: 'Explore relationship support' };
  }
  if (/\b(senior|dementia|memory|ageing|caregiver)\b/.test(topic)) {
    return { who: 'Senior Citizen', title: 'Support for someone you care about', description: 'Talk with our team about gentle emotional support for seniors and their families.', action: 'Explore senior support' };
  }
  if (/\b(sport|sports|athlete|performance)\b/.test(topic)) {
    return { who: 'Athlete', title: 'Find your balance, on and off the field', description: 'Connect with a sports psychologist for personalised support with focus, confidence and performance pressure.', action: 'Explore sports support' };
  }
  if (/\b(burnout|stress|anxiety|depression|overload|boundaries)\b/.test(topic)) {
    return { who: 'Myself', title: 'You don’t have to work through this alone', description: 'Schedule a confidential adult therapy session, online or in-clinic. Start with a conversation at your own pace.', action: 'Book an adult therapy session' };
  }
  return { who: '', title: 'When you’re ready, we’re here', description: 'If this reflection feels close to home, our team can help you find the right support. There’s no pressure to have everything figured out.', action: 'Find your next step' };
}