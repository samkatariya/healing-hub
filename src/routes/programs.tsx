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

        title="For Organizations"
        description="Practical, human-centred psychological and emotional wellness programs for teams, institutions, and leadership."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-16">
          <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {orgOfferings.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group cursor-pointer flex flex-col items-center text-center sm:items-start sm:text-left rounded-2xl shadow-sm hover:shadow-md bg-card border border-border/40 p-10 transition-colors hover:border-earth/30 active:opacity-70 active:duration-0" onClick={() => setModalOpen(true)}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/5 mb-6 transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-earth/80 transition-colors" />
                  </div>
                  <h2 className="font-serif text-2xl text-earth">{item.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}

            <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-center items-center text-center sm:items-start sm:text-left rounded-2xl shadow-sm hover:shadow-md bg-sage-soft/20 border border-sage-soft/60 p-10 cursor-pointer transition-colors hover:bg-sage-soft/40 active:opacity-70 active:duration-0" onClick={() => setModalOpen(true)}>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Direct Discussion</span>
              <h2 className="mt-3 font-serif text-2xl text-earth">Custom Requirement?</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Connect directly with Psy. Yash Daga to tailor a program suited to your organization.
              </p>
              <div className="mt-8">
                <Button
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold active:opacity-70 transition-opacity"
                >
                  Discuss Your Requirements <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-12 bg-white p-10 sm:p-16 rounded-2xl shadow-sm hover:shadow-md border border-blue-100  relative overflow-hidden group hover:border-blue-200 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none -mr-16 -mt-16 group-hover:scale-105 transition-transform duration-700">
               <Building2 className="w-96 h-96 text-blue-900" />
            </div>
            <div className="max-w-2xl relative z-10 text-center md:text-left mx-auto md:mx-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Corporate Wellbeing
              </span>
              <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-earth leading-[1.1]">Invest in sustainable team wellbeing</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                We design non-performative, genuinely helpful mental health frameworks for modern workplaces.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10 mx-auto md:mx-0 items-center justify-center">
              <Button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto bg-primary hover:bg-blue-800 text-white rounded-full font-semibold h-12 px-6 transition-colors duration-300"
              >
                Discuss Requirements <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto border-blue-200 text-blue-900 hover:bg-blue-50 rounded-full h-12 px-6">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  <MessageSquare className="h-4 w-4 mr-2" /> WhatsApp Desk
                </a>
              </Button>
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