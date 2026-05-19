import { faker } from "@faker-js/faker";
import { getRandomNumeroManifesto } from "./mock/numeros-manifesto";
import { format } from "date-fns";
import { orNull } from "./mock/or-null";
import { or } from "./mock/or";

export const mtrsInea = () => ({
  manifesto: getRandomNumeroManifesto(),
  dataEmissao: format(faker.date.recent({ days: 30 }), "yyyy/MM/dd"),
  situacao: faker.helpers.arrayElement(["EMITIDO", "CDF", "CANCELADO"]),
  listaDeResiduos: new Array(
    faker.number.int({ min: or(1, 10, 0.15), max: or(10, 500, 0.15) }),
  )
    .fill(0)
    .map(() => ({
      codigoResiduo: faker.string.numeric(10),
      nomeResiduo: faker.lorem.word(),
      quantidadeEmitida: faker.number.float({
        min: 1,
        max: 1000,
        fractionDigits: 5,
      }),
      quantidadeRecebida: faker.number.float({
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
