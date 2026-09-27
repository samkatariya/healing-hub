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
} from './types';

// Create the database connection
function getDb() {
  const url = process.env.DATABASE_URL;
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

      return {
        articles,
        categories,
        services,
        programs,
        faqs,
        testimonials,
        site_settings,
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
    async deleteContent(table: DeletableTable, id: string) {
      const schemaTable = schema[table as keyof typeof schema] as any;
      await db.delete(schemaTable).where(eq(schemaTable.id, id));
    },
  };
}
