import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Healing Emotions — Pune" }, { name: "description", content: "Book a session or contact Healing Emotions by phone, WhatsApp, or email. Find our Pune locations." },
    { property: "og:title", content: "Contact Healing Emotions" }, { property: "og:description", content: "Choose the easiest way to get in touch." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component: ContactPage,
});

function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return <><PageIntro eyebrow="Contact" title="Get in touch" description="Choose whatever feels easiest. We’re here to help you find a place to start." />
    <section className="py-16 sm:py-24"><div className="mx-auto max-w-4xl px-5 lg:px-8">
      <div className="grid gap-12 sm:grid-cols-2">
        <div className="border-t border-border pt-6"><h2 className="font-serif text-2xl text-earth">Book a session</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Tell us who the support is for and where you’d prefer to meet.</p><Button className="mt-6" onClick={() => setBookingOpen(true)}>Start a booking request <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
        <div className="border-t border-border pt-6"><h2 className="font-serif text-2xl text-earth">Speak with us</h2><div className="mt-5 grid gap-4 text-sm"><a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-primary hover:underline"><Phone className="h-4 w-4" />{contact.phoneDisplay}</a><a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary hover:underline"><MessageCircle className="h-4 w-4" />WhatsApp</a><a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all text-primary hover:underline"><Mail className="h-4 w-4 shrink-0" />{contact.email}</a></div></div>
      </div>
      <div className="mt-16 border-t border-border pt-7"><h2 className="font-serif text-2xl text-earth">Prefer to visit?</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">See the locations and directions for our Pune & PCMC centres.</p><Link to="/locations" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">Explore locations <ArrowRight className="h-4 w-4" /></Link></div>
    </div></section><BookingModal open={bookingOpen} onOpenChange={setBookingOpen} /></>;
}
