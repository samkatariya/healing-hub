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
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-earth py-20 sm:py-28">
        <div className="relative mx-auto w-full max-w-7xl px-5 text-primary-foreground lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
              Healing Emotions
            </span>
            <h1 className="mt-4 font-serif text-5xl leading-[1.08] sm:text-6xl lg:text-7xl font-semibold">
              Emotions Are Everything.
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/80 sm:text-xl font-light">
              Emotional & psychological wellness support for children, adults, families and senior citizens.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button
                size="lg"
                className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={() => triggerBook()}
              >
                <CalendarCheck2 className="h-4 w-4 mr-2" /> Book a Session
              </Button>
              <Link to="/what-brings-you-here" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
                What Brings You Here? <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT BRINGS YOU HERE? (MAIN FUNNEL) */}
      <section className="py-24 sm:py-32 border-b border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Main Guided Funnel
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl text-earth leading-[1.1]">
              What brings you here?
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-7 text-muted-foreground">
              Select the situation that best describes what you are experiencing. Each option connects you directly to the relevant support.
            </p>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {whatBringsYouHereOptions.map((opt) => (
              <div key={opt.id} className="flex flex-col group">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  {opt.lead}
                </span>
                <h3 className="mt-3 font-serif text-2xl text-earth group-hover:text-primary transition-colors">
                  {opt.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground flex-1">
                  {opt.desc}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={() => triggerBook(opt.category, opt.supportType)}
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                  >
                    Book session
                  </button>
                  <span className="text-border">|</span>
                  <Link to={opt.route} className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                    Details
                  </Link>
                </div>
              </div>
            ))}

            {/* UNCERTAIN CARD -> SIMPLIFIED */}
            <div className="flex flex-col pt-8 sm:pt-0 sm:pl-8 sm:border-l border-border/50">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                Need Clarity?
              </span>
              <h3 className="mt-3 font-serif text-2xl text-earth">
                Unsure what you need?
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground flex-1">
                Start with a 15-minute quick guidance call (₹500) to clarify which specialist or therapy fits best.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => triggerBook("Myself", "Quick 15-min Call (₹500)")}
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                >
                  Book 15-Min Call (₹500) <ArrowRight className="h-4 w-4 ml-1.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO WE SUPPORT & ONE ROOF MULTIPLE APPROACHES */}
      <section className="bg-sage-soft/30 py-24 sm:py-32 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Core Approach
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl text-earth leading-[1.1]">
              One Roof. Multiple Approaches.
            </h2>
            <div className="mt-6 font-serif text-xl sm:text-2xl text-earth font-medium leading-relaxed">
              Every person is different. <span className="text-primary">The right support depends on the person, not just the problem.</span>
            </div>
            <p className="mt-6 text-sm sm:text-base leading-7 text-muted-foreground">
              Healing Emotions brings together different professionals and therapeutic approaches to provide personalised support—all coordinated under one integrated organisation.
            </p>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
            <div className="flex flex-col border-t border-border/60 pt-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">01. Multidisciplinary</span>
              <h3 className="mt-3 font-serif text-2xl text-earth">Cross-Discipline Care</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Psychotherapy, child therapy, speech therapy, and occupational therapy work hand-in-hand rather than in isolated clinics.
              </p>
            </div>

            <div className="flex flex-col border-t border-border/60 pt-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">02. Creative & Somatic</span>
              <h3 className="mt-3 font-serif text-2xl text-earth">Allied Modalities</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Art therapy, music therapy, dance & movement therapy, and reminiscence therapy for deep non-verbal and sensory healing.
              </p>
            </div>

            <div className="flex flex-col border-t border-border/60 pt-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">03. Practical & Grounded</span>
              <h3 className="mt-3 font-serif text-2xl text-earth">No Confusing Jargon</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                We speak human to human. The focus is always on your goals, practical daily relief, and genuine emotional resilience.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-border/60 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-serif text-2xl text-earth">Specialised Therapies:</p>
              <p className="text-sm text-muted-foreground mt-2">
                Speech Therapy · Occupational Therapy · Art Therapy · Music Therapy · Dance & Movement · Reminiscence
              </p>
            </div>
            <Link to="/services" className="text-sm font-medium hover:text-primary transition-colors flex items-center shrink-0">
              Explore Services <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. OUR PROFESSIONALS TEASER */}
      <section className="py-24 sm:py-32 border-b border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Experienced Team
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                Our Professionals
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
                Accredited specialists working together across Pune partner hospitals.
              </p>
            </div>
            <Link to="/professionals" className="text-sm font-medium hover:text-primary transition-colors flex items-center shrink-0">
              Meet All Professionals <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {professionalsList.slice(0, 4).map((p) => (
              <div key={p.role} className="flex flex-col border-t border-border/60 pt-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                    {p.role}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl text-earth">{p.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.specialisation}</p>
                </div>
                <div className="mt-6 flex-1 flex items-end">
                  <button
                    onClick={() => triggerBook(undefined, p.role)}
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                  >
                    Book with specialist <ArrowRight className="h-4 w-4 ml-1.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATIONS TEASER */}
      <section className="bg-sage-soft/30 py-24 sm:py-32 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                8 Hospital Centres in Pune & PCMC
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                Find a Healing Emotions Location
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
                Integrated clinical spaces inside reputable hospitals across Pune neighbourhoods.
              </p>
            </div>
            <Link to="/locations" className="text-sm font-medium hover:text-primary transition-colors flex items-center shrink-0">
              View All Locations <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {hospitalLocations.slice(0, 4).map((h) => (
              <div key={h.id} className="flex flex-col border-t border-border/60 pt-6">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    <MapPin className="h-3 w-3" />
                    <span>{h.area}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-earth">{h.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {h.services.join(" · ")}
                  </p>
                </div>
                <div className="mt-6 flex-1 flex flex-col justify-end gap-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => triggerBook(undefined, undefined, h.name)}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Book here
                    </button>
                    <span className="text-border">|</span>
                    <a href={h.mapsUrl} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                      Maps <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HEALING EMOTIONS IN ACTION (EXPERIENCES / GALLERY) */}
      <section className="py-24 sm:py-32 border-b border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Community & Practice
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
              Healing Emotions in Action
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
              Workshops, interactive therapy activities, corporate sessions, and community programs in Pune.
            </p>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group flex flex-col">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center border border-border/50">
                <span className="font-serif text-xl text-earth font-medium">Interactive Mental Health Workshops</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth tracking-wide">Workshops & Group Learning</p>
                <p className="text-sm text-muted-foreground mt-2">Corporate & student wellbeing sessions</p>
              </div>
            </div>

            <div className="group flex flex-col">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center border border-border/50">
                <span className="font-serif text-xl text-earth font-medium">Creative Art & Movement Sessions</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth tracking-wide">Therapy Activities</p>
                <p className="text-sm text-muted-foreground mt-2">Non-verbal emotional regulation</p>
              </div>
            </div>

            <div className="group flex flex-col">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center border border-border/50">
                <span className="font-serif text-xl text-earth font-medium">Senior Memory & Reminiscence Circles</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth tracking-wide">Dementia & Senior Care</p>
                <p className="text-sm text-muted-foreground mt-2">Gentle cognitive comfort groups</p>
              </div>
            </div>

            <div className="group flex flex-col">
              <div className="aspect-[4/3] bg-sage-soft flex items-center justify-center p-6 text-center border border-border/50">
                <span className="font-serif text-xl text-earth font-medium">Sports Performance Mental Training</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth tracking-wide">Athlete Conditioning</p>
                <p className="text-sm text-muted-foreground mt-2">Focus, composure & tournament mindset</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT PEOPLE SAY (CLIENT EXPERIENCES TEASER) */}
      <section className="bg-sage-soft/30 py-24 sm:py-32 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Genuine Feedback
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                What People Say
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
                Reflections shared with consent by clients and families supported through Healing Emotions.
              </p>
            </div>
            <Link to="/testimonials" className="text-sm font-medium hover:text-primary transition-colors flex items-center shrink-0">
              Read Experiences & Reviews <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-3">
            <blockquote className="flex flex-col">
              <div className="flex text-amber-500 mb-5 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-lg sm:text-xl leading-relaxed text-earth italic">
                “Reaching out was the hardest part, but the conversation felt completely respectful and human. There was zero pressure to fit into a clinical diagnosis.”
              </p>
              <footer className="mt-6 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                Adult Therapy Client · Shivajinagar
              </footer>
            </blockquote>

            <blockquote className="flex flex-col">
              <div className="flex text-amber-500 mb-5 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-lg sm:text-xl leading-relaxed text-earth italic">
                “Our child’s speech and sensory integration improved steadily because the psychologist and occupational therapist actually communicated with each other.”
              </p>
              <footer className="mt-6 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                Parent of 6-year-old · Pimpri
              </footer>
            </blockquote>

            <blockquote className="flex flex-col">
              <div className="flex text-amber-500 mb-5 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-lg sm:text-xl leading-relaxed text-earth italic">
                “The couple sessions helped us establish clear boundaries and de-escalate circular arguments without taking sides. Truly grateful for the neutral, compassionate space.”
              </p>
              <footer className="mt-6 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                Couple Consultation · Swargate
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 8. FOR ORGANIZATIONS TEASER */}
      <section className="py-24 sm:py-32 border-b border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Corporate & Institutional
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl text-earth leading-[1.1]">
                For Organizations
              </h2>
              <p className="mt-6 text-sm sm:text-base leading-7 text-muted-foreground">
                Corporate Wellness · Employee Support / EAP · Workshops & Training · Psychological Assessments · Custom Programs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:pt-10">
              <Link to="/programs" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
                Discuss Requirements <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                <MessageCircle className="h-4 w-4 mr-1.5" /> WhatsApp Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-24 sm:py-32 text-center bg-background">
        <div className="mx-auto max-w-3xl px-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Start Here
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-earth leading-[1.1]">
            Ready to take the first step?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            You don’t have to carry it alone. Book a session or start with a quick call. Transparent fees, compassionate listening, and verified hospital locations.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              onClick={() => triggerBook()}
            >
              <CalendarCheck2 className="h-4 w-4 mr-2" /> Book a Session
            </Button>
            <Link to="/first-session" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
              What Happens in the First Session?
            </Link>
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