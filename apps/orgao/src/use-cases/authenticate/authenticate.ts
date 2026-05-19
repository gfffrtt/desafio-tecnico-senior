import { randomUUID } from "crypto";
import { db } from "../../infra/db/db";
import { authToken } from "../../infra/db/schema";
import { addMinutes } from "date-fns";

export const authenticate = async (
  password: string,
  config: { expiresInMinutes: number; expectedPassword: string },
) => {
  if (password !== config.expectedPassword) {
    return "invalid-password";
  }
  const token = randomUUID();
  const expiresAt = new Date();
  await db.insert(authToken).values({
    token,
    expiresAt: addMinutes(expiresAt, config.expiresInMinutes),
  });
  return token;
};
