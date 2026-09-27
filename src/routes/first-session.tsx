import { createFileRoute } from "@tanstack/react-router";
import { Headphones, Heart, Compass, CheckCircle2, CalendarCheck2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/first-session")({
  head: () => ({
    meta: [
      { title: "What Happens in Your First Session? — Healing Emotions" },
      { name: "description", content: "Learn what to expect in your first session at Healing Emotions. We listen, understand, guide, and plan together." },
      { property: "og:title", content: "The First Session — Healing Emotions" },
      { property: "og:description", content: "You don't need to have everything figured out before your first session." },
    ],
  }),
  component: FirstSessionPage,
});

const steps = [
  {
    num: "01",
    title: "1. We listen",
    desc: "We understand what brings you here in your own words, without rushed judgments or clinical labels.",
    icon: Headphones,
  },
  {
    num: "02",
    title: "2. We understand",
    desc: "We discuss your concerns, current situation, daily challenges, and personal goals.",
    icon: Heart,
  },
  {
    num: "03",
    title: "3. We guide",
    desc: "We identify the most appropriate professional or therapeutic approach if specialized intervention is required.",
    icon: Compass,
  },
  {
    num: "04",
    title: "4. We plan",
    desc: "We discuss the next step together—frequency, format, and what realistic progress will look like.",
    icon: CheckCircle2,
  },
];

function FirstSessionPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <PageIntro

        title="What happens in your first session?"
        description="A calm, structured, and compassionate first conversation. No intimidating paperwork, no psychiatric jargon."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-16">
          <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="border-t border-border/60 pt-6">
                  <span className="font-serif text-3xl font-bold text-primary/30">{s.num}</span>
                  <div className="mt-4 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h2 className="font-serif text-xl text-earth">{s.title}</h2>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-24 border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Take the first step
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                You don’t need to have everything figured out before your first session.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Most people feel nervous before their first appointment. We are here to make it as gentle and straightforward as possible.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:pt-10 shrink-0">
              <button
                onClick={() => setBookingOpen(true)}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Reach Out <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
