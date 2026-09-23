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
        eyebrow="Clear Expectations"
        title="What happens in your first session?"
        description="A calm, structured, and compassionate first conversation. No intimidating paperwork, no psychiatric jargon."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif text-3xl font-bold text-primary/40">{s.num}</span>
                    <div className="mt-4 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-earth">{s.title}</h2>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl bg-sage-soft p-8 text-center sm:p-14 border border-border/60">
            <span className="inline-block rounded-full bg-background px-4 py-1 text-xs font-semibold text-primary">
              Take the first step
            </span>
            <h2 className="mt-4 font-serif text-3xl text-earth sm:text-4xl">
              You don’t need to have everything figured out before your first session.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Most people feel nervous before their first appointment. We are here to make it as gentle and straightforward as possible.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" className="rounded-full px-8 shadow-sm" onClick={() => setBookingOpen(true)}>
                <CalendarCheck2 className="h-5 w-5 mr-2" /> Book a Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
