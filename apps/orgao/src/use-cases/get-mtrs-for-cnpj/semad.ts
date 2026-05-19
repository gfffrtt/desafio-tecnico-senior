import { faker } from "@faker-js/faker";
import { getRandomNumeroManifesto } from "./mock/numeros-manifesto";
import { format } from "date-fns";
import { or } from "./mock/or";

export const mtrsSemad = () => ({
  numMtr: getRandomNumeroManifesto(),
  data: format(faker.date.recent({ days: 30 }), "YYYY/MM/DD"),
  status: faker.helpers.arrayElement(["EMITIDO", "CDF", "CANCELADO"]),
  dejetos: new Array(
    faker.number.int({ min: or(1, 10, 0.15), max: or(10, 500, 0.15) }),
  )
    .fill(0)
    .map(() => ({
      unidade: faker.string.numeric(10),
      residuo: faker.lorem.word(),
      quantidadeColetada: faker.number.float({
        min: 1,
        max: 1000,
        fractionDigits: 5,
      }),
      quantidade: faker.number.float({
        min: 1,
        max: 1000,
        fractionDigits: 5,
      }),
      unidadeMedida: faker.helpers.arrayElement([
        "KG",
        "G",
        "L",
        "ML",
        "M³",
        "CM³",
      ]),
    })),
});
