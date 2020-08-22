const request = require('supertest');
const { expect } = require('chai');

module.exports.summaryTest = (app, db, url) => {
  
  describe('GET /api/summary', () => {

    it('should return the summary of the current date', async() => {
      const response = await request(app)
      .get(url)
      .send();
      validateSummary(response.body);
    });

    it('should return 200 code for summary of the current date', async() => {
      const response = await request(app)
      .get(url)
      .send();
      expect(response.status).to.equal(200);
    });
  });

  describe('GET /api/summary/:date', () => {
    let date;

    beforeEach(async() => {
      date = new Date();
    });

    it('should return the summary of the given date', async() => {
      const response = await request(app)
      .get(`${url}/${date.toISOString()}`)
      .send();
      
      validateSummary(response.body);
      
      const transactions = response.body.transactions;
      transactions.forEach(transaction => {
        let dateTransaction = new Date(transaction.date);
        expect(dateTransaction.getFullYear()).to.equal(date.getFullYear());
        expect(dateTransaction.getMonth()).to.equal(date.getMonth());
        expect(dateTransaction.getDay()).to.equal(date.getDay());
      });
    })
    
    it('should return 200 code for a valid date', async() => {
      const response = await request(app)
      .get(`${url}/${date.toISOString()}`)
      .send();
      expect(response.status).to.equal(200);
    });

    it('should return 400 code for a invalid date', async() => {})
  })
};

const validateSummary = (summary) => {

  expect(summary).to.exist;

  let balance = 0,
      totalCashIn = 0,
      totalCashOut = 0,
      transactions = summary.transactions;

  expect(transactions).to.be.an('array');

  transactions.forEach(transaction => {
    if(transaction.type === 'cash-in') {
      totalCashIn +=  transaction.amount;
    } else {
      totalCashOut += transaction.amount;
    };
  });
  
  balance = parseFloat((totalCashIn - totalCashOut).toFixed(2));
  totalCashIn = parseFloat(totalCashIn.toFixed(2));
  totalCashOut = parseFloat(totalCashOut.toFixed(2));

  expect(summary.balance).to.equal(balance);
  expect(summary.totalCashIn).to.equal(totalCashIn);
  expect(summary.totalCashOut).to.equal(totalCashOut);
};