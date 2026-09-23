import { useState } from "react";
import { CheckCircle2, MapPin, Phone, MessageCircle, ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hospitalLocations, contact } from "@/lib/site-data";

export interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultWho?: string;
  defaultSupport?: string;
  defaultLocation?: string;
}

const whoOptions = [
  "Myself",
  "My Child",
  "Couple",
  "Family",
  "Senior Citizen",
  "Athlete / Performer",
  "Organization",
];

const supportOptions = [
  "Individual / Adult Therapy",
  "Child & Adolescent Support",
  "Couple & Family Counselling",
  "Senior Citizen / Dementia Support",
  "Sports & Performance Psychology",
  "Psychological Assessments",
  "Specialised Allied Therapy",
  "Quick 15-min Call (₹500)",
  "Unsure — Need Guidance",
];

export function BookingModal({
  open,
  onOpenChange,
  defaultWho,
  defaultSupport,
  defaultLocation,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [who, setWho] = useState<string>(defaultWho || "");
  const [support, setSupport] = useState<string>(defaultSupport || "");
  const [location, setLocation] = useState<string>(defaultLocation || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const resetAndClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
    }, 200);
  };

  const selectedHospital = hospitalLocations.find((h) => h.id === location || h.name === location);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Healing Emotions, I would like to book a session.\n\n` +
      `• For: ${who || "Not specified"}\n` +
      `• Support: ${support || "Not specified"}\n` +
      `• Preferred Location: ${selectedHospital ? selectedHospital.name : (location || "Online")}\n` +
      `• Name: ${name || "Client"}\n` +
      `• Phone: ${phone || "Not specified"}\n` +
      `• Preferred Time: ${preferredTime || "Flexible"}`
    );
    return `https://wa.me/919158011716?text=${text}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden sm:rounded-2xl">
        <div className="bg-sage-soft p-6 border-b border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Step {step} of 4 — Easy Booking
            </span>
            <span className="text-xs text-muted-foreground">No clinical paperwork required</span>
          </div>
          <DialogTitle className="mt-2 font-serif text-2xl text-earth">
            {step === 1 && "1. Who is the session for?"}
            {step === 2 && "2. What kind of support are you looking for?"}
            {step === 3 && "3. Choose preferred location"}
            {step === 4 && "4. Your contact details"}
            {step === 5 && "Session Request Received"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {step === 1 && "Select the person who will be attending."}
            {step === 2 && "Keep it simple. You don't need exact clinical terms."}
            {step === 3 && "Choose any of our Pune hospital centres or consult online."}
            {step === 4 && "We will confirm your appointment time promptly."}
            {step === 5 && "Your booking details are ready."}
          </DialogDescription>
        </div>

        <div className="p-6">
          {/* STEP 1: WHO */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                {whoOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setWho(opt);
                      setStep(2);
                    }}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all hover:border-primary hover:bg-sage-soft/30 ${
                      who === opt ? "border-primary bg-sage-soft/40 ring-1 ring-primary" : "border-border bg-card"
                    }`}
                  >
                    <span className="text-sm font-medium text-earth">{opt}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SUPPORT TYPE */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {supportOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSupport(opt);
                      setStep(3);
                    }}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all hover:border-primary hover:bg-sage-soft/30 ${
                      support === opt ? "border-primary bg-sage-soft/40 ring-1 ring-primary" : "border-border bg-card"
                    }`}
                  >
                    <span className="text-sm font-medium text-earth">{opt}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-60" />
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => {
                    setLocation("Online Consultation");
                    setStep(4);
                  }}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all hover:border-primary hover:bg-sage-soft/30 ${
                    location === "Online Consultation" ? "border-primary bg-sage-soft/40 ring-1 ring-primary" : "border-border bg-card"
                  }`}
                >
                  <div>
                    <span className="block text-sm font-semibold text-earth">Online Consultation (Video/Audio)</span>
                    <span className="text-xs text-muted-foreground">From home, secure and confidential</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-60" />
                </button>

                {hospitalLocations.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => {
                      setLocation(h.name);
                      setStep(4);
                    }}
                    className={`flex items-start justify-between rounded-xl border p-3.5 text-left transition-all hover:border-primary hover:bg-sage-soft/30 ${
                      location === h.name ? "border-primary bg-sage-soft/40 ring-1 ring-primary" : "border-border bg-card"
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-semibold text-earth">{h.name}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" /> {h.area}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-60 mt-1" />
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & DETAILS */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-xl bg-sage-soft/50 p-3.5 text-xs text-earth space-y-1">
                <div><strong>For:</strong> {who} • <strong>Support:</strong> {support}</div>
                <div><strong>Location:</strong> {location}</div>
              </div>

              <div>
                <Label htmlFor="book-name" className="text-xs font-semibold text-earth">Your Name *</Label>
                <Input
                  id="book-name"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="book-phone" className="text-xs font-semibold text-earth">Phone / WhatsApp Number *</Label>
                <Input
                  id="book-phone"
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="book-time" className="text-xs font-semibold text-earth">Preferred Day / Time</Label>
                <Input
                  id="book-time"
                  placeholder="e.g., Weekday mornings, or Saturday 4 PM"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button type="submit" className="rounded-full px-6">
                  Complete Booking Request
                </Button>
              </div>
            </form>
          )}

          {/* STEP 5: SUCCESS & DIRECT ROUTING */}
          {step === 5 && (
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-earth">Your request is ready</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Connect immediately via WhatsApp or phone to confirm the schedule without any delay.
                </p>
              </div>

              {selectedHospital && (
                <div className="rounded-xl border border-border bg-sage-soft/30 p-4 text-left text-sm">
                  <p className="font-semibold text-earth">{selectedHospital.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedHospital.area}</p>
                  <div className="mt-3 flex gap-2">
                    <Button asChild size="sm" variant="outline" className="text-xs">
                      <a href={`tel:${contact.phone}`}>
                        <Phone className="h-3.5 w-3.5 mr-1" /> Call Hospital Desk
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="text-xs">
                      <a href={selectedHospital.mapsUrl} target="_blank" rel="noreferrer">
                        <MapPin className="h-3.5 w-3.5 mr-1" /> View on Maps
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid gap-3 pt-2">
                <Button asChild size="lg" className="w-full rounded-full">
                  <a href={generateWhatsAppUrl()} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" /> Send on WhatsApp (Instant Confirm)
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                  <a href={`tel:${contact.phone}`}>
                    <Phone className="h-5 w-5 mr-2" /> Call {contact.phoneDisplay}
                  </a>
                </Button>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="text-xs text-muted-foreground underline hover:text-earth"
              >
                Close this window
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
