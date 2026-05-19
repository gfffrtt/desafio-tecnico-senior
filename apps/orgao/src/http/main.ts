import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRoutes } from "./routes/auth";
import { instabilityMiddleware } from "./middleware/instability";
import { getMtrsForCnpjRoutes } from "./routes/get-mtrs-for-cnpj";
import { logger } from "hono/logger";

console.log("Starting server...");
const app = new Hono()
  .use(logger())
  .use(instabilityMiddleware)
  .route("/auth", authRoutes)
  .route("/mtrs", getMtrsForCnpjRoutes);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
