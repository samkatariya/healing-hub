import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageIntro } from "@/components/site-shell";
import { publicContentOptions } from "@/lib/content.queries";

export const Route = createFileRoute("/testimonials")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publicContentOptions),
  head: () => ({ meta: [
    { title: "Client Experiences — Healing Emotions" }, { name: "description", content: "Experiences shared with permission by people supported through Healing Emotions." },
    { property: "og:title", content: "Client Experiences — Healing Emotions" }, { property: "og:description", content: "Reflections shared with permission." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data } = useSuspenseQuery(publicContentOptions);
  const reviews = data.testimonials.filter((t) => t.consent_confirmed);
  return <><PageIntro eyebrow="Client experiences" title="Words shared with permission" description="We only publish personal experiences when we have permission to share them." />
    <section className="py-16 sm:py-24"><div className="mx-auto max-w-5xl px-5 lg:px-8">
      {reviews.length ? <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">{reviews.map((t) => <blockquote key={t.id} className="border-t border-border pt-6"><p className="font-serif text-xl leading-relaxed text-earth">“{t.quote}”</p><footer className="mt-6 text-sm text-muted-foreground">{t.attribution}{t.context ? ` · ${t.context}` : ""}</footer></blockquote>)}</div> : <p className="max-w-xl text-base leading-7 text-muted-foreground">There are no client stories to share here yet. We take privacy seriously and only publish experiences with permission.</p>}
    </div></section></>;
}
