// Backend-agnostic content contract.
// Every read and write the website and workspace need is described here.
// Swapping to a self-hosted backend means writing a new implementation of
// ContentRepository / AdminContentRepository — no page or component changes.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = any;

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
  hospitals: Row[];
  booking_requests: Row[];
};

export type Hospital = {
  id: string; slug: string; name: string; area: string; address: string; phone: string;
  timings: string; map_query: string; services: string; active: boolean; sort_order: number;
};
export type HospitalInput = Omit<Hospital, "id"> & { id?: string | undefined };

export type BookingRequestInput = {
  segment: string; specialist: string; visit_mode: "clinic" | "home" | "online";
  hospital_slug: string | null; name: string; phone: string; area: string | null;
  preferred_time: string | null; notes: string | null;
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
export type DeletableTable = "articles" | SimpleTable | "hospitals" | "booking_requests";

/** Reads available to anyone visiting the website. */
export interface ContentRepository {
  getPublicContent(): Promise<PublicContent>;
  getPublicArticle(slug: string): Promise<Row>;
  getHospitals(): Promise<Hospital[]>;
  createBookingRequest(input: BookingRequestInput): Promise<{ id: string }>;
}

/** Reads and writes available to a signed-in administrator. */
export interface AdminContentRepository {
  /** Throws when the current user is not an administrator. */
  assertAdmin(): Promise<void>;
  getAdminContent(): Promise<AdminContent>;
  saveArticle(input: ArticleInput, authorId: string): Promise<Row>;
  saveSimpleContent(table: SimpleTable, id: string | undefined, values: Row): Promise<void>;
  deleteContent(table: DeletableTable, id: string): Promise<void>;
  saveHospital(input: HospitalInput): Promise<void>;
  setBookingStatus(id: string, status: string): Promise<void>;
}
