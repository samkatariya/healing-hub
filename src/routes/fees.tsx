import { createFileRoute } from "@tanstack/react-router";
import { Check, CalendarCheck2, ShieldAlert, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { feeDetails } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/fees")({
  head: () => ({
    meta: [
      { title: "Transparent Consultation & Assessment Fees — Healing Emotions" },
      { name: "description", content: "Clear, upfront fees for psychological consultations, child therapy, couple sessions, and assessments at Healing Emotions." },
      { property: "og:title", content: "Healing Emotions Fees" },
      { property: "og:description", content: "Transparent fees ranging from ₹500 onward for emotional and psychological healthcare." },
    ],
  }),
  component: FeesPage,
});

function FeesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<string>("");

  const handleBookFee = (title: string) => {
    setSelectedSupport(title);
    setBookingOpen(true);
  };

  return (
    <>
      <PageIntro

        title="Clear, upfront fees. No hidden costs."
        description="We believe in simple, transparent fee structures so you know exactly what to anticipate from your very first session."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 space-y-24">
          {/* CONSULTATION TABLE */}
          <div>
            <div className="border-b border-border/60 pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">01. Standard Consultations</span>
              <h2 className="mt-2 font-serif text-3xl text-earth">Therapy & Consultations</h2>
              <p className="text-sm text-muted-foreground mt-2">Available in-person at partner hospitals or online via video.</p>
            </div>

            <div className="mt-6 divide-y divide-border/50">
              {feeDetails.consultation.map((c) => (
                <div key={c.title} className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-earth text-base">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.note}</p>
                  </div>
                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <span className="font-serif text-2xl font-medium text-earth">{c.fee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ASSESSMENTS TABLE */}
          <div>
            <div className="border-b border-border/60 pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">02. Diagnostic & Developmental</span>
              <h2 className="mt-2 font-serif text-3xl text-earth">Psychological Assessments</h2>
              <p className="text-sm text-muted-foreground mt-2">Structured clinical and neurodevelopmental assessment protocols.</p>
            </div>

            <div className="mt-6 divide-y divide-border/50">
              {feeDetails.assessments.map((a) => (
                <div key={a.title} className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-earth text-base">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{a.note}</p>
                  </div>
                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <span className="font-serif text-2xl font-medium text-earth">{a.fee}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 text-sm leading-7 text-muted-foreground">
              <p><strong className="text-earth font-medium">Note:</strong> {feeDetails.assessmentNote}</p>
            </div>
          </div>

          {/* CTA BANNER */}
          <div className="border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">Ready to begin?</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                All fees listed above are standard across our practice. Book a full session or start with a quick 15-minute call (₹500) to find the right therapist.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 shrink-0 md:pt-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Reach Out <ArrowRight className="h-4 w-4 ml-1.5" />
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
