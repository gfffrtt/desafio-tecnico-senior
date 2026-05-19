import { createMiddleware } from "hono/factory";
import { isValidAuthToken } from "../../use-cases/is-valida-auth-token/is-valid-auth-token";

export const authMiddleware = (orgao: "ima" | "semad" | "inea") =>
  createMiddleware(async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token) {
      return c.json({ error: "unauthorized" }, 401);
    }
    const isValid = await isValidAuthToken(token, orgao);
    if (isValid === "token-not-found") {
      return c.json({ error: "unauthorized" }, 401);
    }
    if (isValid === "token-expired") {
      return c.json({ error: "token-expired" }, 401);
    }
    await next();
  });
