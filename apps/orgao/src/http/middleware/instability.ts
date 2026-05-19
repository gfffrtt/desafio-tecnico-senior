import { createMiddleware } from "hono/factory";

export const instabilityMiddleware = createMiddleware(async (c, next) => {
  const random = Math.random();
  if (random < 0.15) {
    return c.json({ error: "instability" }, 500);
  }
  await next();
});
