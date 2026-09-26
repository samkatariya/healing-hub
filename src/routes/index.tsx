import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fallbackServices } from "@/lib/site-data";
import therapyRoom from "@/assets/therapy-room.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Healing Emotions — Mental Health Support in Pune" },
    { name: "description", content: "Thoughtful emotional and psychological support for individuals and families in Pune. Explore services, locations, and what to expect." },
    { property: "og:title", content: "Healing Emotions — Mental Health Support in Pune" },
    { property: "og:description", content: "Find support that starts with listening." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const featured = fallbackServices.slice(0, 4);

function HomePage() {
  return <>
    <section className="relative flex min-h-[530px] items-center overflow-hidden bg-earth py-20 sm:min-h-[620px]">
      <img src={therapyRoom} alt="A calm therapy room" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-earth/65" />
      <div className="relative mx-auto w-full max-w-7xl px-5 text-primary-foreground lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium">Healing Emotions · Pune</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">Healing Emotions</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 sm:text-xl">A place to talk, understand what you’re going through, and find the support that fits.</p>
          <Button asChild size="lg" className="mt-9"><Link to="/what-brings-you-here">Find your support <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </div>
    </section>

    <section className="border-b border-border py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">How we can help</p>
          <h2 className="mt-3 font-serif text-3xl text-earth sm:text-4xl">Support for different moments in life</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">You don’t need to know what kind of therapy you need. Start with what’s happening for you.</p>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2">
          {featured.map((service) => <Link key={service.slug} to="/services" hash={service.slug} className="group flex items-start justify-between gap-5 border-t border-border py-6">
            <div><h3 className="font-serif text-xl text-earth group-hover:text-primary">{service.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{service.summary}</p></div>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
          </Link>)}
        </div>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Explore all services <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>

    <section className="border-b border-border bg-sage-soft/40 py-18 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-2 lg:px-8">
        <div><p className="text-sm font-medium text-primary">About us</p><h2 className="mt-3 font-serif text-3xl text-earth sm:text-4xl">Care begins with listening</h2></div>
        <div><p className="text-base leading-8 text-muted-foreground">Healing Emotions brings together different professionals and approaches, so the conversation can begin with you rather than a label.</p><Link to="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">About Healing Emotions <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>

    <section className="py-18 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between lg:px-8">
        <div className="max-w-2xl"><p className="flex items-center gap-2 text-sm font-medium text-primary"><MapPin className="h-4 w-4" /> Pune & PCMC</p><h2 className="mt-3 font-serif text-3xl text-earth sm:text-4xl">Ready when you are</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Find a location, understand the first session, or reach out when it feels right.</p></div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-primary"><Link to="/locations" className="hover:underline">Locations</Link><Link to="/first-session" className="hover:underline">First session</Link><Link to="/contact" className="hover:underline">Contact us <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div>
      </div>
    </section>
  </>;
}
