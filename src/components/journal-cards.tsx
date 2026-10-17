import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Clock } from 'lucide-react';
import journalCare from '@/assets/journal-care.jpg';
import { articleImages } from '@/lib/site-data';
import { readingMinutes, type JournalArticle } from '@/lib/journal';

export function JournalCards({ articles }: { articles: JournalArticle[] }) {
  return <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    {articles.map(article => <Link key={article.id} to="/blog/$slug" params={{ slug: article.slug }} className="group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <img src={article.cover_image_url || articleImages[article.slug] || journalCare} alt="" loading="lazy" className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="font-medium text-primary">{article.categories?.name ?? article.category?.name ?? 'Reflection'}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{readingMinutes(article)} min read</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl leading-tight text-earth group-hover:text-primary">{article.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Read reflection <ArrowUpRight className="h-4 w-4" /></span>
    </Link>)}
  </div>;
}