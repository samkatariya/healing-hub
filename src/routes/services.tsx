import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { fallbackServices, specialisedTherapiesList } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services & Therapies — Healing Emotions" }, { name: "description", content: "Explore mental health support for adults, children, couples and families, seniors, and athletes in Pune." },
    { property: "og:title", content: "Services — Healing Emotions" }, { property: "og:description", content: "Different kinds of support for different needs." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: ServicesPage,
});

function ServicesPage() {
  return <><PageIntro eyebrow="Services" title="Ways we can help" description="Explore the areas we support. It’s fine if you’re not sure which one fits yet." />
    <section className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="grid gap-x-12 gap-y-0 md:grid-cols-2">
      {fallbackServices.map((svc) => <div key={svc.slug} id={svc.slug} className="scroll-mt-28 border-t border-border py-7"><h2 className="font-serif text-2xl text-earth">{svc.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{svc.body}</p>{svc.slug === "specialised-therapies" && <p className="mt-4 text-sm leading-7 text-muted-foreground">{specialisedTherapiesList.join(" · ")}</p>}</div>)}
    </div><div className="mt-12 flex flex-wrap gap-6 border-t border-border pt-7 text-sm font-medium text-primary"><Link to="/first-session" className="hover:underline">What to expect <ArrowRight className="ml-1 inline h-4 w-4" /></Link><Link to="/fees" className="hover:underline">Fees</Link><Link to="/contact" className="hover:underline">Get in touch</Link></div></div></section></>;
}
