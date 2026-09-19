import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Content service is not configured");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const getPublicContent = createServerFn({ method: "GET" }).handler(async () => {
  const db = publicClient();
  const [services, programs, faqs, testimonials, articles, categories, settings] =
    await Promise.all([
      db.from("services").select("*").order("sort_order"),
      db.from("programs").select("*").order("sort_order"),
      db.from("faqs").select("*").order("sort_order"),
      db.from("testimonials").select("*").order("sort_order"),
      db.from("articles").select("*, categories(name, slug)").order("published_at", { ascending: false }),
      db.from("categories").select("*").order("name"),
      db.from("site_settings").select("*"),
    ]);
  const failure = [services, programs, faqs, testimonials, articles, categories, settings].find(
    (result) => result.error,
  );
  if (failure?.error) throw new Error(failure.error.message);
  return {
    services: services.data ?? [],
    programs: programs.data ?? [],
    faqs: faqs.data ?? [],
    testimonials: testimonials.data ?? [],
    articles: articles.data ?? [],
    categories: categories.data ?? [],
    settings: settings.data ?? [],
  };
});

export const getPublicArticle = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(180) }).parse(input))
  .handler(async ({ data }) => {
    const db = publicClient();
    const result = await db
      .from("articles")
      .select("*, categories(name, slug)")
      .eq("slug", data.slug)
      .single();
    if (result.error) throw new Error(result.error.message);
    return result.data;
  });