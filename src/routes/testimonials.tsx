import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ExternalLink, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { publicContentOptions } from "@/lib/content.queries";
import { contact, placeholderTestimonials } from "@/lib/site-data";

export const Route = createFileRoute("/testimonials")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publicContentOptions),
  head: () => ({
    meta: [
      { title: "Client Experiences & Reflections — Healing Emotions" },
      { name: "description", content: "Reflections from clients, parents, and families who reached out to Healing Emotions for therapy and emotional support." },
      { property: "og:title", content: "Client Experiences — Healing Emotions" },
      { property: "og:description", content: "Reflections on therapy, unhurried care, and taking the first step." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data } = useSuspenseQuery(publicContentOptions);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [context, setContext] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Healing Emotions Feedback:\n\n` +
      `• Name/Initials: ${name || "Anonymous"}\n` +
      `• Context/Service: ${context || "Not specified"}\n` +
      `• Experience: ${quote}`
    );
    window.open(`https://wa.me/919168611716?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const displayList = data.testimonials.length ? data.testimonials : placeholderTestimonials;

  return (
    <>
      <PageIntro
        title="Client Experiences"
        description="Reflections on taking the first step, finding the right specialist, and what unhurried, private care feels like."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-20">
          {/* HEADER ACTION BAR */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border/60 pb-8 items-center text-center sm:text-left">
            <div className="max-w-xl flex flex-col items-center sm:items-start">
              <h2 className="font-serif text-3xl text-earth">Have you attended a session?</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Your feedback helps us continuously improve our multidisciplinary care.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 items-center justify-center">
              <button
                onClick={() => setFeedbackOpen(true)}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Share Experience <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
              <a href="https://maps.google.com/?q=Healing+Emotions+Pune" target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                Google Reviews <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </a>
            </div>
          </div>

          {/* REVIEWS GRID */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayList.map((t, idx) => (
              <blockquote
                key={t.id || idx}
                className="flex flex-col justify-between rounded-2xl shadow-xs bg-card border border-border/50 p-8 sm:p-9 transition-colors hover:border-earth/30"
              >
                <p className="font-serif text-base sm:text-lg leading-relaxed text-earth italic">
                  “{t.quote}”
                </p>
                <footer className="mt-6 w-full pt-4 border-t border-border/40 flex flex-col items-start">
                  <div className="font-medium text-sm text-earth">{t.attribution}</div>
                  {t.context && (
                    <div className="text-xs text-muted-foreground mt-1">{t.context}</div>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>

          {/* POLICY CALLOUT */}
          <div className="border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between items-center text-center md:text-left gap-12">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Privacy & Ethics
              </span>
              <h3 className="mt-4 font-serif text-2xl text-earth leading-[1.1]">Confidentiality & Feedback</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Mental health support is deeply personal. To respect client privacy and adhere to professional ethics, therapy testimonials are never used to pressure or sell. Experiences shown here are shared anonymously to help newcomers understand what reaching out feels like.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK MODAL */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-md sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-earth">Share Your Experience</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Your feedback is treated with strict confidentiality.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
              <h3 className="font-serif text-xl text-earth">Thank you for sharing</h3>
              <p className="text-xs text-muted-foreground">
                Your message has been sent to the Healing Emotions desk.
              </p>
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => { setFeedbackOpen(false); setSubmitted(false); }}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4 pt-2">
              <div>
                <Label className="text-xs font-semibold text-earth">Name or Initials (Optional)</Label>
                <Input
                  placeholder="e.g. A. K. or Anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-earth">Service or Hospital Location Attended</Label>
                <Input
                  placeholder="e.g. Child Therapy at ONP Lila"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-earth">Your Experience / Reflections *</Label>
                <Textarea
                  required
                  placeholder="How was your experience working with our team?"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="mt-1 min-h-24"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full rounded-full">
                  <Send className="h-4 w-4 mr-2" /> Submit Feedback via Desk
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}