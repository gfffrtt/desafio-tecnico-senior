import { createMiddleware } from "hono/factory";
import { isValidAuthToken } from "../../use-cases/is-valida-auth-token/is-valid-auth-token";

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization");
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const isValid = await isValidAuthToken(token);
  if (isValid === "token-not-found") {
    return c.json({ error: "Unauthorized" }, 401);
  }
  if (isValid === "token-expired") {
    return c.json({ error: "Token expired" }, 401);
  }
  await next();
});
