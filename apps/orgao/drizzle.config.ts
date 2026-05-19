import "dotenv/config";
export default {
  schema: "./src/infra/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
