import { createServerFn } from "@tanstack/react-start";
import { setCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../../drizzle/schema";

function getDb() {
  const url = process.env['DATABASE_URL'];
  if (!url) throw new Error("DATABASE_URL is not configured");
  return drizzle(neon(url), { schema });
}

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ email: z.string().email(), password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const db = getDb();
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, data.email),
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    // In a real app, use JWT. For this simple case, just set the user ID in a cookie.
    setCookie("admin_session", user.id, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { ok: true };
  });

export const logoutFn = createServerFn({ method: "POST" })
  .handler(async () => {
    deleteCookie("admin_session");
    return { ok: true };
  });

export const checkAuthFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { getCookie } = await import("@tanstack/react-start/server");
    const userId = getCookie("admin_session");
    return { user: userId ? { id: userId } : null };
  });
