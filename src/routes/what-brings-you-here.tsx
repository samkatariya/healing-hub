import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck2, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { whatBringsYouHereOptions } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/what-brings-you-here")({
  head: () => ({
    meta: [
      { title: "What Brings You Here? — Find the Right Support | Healing Emotions" },
      { name: "description", content: "Simple, guided pathways to find the exact emotional, psychological or therapeutic support you need." },
      { property: "og:title", content: "What Brings You Here? — Healing Emotions" },
      { property: "og:description", content: "Find your need → Find the right support → Choose location → Book." },
    ],
  }),
  component: WhatBringsYouHerePage,
});

function WhatBringsYouHerePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedWho, setSelectedWho] = useState<string>("Myself");
  const [selectedSupport, setSelectedSupport] = useState<string>("");

  const handleQuickBook = (whoCategory: string, supportType: string) => {
    setSelectedWho(whoCategory);
    setSelectedSupport(supportType);
    setBookingOpen(true);
  };

  return (
    <>
      <PageIntro
        eyebrow="Main Guided Funnel"
        title="What brings you here?"
        description="You do not need to understand every psychological approach before you start. Select what describes your situation best."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {whatBringsYouHereOptions.map((opt) => (
              <div
                key={opt.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition-all hover:border-primary/60 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-primary">
                      {opt.lead}
                    </span>
                    <span className="text-xs text-muted-foreground">Direct pathway</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl text-earth group-hover:text-primary transition-colors">
                    {opt.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {opt.desc}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border/70">
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleQuickBook(opt.category, opt.supportType)}
                  >
                    <CalendarCheck2 className="h-4 w-4 mr-1.5" /> Book for this
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="text-xs">
                    <Link to={opt.route}>
                      Explore details <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-sage-soft p-8 text-center sm:p-12">
            <h3 className="font-serif text-3xl text-earth">Not sure which pathway to choose?</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              That is completely okay. You do not need to have everything figured out before reaching out. A quick call will guide you directly to the right professional.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => {
                  setSelectedWho("Myself");
                  setSelectedSupport("Quick 15-min Call (₹500)");
                  setBookingOpen(true);
                }}
              >
                Book a 15-Min Quick Call (₹500)
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-background">
                <Link to="/first-session">See what happens in the first session</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultWho={selectedWho}
        defaultSupport={selectedSupport}
      />
    </>
  );
}
