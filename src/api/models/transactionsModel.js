const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/database.sqlite');

module.exports = transactionsModel = {
  save: async (transaction) => {
    const { date, type, amount, description, category } = transaction;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Transactions 
        (date, type, amount, description, id_category)
        VALUES
        ($date, $type, $amount, $description, $id_category);`,
        {
          $date: date,
          $type: type,
          $amount: amount,
          $description: description,
          $id_category: category,
        },
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  getById: async (transactionId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT
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
        WHERE Transactions.id_transaction = $id;`,
        { $id: transactionId },
        (err, transaction) => {
          if (err) reject(err);
          resolve(transaction);
        }
      );
    });
  },

  getByCategory: async (categoryId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM Transactions WHERE Transactions.id_category = $id`,
        { $id: categoryId },
        (err, categories) => {
          if (err) reject(err);
          resolve(categories);
        }
      );
    });
  },

  update: async (transactionId, transaction) => {
    const { date, type, amount, description, category } = transaction;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE Transactions
        SET date = $date, 
            type= $type, 
            amount= $amount, 
            description = $description, 
            id_category = $category
        WHERE Transactions.id_transaction = $id;
        `,
        {
          $id: transactionId,
          $date: date,
          $type: type,
          $amount: amount,
          $description: description,
          $category: category,
        },
        (err) => {
          if (err) reject(err);
          resolve(transactionId);
        }
      );
    });
  },

  delete: async (transactionId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM Transactions 
        WHERE Transactions.id_transaction = $id;`,
        { $id: transactionId },
        (err) => {
          if (err) reject();
          resolve();
        }
      );
    });
  },
};
