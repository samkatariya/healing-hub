import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { whatBringsYouHereOptions } from "@/lib/site-data";

export const Route = createFileRoute("/what-brings-you-here")({
  head: () => ({ meta: [
    { title: "Find Support — Healing Emotions" }, { name: "description", content: "Not sure where to start? Explore support for yourself, a child, a relationship, or someone close to you." },
    { property: "og:title", content: "Find Support — Healing Emotions" }, { property: "og:description", content: "Start with what is happening for you." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: FindSupportPage,
});

function FindSupportPage() {
  return <><PageIntro eyebrow="Find support" title="What brings you here?" description="Start with the situation that feels closest to yours. You can explore the details at your own pace." />
    <section className="py-16 sm:py-24"><div className="mx-auto max-w-5xl px-5 lg:px-8"><div className="grid gap-x-10 sm:grid-cols-2">
      {whatBringsYouHereOptions.map((opt) => <Link key={opt.id} to={opt.route.startsWith('/programs') ? '/programs' : '/services'} hash={opt.route.includes('#') ? opt.route.split('#')[1] : undefined} className="group flex items-start justify-between gap-5 border-t border-border py-7 transition-colors hover:border-primary">
        <div><h2 className="font-serif text-xl text-earth group-hover:text-primary">{opt.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{opt.desc}</p></div><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
      </Link>)}
    </div><div className="mt-12 border-t border-border pt-7"><h2 className="font-serif text-2xl text-earth">Not sure?</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">That’s okay. You can ask us about a first conversation or the 15-minute guidance call (₹500).</p><Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Get in touch <ArrowRight className="h-4 w-4" /></Link></div></div></section>
  </>;
}
