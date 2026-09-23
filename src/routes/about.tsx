import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Heart, Users, ShieldCheck, CalendarCheck2 } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import therapistPortrait from "@/assets/therapist-portrait.jpg";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Healing Emotions — Integrated Emotional & Psychological Wellness" },
      { name: "description", content: "Healing Emotions brings together psychologists, psychotherapists, child therapists, speech & OT specialists, and expressive therapists under one roof." },
      { property: "og:title", content: "About Healing Emotions" },
      { property: "og:description", content: "One roof. Multiple approaches. Personalised support." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <PageIntro
        eyebrow="Integrated Emotional & Psychological Wellness"
        title="About Healing Emotions"
        description="Healing Emotions is an integrated emotional and psychological wellness organisation bringing together professionals and therapeutic approaches under one roof."
      />

      {/* CORE PHILOSOPHY */}
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Core Approach</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-earth">
            One Roof. Multiple Approaches.
          </h2>
          <div className="mt-6 space-y-3 font-serif text-xl sm:text-2xl text-earth/90 leading-snug">
            <p>“Every person is different.”</p>
            <p className="text-primary font-medium">“The right support depends on the person, not just the problem.”</p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Rather than trying to force one therapeutic style to fit everyone, Healing Emotions unites clinical psychology, psychotherapy, child & developmental therapy, speech therapy, occupational therapy, expressive arts, music therapy, and senior memory care in a collaborative environment.
          </p>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative">
            <img
              src={therapistPortrait}
              alt="Psy. Yash Daga, Founder of Healing Emotions"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-sm"
            />
            <div className="absolute -bottom-4 -right-4 hidden sm:block rounded-xl border border-border bg-card p-4 shadow-md">
              <span className="text-xs font-semibold text-primary">Multidisciplinary Practice</span>
              <p className="font-serif text-lg font-semibold text-earth">8 Partner Hospital Centres</p>
            </div>
          </div>

          <div>
            <span className="inline-block rounded-full bg-sage-soft px-3.5 py-1 text-xs font-semibold text-primary">
              Founder & Clinical Lead
            </span>
            <h2 className="mt-4 font-serif text-4xl text-earth">Psy. Yash Daga</h2>
            <p className="mt-1 text-sm font-medium text-primary">
              Founder | Psychologist | Psychotherapist
            </p>

            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                Psy. Yash Daga established Healing Emotions to create a comprehensive, non-intimidating ecosystem for mental and emotional health in Pune. His clinical experience spans individual psychotherapy, corporate wellness programs, and sports performance psychology.
              </p>
              <p>
                Recognising that complex emotional challenges often require multidisciplinary support, he structured Healing Emotions to integrate allied health specialists alongside psychology—ensuring seamless collaboration between therapists, families, and hospitals.
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {[
                "Evidence-informed, human-centred therapy",
                "Cross-discipline case coordination for child & adult care",
                "On-ground hospital presence across Pune & PCMC",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm font-medium text-earth">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full shadow-xs">
                <Link to="/professionals">
                  Meet Our Professionals <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" onClick={() => setBookingOpen(true)}>
                <CalendarCheck2 className="h-4 w-4 mr-2" /> Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ONE ROOF */}
      <section className="bg-sage-soft py-16 sm:py-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">The Healing Emotions Standard</p>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
              Designed for ease, trust, and continuity
            </h3>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-card p-6 border border-border">
              <Users className="h-6 w-6 text-primary" />
              <h4 className="mt-4 font-serif text-xl font-semibold text-earth">Allied Disciplines</h4>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Psychotherapy, Speech, OT, and expressive therapies working in sync rather than in silos.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 border border-border">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h4 className="mt-4 font-serif text-xl font-semibold text-earth">Hospital Integration</h4>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Centres inside recognized hospitals provide safety, institutional credibility, and geographic reach.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 border border-border">
              <Heart className="h-6 w-6 text-primary" />
              <h4 className="mt-4 font-serif text-xl font-semibold text-earth">Low-Friction Care</h4>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                No complex diagnostic tests needed before your first call. We listen first and navigate together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}