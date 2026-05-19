import { faker } from "@faker-js/faker";
import { getRandomNumeroManifesto } from "./mock/numeros-manifesto";
import { format } from "date-fns";
import { orNull } from "./mock/or-null";
import { or } from "./mock/or";

export const mtrsIma = () => ({
  codigoManifesto: getRandomNumeroManifesto(),
  emissao: format(faker.date.recent({ days: 30 }), "DDMMYYYY"),
  status: faker.helpers.arrayElement(["EMITIDO", "CDF", "CANCELADO"]),
  residuos: new Array(
    faker.number.int({ min: or(1, 10, 0.15), max: or(10, 500, 0.15) }),
  )
    .fill(0)
    .map(() => ({
      codigo: faker.string.numeric(10),
      nome: faker.lorem.word(),
      quantidade: faker.number.float({ min: 1, max: 1000, fractionDigits: 5 }),
      quantidadeDestinada: faker.number.float({
        min: 1,
        max: 1000,
        fractionDigits: 5,
      }),
      unidade: faker.helpers.arrayElement(["kg", "g", "l", "ml", "m³", "cm³"]),
    })),
});
