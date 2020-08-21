const { database } = require('../../config/');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(database);

module.exports.summaryModel = {
  getSummaryByDate: async (summaryDate) => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT
          Transactions.id_transaction AS id,
          Transactions.date,
          Transactions.type,
          Transactions.amount,
          Transactions.description,
          Transactions.id_category AS categoryId,
          Categories.name AS categoryName
        FROM Transactions
        JOIN Categories
        ON Transactions.id_category = Categories.id_category
        WHERE date(Transactions.date) = date($date);`,
        {$date: summaryDate},
        (err, transactions) => {
          if (err) reject(err);
          resolve(transactions);
        }
      );
    });
  },
};