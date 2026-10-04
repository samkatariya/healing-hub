import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { saveHospital, setBookingStatus, deleteContent } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any;
const empty = { slug: "", name: "", area: "", address: "", phone: "", timings: "", map_query: "", services: "", active: true, sort_order: 0 };

export function HospitalsPanel({ rows, onChanged }: { rows: Row[]; onChanged: () => Promise<void> }) {
  const save = useServerFn(saveHospital);
  const del = useServerFn(deleteContent);
  const [edit, setEdit] = useState<Row | null>(null);

  async function submit() {
    if (!edit) return;
    try {
      const { id, ...rest } = edit;
      const values = Object.fromEntries(Object.keys(empty).map((k) => [k, rest[k] ?? (empty as Row)[k]]));
      await save({ data: { ...(values as typeof empty), sort_order: Number(values.sort_order) || 0, ...(id ? { id } : {}) } });
      toast.success("Hospital saved"); setEdit(null); await onChanged();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Could not save"); }
  }
  async function remove(id: string) {
    if (!confirm("Delete this hospital?")) return;
    try { await del({ data: { table: "hospitals", id } }); toast.success("Deleted"); await onChanged(); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Could not delete"); }
  }

  const field = (k: keyof typeof empty, label: string, hint?: string) => (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input value={String(edit?.[k] ?? "")} onChange={(e) => setEdit({ ...edit, [k]: e.target.value })} className="mt-1" />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );

  return (
    <>
      <div className="flex justify-end"><Button onClick={() => setEdit({ ...empty })}><Plus />Add hospital</Button></div>
      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-background">
        {rows.map((h) => (
          <div key={h.id} className="flex items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2"><h2 className="truncate font-medium">{h.name}</h2><Badge variant={h.active ? "default" : "outline"}>{h.active ? "Active" : "Hidden"}</Badge></div>
              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{h.area} · {h.timings}</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => setEdit(h)}><Pencil /></Button>
            <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(h.id)}><Trash2 /></Button>
          </div>
        ))}
        {!rows.length && <p className="p-10 text-center text-sm text-muted-foreground">No hospitals yet. Run the latest database migration to load the 8 centres.</p>}
      </div>
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader><DialogTitle>{edit?.id ? "Edit hospital" : "Add hospital"}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            {field("name", "Name")}
            {field("slug", "Short id", "lowercase-with-dashes, e.g. onp-prime")}
            {field("area", "Area")}
            {field("address", "Full address")}
            {field("phone", "Phone")}
            {field("timings", "Visiting days & timings", "e.g. Mon–Sat, 10 AM – 6 PM")}
            {field("map_query", "Map search text", "Exact name as on Google Maps")}
            {field("services", "Services available")}
            {field("sort_order", "Order")}
            <label className="flex items-center gap-2 text-sm"><Switch checked={!!edit?.active} onCheckedChange={(v) => setEdit({ ...edit, active: v })} />Show on website</label>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button><Button onClick={submit}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

const statuses = ["new", "contacted", "booked", "closed"] as const;

export function BookingsPanel({ rows, onChanged }: { rows: Row[]; onChanged: () => Promise<void> }) {
  const setStatus = useServerFn(setBookingStatus);
  async function change(id: string, status: (typeof statuses)[number]) {
    try { await setStatus({ data: { id, status } }); await onChanged(); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Could not update"); }
  }
  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-background">
      {rows.map((b) => (
        <div key={b.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <p className="font-medium">{b.name} · <a href={`tel:${b.phone}`} className="text-primary">{b.phone}</a></p>
            <p className="mt-1 text-sm text-muted-foreground">
              {b.segment} → {b.specialist} · {b.visit_mode}{b.hospital_slug ? ` (${b.hospital_slug})` : ""}{b.area ? ` · ${b.area}` : ""}{b.preferred_time ? ` · ${b.preferred_time}` : ""}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{new Date(b.created_at).toLocaleString()}</p>
          </div>
          <select value={b.status} onChange={(e) => change(b.id, e.target.value as (typeof statuses)[number])} className="h-9 rounded-md border border-input bg-background px-2 text-sm capitalize">
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ))}
      {!rows.length && <p className="p-10 text-center text-sm text-muted-foreground">No booking requests yet.</p>}
    </div>
  );
}
