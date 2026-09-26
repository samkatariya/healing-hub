import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { professionalsList } from "@/lib/site-data";

export const Route = createFileRoute("/professionals")({
  head: () => ({ meta: [
    { title: "Our Professionals — Healing Emotions" }, { name: "description", content: "Learn about Healing Emotions founder Yash Daga and the areas of professional support available." },
    { property: "og:title", content: "Our Professionals — Healing Emotions" }, { property: "og:description", content: "Meet our founder and explore available specialties." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: ProfessionalsPage,
});

function ProfessionalsPage() {
  const founder = professionalsList.find((p) => p.confirmed);
  const specialties = professionalsList.filter((p) => !p.confirmed);
  return <><PageIntro eyebrow="People & specialties" title="Our professionals" description="Get to know our founder and the kinds of professional support you can ask about." />
    <section className="py-16 sm:py-24"><div className="mx-auto max-w-5xl px-5 lg:px-8">
      {founder && <div className="border-t border-border pt-7"><p className="text-sm font-medium text-primary">Founder</p><h2 className="mt-2 font-serif text-3xl text-earth">{founder.name}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{founder.bio}</p></div>}
      <h2 className="mt-16 font-serif text-2xl text-earth">Areas of support</h2><div className="mt-7 grid gap-x-12 sm:grid-cols-2">{specialties.map((p) => <div key={p.role} className="border-t border-border py-6"><h3 className="font-serif text-xl text-earth">{p.role}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{p.specialisation}</p></div>)}</div>
      <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Ask about availability <ArrowRight className="h-4 w-4" /></Link>
    </div></section></>;
}
