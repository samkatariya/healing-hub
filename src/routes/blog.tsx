import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { publicContentOptions } from "@/lib/content.queries";
import { articleImages } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publicContentOptions),
  head: () => ({
    meta: [
      { title: "Journal — Healing Emotions" },
      { name: "description", content: "Plain-language reflections on emotional wellbeing, relationships, resilience and graphology." },
      { property: "og:title", content: "The Healing Emotions Journal" },
      { property: "og:description", content: "Thoughtful ideas for gentler days and healthier relationships." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data } = useSuspenseQuery(publicContentOptions);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(
    () =>
      data.articles.filter(
        (a) =>
          (cat === "all" || a.categories?.slug === cat) &&
          (a.title + " " + a.excerpt).toLowerCase().includes(q.toLowerCase())
      ),
    [data.articles, q, cat]
  );

  return (
    <>
      <PageIntro

        title="Words for what you might be feeling"
        description="Grounded reflections—written to be useful, never overwhelming."
      />
      
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 border-b border-border/60 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the journal..."
                className="h-11 pl-11 rounded-full bg-background border-border/80 shadow-sm focus-visible:ring-primary/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={cat === "all" ? "default" : "outline"}
                className="rounded-full px-5 h-9"
                onClick={() => setCat("all")}
              >
                All
              </Button>
              {data.categories.map((c) => (
                <Button
                  key={c.id}
                  size="sm"
                  variant={cat === c.slug ? "default" : "outline"}
                  className="rounded-full px-5 h-9"
                  onClick={() => setCat(c.slug)}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          </div>

          {filtered.length ? (
            <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <Link key={a.id} to="/blog/$slug" params={{ slug: a.slug }} className="group flex flex-col">
                  <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                    <img
                      src={
                        articleImages[a.slug] ||
                        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop"
                      }
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-xs font-medium tracking-wide text-primary uppercase">
                    <span className="bg-primary/10 px-2.5 py-1 rounded-full">{a.categories?.name}</span>
                    <span>·</span>
                    <span>{a.reading_minutes} min read</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl leading-tight text-earth group-hover:text-primary transition-colors">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <p className="text-muted-foreground">No journal entries match your search.</p>
              <Button variant="link" onClick={() => setQ("")} className="mt-2 text-primary">
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}