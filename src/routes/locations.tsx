import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, ExternalLink, CalendarCheck2, ShieldCheck, Check } from "lucide-react";
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
        eyebrow="Pune & PCMC Presence"
        title="Find a Healing Emotions Location"
        description="We partner with established hospitals across Pune so you can access professional, multidisciplinary emotional healthcare close to your neighbourhood."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hospitalLocations.map((loc) => (
              <div
                key={loc.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/60 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{loc.area}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-2xl text-earth">{loc.name}</h2>

                  <div className="mt-4 pt-4 border-t border-border/70 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Available Support at this Centre:
                    </p>
                    <ul className="space-y-1 text-xs text-foreground/80">
                      {loc.services.map((svc) => (
                        <li key={svc} className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-primary shrink-0" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 space-y-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 rounded-full text-xs"
                      onClick={() => handleBookLocation(loc.name)}
                    >
                      <CalendarCheck2 className="h-3.5 w-3.5 mr-1" /> Book Here
                    </Button>
                    <Button asChild size="sm" variant="outline" className="rounded-full text-xs">
                      <a href={loc.mapsUrl} target="_blank" rel="noreferrer" aria-label="Google Maps directions">
                        <ExternalLink className="h-3.5 w-3.5 mr-1" /> Maps
                      </a>
                    </Button>
                  </div>
                  <Button asChild size="sm" variant="ghost" className="w-full text-xs text-muted-foreground justify-center">
                    <a href={`tel:${loc.phone}`}>
                      <Phone className="h-3.5 w-3.5 mr-1.5 text-primary" /> Hospital Desk: {loc.phone}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-sage-soft/60 p-8 text-center sm:p-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-earth">Need Online Consultation Instead?</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              If travelling is difficult or you are located outside Pune, secure online video consultations are available with the same multidisciplinary specialists.
            </p>
            <div className="mt-5 flex justify-center">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => {
                  setSelectedLoc("Online Consultation");
                  setBookingOpen(true);
                }}
              >
                Book Online Consultation
              </Button>
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
