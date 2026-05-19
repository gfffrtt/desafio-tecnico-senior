import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { authenticate } from "../../use-cases/authenticate/authenticate";

export const authRoutes = new Hono()
  .post(
    "/authenticate-ima",
    zValidator("json", z.object({ password: z.string() })),
    async (c) => {
      const token = await authenticate(c.req.valid("json").password, {
        expiresInMinutes: 1,
        expectedPassword: "senha-secreta-ima",
        orgao: "ima",
      });
      if (token === "invalid-password") {
        return c.json({ error: "invalid-password" }, 401);
      }
      return c.json({ token });
    },
  )
  .post(
    "/authenticate-semad",
    zValidator("json", z.object({ password: z.string() })),
    async (c) => {
      const token = await authenticate(c.req.valid("json").password, {
        expiresInMinutes: 5,
        expectedPassword: "senha-secreta-semad",
        orgao: "semad",
      });
      if (token === "invalid-password") {
        return c.json({ error: "invalid-password" }, 401);
      }
      return c.json({ token });
    },
  )
  .post(
    "/authenticate-inea",
    zValidator("json", z.object({ password: z.string() })),
    async (c) => {
      const token = await authenticate(c.req.valid("json").password, {
        expiresInMinutes: 10,
        expectedPassword: "senha-secreta-inea",
        orgao: "inea",
      });
      if (token === "invalid-password") {
        return c.json({ error: "invalid-password" }, 401);
      }
      return c.json({ token });
    },
  );
