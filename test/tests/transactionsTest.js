const request = require('supertest');
const { expect } = require('chai');

module.exports.transactionsTest = (app, db, url) => {

  describe('POST /api/transactions/', () => {
    let newTransaction;

    beforeEach(async() => {
      newTransaction = {
        date: '2020-08-20T20:34:19.710Z',
        type: 'cash-in',
        amount: 59.95,
        description: 'Sold a product',
        category: { id: 2, name: 'Sale'}
      };
    })

    it('should create a valid transaction', async() => {
      const response = await request(app)
      .post(url)
      .send(newTransaction);

      const transaction = response.body.transactions[0];
      await validateTransactionOnDb(transaction, db);
    });

    it('should return the transaction created', async() => {
      const response = await request(app)
      .post(url)
      .send(newTransaction);

      const transactions = response.body.transactions;
      validateTransactions(transactions);
    });

    it('should return 201 code for transaction creation', async() => {
      const response = await request(app)
      .post(url)
      .send(newTransaction);
      expect(response.status).to.equal(201);
    });

    it('should return 400 code for invalid transaction', async() => {
      const response = await request(app)
      .post(url)
      .send(newTransaction = {});
      expect(response.status).to.equal(400);
    });
  });

  describe('GET /api/transactions/:id', () => {

    let idTransaction;

    beforeEach(async() => {
      idTransaction = 1;
    });

    it('should return a transaction with the given id', async() => {
      const response = await request(app)
      .get(`${url}/${idTransaction}`)
      .send();

      const transactions = response.body.transactions;
      validateTransactions(transactions);

      const transaction = transactions[0];
      await validateTransactionOnDb(transaction, db);

      expect(transaction.id).to.equal(idTransaction);
    });

    it('should return 200 status code for valid id', async() => {
      const response = await request(app)
      .get(`${url}/${idTransaction}`)
      .send();
      expect(response.status).to.equal(200);
    });

    it('should return 404 status code for invalid id', async() => {
      const response = await request(app)
      .get(`${url}/9999`)
      .send();
      expect(response.status).to.equal(404);
    });
  });

  describe('PUT /api/transactions/:id', () => {
    let idTransaction;
    let newTransaction;

    beforeEach(async() => {
      idTransaction = 1;
      newTransaction = {
        date: '2020-08-20T20:34:19.710Z',
        type: 'cash-in',
        amount: 59.95,
        description: 'Sold a product',
        category: { id: 2, name: 'Sale'}
      };
    })

    it('should update a transaction with the given id', async() => {
      const response = await request(app)
      .put(`${url}/${idTransaction}`)
      .send(newTransaction);

      const transaction = response.body.transactions[0];
      expect(transaction.id).to.equal(idTransaction);
      await validateTransactionOnDb(transaction, db);
    });

    it('should return a updated transaction', async() => {
      const response = await request(app)
      .put(`${url}/${idTransaction}`)
      .send(newTransaction);

      const transactions = response.body.transactions;
      validateTransactions(transactions);
      const transaction = transactions[0];
      expect(transaction.id).to.equal(idTransaction);
      
    });
    
    it('should return 200 code for transaction updated', async() => {
      const response = await request(app)
      .put(`${url}/1`)
      .send(newTransaction);
      expect(response.status).to.equal(200);
    });

    it('should return 400 code for invalid transaction', async() => {
      const response = await request(app)
      .put(`${url}/1`)
      .send(newTransaction = {});
      expect(response.status).to.equal(400);
    });
    
    it('should return 404 code for invalid id', async() => {
      const response = await request(app)
      .put(`${url}/9999`)
      .send(newTransaction);
      expect(response.status).to.equal(404);
    });
  });

  describe('DELETE /api/transactions/:id', () => {

    let idTransaction = 0;

    beforeEach(async() => {
      idTransaction++;
    });

    it('should delete a transaction with the given id', async() => {
      await request(app)
      .delete(`${url}/${idTransaction}`)
      .send();

      db.get(
        `SELECT * FROM Transactions WHERE id_transaction = ${idTransaction}`,
        (err, transaction) => {
          expect(transaction).to.be.undefined;
        }
      );
    });

    it('should return 204 code for transaction deleted', async() => {
      const response = await request(app)
      .delete(`${url}/${idTransaction}`)
      .send();
      expect(response.status).to.equal(204);
    });

    it('should return 404 code for invalid id', async() => {
      const response = await request(app)
      .delete(`${url}/9999`)
      .send();
      expect(response.status).to.equal(404);
    });
  });
};

const validateTransactions = (transactions) => {
  expect(transactions).to.exist;
  expect(transactions).to.be.an('array');

  const transaction = transactions[0];
  expect(transaction).to.exist;
  expect(transaction.id).to.be.a('number');
  expect(transaction.date).to.be.a('string');
  expect(transaction.type).to.be.a('string');
  expect(transaction.amount).to.be.a('number');
  expect(transaction.description).to.be.a('string');
  expect(transaction.category.id).to.be.a('number');
  expect(transaction.category.name).to.be.a('string');
};

const validateTransactionOnDb = async(transaction, db) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM Transactions WHERE id_transaction = ${transaction.id}`,
      (err, result) => {
        expect(result).to.exist;
        expect(result.id_transaction).to.equal(transaction.id);
        expect(result.date).to.equal(transaction.date);
        expect(result.type).to.equal(transaction.type);
        expect(result.amount).to.equal(transaction.amount);
        expect(result.description).to.equal(transaction.description);
        expect(result.id_category).to.equal(transaction.category.id);
      }
    );
    resolve();
  })
}