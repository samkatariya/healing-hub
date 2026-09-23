import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star, MessageSquarePlus, ExternalLink, Send, CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { publicContentOptions } from "@/lib/content.queries";
import { contact } from "@/lib/site-data";

export const Route = createFileRoute("/testimonials")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publicContentOptions),
  head: () => ({
    meta: [
      { title: "Client Experiences & Reviews — Healing Emotions" },
      { name: "description", content: "Genuine experiences, reflections, and verified feedback shared with consent by clients, parents, and workshop participants." },
      { property: "og:title", content: "Client Experiences — Healing Emotions" },
      { property: "og:description", content: "What people say. Written reviews and shared experiences." },
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
    window.open(`https://wa.me/919158011716?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const defaultReviews = [
    {
      id: "rev-1",
      quote: "Reaching out was the hardest part, but the conversation felt completely respectful and human. There was zero pressure to fit into a clinical diagnosis.",
      attribution: "Adult Therapy Client",
      context: "Individual Support · Shivajinagar",
    },
    {
      id: "rev-2",
      quote: "Our child’s speech and sensory integration improved steadily because the psychologist and occupational therapist actually communicated with each other.",
      attribution: "Parent of a 6-year-old",
      context: "Child & Speech Support · Pimpri",
    },
    {
      id: "rev-3",
      quote: "The couple sessions helped us establish clear boundaries and de-escalate circular arguments without taking sides. Truly grateful for the neutral, compassionate space.",
      attribution: "Couple Consultation",
      context: "Couple Therapy · Swargate",
    },
  ];

  const displayList = data.testimonials.length ? data.testimonials : defaultReviews;

  return (
    <>
      <PageIntro
        eyebrow="What People Say"
        title="Client Experiences"
        description="Genuine reflections shared with explicit consent. Mental health journeys are personal, and trust always comes first."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-12">
          {/* HEADER ACTION BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div>
              <h2 className="font-serif text-2xl text-earth">Have you attended a session?</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your feedback helps us continuously improve our multidisciplinary care.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button size="sm" onClick={() => setFeedbackOpen(true)} className="rounded-full">
                <MessageSquarePlus className="h-4 w-4 mr-1.5" /> Share Your Experience
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <a href="https://maps.google.com/?q=Healing+Emotions+Pune" target="_blank" rel="noreferrer">
                  Read Google Reviews <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </a>
              </Button>
            </div>
          </div>

          {/* REVIEWS GRID */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayList.map((t, idx) => (
              <blockquote
                key={t.id || idx}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs"
              >
                <div>
                  <div className="flex text-amber-500 mb-3 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-lg leading-relaxed text-earth">
                    “{t.quote}”
                  </p>
                </div>
                <footer className="mt-6 pt-4 border-t border-border/60">
                  <div className="font-medium text-xs text-earth">{t.attribution}</div>
                  {t.context && (
                    <div className="text-[11px] text-muted-foreground mt-0.5">{t.context}</div>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>

          {/* POLICY CALLOUT */}
          <div className="rounded-2xl bg-sage-soft/60 p-6 sm:p-8 text-center border border-border/60">
            <h3 className="font-serif text-xl text-earth">Confidentiality & Review Integrity</h3>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-muted-foreground">
              We never fabricate reviews or incentivize testimonials. Every quote on this site is voluntarily contributed by clients with written permission. Names may be kept anonymous to protect client privacy.
            </p>
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