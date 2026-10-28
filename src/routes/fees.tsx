import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck2,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { feeDetails } from "@/lib/site-data";
import { BookingModal } from "@/components/booking-modal";

export const Route = createFileRoute("/fees")({
  head: () => ({
    meta: [
      { title: "Transparent Consultation & Assessment Fees — Healing Emotions" },
      {
        name: "description",
        content:
          "Clear, upfront fees for individual therapy and psychological assessments at Healing Emotions. Online sessions save 25%.",
      },
      { property: "og:title", content: "Healing Emotions Fees & Policies" },
      {
        property: "og:description",
        content:
          "Transparent fees for individual sessions and assessments. Online sessions ₹1,500. By appointment only.",
      },
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
        eyebrow="Transparent Investment"
        title="Clear, upfront fees. No hidden costs."
        description="We believe in simple, transparent fee structures so you know exactly what to anticipate from your very first conversation."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 space-y-24">
          {/* CONSULTATION TABLE */}
          <div>
            <div className="border-b border-border/60 pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                01. Consultations & Therapy
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
                Therapy & Consultations
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Available at partner hospitals across Pune, as a home visit, or online via private video call.
              </p>
            </div>

            <div className="mt-6 divide-y divide-border/50">
              {feeDetails.consultation.map((c) => (
                <div
                  key={c.title}
                  className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 group"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-medium text-earth text-lg">{c.title}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-sage-soft/50 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/10">
                        <Clock className="h-3 w-3" />
                        {c.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2.5 py-0.5 text-xs font-medium text-earth border border-border/60">
                        <MapPin className="h-3 w-3" />
                        {c.modes}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.note}</p>
                  </div>
                  <div className="flex items-center sm:flex-col sm:items-end justify-between gap-3 self-stretch sm:self-auto shrink-0 pt-2 sm:pt-0">
                    <div className="text-right">
                      <span className="font-serif text-2xl sm:text-3xl font-semibold text-earth">
                        {c.fee}
                      </span>
                      <p className="text-xs text-muted-foreground">Online {c.onlineFee}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBookFee(c.title)}
                      className="rounded-full text-xs font-medium hover:bg-earth hover:text-white transition-colors"
                    >
                      Book Session
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {feeDetails.onlineNote}
            </p>
          </div>

          {/* ASSESSMENTS TABLE */}
          <div>
            <div className="border-b border-border/60 pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                02. Standardised Assessments
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
                Psychological Assessments
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Standardised clinical batteries, developmental profiling, and comprehensive psychological evaluations.
              </p>
            </div>

            <div className="mt-6 divide-y divide-border/50">
              {feeDetails.assessments.map((a) => (
                <div
                  key={a.title}
                  className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 group"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-medium text-earth text-lg">{a.title}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-sage-soft/50 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/10">
                        <Clock className="h-3 w-3" />
                        {a.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.note}</p>
                  </div>
                  <div className="flex items-center sm:flex-col sm:items-end justify-between gap-3 self-stretch sm:self-auto shrink-0 pt-2 sm:pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBookFee(a.title)}
                      className="rounded-full text-xs font-medium hover:bg-earth hover:text-white transition-colors"
                    >
                      Enquire Assessment
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 text-xs sm:text-sm leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded-xl border">
              <p>
                <strong className="text-earth font-medium">Important Note:</strong>{" "}
                {feeDetails.assessmentNote}
              </p>
            </div>
          </div>

          {/* POLICIES SECTION */}
          <div>
            <div className="border-b border-border/60 pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                03. Practice Policies
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-earth">
                Payment & Cancellation Policy
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Clear clinical ground rules designed to protect appointment integrity, client confidentiality, and therapist preparation.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-earth">
                    {feeDetails.policies[0]?.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-6 text-muted-foreground">
                    {feeDetails.policies[0]?.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Secured booking slot</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <CalendarCheck2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-earth">
                    {feeDetails.policies[1]?.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-6 text-muted-foreground">
                    {feeDetails.policies[1]?.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Private, zero crowding</span>
                </div>
              </div>

              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-earth">
                    {feeDetails.policies[2]?.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-6 text-muted-foreground">
                    {feeDetails.policies[2]?.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-destructive/10 flex items-center gap-2 text-xs font-medium text-destructive">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Non-refundable if no-show</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA BANNER */}
          <div className="border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12 bg-sage-soft/20 rounded-2xl p-8 sm:p-12 border">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Begin Here
              </span>
              <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">
                Need guidance deciding which session to choose?
              </h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                All fees listed above are standard across our practice. Start with a quick 15-minute guidance call (₹500) to clarify your concerns and match with the right therapist.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 md:pt-4">
              <Button
                onClick={() => handleBookFee("Guidance Call (15 mins)")}
                className="rounded-full px-6 py-2.5 font-medium shadow-sm hover:shadow-md transition-all"
              >
                Schedule Guidance Call (₹500) <ArrowRight className="h-4 w-4 ml-1.5" />
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
