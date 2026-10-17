import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Linkedin, Minimize2, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/booking-modal';
import { JournalCards } from '@/components/journal-cards';
import { publicArticleOptions, publicContentOptions } from '@/lib/content.queries';
import { articleImages } from '@/lib/site-data';
import { articleNextStep, readingMinutes, relatedReflections } from '@/lib/journal';
import journalCare from '@/assets/journal-care.jpg';

function ArticleUnavailable() {
  return <div className="mx-auto max-w-3xl px-5 py-32 text-center"><h1 className="font-serif text-4xl text-earth">This article is unavailable</h1><Button asChild variant="link" className="mt-5"><Link to="/blog">Return to the journal</Link></Button></div>;
}

export const Route = createFileRoute('/blog_/$slug')({
  loader: async ({ context, params }) => {
    try { return await context.queryClient.ensureQueryData(publicArticleOptions(params.slug)); }
    catch { throw notFound(); }
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.seo_title || loaderData.title} — Healing Emotions` : 'Article not found — Healing Emotions' },
    { name: 'description', content: loaderData?.seo_description || loaderData?.excerpt || 'Healing Emotions journal article' },
    { property: 'og:title', content: loaderData?.title || 'Healing Emotions Journal' },
    { property: 'og:description', content: loaderData?.excerpt || 'Thoughtful mental-health reflections.' },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(loaderData?.cover_image_url?.startsWith('https://') ? [{ property: 'og:image', content: loaderData.cover_image_url }, { name: 'twitter:image', content: loaderData.cover_image_url }] : []),
  ] }),
  errorComponent: ArticleUnavailable,
  notFoundComponent: ArticleUnavailable,
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data: article } = useSuspenseQuery(publicArticleOptions(slug));
  const { data: content } = useQuery(publicContentOptions);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [readingMode, setReadingMode] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const minutes = readingMinutes(article);
  const next = articleNextStep(article);
  const related = relatedReflections(article, content?.articles ?? []);

  useEffect(() => { setShareUrl(window.location.href); setBookingOpen(false); }, [slug]);

  useEffect(() => {
    document.body.classList.toggle('journal-reading-mode', readingMode);
    return () => { document.body.classList.remove('journal-reading-mode'); };
  }, [readingMode]);

  useEffect(() => {
    const update = () => {
      const body = bodyRef.current;
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const viewport = window.innerHeight - (readingMode ? 52 : 132);
      const travelled = viewport - rect.top;
      setProgress(Math.round(Math.min(100, Math.max(0, travelled / rect.height * 100))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    if (bodyRef.current) observer.observe(bodyRef.current);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); observer.disconnect(); };
  }, [slug, readingMode]);

  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: article.title, url: shareUrl });
      else { await navigator.clipboard.writeText(shareUrl); toast.success('Article link copied'); }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) toast.error('Unable to share this link right now.');
    }
  }

  return <article>
    <div className={`journal-reader-toolbar sticky z-30 border-b border-border/60 bg-background/95 backdrop-blur-sm ${readingMode ? 'top-0' : 'top-20'}`}>
      <progress value={progress} max={100} aria-label="Article reading progress" className="journal-reading-progress block h-0.5 w-full" />
      <div className="mx-auto flex h-12 max-w-4xl items-center justify-between gap-2 px-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{minutes} min read<span className="border-l border-border pl-2 tabular-nums">{progress}%</span></span>
        <Button variant="ghost" size="sm" aria-pressed={readingMode} onClick={() => setReadingMode(v => !v)} className="gap-2 text-muted-foreground">
          {readingMode ? <Minimize2 /> : <BookOpen />}{readingMode ? 'Exit reading mode' : 'Reading mode'}
        </Button>
      </div>
    </div>
    <header className="border-b border-border/50 bg-sage-soft/30 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <Button asChild variant="link" className="px-0"><Link to="/blog"><ArrowLeft />Back to Journal</Link></Button>
        <p className="mt-8 text-xs font-medium uppercase tracking-wide text-primary">{article.categories?.name ?? article.category?.name ?? 'Reflection'}</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-earth sm:text-5xl">{article.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
      </div>
    </header>
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <img src={article.cover_image_url || articleImages[article.slug] || journalCare} alt={article.title} className="journal-cover mb-12 aspect-[2/1] w-full rounded-lg object-cover" />
      <div className="mx-auto max-w-[680px]">
        <div ref={bodyRef} className="journal-prose prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-headings:text-earth prose-p:leading-8 prose-a:text-primary prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="journal-author mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
          <span className="text-sm font-medium text-earth">Healing Emotions Team</span>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="icon"><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" title="Share on LinkedIn"><Linkedin /></a></Button>
            <Button variant="outline" size="icon" onClick={share} aria-label="Share article" title="Share article"><Share2 /></Button>
          </div>
        </div>
        <aside aria-labelledby="article-next-step" className="journal-next-step mt-12 border-y border-border bg-sage-soft/40 px-6 py-8 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">At your own pace</p>
          <h2 id="article-next-step" className="mt-3 font-serif text-3xl leading-tight text-earth">{next.title}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{next.description}</p>
          <Button onClick={() => setBookingOpen(true)} className="mt-6 h-auto min-h-10 whitespace-normal text-left">{next.action}<ArrowRight className="shrink-0" /></Button>
        </aside>
      </div>
    </div>
    {related.length > 0 && <section aria-labelledby="related-reflections" className="journal-related border-t border-border/60 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 id="related-reflections" className="font-serif text-3xl text-earth">Related reflections</h2>
          <Button asChild variant="link" className="px-0"><Link to="/blog">All reflections<ArrowRight /></Link></Button>
        </div>
        <JournalCards articles={related} />
      </div>
    </section>}
    <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} defaultWho={next.who} />
  </article>;
}