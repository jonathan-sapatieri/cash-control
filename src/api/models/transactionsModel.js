const { database } = require('../../config/');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(database);

module.exports.transactionsModel = {
  save: async(transaction) => {
    const { date, type, amount, description, category } = transaction;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Transactions 
          (date, type, amount, description, id_category)
        VALUES
          ($date, $type, $amount, $description, $idCategory);`,
        {
          $date: date,
          $type: type,
          $amount: amount,
          $description: description,
          $idCategory: category,
        },
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  getById: async(idTransaction) => {
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
        WHERE Transactions.id_transaction = $idTransaction;`,
        { $idTransaction: idTransaction },
        (err, transaction) => {
          if(err) reject(err);
          resolve(transaction);
        }
      );
    });
  },

  getByCategory: async(idCategory) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM Transactions 
        WHERE Transactions.id_category = $idCategory`,
        { $idCategory: idCategory },
        (err, transactions) => {
          if (err) reject(err);
          resolve(transactions);
        }
      );
    });
  },

  update: async(idTransaction, transaction) => {
    const { date, type, amount, description, category } = transaction;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE Transactions SET 
            date = $date, 
            type= $type, 
            amount= $amount, 
            description = $description, 
            id_category = $category
        WHERE Transactions.id_transaction = $id;
        `,
        {
          $id: idTransaction,
          $date: date,
          $type: type,
          $amount: amount,
          $description: description,
          $category: category,
        },
        (err) => {
          if (err) reject(err);
          resolve(idTransaction);
        }
      );
    });
  },

  delete: async(idTransaction) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM Transactions 
        WHERE Transactions.id_transaction = $idTransaction;`,
        { $idTransaction: idTransaction },
        (err) => {
          if (err) reject();
          resolve();
        }
      );
    });
  },
};
