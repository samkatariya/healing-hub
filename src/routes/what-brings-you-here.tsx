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
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
            {whatBringsYouHereOptions.map((opt) => (
              <div key={opt.id} className="flex flex-col border-t border-border/60 pt-6 group">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {opt.lead}
                  </span>
                  <h2 className="mt-4 font-serif text-2xl text-earth group-hover:text-primary transition-colors">
                    {opt.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {opt.desc}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => handleQuickBook(opt.category, opt.supportType)}
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                  >
                    Book for this
                  </button>
                  <span className="text-border">|</span>
                  <Link to={opt.route} className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                    Explore details <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Unsure what to choose?
              </span>
              <h3 className="mt-4 font-serif text-3xl text-earth leading-[1.1]">That is completely okay.</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                You do not need to have everything figured out before reaching out. A quick call will guide you directly to the right professional.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:pt-10 shrink-0">
              <button
                onClick={() => {
                  setSelectedWho("Myself");
                  setSelectedSupport("Quick 15-min Call (₹500)");
                  setBookingOpen(true);
                }}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Book 15-Min Quick Call (₹500) <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
              <Link to="/first-session" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                See what happens in the first session
              </Link>
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
