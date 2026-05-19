import "dotenv/config";
import { db } from "../infra/db/db";
import { clients } from "../infra/db/schema";

const seedClients = [
  { cnpj: "11222333000181" },
  { cnpj: "11444777000161" },
  { cnpj: "60819443000103" },
  { cnpj: "60746948000112" },
  { cnpj: "00000000000191" },
];

async function seed() {
  const existingClients = await db.select().from(clients);
  if (existingClients.length > 0) {
    console.log("Clients already seeded");
    return;
  }
  await db.insert(clients).values(seedClients);
  console.log(`Seeded ${seedClients.length} clients`);
}

seed();
