import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { publicContentOptions } from '@/lib/content.queries';
import { JournalCards } from './journal-cards';
import { Button } from './ui/button';

export function HomeJournal() {
  const { data, isPending } = useQuery({ ...publicContentOptions, retry: false });
  const articles = data?.articles.slice(0, 3) ?? [];
  return <section aria-labelledby="home-journal-title" className="border-b border-border/50 bg-background py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">From the Journal</p>
          <h2 id="home-journal-title" className="mt-4 font-serif text-3xl leading-tight text-earth sm:text-4xl">Words for what you might be feeling</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">A quiet moment to reflect. Read at your own pace.</p>
        </div>
        <Button asChild variant="link" className="self-start px-0"><Link to="/blog">Visit the journal <ArrowRight /></Link></Button>
      </div>
      {articles.length ? <JournalCards articles={articles} /> : isPending ? <div className="grid gap-8 sm:grid-cols-3" aria-label="Loading reflections">{[1, 2, 3].map(n => <div key={n} className="aspect-[4/3] rounded-lg bg-muted motion-safe:animate-pulse" />)}</div> : <p className="text-sm text-muted-foreground">The journal is temporarily unavailable. Please check back soon.</p>}
    </div>
  </section>;
}