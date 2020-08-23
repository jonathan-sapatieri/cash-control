# CONFIGURAÇOES

## Estrutura do Diretório
```
src
  |__api
      |__controllers (requisições e respostas)
      |__models (operações de banco de dados)
      |__services (regras de negócios)
  |__config
      |_index.js
  |__database
      |__index.js
  |__routes
      |__index.js
  |__utils
  |__index.js
package.json
package-lock.json
README.md
server.js
```

## Variáveis de Ambientes
- Diretório arquivo env: ./src/config/.env
```.env
# APP
PORT=

# DATABASE
DB_DEV_SRC=
DB_TEST_SRC=
DB_PROD_SRC=
```
- **PORT**: define a porta de execução da aplicação;
- **DB_DEV_SRC**: define o diretório da base de dados de desenvolvimento;
- **DB_TEST_SRC**: define o diretório da base de dados de teste;
- **DB_PROD_SRC**: define o diretório da base de dados de produção.

## Scripts
- Para instalar as depências do projeto, execute:
```sh
npm install
```
- Para iniciar a aplicação em modo de **produção** execute:
```sh
npm run migrate
npm run start
```
- Para iniciar a aplicação em modo de **desenvolvimento** execute:
```sh
npm run migrate:dev
npm run start:dev
```
A base de dados do modo de desenvolvimentos possui dados fictícios para testes.

- Para executar os testes automatizados, execute:
```sh
npm test
```

# ROTAS

## Categorias (Categories)
Manipula todas as categorias utilizadas pelas transações de entrada ou saída.

__POST /api/categories__
- Cria uma nova categoria.
- Exige um body JSON no formato:
```json
{
  "name": "categoryName"
}
```
- Retorna a nova categoria em JSON no formato:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "categoryName"
    }
  ]
}
```

__GET /api/categories__
- Lista todas as categorias.
- Retorno JSON no formato:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "categoryName"
    },
    {
      "id": 2,
      "name": "categoryName"
    }
  ]
}
```

__GET /api/categories/:id__
- Lista uma categoria pelo seu ID.
- Retorno JSON no formato:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "categoryName"
    }
  ]
}
```

__PUT /api/categories/:id__
- Atualiza uma categoria pelo seu ID;
- Exige um body JSON no formato:
```json
{
  "name": "categoryName"
}
```
- Retorna a categoria atualizada em JSON no formato:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "categoryName"
    }
  ]
}
```

__DELETE /api/categories/:id__
- Deleta uma categoria pelo seu ID caso ela não esteja vinculada à nenhuma transação.

## Transações (Transactions)
Manipula transações financeiras de entrada e saída.

__POST /api/transactions/__
- Cria uma transação financeira de entrada ou saída.
- Exige um body JSON no formato:
```json
{
  "date": "2020-07-21T14:25:58.449Z",
  "type": "cash-in",
  "amount": 99.9,
  "description": "Sold a Product",
  "category": { "id": 1, "name": "categoryName" }
}
```
- Retorna a nova transação em JSON no formato:
```json
{
  "transactions":  [
    {
      "id": 1,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-in",
      "amount": 99.9,
      "description": "Sold a Product",
      "category": { "id": 1, "name": "categoryName" }
    }
  ]
}
```

__GET /api/transactions/:id__
- Lista uma transação pelo seu ID.
- Retorno JSON no formato:
```json
{
  "transactions":  [
    {
      "id": 1,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-in",
      "amount": 99.9,
      "description": "Sold a Product",
      "category": { "id": 1, "name": "categoryName" }
    }
  ]
}
```

__PUT /api/transactions/:id__
- Atualiza uma transação pelo seu ID.
- Exige um body JSON no formato:
```json
{
  "date": "2020-07-21T14:25:58.449Z",
  "type": "cash-in",
  "amount": 99.90,
  "description": "Sold a Product",
  "category": { "id": 1, "name": "categoryName" }
}
```
- Retorna a transação atualizada em JSON no formato:
```json
{
  "transactions":  [
    {
      "id": 1,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-in",
      "amount": 99.90,
      "description": "Sold a Product",
      "category": { "id": 1, "name": "categoryName" }
    }
  ]
}
```
__DELETE /api/transactions/:id__
- Deleta uma transação pelo seu ID.

## Resumo (Summary)
Retorna o resumo das transações de uma data especificada.

__GET /api/summary__
- Retorna o resumo das transações na data atual.
- Retorno JSON no formato:
```json
{
  "balance": 40.00,
  "totalCashIn": 99.99,
  "totalCashOut": 59.99,
  "transactions": [
    {
      "id": 1,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-in",
      "amount": 99.99,
      "description": "Sold a Product",
      "category": { "id": 1, "name": "categoryName" }
    },
    {
      "id": 2,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-out",
      "amount": 59.99,
      "description": "Electricity bill payment",
      "category": { "id": 1, "name": "categoryName" }
    }
  ]
};
```

__GET /api/summary/:date__
- Retorna o resumo das transações na data especificada.
- A data deve estar no formato especificado pela  IS0-8601. Ex. 2020-07-21T14:25:58.449Z.
- Retorno JSON no formato:
```json
{
  "balance": 40.00,
  "totalCashIn": 99.99,
  "totalCashOut": 59.99,
  "transactions": [
    {
      "id": 1,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-in",
      "amount": 99.99,
      "description": "Sold a Product",
      "category": { "id": 1, "name": "categoryName" }
    },
    {
      "id": 2,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-out",
      "amount": 59.99,
      "description": "Electricity bill payment",
      "category": { "id": 1, "name": "categoryName" }
    }
  ]
};
```