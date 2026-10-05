import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Clock, Info, MapPin, MessageCircle, Phone, Video } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contact, ONLINE_BOOKING_URL } from "@/lib/site-data";
import { NOT_SURE, segments, visitModes, type SegmentId, type VisitMode } from "@/lib/booking-config";
import { hospitalsOptions } from "@/lib/content.queries";
import { submitBookingRequest } from "@/lib/content.functions";
import { HospitalMap } from "@/components/hospital-map";

export interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultWho?: string;
  defaultSupport?: string;
  defaultLocation?: string;
}

// Maps older free-text labels used across pages to a segment.
function guessSegment(who?: string): SegmentId | null {
  const w = (who ?? "").toLowerCase();
  if (!w) return null;
  if (w.includes("child")) return "child";
  if (w.includes("couple") || w.includes("family") || w.includes("relationship")) return "couple";
  if (w.includes("senior")) return "senior";
  if (w.includes("athlete") || w.includes("sport")) return "sports";
  if (w.includes("organ") || w.includes("corporate")) return "corporate";
  return "adult";
}

type Step = 1 | 2 | 3 | 4 | 5;
const optionCls = (active: boolean) =>
  `flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors hover:border-primary ${
    active ? "border-primary bg-accent ring-1 ring-primary" : "border-border bg-card"
  }`;

