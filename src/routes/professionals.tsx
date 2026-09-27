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

        title="Meet Our Professionals"
        description="Healing Emotions unites accredited professionals from diverse psychological and allied therapeutic disciplines under one roof."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 space-y-16">
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {professionalsList.map((p) => (
              <div key={p.role} className={`flex flex-col items-center text-center sm:items-start sm:text-left border-t pt-6 group ${p.confirmed ? 'border-primary/50' : 'border-border/60'}`}>
                <div className="flex flex-col items-center sm:items-start w-full">
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                      {p.role}
                    </span>
                    {p.confirmed && (
                      <span className="text-[11px] font-semibold uppercase text-earth/80 tracking-wider">
                        Founder
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 font-serif text-2xl text-earth">{p.name}</h2>
                  <p className="mt-1 text-sm font-medium text-primary">{p.specialisation}</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{p.bio}</p>

                  <div className="mt-5 pt-4 border-t border-border/40 flex flex-col sm:flex-row items-center sm:items-start gap-1.5 text-sm text-muted-foreground w-full justify-center sm:justify-start">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5 hidden sm:block" />
                    <span>{p.locations}</span>
                  </div>
                </div>

                <div className="mt-8 flex-1 flex items-end justify-center sm:justify-start w-full">
                  <button
                    onClick={() => handleBookWithRole(p.role)}
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                  >
                    Request Consultation <ArrowRight className="h-4 w-4 ml-1.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between items-center text-center md:text-left gap-12">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Unsure who to see?
              </span>
              <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">Need Help Selecting the Right Specialist?</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                During the initial consultation, our clinical team evaluates your personal or family needs and connects you directly with the appropriate discipline.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:pt-10 shrink-0 items-center justify-center">
              <button
                onClick={() => setBookingOpen(true)}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Request Initial Consultation <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
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
