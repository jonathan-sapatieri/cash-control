const { data } = require("./data");

module.exports.seed = {
  
  seedCategories: async (db) => {
    return new Promise((resolve, reject) => {
      data.categories.forEach((category) => {
        db.run(`INSERT INTO Categories (name) VALUES ($name);`, {
          $name: category,
        });
      });
      resolve();
    });
  },

  seedTransactions: async (db) => {
    return new Promise((resolve, reject) => {
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
      resolve();
    })
  },
};
