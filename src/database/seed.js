const { data } = require("./data");

module.exports.seed = {
  seedCategories: async (db) => {
    data.categories.forEach((category) => {
      db.run(`INSERT INTO Categories (name) VALUES ($name);`, {
        $name: category,
      });
    });
  },

  seedTransactions: async (db) => {
    data.transactions.forEach((transaction) => {
      db.run(
        `INSERT INTO Transactions 
          (date, type, amount, description, id_category) 
        VALUES
          ($date, $type, $amount, $description, $idCategory);`,
        {
          $date: transaction.date,
          $type: transaction.type,
          $amount: transaction.amount,
          $description: transaction.description,
          $idCategory: transaction.idCategory,
        }
      );
    });
  },
};
