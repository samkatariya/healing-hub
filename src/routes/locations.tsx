import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { hospitalLocations } from "@/lib/site-data";

export const Route = createFileRoute("/locations")({
  head: () => ({ meta: [
    { title: "Locations — Healing Emotions in Pune & PCMC" }, { name: "description", content: "Find Healing Emotions locations in Pune & PCMC, with directions and available areas of support." },
    { property: "og:title", content: "Healing Emotions Locations" }, { property: "og:description", content: "Find a centre near you in Pune & PCMC." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: LocationsPage,
});

function LocationsPage() {
  return <><PageIntro eyebrow="Pune & PCMC" title="Our locations" description="Find a centre near you. Please confirm availability before visiting." />
    <section className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">{hospitalLocations.map((loc) => <div key={loc.id} className="border-t border-border py-7"><p className="text-sm font-medium text-primary">{loc.area}</p><h2 className="mt-2 font-serif text-xl text-earth">{loc.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{loc.services.join(" · ")}</p><a href={loc.mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">Directions <ExternalLink className="h-4 w-4" /></a></div>)}</div>
    <div className="mt-10 border-t border-border pt-7"><p className="text-sm text-muted-foreground">Looking for an online appointment instead?</p><Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Contact us <ArrowRight className="h-4 w-4" /></Link></div></div></section></>;
}
