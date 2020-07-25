module.exports.migration = {
  createTableCategories: (db) => {
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS Categories;`);
      db.run(
        `CREATE TABLE IF NOT EXISTS Categories (
            id_category	INTEGER		NOT NULL,
            name				TEXT			NOT NULL,
            PRIMARY KEY (id_category)
          );`
      );
    });
  },

  createTableTransactions: (db) => {
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS Transactions`);
      db.run(
        `CREATE TABLE IF NOT EXISTS Transactions (
                id_transaction	INTEGER NOT NULL,
                date						TEXT		NOT NULL,
                type						TEXT		NOT NULL,
                amount					REAL		NOT NULL,
                description			TEXT		NOT NULL,
                id_category			INTEGER	NOT NULL,
                PRIMARY KEY (id_transaction),
                FOREIGN KEY (id_category) REFERENCES Categories (id_category)
          );`
      );
    });
  },
};