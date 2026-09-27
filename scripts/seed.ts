import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../drizzle/schema';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

// Load .env
dotenv.config();

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not configured");

const sql = neon(url);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding database...");

  // 1. Delete existing data
  console.log("Clearing existing data...");
  await db.delete(schema.articles);
  await db.delete(schema.categories);
  await db.delete(schema.users);
  await db.delete(schema.services);
  await db.delete(schema.programs);
  await db.delete(schema.faqs);
  await db.delete(schema.testimonials);

  // 2. Insert admin user
  console.log("Creating admin user...");
  const passwordHash = await bcrypt.hash("admin@123", 10);
  const [admin] = await db.insert(schema.users).values({
    email: "admin@healingemotion.co",
    passwordHash,
  }).returning();
  
  // 3. Insert categories
  console.log("Creating categories...");
  const [catMental] = await db.insert(schema.categories).values({
    name: "Mental Health",
    slug: "mental-health",
    description: "Articles about mental well-being",
  }).returning();

  const [catTherapy] = await db.insert(schema.categories).values({
    name: "Therapy",
    slug: "therapy",
    description: "Understanding therapy and counseling",
  }).returning();

  // 4. Insert mock articles
  console.log("Creating articles...");
  await db.insert(schema.articles).values([
    {
      title: "Understanding Anxiety in Modern Life",
      slug: "understanding-anxiety",
      excerpt: "A brief guide to recognizing and managing daily anxiety.",
      content: "<p>Anxiety is a normal emotion, but when it becomes overwhelming, it can affect our daily lives...</p>",
      categoryId: catMental.id,
      status: "published",
      authorId: admin.id,
      publishedAt: new Date(),
    },
    {
      title: "The Benefits of Cognitive Behavioral Therapy",
      slug: "benefits-of-cbt",
      excerpt: "How CBT can help reframe negative thought patterns.",
      content: "<p>Cognitive Behavioral Therapy (CBT) is one of the most effective treatments for depression...</p>",
      categoryId: catTherapy.id,
      status: "published",
      authorId: admin.id,
      publishedAt: new Date(),
    }
  ]);

  // 5. Insert mock services
  console.log("Creating services...");
  await db.insert(schema.services).values([
    {
      title: "Individual Counseling",
      slug: "individual-counseling",
      summary: "One-on-one therapy tailored to your needs.",
      body: "We provide individual counseling for adults...",
    },
    {
      title: "Couples Therapy",
      slug: "couples-therapy",
      summary: "Improve communication and strengthen your relationship.",
      body: "Our couples therapy sessions focus on...",
    }
  ]);

  console.log("Seeding complete!");
}

seed().catch(console.error);
