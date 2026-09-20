import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, HeartHandshake, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicContentOptions } from "@/lib/content.queries";
import { articleImages, contact, fallbackServices } from "@/lib/site-data";
import therapyRoom from "@/assets/therapy-room.jpg";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publicContentOptions),
  head: () => ({ meta: [
    { title: "Healing Emotions — Psychotherapy & Emotional Wellbeing in Pune" },
    { name: "description", content: "Warm, human support through therapy, coaching, workplace wellness and graphology in Pune." },
    { property: "og:title", content: "Healing Emotions — Emotions Are Everything" },
    { property: "og:description", content: "Accessible mental-health support for individuals, families, and teams." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(publicContentOptions);
  const services = data.services.length ? data.services : fallbackServices;
  return <>
    <section className="relative flex min-h-[78vh] items-end overflow-hidden">
      <img src={therapyRoom} alt="A calm therapy room with comfortable seating" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/55 to-earth/10" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 text-primary-foreground lg:px-8 lg:pb-20">
        <p className="text-xs font-semibold uppercase">Psychotherapy · Coaching · Wellbeing</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl">Healing Emotions</h1>
        <p className="mt-4 font-serif text-2xl sm:text-3xl">Emotions Are Everything.</p>
        <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">We communicate like humans, not textbooks. Find a calm, respectful space to feel heard and move forward at your own pace.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full"><a href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Start a conversation</a></Button><Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/services">Explore support <ArrowRight /></Link></Button></div>
      </div>
    </section>
    <section className="border-b border-border"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:grid-cols-3 lg:px-8">
      {[[HeartHandshake,"Human, not clinical","Care that begins with listening."],[ShieldCheck,"Private and respectful","A non-judgmental space for honest conversation."],[MessageCircle,"Simple first step","Call or message us to understand your options."]].map(([Icon,title,text]) => <div key={String(title)} className="flex gap-4"><Icon className="mt-1 text-primary" /><div><h2 className="font-semibold">{title as string}</h2><p className="mt-1 text-sm text-muted-foreground">{text as string}</p></div></div>)}
    </div></section>
    <section className="py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase text-primary">Ways we can help</p><h2 className="mt-4 font-serif text-4xl text-earth sm:text-5xl">Support shaped around real life</h2><p className="mt-5 leading-7 text-muted-foreground">Mental-health support should not be a privilege. It should be accessible, understandable, and grounded in your life.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <article key={service.title} className="bg-background p-7"><span className="text-xs font-semibold text-primary">0{index + 1}</span><h3 className="mt-8 font-serif text-2xl text-earth">{service.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.summary}</p></article>)}</div><Button asChild variant="link" className="mt-7 px-0"><Link to="/services">View every service <ArrowRight /></Link></Button></div></section>
    <section className="bg-sage-soft py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><p className="text-xs font-semibold uppercase text-primary">From the journal</p><h2 className="mt-4 font-serif text-4xl text-earth sm:text-5xl">Ideas for gentler days</h2><p className="mt-5 leading-7 text-muted-foreground">Plain-language reflections on emotions, relationships, and sustainable performance.</p></div><div className="grid gap-6 md:grid-cols-2">{data.articles.slice(0, 2).map((article) => <Link key={article.id} to="/blog/$slug" params={{ slug: article.slug }} className="group overflow-hidden rounded-lg bg-background shadow-sm"><img src={articleImages[article.slug]} alt="" className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-[1.02]" /><div className="p-6"><p className="text-xs text-primary">{article.reading_minutes} min read</p><h3 className="mt-3 font-serif text-2xl text-earth">{article.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p></div></Link>)}</div></div></section>
    <section className="py-20 text-center sm:py-28"><div className="mx-auto max-w-3xl px-5"><h2 className="font-serif text-4xl text-earth sm:text-5xl">You do not have to carry it alone.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">A short call or message can help you understand the next step. No pressure, no jargon.</p><Button asChild size="lg" className="mt-8 rounded-full"><a href={contact.whatsapp} target="_blank" rel="noreferrer">Talk with Healing Emotions <ArrowRight /></a></Button></div></section>
  </>;
}