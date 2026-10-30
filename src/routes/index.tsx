import bgPeople from "@/assets/bg-people.jpg";
import bgTherapies from "@/assets/bg-therapies.jpg";
import { wellnessServices } from "@/lib/booking-config";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  contact,
  fallbackServices,
  hospitalLocations,
  whatBringsYouHereOptions,
  specialisedTherapiesList,
  professionalsList,
  HOSPITAL_PRIVACY_REASSURANCE,
  placeholderTestimonials,
} from "@/lib/site-data";
import heroWarmClinic from "@/assets/hero-warm-clinic.jpg";
import therapistPortrait from "@/assets/therapist-portrait.jpg";
import { BookingModal } from "@/components/booking-modal";
import { HomeJournal } from "@/components/home-journal";

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
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={heroWarmClinic}
          alt="A psychologist and client sharing a warm, reassuring conversation in a bright clinic room"
          className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
          width={1920}
          height={1152}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/95 via-earth/60 to-earth/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-earth/80 via-transparent to-transparent h-48" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 text-primary-foreground lg:px-8 lg:pb-32">
          <div className="max-w-3xl text-center sm:text-left mx-auto sm:mx-0 mt-4">
            <h1 className="font-serif text-5xl leading-[1.08] sm:text-6xl lg:text-7xl font-semibold text-balance mx-auto sm:mx-0 text-white drop-shadow-md">
              Emotions Are Everything.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/95 sm:text-xl font-light">
              Emotional & psychological wellness support for children, adults, families and senior citizens.
            </p>

            <div className="mt-8 flex items-center justify-center sm:justify-start gap-2 text-white text-sm font-medium bg-black/10 w-fit mx-auto sm:mx-0 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              <ShieldCheck className="h-4 w-4 text-white" />
              <span>Confidential, compassionate, licensed care.</span>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-6">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 bg-white text-earth hover:bg-gray-100 font-bold shadow-xl transition-all"
                onClick={() => triggerBook()}
              >
                <CalendarCheck2 className="h-4 w-4 mr-2" /> Reach Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT BRINGS YOU HERE? (MAIN FUNNEL) */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32 border-b border-border/50 bg-background">
        <img src={bgPeople} alt="" aria-hidden loading="lazy" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl text-center sm:text-left mx-auto sm:mx-0">
            <h2 className="font-serif text-3xl sm:text-5xl text-earth leading-[1.1]">
              What brings you here?
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-7 text-muted-foreground">
              Select the situation that best describes what you are experiencing. Each option connects you directly to the relevant support.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatBringsYouHereOptions.map((opt) => (
              <div key={opt.id} className="flex flex-col items-center text-center sm:items-start sm:text-left group cursor-pointer rounded-2xl shadow-sm hover:shadow-md border border-border/40 bg-card p-10 transition-colors hover:border-earth/30 active:opacity-70 active:duration-0" onClick={() => triggerBook(opt.category, opt.supportType)}>
                <span className="text-[11px] font-semibold text-primary uppercase tracking-widest group-hover:text-earth/80 transition-colors">
                  {opt.lead}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-earth">
                  {opt.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground flex-1">
                  {opt.desc}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    onClick={() => triggerBook(opt.category, opt.supportType)}
                    className="w-full sm:flex-1 font-semibold rounded-full active:opacity-70 transition-opacity"
                  >
                    Get Support
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:flex-1 rounded-full font-medium">
                    <Link to={opt.route}>
                      Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}

            {/* UNCERTAIN CARD -> SIMPLIFIED */}
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left rounded-2xl shadow-sm hover:shadow-md cursor-pointer border border-sage-soft/60 bg-sage-soft/20 p-10 transition-colors hover:bg-sage-soft/40 active:opacity-70 active:duration-0" onClick={() => triggerBook("Myself", "Quick 15-min Call (₹500)")}>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-widest">
                Guidance
              </span>
              <h3 className="mt-4 font-serif text-2xl text-earth">
                Request a call or message
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground flex-1">
                We will guide you to the right specialist. 15-minute guidance call — ₹500.
              </p>
              <div className="mt-8">
                <Button
                  onClick={() => triggerBook("Myself", "Quick 15-min Call (₹500)")}
                  className="w-full font-semibold rounded-full bg-earth text-white hover:bg-earth/90"
                >
                  Schedule 15-Min Call (₹500) <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WELLNESS SERVICES WE PROVIDE */}
      <section className="relative isolate overflow-hidden border-b border-border/50 py-24 sm:py-32">
        <img src={bgTherapies} alt="" aria-hidden loading="lazy" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/70 to-background/90" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Under one roof</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl text-earth leading-[1.1]">Wellness services we provide</h2>
            <p className="mt-5 text-base sm:text-lg leading-7 text-muted-foreground">Different therapies, one team. Here is what each one does and who it helps.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wellnessServices.map((w) => (
              <button key={w.title} type="button" onClick={() => triggerBook("", w.title)} className="flex flex-col rounded-2xl border border-border/60 bg-card/90 p-7 text-left backdrop-blur-sm transition-colors hover:border-primary">
                <h3 className="font-serif text-xl text-earth">{w.title}</h3>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-primary">For {w.forWhom}</p>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{w.how}</p>
                <p className="mt-4 text-xs text-muted-foreground">{w.modes}</p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-earth">Book <ArrowRight className="ml-1 h-4 w-4" /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO WE SUPPORT & ONE ROOF MULTIPLE APPROACHES */}
      <section className="bg-sage-soft/30 py-24 sm:py-32 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
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

          <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* CARD 1 */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="group cursor-pointer flex flex-col rounded-2xl bg-white border border-border/50 p-8 shadow-sm transition-all duration-500 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 text-center">
                  <div className="mx-auto bg-primary/10 group-hover:bg-blue-100/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                    <Users2 className="h-6 w-6 text-primary group-hover:text-blue-700/70 transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-earth">Cross-Discipline Care</h3>
                  <p className="mt-3 text-sm text-muted-foreground">Psychotherapy, child therapy, speech therapy, and occupational therapy...</p>
                  <span className="mt-6 text-xs font-medium text-primary uppercase tracking-widest flex items-center justify-center group-hover:text-blue-700/70 transition-colors">
                    Read More <ArrowRight className="ml-1.5 h-3 w-3" />
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-earth">Cross-Discipline Care</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground leading-7">
                  Psychotherapy, child therapy, speech therapy, and occupational therapy work hand-in-hand rather than in isolated clinics. We ensure your entire care team communicates seamlessly to provide holistic support for you or your family.
                </div>
              </DialogContent>
            </Dialog>

            {/* CARD 2 */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="group cursor-pointer flex flex-col rounded-2xl bg-white border border-border/50 p-8 shadow-sm transition-all duration-500 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 text-center">
                  <div className="mx-auto bg-primary/10 group-hover:bg-blue-100/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                    <Sparkles className="h-6 w-6 text-primary group-hover:text-blue-700/70 transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-earth">Allied Modalities</h3>
                  <p className="mt-3 text-sm text-muted-foreground">Art therapy, music therapy, dance & movement therapy, and reminiscence...</p>
                  <span className="mt-6 text-xs font-medium text-primary uppercase tracking-widest flex items-center justify-center group-hover:text-blue-700/70 transition-colors">
                    Read More <ArrowRight className="ml-1.5 h-3 w-3" />
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-earth">Creative & Somatic Modalities</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground leading-7">
                  Art therapy, music therapy, dance & movement therapy, and reminiscence therapy for deep non-verbal and sensory healing. Perfect for children, seniors, or adults who find traditional talk therapy restrictive.
                </div>
              </DialogContent>
            </Dialog>

            {/* CARD 3 */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="group cursor-pointer flex flex-col rounded-2xl bg-white border border-border/50 p-8 shadow-sm transition-all duration-500 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 text-center">
                  <div className="mx-auto bg-primary/10 group-hover:bg-blue-100/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                    <Compass className="h-6 w-6 text-primary group-hover:text-blue-700/70 transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-earth">No Confusing Jargon</h3>
                  <p className="mt-3 text-sm text-muted-foreground">We speak human to human. The focus is always on your goals, practical daily...</p>
                  <span className="mt-6 text-xs font-medium text-primary uppercase tracking-widest flex items-center justify-center group-hover:text-blue-700/70 transition-colors">
                    Read More <ArrowRight className="ml-1.5 h-3 w-3" />
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-earth">Practical & Grounded</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground leading-7">
                  We speak human to human. The focus is always on your goals, practical daily relief, and genuine emotional resilience. No confusing clinical jargon—just straightforward, empathetic care.
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-16 max-w-5xl mx-auto border-t border-border/60 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-serif text-xl text-earth">Specialised Therapies</p>
              <p className="text-sm text-muted-foreground mt-2">
                Speech Therapy · Occupational Therapy · Art Therapy · Music Therapy · Dance & Movement · Reminiscence
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full shrink-0">
              <Link to="/services">
                Explore Services <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. OUR PROFESSIONALS TEASER */}
      <section className="py-24 sm:py-32 border-b border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
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
            <Link to="/professionals" className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-center shrink-0">
              Meet All Professionals <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {professionalsList.slice(0, 4).map((p) => (
              <div key={p.role} className="flex flex-col items-center text-center sm:items-start sm:text-left border-t border-border/60 pt-8 group cursor-pointer transition-colors hover:border-earth/40 active:opacity-70 active:duration-0" onClick={() => triggerBook(undefined, p.role)}>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                    {p.role}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl text-earth">{p.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.specialisation}</p>
                </div>
                <div className="mt-8 flex-1 flex items-end justify-center sm:justify-start">
                  <button
                    onClick={(e) => { e.stopPropagation(); triggerBook(undefined, p.role); }}
                    className="text-sm font-medium group-hover:text-primary transition-colors flex items-center"
                  >
                    Connect with specialist <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
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
            <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                8 Hospital Centres in Pune & PCMC
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                Our Hospital Locations
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
                {HOSPITAL_PRIVACY_REASSURANCE} All visits are scheduled by appointment only.
              </p>
            </div>
            <Link to="/locations" className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-center shrink-0">
              View All Locations <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hospitalLocations.map((h) => (
              <div
                key={h.id}
                className="flex flex-col justify-between rounded-2xl shadow-xs bg-card border border-border/50 p-6 sm:p-7 transition-colors hover:border-earth/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {h.area}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-earth">{h.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {h.services.join(" · ")}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs">
                  <span className="text-muted-foreground font-medium">By appointment</span>
                  <a
                    href={h.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    Maps <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HEALING EMOTIONS IN ACTION (EXPERIENCES / GALLERY) */}
      <section className="py-24 sm:py-32 border-b border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
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
            <div className="group flex flex-col cursor-pointer">
              <div className="aspect-[4/3] bg-sage-soft group-hover:bg-blue-50 flex items-center justify-center p-6 text-center border border-border/50 group-hover:border-blue-200 transition-all duration-500">
                <span className="font-serif text-xl text-earth group-hover:text-blue-800 transition-colors duration-500 font-medium">Interactive Mental Health Workshops</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth group-hover:text-blue-700 transition-colors duration-500 tracking-wide">Workshops & Group Learning</p>
                <p className="text-sm text-muted-foreground mt-2">Corporate & student wellbeing sessions</p>
              </div>
            </div>

            <div className="group flex flex-col cursor-pointer">
              <div className="aspect-[4/3] bg-sage-soft group-hover:bg-blue-50 flex items-center justify-center p-6 text-center border border-border/50 group-hover:border-blue-200 transition-all duration-500">
                <span className="font-serif text-xl text-earth group-hover:text-blue-800 transition-colors duration-500 font-medium">Creative Art & Movement Sessions</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth group-hover:text-blue-700 transition-colors duration-500 tracking-wide">Therapy Activities</p>
                <p className="text-sm text-muted-foreground mt-2">Non-verbal emotional regulation</p>
              </div>
            </div>

            <div className="group flex flex-col cursor-pointer">
              <div className="aspect-[4/3] bg-sage-soft group-hover:bg-blue-50 flex items-center justify-center p-6 text-center border border-border/50 group-hover:border-blue-200 transition-all duration-500">
                <span className="font-serif text-xl text-earth group-hover:text-blue-800 transition-colors duration-500 font-medium">Senior Memory & Reminiscence Circles</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth group-hover:text-blue-700 transition-colors duration-500 tracking-wide">Dementia & Senior Care</p>
                <p className="text-sm text-muted-foreground mt-2">Gentle cognitive comfort groups</p>
              </div>
            </div>

            <div className="group flex flex-col cursor-pointer">
              <div className="aspect-[4/3] bg-sage-soft group-hover:bg-blue-50 flex items-center justify-center p-6 text-center border border-border/50 group-hover:border-blue-200 transition-all duration-500">
                <span className="font-serif text-xl text-earth group-hover:text-blue-800 transition-colors duration-500 font-medium">Sports Performance Mental Training</span>
              </div>
              <div className="mt-5">
                <p className="font-semibold text-sm text-earth group-hover:text-blue-700 transition-colors duration-500 tracking-wide">Athlete Conditioning</p>
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
            <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Client Reflections
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                What People Say
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground">
                Reflections from people who reached out, took the first step, and found support.
              </p>
            </div>
            <Link to="/testimonials" className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-center shrink-0">
              Read Experiences & Reviews <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {placeholderTestimonials.slice(0, 3).map((t) => (
              <blockquote
                key={t.id}
                className="flex flex-col justify-between rounded-2xl shadow-xs bg-card border border-border/50 p-8 sm:p-10 transition-colors hover:border-earth/30"
              >
                <p className="font-serif text-base sm:text-lg leading-relaxed text-earth italic">
                  “{t.quote}”
                </p>
                <footer className="mt-8 w-full pt-4 border-t border-border/40 text-sm font-medium text-earth">
                  {t.attribution}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOR ORGANIZATIONS TEASER */}
      <section className="py-24 sm:py-32 bg-blue-50/40 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 bg-white p-10 sm:p-16 rounded-2xl shadow-sm hover:shadow-md border border-blue-100  relative overflow-hidden group hover:border-blue-200 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none -mr-16 -mt-16 group-hover:scale-105 transition-transform duration-700">
              <Building2 className="w-96 h-96 text-blue-900" />
            </div>
            <div className="max-w-2xl relative z-10 text-center lg:text-left mx-auto lg:mx-0">
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
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10 mx-auto lg:mx-0">
              <Button asChild className="bg-primary hover:bg-blue-800 text-white rounded-full font-semibold h-12 px-6 transition-colors duration-300">
                <Link to="/programs">
                  Discuss Requirements <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-blue-200 text-blue-900 hover:bg-blue-50 rounded-full h-12 px-6">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Desk
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <HomeJournal />

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
            You don’t have to carry it alone. Reach out or start with a quick call. Transparent fees, compassionate listening, and verified hospital locations.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold active:opacity-70 transition-opacity"
              onClick={() => triggerBook()}
            >
              <CalendarCheck2 className="h-4 w-4 mr-2" /> Reach Out
            </Button>
            <Link to="/first-session" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
              What Happens in the First Session?
            </Link>
          </div>
          <div className="mt-20 mx-auto max-w-3xl bg-rose-50/50 border border-rose-200/60 rounded-2xl p-6 sm:p-8 text-left sm:text-center shadow-sm">
            <p className="text-[15px] sm:text-base leading-relaxed text-earth font-medium">
              Healing Emotions is not an emergency service. If you or someone else may be in immediate danger, contact local emergency services or a crisis helpline now.
            </p>
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