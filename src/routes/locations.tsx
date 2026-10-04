import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking-modal";
import { HospitalMap, directionsUrl } from "@/components/hospital-map";
import { hospitalsOptions } from "@/lib/content.queries";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Hospital Locations & Timings — Healing Emotions Pune" },
      { name: "description", content: "Healing Emotions centres across Pune & PCMC with maps, addresses, phone numbers and visiting hours for each hospital." },
      { property: "og:title", content: "Healing Emotions Hospital Locations in Pune" },
      { property: "og:description", content: "Find the nearest centre: map, address, phone and timings for every hospital." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(hospitalsOptions),
  errorComponent: () => <p className="p-10 text-center text-muted-foreground">Locations could not load. Please refresh.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Not found.</p>,
  component: LocationsPage,
});

function LocationsPage() {
  const { data: hospitals } = useSuspenseQuery(hospitalsOptions);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": hospitals.map((h) => ({
      "@type": "MedicalClinic",
      name: `Healing Emotions at ${h.name}`,
      address: { "@type": "PostalAddress", streetAddress: h.address, addressLocality: "Pune", addressCountry: "IN" },
      telephone: h.phone,
      openingHours: h.timings,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageIntro
        title="Our locations"
        description="Find the centre nearest to you. Each one shows its map, address, phone number and visiting hours."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-2 lg:px-8">
          {hospitals.map((h) => {
            const q = h.map_query || `${h.name} ${h.area}`;
            return (
              <article key={h.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
                <HospitalMap query={q} title={h.name} className="h-56" />
                <div className="space-y-3 p-6">
                  <h2 className="font-serif text-2xl text-earth">{h.name}</h2>
                  <p className="flex gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{h.address}</p>
                  <p className="flex gap-2 text-sm text-muted-foreground"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{h.timings}</p>
                  <a href={`tel:${h.phone.replace(/\s/g, "")}`} className="flex gap-2 text-sm text-muted-foreground hover:text-primary"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{h.phone}</a>
                  {h.services && <p className="text-xs text-muted-foreground">{h.services}</p>}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button size="sm" className="rounded-full" onClick={() => { setSelected(h.slug); setBookingOpen(true); }}>Book here</Button>
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <a href={directionsUrl(q)} target="_blank" rel="noreferrer"><Navigation className="mr-1.5 h-4 w-4" />Directions</a>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-border px-5 pt-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <h3 className="font-serif text-2xl text-earth">Prefer to meet online?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Video consultations with the same specialists, from anywhere.</p>
          </div>
          <Button variant="outline" className="rounded-full" onClick={() => { setSelected(""); setBookingOpen(true); }}>
            Book online <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} defaultLocation={selected} />
    </>
  );
}
