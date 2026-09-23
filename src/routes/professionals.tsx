import { createFileRoute } from "@tanstack/react-router";
import { User, MapPin, CalendarCheck2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { professionalsList } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/professionals")({
  head: () => ({
    meta: [
      { title: "Our Professionals & Specialists — Healing Emotions" },
      { name: "description", content: "Meet the multidisciplinary team at Healing Emotions: psychologists, psychotherapists, child therapists, speech, OT, art, music, dance and reminiscence therapists." },
      { property: "og:title", content: "Our Professionals — Healing Emotions" },
      { property: "og:description", content: "One roof. Multiple licensed disciplines and specialised approaches." },
    ],
  }),
  component: ProfessionalsPage,
});

function ProfessionalsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<string>("");

  const handleBookWithRole = (role: string) => {
    setSelectedSupport(role);
    setBookingOpen(true);
  };

  return (
    <>
      <PageIntro
        eyebrow="Multidisciplinary Team"
        title="Meet Our Professionals"
        description="Healing Emotions unites accredited professionals from diverse psychological and allied therapeutic disciplines under one roof."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {professionalsList.map((p) => (
              <div
                key={p.role}
                className={`flex flex-col justify-between rounded-2xl border p-6 shadow-xs transition-all ${
                  p.confirmed ? "border-primary/50 bg-sage-soft/30 ring-1 ring-primary/20" : "border-border bg-card"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-primary">
                      {p.role}
                    </span>
                    {p.confirmed && (
                      <span className="text-[11px] font-semibold uppercase text-earth/80 tracking-wider">
                        Founder
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 font-serif text-2xl text-earth">{p.name}</h2>
                  <p className="mt-1 text-xs font-medium text-primary">{p.specialisation}</p>

                  <p className="mt-4 text-xs leading-5 text-muted-foreground">{p.bio}</p>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-start gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{p.locations}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <Button
                    size="sm"
                    className="w-full rounded-full text-xs"
                    onClick={() => handleBookWithRole(p.role)}
                  >
                    <CalendarCheck2 className="h-3.5 w-3.5 mr-1" /> Book Consultation
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-sage-soft/60 p-8 text-center sm:p-12 border border-border/60">
            <h3 className="font-serif text-2xl sm:text-3xl text-earth">Need Help Selecting the Right Specialist?</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              During the initial consultation, our clinical team evaluates your personal or family needs and connects you directly with the appropriate discipline.
            </p>
            <div className="mt-6 flex justify-center">
              <Button size="lg" className="rounded-full px-8 shadow-sm" onClick={() => setBookingOpen(true)}>
                Book an Initial Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultSupport={selectedSupport}
      />
    </>
  );
}
