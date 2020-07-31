# Como Usar a API

## SCRIPTS

- Para iniciar a aplicação em modo de produção execute:
```sh
npm install
npm run start
```

- Para iniciar a aplicação em modo de desenvolvimento execute:
```sh
npm install
npm run dev
```

- Neste modo, a base de dados deve ser criada manualmente executando:
```sh
npm run migration
```

- Caso queira popular o banco de dados para teste, execute:
```sh
npm run seed
```



## Categories
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
      "name": "categoryName",
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
      "name": "categoryName",
    },
    {
      "id": 2,
      "name": "categoryName",
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
      "name": "categoryName",
    },
  ]
}
```

__PUT /api/categories/:id__
- Atualiza uma categoria pelo seu ID;
- Exige um body JSON no formato:
```json
{
  "name": "categoryName",
}
```
- Retorna a categoria atualizada em JSON no formato:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "categoryName",
    },
  ]
}
```

__DELETE /api/categories/:id__
- Deleta uma categoria pelo seu ID.

## Transactions
Manipula transações financeiras de entrada e saída.

__POST /api/transactions/__
- Cria uma transação financeira de saída ou entrada.
- Exige um body JSON no formato:
```json
{
  "date": "2020-07-21T14:25:58.449Z",
  "type": "cash-in",
  "amount": 99.9,
  "description": "Sold a Product",
  "category": { "id": 1, "name": "categoryName" },
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
      "category": { "id": 1, "name": "categoryName" },
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
      "category": { "id": 1, "name": "categoryName" },
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
  "category": { "id": 1, "name": "categoryName" },
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
      "category": { "id": 1, "name": "categoryName" },
    }
  ]
}
```
__DELETE /api/transactions/:id__
- Deleta uma transação pelo seu ID.

## Summary
Retorna o resumo das transações de uma data especificada.

__GET /api/summary__
- Retorna o resumo das transações na data atual.
- Retorno JSON no formato:
```json
{
  "balance": 49.9,
  "totalCashIn": 99.9,
  "totalCashout": 50,
  "transactions": [
    {
      "id": 1,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-in",
      "amount": 99.90,
      "description": "Sold a Product",
      "category": { "id": 1, "name": "categoryName" },
    },
    {
      "id": 2,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-out",
      "amount": 50.00,
      "description": "Electricity bill payment",
      "category": { "id": 1, "name": "categoryName" },
    },
  ]
};
```

__GET /api/summary/:date__
- Retorna o resumo das transações na data especificada.
- Retorno JSON no formato:
```json
{
  "balance": 15.5,
  "totalCashIn": 25.5,
  "totalCashout": 10,
  "transactions": [
    {
      "id": 1,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-in",
      "amount": 25.50,
      "description": "Sold a Product",
      "category": { "id": 1, "name": "categoryName" },
    },
    {
      "id": 2,
      "date": "2020-07-21T14:25:58.449Z",
      "type": "cash-out",
      "amount": 10.00,
      "description": "Buying a new lamp",
      "category": { "id": 1, "name": "categoryName" },
    },
  ]
};
```