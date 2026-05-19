import { eq } from "drizzle-orm";
import { db } from "../../infra/db/db";
import { authToken } from "../../infra/db/schema";

export const isValidAuthToken = async (token: string) => {
  const [tokenResult] = await db
    .select()
    .from(authToken)
    .where(eq(authToken.token, token))
    .limit(1);
  if (!tokenResult) {
    return "token-not-found";
  }
  if (tokenResult.expiresAt < new Date()) {
    return "token-expired";
  }
  return "token-valid";
};
