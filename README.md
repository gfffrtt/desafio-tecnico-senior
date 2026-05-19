# Desafio Técnico — Desenvolvedor(a) Sênior

## Contexto

Neste repositório existe um serviço chamado `apps/orgao` que simula três órgãos ambientais brasileiros (IMA, SEMAD e INEA). Cada um expõe seus próprios endpoints, sua própria autenticação e seu próprio formato de MTR (Manifesto de Transporte de Resíduos).

Seu trabalho é construir, em volta desse serviço, uma solução que mantenha os MTRs consolidados e atualizados.

## O que entregar

1. **Cron** que roda a cada 5 minutos e puxa atualizações de **todos** os órgãos para **todos** os CNPJs cadastrados.
2. **Rota de API** que permite disparar manualmente a sincronização de um órgão específico (trigger).
3. **Frontend em Next.js** com:
   - Lista consolidada dos MTRs (independente do órgão de origem).
   - Botão de "sincronizar agora".
   - Tela de visualização individual de um MTR.

Tudo deve rodar dentro do **Turborepo** já existente (workspaces pnpm configurados em [pnpm-workspace.yaml](pnpm-workspace.yaml)).

## Regras de negócio

- O retorno do órgão para um MTR representa sempre o **estado final atual** daquele manifesto — não é um delta nem um evento.
- A persistência deve ser idempotente: use o **número do manifesto** do MTR.

Uma nova sincronização sobrescreve o estado anterior do mesmo MTR.

## Restrições obrigatórias

- Frontend em **Next.js**.
- ORM em **Drizzle**.
- Banco em **MySQL**, reaproveitando a instância já definida em [docker-compose.yml](docker-compose.yml).
- Tudo orquestrado pelo **Turborepo** já existente.

O resto (estrutura de pastas, separação de apps, framework de backend, lib de cron, estilo do front, estratégia de fila/retry, etc.) é decisão sua e será avaliada.

## Como rodar o que já existe

Pré-requisitos: **Node.js >= 18**, **pnpm 9** e **Docker**.

Na raiz do repositório:

```bash
pnpm install
pnpm setup   # sobe o MySQL via docker compose, faz db:push e roda o seed do apps/orgao
pnpm dev     # turbo dev em todos os apps
```

O serviço `apps/orgao` sobe em `http://localhost:8000`.

> Não modifique o `apps/orgao`. Tudo que você precisar entender sobre ele está no código em [apps/orgao/src/](apps/orgao/src/).

## O serviço `apps/orgao`

**CNPJs disponíveis para teste**: ver podem ser encontrados a fazer um `SELECT` na tabela de clientes

**Rotas existentes**:

- `POST /auth/authenticate-ima`
- `POST /auth/authenticate-semad`
- `POST /auth/authenticate-inea`
- `POST /mtrs/mtrs-ima`
- `POST /mtrs/mtrs-semad`
- `POST /mtrs/authenticate-inea` _(sim, o nome da rota é esse mesmo — é o endpoint de MTRs do INEA)_

**Fluxo básico de autenticação**:

1. `POST` em `/auth/authenticate-<orgao>` com a senha do órgão → recebe um `token`.
2. Usa o `token` no header `Authorization` ao chamar a rota de MTRs do mesmo órgão, junto com um `cnpj` no body.

## Avaliação

Serão considerados:

- Qualidade e organização do código.
- Modelagem da consolidação dos MTRs heterogêneos.
- Robustez do consumo dos órgãos.
- DX (facilidade de subir o projeto, scripts, tipagem).
- Clareza das decisões técnicas tomadas.
