import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X, MessageCircle, Instagram, Linkedin, CalendarCheck2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/healing-emotions-logo.png.asset.json";
import { contact } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

const links = [
  ["Home", "/"],
  ["What Brings You Here?", "/what-brings-you-here"],
  ["Services", "/services"],
  ["Locations", "/locations"],
  ["About", "/about"],
  ["For Organizations", "/programs"],
  ["Contact", "/contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Healing Emotions home">
            <img src={logo.url} alt="" className="h-10 w-10 object-contain" />
            <span className="font-serif text-xl font-semibold text-earth">Healing Emotions</span>
          </Link>

          <nav className="hidden items-center gap-6 xl:gap-7 lg:flex" aria-label="Main navigation">
            {links.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === to ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              onClick={() => setBookModalOpen(true)}
              className="rounded-full px-5 shadow-sm font-medium"
            >
              <CalendarCheck2 className="h-4 w-4 mr-1.5" /> Book a Session
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              size="sm"
              onClick={() => setBookModalOpen(true)}
              className="rounded-full px-3.5 text-xs"
            >
              Book
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl gap-1">
              {links.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-base ${
                    pathname === to ? "bg-sage-soft font-semibold text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2 grid gap-2">
                <Button
                  onClick={() => {
                    setOpen(false);
                    setBookModalOpen(true);
                  }}
                  className="w-full rounded-full"
                >
                  <CalendarCheck2 className="h-4 w-4 mr-2" /> Book a Session
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Directly
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-muted/60 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 md:grid-cols-5 lg:px-8">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="" className="h-10 w-10 object-contain" />
              <span className="font-serif text-2xl font-semibold text-earth">Healing Emotions</span>
            </div>
            <p className="mt-3 text-xs uppercase tracking-wider text-primary font-semibold">
              Integrated Emotional & Psychological Wellness Organisation
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Multiple professionals and approaches under one roof across 8 premier hospital locations in Pune & PCMC.
            </p>
            <div className="mt-5 flex gap-2">
              <Button asChild variant="outline" size="icon" className="h-9 w-9">
                <a href="https://www.instagram.com/healing_emotions_services/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" className="h-9 w-9">
                <a href="https://www.linkedin.com/company/healing-emotions-services" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-earth">Find Support</h2>
            <div className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <Link to="/what-brings-you-here" className="hover:text-primary">What Brings You Here?</Link>
              <Link to="/services" className="hover:text-primary">Services & Therapies</Link>
              <Link to="/first-session" className="hover:text-primary">The First Session</Link>
              <Link to="/fees" className="hover:text-primary">Transparent Fees</Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-earth">Organisation</h2>
            <div className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary">About Us</Link>
              <Link to="/professionals" className="hover:text-primary">Our Professionals</Link>
              <Link to="/locations" className="hover:text-primary">Hospital Locations</Link>
              <Link to="/programs" className="hover:text-primary">For Organizations</Link>
              <Link to="/testimonials" className="hover:text-primary">Client Experiences</Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-earth">Direct Connect</h2>
            <div className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <a href={`tel:${contact.phone}`} className="hover:text-primary font-medium text-foreground">
                {contact.phoneDisplay}
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-primary">
                WhatsApp Practice Desk
              </a>
              <a href={`mailto:${contact.email}`} className="hover:text-primary break-all">
                {contact.email}
              </a>
              <span className="text-xs text-muted-foreground pt-1">
                Pune & PCMC, Maharashtra
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-border px-5 pt-8 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 Healing Emotions. All rights reserved.</span>
          <div className="flex flex-wrap gap-5">
            <Link to="/first-session" className="hover:text-primary">First Session</Link>
            <Link to="/fees" className="hover:text-primary">Fees</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link>
            <Link to="/auth" className="hover:text-primary">Staff</Link>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 sm:bottom-6 sm:right-6">
        <Button
          onClick={() => setBookModalOpen(true)}
          className="rounded-full shadow-xl h-12 px-5 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <CalendarCheck2 className="h-5 w-5" />
          <span className="hidden sm:inline font-semibold">Book a Session</span>
          <span className="sm:hidden font-semibold">Book</span>
        </Button>
        <Button asChild variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background shadow-xl border-border">
          <a href={`tel:${contact.phone}`} aria-label="Call Healing Emotions">
            <Phone className="h-5 w-5 text-primary" />
          </a>
        </Button>
        <Button asChild size="icon" className="h-12 w-12 rounded-full shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white">
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
            <MessageCircle className="h-5 w-5" />
          </a>
        </Button>
      </div>

      <BookingModal open={bookModalOpen} onOpenChange={setBookModalOpen} />
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="bg-sage-soft py-16 sm:py-24 border-b border-border/50">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-earth sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}