export function BookingModal({ open, onOpenChange, defaultWho, defaultLocation }: BookingModalProps) {
  const { data: hospitals = [] } = useQuery({ ...hospitalsOptions, enabled: open });
  const submit = useServerFn(submitBookingRequest);

  const [step, setStep] = useState<Step>(1);
  const [segmentId, setSegmentId] = useState<SegmentId | null>(null);
  const [specialist, setSpecialist] = useState("");
  const [mode, setMode] = useState<VisitMode | null>(null);
  const [hospitalSlug, setHospitalSlug] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const seg = guessSegment(defaultWho);
    setSegmentId(seg);
    setStep(seg ? 2 : 1);
    if (defaultLocation) {
      setMode("clinic");
      setHospitalSlug(null);
    }
  }, [open, defaultWho, defaultLocation]);

  useEffect(() => {
    if (defaultLocation && hospitals.length && !hospitalSlug) {
      const h = hospitals.find((x) => x.slug === defaultLocation || x.name === defaultLocation);
      if (h) setHospitalSlug(h.slug);
    }
  }, [defaultLocation, hospitals, hospitalSlug]);

  const segment = segments.find((s) => s.id === segmentId) ?? null;
  const hospital = hospitals.find((h) => h.slug === hospitalSlug) ?? null;
  const modes = visitModes.filter((m) => m.id !== "home" || segment?.allowHomeVisit !== false);

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1); setSegmentId(null); setSpecialist(""); setMode(null); setHospitalSlug(null);
      setName(""); setPhone(""); setArea(""); setPreferredTime(""); setError("");
    }, 200);
  };

  const whatsappUrl = () => {
    const where = mode === "clinic" ? hospital?.name ?? "Clinic" : mode === "home" ? `Home visit (${area || "area not given"})` : "Online";
    const text = encodeURIComponent(
      `Hello Healing Emotions, I'd like to book an appointment.\n\n` +
        `• For: ${segment?.label ?? ""}\n• Specialist: ${specialist}\n• Where: ${where}\n` +
        `• Name: ${name}\n• Phone: ${phone}\n• Preferred time: ${preferredTime || "Flexible"}`,
    );
    return `https://wa.me/919168611716?text=${text}`;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!segment || !mode) return;
    setSending(true); setError("");
    try {
      const res = await submit({
        data: {
          segment: segment.label, specialist, visit_mode: mode,
          hospital_slug: mode === "clinic" ? hospitalSlug : null,
          name, phone, area: mode === "home" ? area || null : null,
          preferred_time: preferredTime || null, notes: null,
        },
      });
      if (!res.ok) setError("We couldn't save your request right now. Please use WhatsApp or call us below.");
      setStep(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please check your details and try again.");
    } finally {
      setSending(false);
    }
  }

  const titles: Record<Step, string> = {
    1: "Who is this for?",
    2: "Who would you like to see?",
    3: "How would you like to meet?",
    4: mode === "clinic" ? "Choose a centre & confirm" : "Your details",
    5: "Request received",
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto p-0 sm:rounded-2xl">
        <div className="border-b border-border bg-accent/60 p-6">
          {step < 5 && (
            <div className="flex gap-1.5" aria-hidden>
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className={`h-1 flex-1 rounded-full ${n <= step ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
          )}
          <DialogTitle className="mt-4 font-serif text-2xl text-earth">{titles[step]}</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            {step === 1 && "Pick one — you can change it later."}
            {step === 2 && segment && `Specialists for ${segment.hint.toLowerCase()}.`}
            {step === 3 && "Choose what's easiest for you."}
            {step === 4 && "We'll call you back to confirm a time."}
            {step === 5 && "Thank you. Our team will contact you shortly."}
          </DialogDescription>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {segments.map((s) => (
                <button key={s.id} type="button" className={optionCls(segmentId === s.id)}
                  onClick={() => { setSegmentId(s.id); setSpecialist(""); setStep(2); }}>
                  <span>
                    <span className="block text-sm font-semibold text-earth">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && segment && (
            <div className="space-y-3">
              {segment.recommendation && (
                <div className="flex gap-3 rounded-xl border border-primary/30 bg-accent p-4 text-sm text-earth">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p><strong>Our recommendation:</strong> {segment.recommendation}</p>
                </div>
              )}
              {[...segment.specialists, NOT_SURE].map((sp) => (
                <button key={sp} type="button" className={optionCls(specialist === sp)}
                  onClick={() => { setSpecialist(sp); setStep(3); }}>
                  <span className="text-sm font-medium text-earth">{sp}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Back</Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {modes.map((m) => (
                <button key={m.id} type="button" className={optionCls(mode === m.id)}
                  onClick={() => { setMode(m.id); setStep(4); }}>
                  <span>
                    <span className="block text-sm font-semibold text-earth">{m.label}</span>
                    <span className="text-xs text-muted-foreground">{m.hint}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setStep(2)}>Back</Button>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "clinic" && (
                <div className="space-y-3">
                  <Label htmlFor="book-hospital" className="text-xs font-semibold text-earth">Centre *</Label>
                  <select id="book-hospital" required value={hospitalSlug ?? ""}
                    onChange={(e) => setHospitalSlug(e.target.value || null)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="">Select a hospital</option>
                    {hospitals.map((h) => <option key={h.slug} value={h.slug}>{h.name} — {h.area}</option>)}
                  </select>
                  {hospital && (
                    <div className="overflow-hidden rounded-xl border border-border">
                      <HospitalMap query={hospital.map_query || `${hospital.name} ${hospital.area}`} title={hospital.name} className="h-44" />
                      <div className="space-y-1.5 p-4 text-sm">
                        <p className="font-semibold text-earth">{hospital.name}</p>
                        <p className="flex gap-2 text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{hospital.address}</p>
                        <p className="flex gap-2 text-muted-foreground"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{hospital.timings}</p>
                        <a href={`tel:${hospital.phone.replace(/\s/g, "")}`} className="flex gap-2 text-muted-foreground hover:text-primary"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{hospital.phone}</a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mode === "online" && (
                <div className="rounded-xl border border-border bg-accent/50 p-4 text-sm">
                  <p className="flex items-center gap-2 font-semibold text-earth"><Video className="h-4 w-4 text-primary" />Online consultation</p>
                  {ONLINE_BOOKING_URL ? (
                    <Button asChild className="mt-3 w-full rounded-full">
                      <a href={ONLINE_BOOKING_URL} target="_blank" rel="noreferrer">Pick an online slot now</a>
                    </Button>
                  ) : (
                    <p className="mt-1 text-muted-foreground">Leave your details and we'll send you a video-call link with your slot.</p>
                  )}
                </div>
              )}

              {mode === "home" && (
                <div>
                  <Label htmlFor="book-area" className="text-xs font-semibold text-earth">Your area in Pune *</Label>
                  <Input id="book-area" required maxLength={200} placeholder="e.g. Kothrud" value={area} onChange={(e) => setArea(e.target.value)} className="mt-1" />
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="book-name" className="text-xs font-semibold text-earth">Name *</Label>
                  <Input id="book-name" required minLength={2} maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="book-phone" className="text-xs font-semibold text-earth">Phone / WhatsApp *</Label>
                  <Input id="book-phone" required type="tel" pattern="[+0-9 ()\-]{7,20}" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="book-time" className="text-xs font-semibold text-earth">Preferred day / time</Label>
                <Input id="book-time" maxLength={120} placeholder="e.g. Saturday morning" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className="mt-1" />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <div className="flex items-center justify-between">
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep(3)}>Back</Button>
                <Button type="submit" disabled={sending} className="rounded-full px-6">{sending ? "Sending…" : "Request appointment"}</Button>
              </div>
            </form>
          )}

          {step === 5 && (
            <div className="space-y-5 py-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : (
                <p className="text-sm text-muted-foreground">Want a faster reply? Message or call us directly.</p>
              )}
              <div className="grid gap-3">
                <Button asChild size="lg" className="w-full rounded-full">
                  <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-5 w-5" />Send on WhatsApp</a>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full"><a href={`tel:${contact.phone}`}><Phone className="mr-1.5 h-4 w-4" />Call {contact.phoneDisplay}</a></Button>
              </div>
              <button type="button" onClick={close} className="text-xs text-muted-foreground underline">Close</button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
