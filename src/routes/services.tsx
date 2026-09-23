import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck2, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { fallbackServices, specialisedTherapiesList } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Therapies — Healing Emotions | Pune" },
      { name: "description", content: "Explore our multidisciplinary services: Adult psychotherapy, Child support, Couple counselling, Senior memory care, Sports psychology, Assessments, and Allied Therapies." },
      { property: "og:title", content: "Services — Healing Emotions" },
      { property: "og:description", content: "One clear CTA: Learn More → Book. Find the right support without overwhelming clinical jargon." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<string>("");

  const handleBookService = (title: string) => {
    setSelectedSupport(title);
    setBookingOpen(true);
  };

  return (
    <>
      <PageIntro
        eyebrow="Services & Approaches"
        title="Find your need. Find the right support."
        description="We provide comprehensive psychological and therapeutic services for children, adults, couples, and seniors across Pune hospital centres."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fallbackServices.map((svc) => (
              <div
                key={svc.slug}
                id={svc.slug}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xs hover:border-primary/60 hover:shadow-md transition-all scroll-mt-28"
              >
                <div>
                  <h2 className="font-serif text-2xl text-earth">{svc.title}</h2>
                  <p className="mt-2 text-xs font-medium text-primary">{svc.summary}</p>
                  <p className="mt-4 text-xs leading-6 text-muted-foreground">{svc.body}</p>

                  {svc.slug === "specialised-therapies" && (
                    <div className="mt-5 rounded-xl bg-sage-soft/60 p-3.5 border border-border/60">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-earth mb-2">
                        Specialised Allied Disciplines:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {specialisedTherapiesList.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-background px-2.5 py-1 text-[11px] font-medium text-earth border border-border/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
                  <Button
                    size="sm"
                    className="rounded-full text-xs flex-1"
                    onClick={() => handleBookService(svc.title)}
                  >
                    <CalendarCheck2 className="h-3.5 w-3.5 mr-1.5" /> Book Session
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="text-xs">
                    <Link to="/first-session">
                      Process <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK GUIDANCE CARD */}
          <div className="mt-16 rounded-3xl bg-sage-soft p-8 text-center sm:p-12 border border-border/70">
            <h3 className="font-serif text-2xl sm:text-3xl text-earth">
              Not sure which service matches your exact concern?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              You don’t need to self-diagnose. Reach out for a quick 15-minute guidance call or schedule an initial consultation to determine the best therapeutic approach.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full px-7"
                onClick={() => {
                  setSelectedSupport("Quick 15-min Call (₹500)");
                  setBookingOpen(true);
                }}
              >
                Book a 15-Min Quick Call (₹500)
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-background">
                <Link to="/fees">View Transparent Fees</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultSupport={selectedSupport}
      />
    </>
  );
}