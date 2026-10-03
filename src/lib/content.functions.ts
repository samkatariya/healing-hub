import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Thin server functions: all storage details live behind the content
// repository, so a different backend only needs a new repository.

export const getPublicContent = createServerFn({ method: "GET" }).handler(async () => {
  const { createDrizzleContentRepository } = await import(
    "@/lib/content/drizzle.repository.server"
  );
  return createDrizzleContentRepository().getPublicContent();
});

export const getPublicArticle = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(180) }).parse(input))
  .handler(async ({ data }) => {
    const { createDrizzleContentRepository } = await import(
      "@/lib/content/drizzle.repository.server"
    );
    return createDrizzleContentRepository().getPublicArticle(data.slug);
  });

// Hospitals fall back to the built-in list so the site still works if the
// database is unreachable or not migrated yet.
export const getHospitals = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { createDrizzleContentRepository } = await import(
      "@/lib/content/drizzle.repository.server"
    );
    const rows = await createDrizzleContentRepository().getHospitals();
    if (rows.length) return rows;
  } catch (error) {
    console.error("getHospitals failed, using fallback", error);
  }
  const { hospitalLocations, DEFAULT_TIMINGS } = await import("@/lib/site-data");
  return hospitalLocations.map((h, i) => ({
    id: h.id, slug: h.id, name: h.name, area: h.area, address: h.address ?? `${h.name}, ${h.area}`,
    phone: h.phone, timings: h.timings ?? DEFAULT_TIMINGS, map_query: `${h.name} ${h.area}`,
    services: h.services.join(", "), active: true, sort_order: i,
  }));
});

const bookingSchema = z.object({
  segment: z.string().trim().min(1).max(60),
  specialist: z.string().trim().min(1).max(120),
  visit_mode: z.enum(["clinic", "home", "online"]),
  hospital_slug: z.string().trim().max(80).nullable(),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  area: z.string().trim().max(200).nullable(),
  preferred_time: z.string().trim().max(120).nullable(),
  notes: z.string().trim().max(1000).nullable(),
});

export const submitBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { createDrizzleContentRepository } = await import(
        "@/lib/content/drizzle.repository.server"
      );
      const res = await createDrizzleContentRepository().createBookingRequest(data);
      return { ok: true as const, id: res.id };
    } catch (error) {
      console.error("submitBookingRequest failed", error);
      return { ok: false as const, id: null };
    }
  });
