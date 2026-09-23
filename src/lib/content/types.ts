// Backend-agnostic content contract.
// Every read and write the website and workspace need is described here.
// Swapping to a self-hosted backend means writing a new implementation of
// ContentRepository / AdminContentRepository — no page or component changes.

export type Row = Record<string, any>;

export type PublicContent = {
  services: Row[];
  programs: Row[];
  faqs: Row[];
  testimonials: Row[];
  articles: Row[];
  categories: Row[];
  settings: Row[];
};

export type AdminContent = {
  articles: Row[];
  categories: Row[];
  services: Row[];
  programs: Row[];
  faqs: Row[];
  testimonials: Row[];
  site_settings: Row[];
};

export type ArticleInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string | null;
  status: "draft" | "published";
  featured: boolean;
  reading_minutes: number;
  scheduled_for: string | null;
  seo_title: string;
  seo_description: string;
};

export type SimpleTable = "services" | "programs" | "faqs" | "testimonials";
export type DeletableTable = "articles" | SimpleTable;

/** Reads available to anyone visiting the website. */
export interface ContentRepository {
  getPublicContent(): Promise<PublicContent>;
  getPublicArticle(slug: string): Promise<Row>;
}

/** Reads and writes available to a signed-in administrator. */
export interface AdminContentRepository {
  /** Throws when the current user is not an administrator. */
  assertAdmin(): Promise<void>;
  getAdminContent(): Promise<AdminContent>;
  saveArticle(input: ArticleInput, authorId: string): Promise<Row>;
  saveSimpleContent(table: SimpleTable, id: string | undefined, values: Row): Promise<void>;
  deleteContent(table: DeletableTable, id: string): Promise<void>;
}
