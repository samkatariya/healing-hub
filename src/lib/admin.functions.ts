import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || !data) throw new Error("Administrator access is required");
}

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const tables = ["articles", "categories", "services", "programs", "faqs", "testimonials", "site_settings"] as const;
    const results = await Promise.all(tables.map((table) => context.supabase.from(table).select("*").order(table === "site_settings" ? "key" : "updated_at", { ascending: false })));
    const failed = results.find((result) => result.error);
    if (failed?.error) throw new Error(failed.error.message);
    return Object.fromEntries(tables.map((table, index) => [table, results[index]?.data ?? []]));
  });

const articleSchema = z.object({
  id: z.string().uuid().optional(), title: z.string().min(2), slug: z.string().min(2), excerpt: z.string(), content: z.string(),
  category_id: z.string().uuid().nullable(), status: z.enum(["draft", "published"]), featured: z.boolean(), reading_minutes: z.number().int().min(1).max(120),
  scheduled_for: z.string().nullable(), seo_title: z.string(), seo_description: z.string(),
});

export const saveArticle = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => articleSchema.parse(input)).handler(async ({ data, context }) => {
  await assertAdmin(context);
  const { id, ...values } = data;
  const payload = { ...values, author_id: context.userId, published_at: data.status === "published" ? new Date().toISOString() : null };
  const result = id
    ? await context.supabase.from("articles").update(payload).eq("id", id).select().single()
    : await context.supabase.from("articles").insert(payload).select().single();
  if (result.error) throw new Error(result.error.message); return result.data;
});

const simpleSchema = z.discriminatedUnion("table", [
  z.object({ table: z.literal("services"), id: z.string().uuid().optional(), values: z.object({ title:z.string().min(2),slug:z.string().min(2),summary:z.string(),body:z.string(),icon:z.string(),active:z.boolean(),sort_order:z.number().int() }) }),
  z.object({ table: z.literal("programs"), id: z.string().uuid().optional(), values: z.object({ title:z.string().min(2),slug:z.string().min(2),summary:z.string(),body:z.string(),schedule_text:z.string(),active:z.boolean(),sort_order:z.number().int() }) }),
  z.object({ table: z.literal("faqs"), id: z.string().uuid().optional(), values: z.object({ question:z.string().min(2),answer:z.string().min(2),active:z.boolean(),sort_order:z.number().int() }) }),
  z.object({ table: z.literal("testimonials"), id: z.string().uuid().optional(), values: z.object({ quote:z.string().min(2),attribution:z.string(),context:z.string(),consent_confirmed:z.boolean(),active:z.boolean(),sort_order:z.number().int() }) }),
]);
export const saveSimpleContent = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input)=>simpleSchema.parse(input)).handler(async({data,context})=>{
  await assertAdmin(context);
  let error: { message: string } | null = null;
  if (data.table === "services") ({ error } = data.id ? await context.supabase.from("services").update(data.values).eq("id", data.id) : await context.supabase.from("services").insert(data.values));
  else if (data.table === "programs") ({ error } = data.id ? await context.supabase.from("programs").update(data.values).eq("id", data.id) : await context.supabase.from("programs").insert(data.values));
  else if (data.table === "faqs") ({ error } = data.id ? await context.supabase.from("faqs").update(data.values).eq("id", data.id) : await context.supabase.from("faqs").insert(data.values));
  else ({ error } = data.id ? await context.supabase.from("testimonials").update(data.values).eq("id", data.id) : await context.supabase.from("testimonials").insert(data.values));
  if(error)throw new Error(error.message); return {ok:true};
});

export const deleteContent = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input)=>z.object({table:z.enum(["articles","services","programs","faqs","testimonials"]),id:z.string().uuid()}).parse(input)).handler(async({data,context})=>{await assertAdmin(context);const{error}=await context.supabase.from(data.table).delete().eq("id",data.id);if(error)throw new Error(error.message);return{ok:true}});