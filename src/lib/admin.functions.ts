import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/lib/auth-middleware";
import type { AdminContentRepository } from "@/lib/content/types";

// Storage details live in the content repository; these functions only handle
// validation and authorisation, so a different backend needs no changes here.
async function adminRepo(context: {
  userId: string;
}): Promise<AdminContentRepository> {
  const { createDrizzleAdminRepository } = await import(
    "@/lib/content/drizzle.repository.server"
  );
  const repo = createDrizzleAdminRepository(context.userId);
  await repo.assertAdmin();
  return repo;
}

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => (await adminRepo(context)).getAdminContent());

const articleSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string(),
  content: z.string(),
  category_id: z.string().uuid().nullable(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  reading_minutes: z.number().int().min(1).max(120),
  scheduled_for: z.string().nullable(),
  seo_title: z.string(),
  seo_description: z.string(),
});

export const saveArticle = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => articleSchema.parse(input))
  .handler(async ({ data, context }) =>
    (await adminRepo(context)).saveArticle(data as any, context.userId),
  );

const simpleSchema = z.discriminatedUnion("table", [
  z.object({
    table: z.literal("services"),
    id: z.string().uuid().optional(),
    values: z.object({
      title: z.string().min(2),
      slug: z.string().min(2),
      summary: z.string(),
      body: z.string(),
      icon: z.string(),
      active: z.boolean(),
      sort_order: z.number().int(),
    }),
  }),
  z.object({
    table: z.literal("programs"),
    id: z.string().uuid().optional(),
    values: z.object({
      title: z.string().min(2),
      slug: z.string().min(2),
      summary: z.string(),
      body: z.string(),
      schedule_text: z.string(),
      active: z.boolean(),
      sort_order: z.number().int(),
    }),
  }),
  z.object({
    table: z.literal("faqs"),
    id: z.string().uuid().optional(),
    values: z.object({
      question: z.string().min(2),
      answer: z.string().min(2),
      active: z.boolean(),
      sort_order: z.number().int(),
    }),
  }),
  z.object({
    table: z.literal("testimonials"),
    id: z.string().uuid().optional(),
    values: z.object({
      quote: z.string().min(2),
      attribution: z.string(),
      context: z.string(),
      consent_confirmed: z.boolean(),
      active: z.boolean(),
      sort_order: z.number().int(),
    }),
  }),
]);

export const saveSimpleContent = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => simpleSchema.parse(input))
  .handler(async ({ data, context }) => {
    await (await adminRepo(context)).saveSimpleContent(data.table, data.id, data.values);
    return { ok: true };
  });

export const deleteContent = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        table: z.enum(["articles", "services", "programs", "faqs", "testimonials"]),
        id: z.string().uuid(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await (await adminRepo(context)).deleteContent(data.table, data.id);
    return { ok: true };
  });
