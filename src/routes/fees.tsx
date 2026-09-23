import { createFileRoute } from "@tanstack/react-router";
import { Check, CalendarCheck2, ShieldAlert } from "lucide-react";
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
        eyebrow="Financial Transparency"
        title="Clear, upfront fees. No hidden costs."
        description="We believe in simple, transparent fee structures so you know exactly what to anticipate from your very first session."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 space-y-12">
          {/* CONSULTATION TABLE */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">01. Standard Consultations</span>
              <h2 className="mt-1 font-serif text-2xl text-earth">Therapy & Consultations</h2>
              <p className="text-xs text-muted-foreground mt-1">Available in-person at partner hospitals or online via video.</p>
            </div>

            <div className="mt-6 divide-y divide-border/70">
              {feeDetails.consultation.map((c) => (
                <div key={c.title} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-earth text-base">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.note}</p>
                  </div>
                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <span className="font-serif text-2xl font-bold text-earth">{c.fee}</span>
                    <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => handleBookFee(c.title)}>
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ASSESSMENTS TABLE */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">02. Diagnostic & Developmental</span>
              <h2 className="mt-1 font-serif text-2xl text-earth">Psychological Assessments</h2>
              <p className="text-xs text-muted-foreground mt-1">Structured clinical and neurodevelopmental assessment protocols.</p>
            </div>

            <div className="mt-6 divide-y divide-border/70">
              {feeDetails.assessments.map((a) => (
                <div key={a.title} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-earth text-base">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.note}</p>
                  </div>
                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <span className="font-serif text-2xl font-bold text-earth">{a.fee}</span>
                    <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => handleBookFee(a.title)}>
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-muted/60 p-4 text-xs leading-6 text-muted-foreground">
              <p><strong>Note:</strong> {feeDetails.assessmentNote}</p>
            </div>
          </div>

          {/* CTA BANNER */}
          <div className="rounded-2xl bg-sage-soft p-8 text-center sm:p-10 border border-border/70">
            <h3 className="font-serif text-2xl text-earth">Ready to begin?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Book a full session or start with a quick 15-minute call (₹500) to find the right therapist.
            </p>
            <div className="mt-6 flex justify-center">
              <Button size="lg" className="rounded-full px-8 shadow-sm" onClick={() => setBookingOpen(true)}>
                <CalendarCheck2 className="h-4 w-4 mr-2" /> Book a Session
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
