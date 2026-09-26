import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users2, Brain, Activity, Target, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/lib/site-data";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "For Organizations & Workplaces — Healing Emotions" },
      { name: "description", content: "Corporate wellness, EAP, psychological assessments, workshops & custom mental health programs for companies and institutions." },
      { property: "og:title", content: "For Organizations — Healing Emotions" },
      { property: "og:description", content: "Human-centred employee emotional support and leadership wellbeing." },
    ],
  }),
  component: ForOrganizationsPage,
});

const orgOfferings = [
  {
    icon: Building2,
    title: "Corporate Wellness",
    desc: "Structured workplace mental-health initiatives focused on emotional resilience, stress reduction, and healthy team dynamics.",
  },
  {
    icon: Users2,
    title: "Employee Support / EAP",
    desc: "Confidential individual counselling and psychotherapy access for employees navigating personal stress, burnout, or transition.",
  },
  {
    icon: Brain,
    title: "Workshops & Training",
    desc: "Interactive, evidence-informed modules on emotional intelligence, psychological safety, empathetic leadership, and work-life boundaries.",
  },
  {
    icon: Activity,
    title: "Psychological Assessments",
    desc: "Objective wellness screenings, behavioral profiling, and team stress assessments designed for organizational health.",
  },
  {
    icon: Target,
    title: "Custom Programs",
    desc: "Bespoke interventions designed specifically around your industry, work culture, shift patterns, and team objectives.",
  },
];

function ForOrganizationsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [needs, setNeeds] = useState("");

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Healing Emotions, I represent an organization and would like to discuss our requirements.\n\n` +
      `• Organization: ${orgName || "Not specified"}\n` +
      `• Contact Person: ${contactName || "Representative"}\n` +
      `• Phone: ${phone || "Not specified"}\n` +
      `• Requirements: ${needs || "Corporate Wellness / EAP / Training"}`
    );
    window.open(`https://wa.me/919158011716?text=${text}`, "_blank");
  };

  return (
    <>
      <PageIntro
        eyebrow="Corporate & Institutional Solutions"
        title="For Organizations"
        description="Practical, human-centred psychological and emotional wellness programs for teams, institutions, and leadership."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-16">
          <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {orgOfferings.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border-t border-border/60 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-soft text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="font-serif text-xl text-earth">{item.title}</h2>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}

            <div className="border-t border-border/60 pt-6 sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Direct Discussion</span>
              <h2 className="mt-3 font-serif text-xl text-earth">Custom Requirement?</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Connect directly with Psy. Yash Daga to tailor a program suited to your organization.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center"
                >
                  Discuss Your Requirements <ArrowRight className="h-4 w-4 ml-1.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-24 border-t border-border/60 pt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Corporate Wellbeing
              </span>
              <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">Invest in sustainable team wellbeing</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                We design non-performative, genuinely helpful mental health frameworks for modern workplaces.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:pt-10 shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center"
              >
                Discuss Requirements <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary transition-colors flex items-center text-muted-foreground">
                WhatsApp Direct Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-earth">Discuss Organizational Requirements</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Share a few details and our clinical director will connect with you promptly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-semibold text-earth">Organization / Company Name</Label>
              <Input
                placeholder="e.g. Acme Corp"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-earth">Contact Person & Designation</Label>
              <Input
                placeholder="e.g. HR Manager / Director"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-earth">Phone / Email</Label>
              <Input
                placeholder="e.g. +91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-earth">Primary Requirement / Note</Label>
              <Textarea
                placeholder="e.g. EAP counselling, leadership stress workshop, team assessment"
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
                className="mt-1 min-h-20"
              />
            </div>

            <Button className="w-full rounded-full mt-2" onClick={handleWhatsAppInquiry}>
              <MessageSquare className="h-4 w-4 mr-2" /> Connect via WhatsApp
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              Or call directly at <a href={`tel:${contact.phone}`} className="font-semibold text-earth underline">{contact.phoneDisplay}</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}