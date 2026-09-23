// Lovable Cloud (Supabase) implementation of the content contract.
// This is the only file that knows how content is actually stored.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type {
  AdminContent,
  AdminContentRepository,
  ArticleInput,
  ContentRepository,
  DeletableTable,
  PublicContent,
  Row,
  SimpleTable,
} from "./types";

function publicClient(): SupabaseClient<Database> {
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

function unwrap<T>(result: { data: T | null; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return (result.data ?? []) as T;
}

export function createSupabaseContentRepository(): ContentRepository {
  return {
    async getPublicContent(): Promise<PublicContent> {
      const db = publicClient();
      const [services, programs, faqs, testimonials, articles, categories, settings] =
        await Promise.all([
          db.from("services").select("*").order("sort_order"),
          db.from("programs").select("*").order("sort_order"),
          db.from("faqs").select("*").order("sort_order"),
          db.from("testimonials").select("*").order("sort_order"),
          db
            .from("articles")
            .select("*, categories(name, slug)")
            .order("published_at", { ascending: false }),
          db.from("categories").select("*").order("name"),
          db.from("site_settings").select("*"),
        ]);
      return {
        services: unwrap(services),
        programs: unwrap(programs),
        faqs: unwrap(faqs),
        testimonials: unwrap(testimonials),
        articles: unwrap(articles),
        categories: unwrap(categories),
        settings: unwrap(settings),
      } as PublicContent;
    },
    async getPublicArticle(slug: string): Promise<Row> {
      const db = publicClient();
      const result = await db
        .from("articles")
        .select("*, categories(name, slug)")
        .eq("slug", slug)
        .single();
      if (result.error) throw new Error(result.error.message);
      return result.data as Row;
    },
  };
}

export function createSupabaseAdminRepository(
  supabase: SupabaseClient<Database>,
  userId: string,
): AdminContentRepository {
  const db = supabase as unknown as {
    from: (table: string) => any;
    rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: any; error: any }>;
  };

  return {
    async assertAdmin() {
      const { data, error } = await db.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (error || !data) throw new Error("Administrator access is required");
    },
    async getAdminContent(): Promise<AdminContent> {
      const tables = [
        "articles",
        "categories",
        "services",
        "programs",
        "faqs",
        "testimonials",
        "site_settings",
      ] as const;
      const results = await Promise.all(
        tables.map((table) =>
          db
            .from(table)
            .select("*")
            .order(table === "site_settings" ? "key" : "updated_at", { ascending: false }),
        ),
      );
      const failed = results.find((result) => result.error);
      if (failed?.error) throw new Error(failed.error.message);
      return Object.fromEntries(
        tables.map((table, index) => [table, results[index]?.data ?? []]),
      ) as unknown as AdminContent;
    },
    async saveArticle(input: ArticleInput, authorId: string): Promise<Row> {
      const { id, ...values } = input;
      const payload = {
        ...values,
        author_id: authorId,
        published_at: input.status === "published" ? new Date().toISOString() : null,
      };
      const result = id
        ? await db.from("articles").update(payload).eq("id", id).select().single()
        : await db.from("articles").insert(payload).select().single();
      if (result.error) throw new Error(result.error.message);
      return result.data as Row;
    },
    async saveSimpleContent(table: SimpleTable, id: string | undefined, values: Row) {
      const { error } = id
        ? await db.from(table).update(values).eq("id", id)
        : await db.from(table).insert(values);
      if (error) throw new Error(error.message);
    },
    async deleteContent(table: DeletableTable, id: string) {
      const { error } = await db.from(table).delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
  };
}
