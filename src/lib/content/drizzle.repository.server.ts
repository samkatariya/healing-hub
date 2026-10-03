import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc, asc } from 'drizzle-orm';
import * as schema from '../../../drizzle/schema';
import type {
  AdminContent,
  AdminContentRepository,
  ArticleInput,
  ContentRepository,
  DeletableTable,
  PublicContent,
  Row,
  SimpleTable,
  Hospital,
  HospitalInput,
  BookingRequestInput,
} from './types';

type HospitalRow = typeof schema.hospitals.$inferSelect;
const toHospital = (h: HospitalRow): Hospital => ({
  id: h.id, slug: h.slug, name: h.name, area: h.area, address: h.address, phone: h.phone,
  timings: h.timings, map_query: h.mapQuery, services: h.services, active: h.active, sort_order: h.sortOrder,
});
const fromHospital = (h: HospitalInput) => ({
  slug: h.slug, name: h.name, area: h.area, address: h.address, phone: h.phone,
  timings: h.timings, mapQuery: h.map_query, services: h.services, active: h.active, sortOrder: h.sort_order,
});

// Create the database connection
function getDb() {
  const url = process.env['DATABASE_URL'];
  if (!url) throw new Error("DATABASE_URL is not configured");
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export function createDrizzleContentRepository(): ContentRepository {
  return {
    async getPublicContent(): Promise<PublicContent> {
      const db = getDb();
      const [services, programs, faqs, testimonials, articles, categories, settings] =
        await Promise.all([
          db.query.services.findMany({ orderBy: [asc(schema.services.sortOrder)] }),
          db.query.programs.findMany({ orderBy: [asc(schema.programs.sortOrder)] }),
          db.query.faqs.findMany({ orderBy: [asc(schema.faqs.sortOrder)] }),
          db.query.testimonials.findMany({ orderBy: [asc(schema.testimonials.sortOrder)] }),
          db.query.articles.findMany({
            with: { category: { columns: { name: true, slug: true } } },
            orderBy: [desc(schema.articles.publishedAt)],
            where: eq(schema.articles.status, "published"),
          }),
          db.query.categories.findMany({ orderBy: [asc(schema.categories.name)] }),
          db.query.siteSettings.findMany(),
        ]);
      
      return {
        services,
        programs,
        faqs,
        testimonials,
        articles,
        categories,
        settings,
      } as PublicContent;
    },
    async getPublicArticle(slug: string): Promise<Row> {
      const db = getDb();
      const article = await db.query.articles.findFirst({
        where: eq(schema.articles.slug, slug),
        with: { category: { columns: { name: true, slug: true } } },
      });
      if (!article) throw new Error("Article not found");
      return article as Row;
    },
    async getHospitals() {
      const rows = await getDb().query.hospitals.findMany({
        where: eq(schema.hospitals.active, true),
        orderBy: [asc(schema.hospitals.sortOrder)],
      });
      return rows.map(toHospital);
    },
    async createBookingRequest(input: BookingRequestInput) {
      const [row] = await getDb().insert(schema.bookingRequests).values({
        segment: input.segment, specialist: input.specialist, visitMode: input.visit_mode,
        hospitalSlug: input.hospital_slug, name: input.name, phone: input.phone, area: input.area,
        preferredTime: input.preferred_time, notes: input.notes,
      }).returning({ id: schema.bookingRequests.id });
      return { id: row!.id };
    },
  };
}

export function createDrizzleAdminRepository(
  userId: string,
): AdminContentRepository {
  const db = getDb();

  return {
    async assertAdmin() {
      // TODO: Replace with your own admin check when moving away from Supabase Auth completely.
      // For now, if we are still using Supabase for Auth, we trust the userId passed from middleware.
      // In a real custom app, you'd check a `users` table to see if `role === 'admin'`.
      if (!userId) throw new Error("Administrator access is required");
    },
    async getAdminContent(): Promise<AdminContent> {
      const [services, programs, faqs, testimonials, articles, categories, site_settings] =
        await Promise.all([
          db.query.services.findMany({ orderBy: [desc(schema.services.updatedAt)] }),
          db.query.programs.findMany({ orderBy: [desc(schema.programs.updatedAt)] }),
          db.query.faqs.findMany({ orderBy: [desc(schema.faqs.updatedAt)] }),
          db.query.testimonials.findMany({ orderBy: [desc(schema.testimonials.updatedAt)] }),
          db.query.articles.findMany({ orderBy: [desc(schema.articles.updatedAt)] }),
          db.query.categories.findMany({ orderBy: [desc(schema.categories.updatedAt)] }),
          db.query.siteSettings.findMany({ orderBy: [asc(schema.siteSettings.key)] }),
        ]);
      const [hospitalRows, bookingRows] = await Promise.all([
        db.query.hospitals.findMany({ orderBy: [asc(schema.hospitals.sortOrder)] }),
        db.query.bookingRequests.findMany({ orderBy: [desc(schema.bookingRequests.createdAt)], limit: 200 }),
      ]);
      const hospitals = hospitalRows.map(toHospital);
      const booking_requests = bookingRows.map((b) => ({
        id: b.id, segment: b.segment, specialist: b.specialist, visit_mode: b.visitMode,
        hospital_slug: b.hospitalSlug, name: b.name, phone: b.phone, area: b.area,
        preferred_time: b.preferredTime, notes: b.notes, status: b.status, created_at: b.createdAt.toISOString(),
      }));

      return {
        articles,
        categories,
        services,
        programs,
        faqs,
        testimonials,
        site_settings,
        hospitals,
        booking_requests,
      } as unknown as AdminContent;
    },
    async saveArticle(input: ArticleInput, authorId: string): Promise<Row> {
      const { id, ...values } = input;
      const payload = {
        ...values,
        authorId,
        publishedAt: input.status === "published" ? new Date() : null,
      };

      if (id) {
        const [updated] = await db
          .update(schema.articles)
          .set({ ...payload, updatedAt: new Date() })
          .where(eq(schema.articles.id, id))
          .returning();
        return updated;
      } else {
        const [inserted] = await db
          .insert(schema.articles)
          .values(payload)
          .returning();
        return inserted;
      }
    },
    async saveSimpleContent(table: SimpleTable, id: string | undefined, values: Row) {
      const schemaTable = schema[table as keyof typeof schema] as any;
      
      if (id) {
        await db
          .update(schemaTable)
          .set({ ...values, updatedAt: new Date() })
          .where(eq(schemaTable.id, id));
      } else {
        await db.insert(schemaTable).values(values);
      }
    },
    async saveHospital(input: HospitalInput) {
      if (input.id) {
        await db.update(schema.hospitals).set({ ...fromHospital(input), updatedAt: new Date() }).where(eq(schema.hospitals.id, input.id));
      } else {
        await db.insert(schema.hospitals).values(fromHospital(input));
      }
    },
    async setBookingStatus(id: string, status: string) {
      await db.update(schema.bookingRequests).set({ status }).where(eq(schema.bookingRequests.id, id));
    },
    async deleteContent(table: DeletableTable, id: string) {
      const map: Record<string, unknown> = { hospitals: schema.hospitals, booking_requests: schema.bookingRequests };
      const schemaTable = (map[table] ?? schema[table as keyof typeof schema]) as any;
      await db.delete(schemaTable).where(eq(schemaTable.id, id));
    },
  };
}
