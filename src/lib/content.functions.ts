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
