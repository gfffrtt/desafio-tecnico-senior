import { eq } from "drizzle-orm";
import { db } from "../../infra/db/db";
import { clients } from "../../infra/db/schema";
import { faker } from "@faker-js/faker";

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
  return new Array(faker.number.int({ min: 1, max: 5 }))
    .fill(0)
    .map(() => config.generateMtrs());
};
