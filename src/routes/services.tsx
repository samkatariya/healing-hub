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
        <div className="mx-auto max-w-6xl px-5 lg:px-8 space-y-16">
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {fallbackServices.map((svc) => (
              <div
                key={svc.slug}
                id={svc.slug}
                className="flex flex-col border-t border-border/60 pt-6 group scroll-mt-28"
              >
                <div>
                  <h2 className="font-serif text-2xl text-earth group-hover:text-primary transition-colors">{svc.title}</h2>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-primary">{svc.summary}</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{svc.body}</p>

                  {svc.slug === "specialised-therapies" && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-widest text-earth mb-2">
                        Specialised Allied Disciplines:
                      </p>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {specialisedTherapiesList.join(" · ")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => handleBookService(svc.title)}
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                  >
                    Book session
                  </button>
                  <span className="text-border">|</span>
                  <Link to="/first-session" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                    Process <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK GUIDANCE CARD */}
          <div className="mt-24 border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Need Guidance?
              </span>
              <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                Not sure which service matches your exact concern?
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                You don’t need to self-diagnose. Reach out for a quick 15-minute guidance call or schedule an initial consultation to determine the best therapeutic approach.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:pt-10 shrink-0">
              <button
                onClick={() => {
                  setSelectedSupport("Quick 15-min Call (₹500)");
                  setBookingOpen(true);
                }}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Book 15-Min Quick Call (₹500) <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
              <Link to="/fees" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                View Transparent Fees
              </Link>
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