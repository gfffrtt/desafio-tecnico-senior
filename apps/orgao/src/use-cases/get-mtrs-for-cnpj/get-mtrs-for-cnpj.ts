import { eq } from "drizzle-orm";
import { db } from "../../infra/db/db";
import { clients } from "../../infra/db/schema";

export const getMtrsForCnpj = async (
  cnpj: string,
  config: {
    generateMtrs: () => unknown;
  },
) => {
  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.cnpj, cnpj))
    .limit(1);
  if (!client) return "client-not-found";
  return config.generateMtrs();
};
