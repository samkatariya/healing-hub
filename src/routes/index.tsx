import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  Compass,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users2,
  Building2,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  contact,
  fallbackServices,
  hospitalLocations,
  whatBringsYouHereOptions,
  specialisedTherapiesList,
  professionalsList,
} from "@/lib/site-data";
import therapyRoom from "@/assets/therapy-room.jpg";
import therapistPortrait from "@/assets/therapist-portrait.jpg";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Healing Emotions — Integrated Emotional & Psychological Wellness Organisation" },
      {
        name: "description",
        content:
          "Emotions Are Everything. Emotional & psychological wellness support for children, adults, families and senior citizens across 8 hospital locations in Pune.",
      },
      { property: "og:title", content: "Healing Emotions — Emotions Are Everything" },
      {
        property: "og:description",
        content: "Multiple professionals. Multiple approaches. Personalised support under one roof.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingWho, setBookingWho] = useState<string>("Myself");
  const [bookingSupport, setBookingSupport] = useState<string>("");
  const [bookingLocation, setBookingLocation] = useState<string>("");

  const triggerBook = (who?: string, support?: string, loc?: string) => {
    if (who) setBookingWho(who);
    if (support) setBookingSupport(support);
    if (loc) setBookingLocation(loc);
    setBookingOpen(true);
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-earth py-20 sm:py-28">
        <img
          src={therapyRoom}
          alt="A calm, welcoming clinical space"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth/95 via-earth/80 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 text-primary-foreground lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              Healing Emotions
            </span>
            <h1 className="mt-4 font-serif text-5xl leading-[1.08] sm:text-6xl lg:text-7xl font-semibold">
              Emotions Are Everything.
            </h1>
            <p className="mt-5 text-lg leading-8 text-primary-foreground/90 sm:text-xl">
              Emotional & psychological wellness support for children, adults, families and senior citizens.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full px-6 font-semibold"
              >
                <Link to="/what-brings-you-here">
                  What Brings You Here? <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="rounded-full px-7 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-semibold"
                onClick={() => triggerBook()}
              >
                <CalendarCheck2 className="h-4 w-4 mr-2" /> Book a Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT BRINGS YOU HERE? (MAIN FUNNEL) */}
      <section className="py-20 sm:py-28 border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Main Guided Funnel
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl text-earth">
              What brings you here?
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Select the situation that best describes what you are experiencing. Each option connects you directly to the relevant support.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whatBringsYouHereOptions.map((opt) => (
              <div
                key={opt.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/60 hover:shadow-md transition-all"
              >
                <div>
                  <span className="inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-primary">
                    {opt.lead}
                  </span>
                  <h3 className="mt-3 font-serif text-xl sm:text-2xl text-earth group-hover:text-primary transition-colors">
                    {opt.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{opt.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <Button
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() => triggerBook(opt.category, opt.supportType)}
                  >
                    Book for this
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="text-xs">
                    <Link to={opt.route}>
                      Details <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}

            {/* UNCERTAIN CARD */}
            <div className="flex flex-col justify-between rounded-2xl border border-dashed border-primary/40 bg-sage-soft/30 p-6">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Need Quick Clarity?
                </span>
                <h3 className="mt-3 font-serif text-xl sm:text-2xl text-earth">
                  Unsure what you need?
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Start with a 15-minute quick guidance call (₹500) to clarify which specialist or therapy fits best.
                </p>
              </div>
              <div className="mt-6 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full w-full text-xs bg-background"
                  onClick={() => triggerBook("Myself", "Quick 15-min Call (₹500)")}
                >
                  Book 15-Min Call (₹500)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO WE SUPPORT & ONE ROOF MULTIPLE APPROACHES */}
      <section className="bg-sage-soft py-20 sm:py-28 border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Core Approach
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl text-earth">
              One Roof. Multiple Approaches.
            </h2>
            <div className="mt-6 space-y-2 font-serif text-xl sm:text-2xl text-earth font-medium">
              <p>Every person is different.</p>
              <p className="text-primary">The right support depends on the person, not just the problem.</p>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-7 text-muted-foreground">
              Healing Emotions brings together different professionals and therapeutic approaches to provide personalised support—all coordinated under one integrated organisation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-background p-7 border border-border">
              <span className="text-xs font-semibold text-primary uppercase">01. Multidisciplinary</span>
              <h3 className="mt-3 font-serif text-2xl text-earth">Cross-Discipline Care</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Psychotherapy, child therapy, speech therapy, and occupational therapy work hand-in-hand rather than in isolated clinics.
              </p>
            </div>

            <div className="rounded-2xl bg-background p-7 border border-border">
              <span className="text-xs font-semibold text-primary uppercase">02. Creative & Somatic</span>
              <h3 className="mt-3 font-serif text-2xl text-earth">Allied Modalities</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Art therapy, music therapy, dance & movement therapy, and reminiscence therapy for deep non-verbal and sensory healing.
              </p>
            </div>

            <div className="rounded-2xl bg-background p-7 border border-border">
              <span className="text-xs font-semibold text-primary uppercase">03. Practical & Grounded</span>
              <h3 className="mt-3 font-serif text-2xl text-earth">No Confusing Jargon</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                We speak human to human. The focus is always on your goals, practical daily relief, and genuine emotional resilience.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-background p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xl text-earth font-semibold">Specialised Therapies Available Under Our Roof:</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Speech Therapy · Occupational Therapy · Art Therapy · Music Therapy · Dance & Movement · Reminiscence
              </p>
            </div>
            <Button asChild size="sm" variant="outline" className="rounded-full shrink-0">
              <Link to="/services">
                Explore Services <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. OUR PROFESSIONALS TEASER */}
      <section className="py-20 sm:py-28 border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Experienced Team
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
                Our Professionals
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Accredited specialists working together across Pune partner hospitals.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/professionals">
                Meet All Professionals <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {professionalsList.slice(0, 4).map((p) => (
              <div
                key={p.role}
                className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="rounded-md bg-sage-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                    {p.role}
                  </span>
                  <h3 className="mt-3 font-serif text-xl text-earth">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.specialisation}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full rounded-full text-xs"
                    onClick={() => triggerBook(undefined, p.role)}
                  >
                    Book with specialist
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATIONS TEASER */}
      <section className="bg-sage-soft/50 py-20 sm:py-28 border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                8 Hospital Centres in Pune & PCMC
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
                Find a Healing Emotions Location
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Integrated clinical spaces inside reputable hospitals across Pune neighbourhoods.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full bg-background">
              <Link to="/locations">
                View All 8 Locations <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hospitalLocations.slice(0, 4).map((h) => (
              <div
                key={h.id}
                className="rounded-2xl border border-border bg-background p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <MapPin className="h-3 w-3" />
                    <span>{h.area}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl text-earth">{h.name}</h3>
                  <p className="mt-2 text-[11px] text-muted-foreground line-clamp-1">
                    {h.services.join(" · ")}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    className="rounded-full text-xs flex-1"
                    onClick={() => triggerBook(undefined, undefined, h.name)}
                  >
                    Book here
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="text-xs p-2">
                    <a href={h.mapsUrl} target="_blank" rel="noreferrer" aria-label="Maps">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HEALING EMOTIONS IN ACTION (EXPERIENCES / GALLERY) */}
      <section className="py-20 sm:py-28 border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Community & Practice
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
              Healing Emotions in Action
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Workshops, interactive therapy activities, corporate sessions, and community programs in Pune.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center">
                <span className="font-serif text-lg text-earth font-semibold">Interactive Mental Health Workshops</span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-xs text-earth">Workshops & Group Learning</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Corporate & student wellbeing sessions</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center">
                <span className="font-serif text-lg text-earth font-semibold">Creative Art & Movement Sessions</span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-xs text-earth">Therapy Activities</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Non-verbal emotional regulation</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center">
                <span className="font-serif text-lg text-earth font-semibold">Senior Memory & Reminiscence Circles</span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-xs text-earth">Dementia & Senior Care</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Gentle cognitive comfort groups</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center">
                <span className="font-serif text-lg text-earth font-semibold">Sports Performance Mental Training</span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-xs text-earth">Athlete Conditioning</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Focus, composure & tournament mindset</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT PEOPLE SAY (CLIENT EXPERIENCES TEASER) */}
      <section className="bg-sage-soft/40 py-20 sm:py-28 border-b border-border/70">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Genuine Feedback
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
                What People Say
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Reflections shared with consent by clients and families supported through Healing Emotions.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="rounded-full bg-background">
                <Link to="/testimonials">
                  Read Experiences & Reviews <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <blockquote className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-base leading-relaxed text-earth">
                  “Reaching out was the hardest part, but the conversation felt completely respectful and human. There was zero pressure to fit into a clinical diagnosis.”
                </p>
              </div>
              <footer className="mt-5 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                Adult Therapy Client · Shivajinagar
              </footer>
            </blockquote>

            <blockquote className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-base leading-relaxed text-earth">
                  “Our child’s speech and sensory integration improved steadily because the psychologist and occupational therapist actually communicated with each other.”
                </p>
              </div>
              <footer className="mt-5 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                Parent of 6-year-old · Pimpri
              </footer>
            </blockquote>

            <blockquote className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-base leading-relaxed text-earth">
                  “The couple sessions helped us establish clear boundaries and de-escalate circular arguments without taking sides. Truly grateful for the neutral, compassionate space.”
                </p>
              </div>
              <footer className="mt-5 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                Couple Consultation · Swargate
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 8. FOR ORGANIZATIONS TEASER */}
      <section className="py-20 sm:py-28 border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-3xl bg-earth p-8 sm:p-14 text-primary-foreground relative overflow-hidden">
            <div className="relative max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-sage-soft">
                Corporate & Institutional
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold">
                For Organizations
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-primary-foreground/80">
                Corporate Wellness · Employee Support / EAP · Workshops & Training · Psychological Assessments · Custom Programs
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary" className="rounded-full px-7 font-semibold">
                  <Link to="/programs">Discuss Your Requirements</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 text-primary-foreground hover:bg-white/10">
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Desk
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-20 sm:py-28 text-center bg-sage-soft/30">
        <div className="mx-auto max-w-3xl px-5">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Start Here
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-earth">
            Ready to Take the First Step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            You don’t have to carry it alone. Book a session or start with a quick call. Transparent fees, compassionate listening, and verified hospital locations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 shadow-md"
              onClick={() => triggerBook()}
            >
              <CalendarCheck2 className="h-4 w-4 mr-2" /> Book a Session
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-background">
              <Link to="/first-session">What Happens in the First Session?</Link>
            </Button>
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultWho={bookingWho}
        defaultSupport={bookingSupport}
        defaultLocation={bookingLocation}
      />
    </>
  );
}