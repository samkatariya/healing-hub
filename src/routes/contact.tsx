import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, MapPin, CalendarCheck2, Video, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { contact, hospitalLocations } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Healing Emotions — Book, Call or Visit in Pune" },
      { name: "description", content: "Immediate contact actions: Book a session, WhatsApp, call a hospital location, or request an online consultation." },
      { property: "og:title", content: "Contact Healing Emotions" },
      { property: "og:description", content: "How would you like to connect? Fast, respectful, zero-friction support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  return (
    <>
      <PageIntro

        title="How would you like to connect?"
        description="Choose the easiest way for you to take the first step. You do not need to prepare clinical documents before reaching out."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-12">
          {/* 5 IMMEDIATE ACTIONS GRID */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* 1. BOOK A SESSION */}
            <div className="rounded-2xl border border-primary/50 bg-sage-soft/40 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-serif text-2xl text-earth">Reach Out</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Intelligent 4-step booking request. Pick who it is for, location, and your preferred time.
                </p>
              </div>
              <Button className="mt-6 rounded-full w-full" onClick={() => setBookingOpen(true)}>
                Book Online Now
              </Button>
            </div>

            {/* 2. WHATSAPP */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs hover:border-primary/50 transition-all">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-serif text-2xl text-earth">WhatsApp Healing Emotions</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Chat directly with our care coordinator to ask questions or verify immediate openings.
                </p>
              </div>
              <Button asChild className="mt-6 rounded-full w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  Open WhatsApp Chat
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="mt-3 w-full rounded-full"><a href={`tel:${contact.phone}`}><Phone className="mr-1 h-3.5 w-3.5" />{contact.phoneDisplay}</a></Button>
            </div>

            {/* 3. EMAIL */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs hover:border-primary/50 transition-all">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-soft text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-serif text-2xl text-earth">Email Inquiries</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  For administrative questions, official hospital letters, and institutional proposals.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-6 rounded-full w-full">
                <a href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </Button>
            </div>

            {/* 4. FIND A LOCATION */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-xs hover:border-primary/50 transition-all">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-soft text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-serif text-2xl text-earth">Find a Location</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Explore 8 partner hospital locations across Pune & PCMC with map links and phone contacts.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-6 rounded-full w-full">
                <Link to="/locations">
                  View All Locations <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* HOSPITAL CONTACT DIRECTORY */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-serif text-2xl text-earth">Partner Hospital Desk Contacts</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct hospital centres in Pune and PCMC:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hospitalLocations.map((h) => (
                <div key={h.id} className="rounded-xl border border-border/80 bg-sage-soft/30 p-3.5 text-xs">
                  <p className="font-semibold text-earth">{h.name}</p>
                  <p className="text-[11px] text-muted-foreground">{h.area}</p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <a href={`tel:${h.phone}`} className="font-medium text-primary hover:underline">
                      {h.phone}
                    </a>
                    <a href={h.mapsUrl} target="_blank" rel="noreferrer" className="text-[11px] text-muted-foreground underline">
                      Map
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultLocation={selectedLocation}
      />
    </>
  );
}