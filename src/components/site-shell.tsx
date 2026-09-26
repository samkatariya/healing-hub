import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Instagram, Linkedin, CalendarCheck2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/healing-emotions-logo.png";
import { contact } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

const links = [
  ["Home", "/"], ["Find Support", "/what-brings-you-here"], ["Services", "/services"],
  ["Locations", "/locations"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return <div className="flex min-h-screen flex-col bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Healing Emotions home">
          <img src={logo} alt="" className="h-12 w-12 object-contain" />
          <span className="font-serif text-base font-bold text-earth sm:text-lg">Healing Emotions</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-8" aria-label="Main navigation">
          {links.map(([label, to]) => <Link key={to} to={to} className={`text-sm font-medium transition-colors hover:text-primary ${pathname === to ? "text-primary" : "text-muted-foreground"}`}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={() => setBookModalOpen(true)} size="sm" className="shrink-0 gap-1.5"><CalendarCheck2 className="h-4 w-4" /><span className="hidden sm:inline">Book a session</span><span className="sm:hidden">Book</span></Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="lg:hidden">{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-7xl gap-1">
        {links.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`rounded-md px-3 py-3 text-base ${pathname === to ? "bg-sage-soft font-semibold text-primary" : "text-foreground hover:bg-muted"}`}>{label}</Link>)}
        <Link to="/programs" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base text-foreground hover:bg-muted">For organizations</Link>
      </div></nav>}
    </header>
    <main className="flex-1">{children}</main>
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div><div className="flex items-center gap-2"><img src={logo} alt="" className="h-10 w-10 object-contain" /><span className="font-serif text-base font-bold text-earth">Healing Emotions</span></div><p className="mt-4 text-sm leading-6 text-muted-foreground">Emotional and psychological support in Pune & PCMC.</p><div className="mt-5 flex gap-4"><a href="https://www.instagram.com/healing_emotions_services/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram className="h-4 w-4" /></a><a href="https://www.linkedin.com/company/healing-emotions-services" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin className="h-4 w-4" /></a></div></div>
        <div><h2 className="text-sm font-semibold text-earth">Explore</h2><div className="mt-4 grid gap-2.5 text-sm text-muted-foreground"><Link to="/what-brings-you-here" className="hover:text-primary">Find support</Link><Link to="/services" className="hover:text-primary">Services</Link><Link to="/first-session" className="hover:text-primary">First session</Link><Link to="/fees" className="hover:text-primary">Fees</Link><Link to="/blog" className="hover:text-primary">Journal</Link></div></div>
        <div><h2 className="text-sm font-semibold text-earth">Healing Emotions</h2><div className="mt-4 grid gap-2.5 text-sm text-muted-foreground"><Link to="/about" className="hover:text-primary">About</Link><Link to="/professionals" className="hover:text-primary">Professionals</Link><Link to="/locations" className="hover:text-primary">Locations</Link><Link to="/programs" className="hover:text-primary">For organizations</Link><Link to="/faqs" className="hover:text-primary">Questions</Link><Link to="/testimonials" className="hover:text-primary">Client experiences</Link></div></div>
        <div><h2 className="text-sm font-semibold text-earth">Contact</h2><div className="mt-4 grid gap-2.5 text-sm text-muted-foreground"><a href={`tel:${contact.phone}`} className="hover:text-primary">{contact.phoneDisplay}</a><a href={`mailto:${contact.email}`} className="break-all hover:text-primary">{contact.email}</a><Link to="/contact" className="hover:text-primary">All contact options</Link></div></div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-4 border-t border-border px-5 pt-7 text-xs text-muted-foreground lg:px-8"><span>© 2026 Healing Emotions</span><div className="flex flex-wrap gap-5"><Link to="/privacy" className="hover:text-primary">Privacy</Link><Link to="/terms" className="hover:text-primary">Terms</Link><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link><Link to="/auth" className="hover:text-primary">Staff</Link></div></div>
    </footer>
    <BookingModal open={bookModalOpen} onOpenChange={setBookModalOpen} />
  </div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="border-b border-border bg-background py-14 sm:py-20"><div className="mx-auto max-w-4xl px-5"><p className="text-sm font-medium text-primary">{eyebrow}</p><h1 className="mt-3 font-serif text-3xl leading-tight text-earth sm:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p></div></section>;
}
