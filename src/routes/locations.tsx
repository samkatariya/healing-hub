import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, ExternalLink, CalendarCheck2, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { hospitalLocations, contact } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations — Find a Healing Emotions Hospital | Pune & PCMC" },
      { name: "description", content: "Visit Healing Emotions across 8 hospital locations in Pune: Shivajinagar, Pimpri, Wakad, Kasba Peth, Swargate, Bavdhan, and Pashan." },
      { property: "og:title", content: "Healing Emotions Hospital Locations" },
      { property: "og:description", content: "Hospital name + location + hospital contact + Maps + relevant service availability." },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState<string>("");

  const handleBookLocation = (locName: string) => {
    setSelectedLoc(locName);
    setBookingOpen(true);
  };

  return (
    <>
      <PageIntro

        title="Find a Healing Emotions Location"
        description="We partner with established hospitals across Pune so you can access professional, multidisciplinary emotional healthcare close to your neighbourhood."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 space-y-16">
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {hospitalLocations.map((loc) => (
              <div key={loc.id} className="flex flex-col border-t border-border/60 pt-6 group">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    <MapPin className="h-3 w-3" />
                    <span>{loc.area}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-2xl text-earth group-hover:text-primary transition-colors">{loc.name}</h2>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Available Support:
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {loc.services.join(" · ")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleBookLocation(loc.name)}
                      className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                    >
                      Connect at this location
                    </button>
                    <span className="text-border">|</span>
                    <a href={loc.mapsUrl} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                      Directions <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </div>
                  <a href={`tel:${loc.phone}`} className="text-sm hover:text-primary transition-colors flex items-center text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 mr-1.5 text-primary" /> Desk: {loc.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Online Access
              </span>
              <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                Need Online Consultation Instead?
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                If travelling is difficult or you are located outside Pune, secure online video consultations are available with the same multidisciplinary specialists.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:pt-10 shrink-0">
              <button
                onClick={() => {
                  setSelectedLoc("Online Consultation");
                  setBookingOpen(true);
                }}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Schedule Online Consultation <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultLocation={selectedLoc}
      />
    </>
  );
}
