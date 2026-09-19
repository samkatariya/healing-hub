import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X, MessageCircle, Instagram, Linkedin } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/healing-emotions-logo.png.asset.json";
import { contact } from "@/lib/site-data";

const links = [
  ["Services", "/services"], ["Programs", "/programs"], ["About", "/about"],
  ["Testimonials", "/testimonials"], ["Journal", "/blog"], ["FAQs", "/faqs"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Healing Emotions home">
          <img src={logo.url} alt="" className="h-10 w-10 object-contain" />
          <span className="font-serif text-xl font-semibold text-earth">Healing Emotions</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, to]) => <Link key={to} to={to} className={`text-sm transition-colors hover:text-primary ${pathname === to ? "text-primary" : "text-muted-foreground"}`}>{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a href={`tel:${contact.phone}`} className="hidden text-sm font-semibold text-earth xl:inline">{contact.phoneDisplay}</a>
          <Button asChild className="h-11 rounded-full px-5"><a href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-7xl gap-1">{links.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base hover:bg-muted">{label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base hover:bg-muted">Contact</Link></div>
      </nav>}
    </header>
    <main>{children}</main>
    <footer className="border-t border-border bg-muted/60 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2"><div className="flex items-center gap-3"><img src={logo.url} alt="" className="h-11 w-11 object-contain"/><span className="font-serif text-2xl font-semibold text-earth">Healing Emotions</span></div><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Accessible, human mental-health support for individuals, families, teams, and communities in Pune and beyond.</p><div className="mt-6 flex gap-2"><Button asChild variant="outline" size="icon"><a href="https://www.instagram.com/healing_emotions_services/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a></Button><Button asChild variant="outline" size="icon"><a href="https://www.linkedin.com/company/healing-emotions-services" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a></Button></div></div>
        <div><h2 className="text-sm font-semibold">Explore</h2><div className="mt-4 grid gap-3 text-sm text-muted-foreground"><Link to="/services">Services</Link><Link to="/programs">Programs</Link><Link to="/blog">Journal</Link><Link to="/contact">Contact</Link></div></div>
        <div><h2 className="text-sm font-semibold">Contact</h2><div className="mt-4 grid gap-3 text-sm text-muted-foreground"><a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><span>Pune, Maharashtra</span></div></div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-border px-5 pt-8 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8"><span>© 2026 Healing Emotions. All rights reserved.</span><div className="flex flex-wrap gap-5"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/disclaimer">Disclaimer</Link><Link to="/auth">Admin</Link></div></div>
    </footer>
    <div className="fixed bottom-4 right-4 z-30 flex gap-2 sm:bottom-6 sm:right-6"><Button asChild variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background shadow-lg"><a href={`tel:${contact.phone}`} aria-label="Call Healing Emotions"><Phone /></a></Button><Button asChild size="icon" className="h-12 w-12 rounded-full shadow-lg"><a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle /></a></Button></div>
  </div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="bg-sage-soft py-20 sm:py-28"><div className="mx-auto max-w-4xl px-5 text-center"><p className="text-xs font-semibold uppercase text-primary">{eyebrow}</p><h1 className="mt-5 font-serif text-4xl leading-tight text-earth sm:text-6xl">{title}</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p></div></section>;
}