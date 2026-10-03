import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X, MessageCircle, Instagram, Linkedin, CalendarCheck2 } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/healing-logo.png";
import { contact } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Organizations", "/programs"],
  ["Journal", "/blog"],
  ["Contact", "/contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !open;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header
        className={`z-40 transition-colors duration-300 ${isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"
          } ${isTransparent
            ? "border-transparent bg-transparent"
            : "border-b border-border/70 bg-background/95 backdrop-blur-xl"
          }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8 relative">
          <Link to="/" className="flex items-center gap-3 shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none w-max" aria-label="Healing Emotions home">
            <img src={logo} alt="" className={`h-12 w-12 object-contain transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`} />
            <span className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-earth'}`}>Healing Emotions</span>
          </Link>

          <nav className="hidden items-center gap-6 xl:gap-7 lg:flex ml-auto" aria-label="Main navigation">
            {links.map(([label, to]) => {
              const isActive = pathname === to;
              let linkClass = "text-sm font-medium transition-colors duration-300 ";
              if (isTransparent) {
                linkClass += isActive ? "text-white font-semibold" : "text-white/80 hover:text-white";
              } else {
                linkClass += isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary";
              }
              return (
                <Link
                  key={to}
                  to={to}
                  className={linkClass}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 lg:hidden ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className={isTransparent ? "text-white hover:bg-white/20 hover:text-white" : ""}
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
                  className={`rounded-md px-3 py-3 text-base ${pathname === to ? "bg-sage-soft font-semibold text-primary" : "text-foreground hover:bg-muted"
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
                  <CalendarCheck2 className="h-4 w-4 mr-2" /> Reach Out
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

      <footer className="border-t border-border bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:grid-cols-2 md:grid-cols-5 lg:px-8 text-center sm:text-left">
          <div className="sm:col-span-2 flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <img src={logo} alt="" className="h-8 w-8 object-contain" />
              <span className="font-serif text-xl font-semibold text-earth">Healing Emotions</span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-primary font-medium">
              Integrated Emotional & Psychological Wellness Organisation
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground mx-auto sm:mx-0">
              Multiple professionals and approaches under one roof across 8 premier hospital locations in Pune & PCMC.
            </p>
            <div className="mt-6 flex items-center justify-center sm:justify-start gap-4 text-muted-foreground">
              <a href="https://www.instagram.com/healing_emotions_services/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/healing-emotions-services" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
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
              <Link to="/blog" className="hover:text-primary">The Journal</Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-earth">Direct Connect</h2>
            <div className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
              <a href={`tel:${contact.phone}`} className="hover:text-primary font-medium text-foreground">
                {contact.phoneDisplay}
              </a>
              <a href={`tel:${contact.phone2}`} className="hover:text-primary font-medium text-foreground">
                {contact.phone2Display}
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

        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center sm:items-start text-center sm:text-left gap-4 border-t border-border/50 px-5 pt-8 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 Healing Emotions. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5">
            <Link to="/first-session" className="hover:text-primary transition-colors">First Session</Link>
            <Link to="/fees" className="hover:text-primary transition-colors">Fees</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            <Link to="/auth" className="hover:text-primary transition-colors">Staff</Link>
          </div>
        </div>
      </footer>

      <BookingModal open={bookModalOpen} onOpenChange={setBookModalOpen} />
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <section className="bg-background py-16 sm:py-24 border-b border-border/50">
      <div className="mx-auto max-w-4xl px-5 text-center sm:text-left">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-earth sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl mx-auto sm:mx-0 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}