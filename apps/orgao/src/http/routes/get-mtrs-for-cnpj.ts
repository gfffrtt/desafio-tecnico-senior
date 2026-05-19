import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { getMtrsForCnpj } from "../../use-cases/get-mtrs-for-cnpj/get-mtrs-for-cnpj";
import { authMiddleware } from "../middleware/auth";
import { mtrsIma } from "../../use-cases/get-mtrs-for-cnpj/ima";
import { mtrsSemad } from "../../use-cases/get-mtrs-for-cnpj/semad";
import { mtrsInea } from "../../use-cases/get-mtrs-for-cnpj/inea";

export const getMtrsForCnpjRoutes = new Hono()
  .use(authMiddleware)
  .post(
    "/mtrs-ima",
    zValidator("json", z.object({ cnpj: z.string() })),
    async (c) => {
      const mtrs = await getMtrsForCnpj(c.req.valid("json").cnpj, {
        generateMtrs: mtrsIma,
      });
      if (mtrs === "client-not-found") {
        return c.json({ error: "client-not-found" }, 404);
      }
      return c.json({ mtrs });
    },
  )
  .post(
    "/mtrs-semad",
    zValidator("json", z.object({ cnpj: z.string() })),
    async (c) => {
      const mtrs = await getMtrsForCnpj(c.req.valid("json").cnpj, {
        generateMtrs: mtrsSemad,
      });
      if (mtrs === "client-not-found") {
        return c.json({ error: "client-not-found" }, 404);
      }
      return c.json({ mtrs });
    },
  )
  .post(
    "/authenticate-inea",
    zValidator("json", z.object({ cnpj: z.string() })),
    async (c) => {
      const mtrs = await getMtrsForCnpj(c.req.valid("json").cnpj, {
        generateMtrs: mtrsInea,
      });
      if (mtrs === "client-not-found") {
        return c.json({ error: "client-not-found" }, 404);
      }
      return c.json({ mtrs });
    },
  );
