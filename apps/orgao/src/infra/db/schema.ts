import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const authToken = mysqlTable("auth_token", {
  id: int("id").primaryKey().autoincrement(),
  token: varchar("token", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const clients = mysqlTable("clients", {
  id: int("id").primaryKey().autoincrement(),
  cnpj: varchar("cnpj", { length: 14 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
