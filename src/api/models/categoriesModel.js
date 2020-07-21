const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./src/database/database.sqlite");

module.exports = categoriesModel = {
  save: async (category) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Categories (
          name
          ) VALUES (
            $name
          );`,
        { $name: category.name },
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
          id_category as id,
          name 
        FROM Categories`,
        (err, categories) => {
          if (err) reject(err);
          resolve(categories);
        }
      );
    });
  },

  getById: async (categoryId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 
          id_category as id,
          name
         FROM Categories 
         WHERE Categories.id_category = $id;`,
        { $id: categoryId },
        (err, category) => {
          if (err) reject(err);
          resolve(category);
        }
      );
    });
  },

  update: async (categoryId, category) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE Categories SET
          name = $name 
        WHERE Categories.id_category = $id;`,
        { $id: categoryId, $name: category.name },
        function (err) {
          if (err) reject(err);
          resolve(categoryId);
        }
      );
    });
  },

  delete: async (categoryId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM Transactions 
        WHERE Transactions.id_category = $id;`,
        { $id: categoryId },
        (err, category) => {
          if (err) { reject(err); }
          else if (category) { reject(); }
          else {
            db.run(
              `DELETE FROM Categories 
              WHERE Categories.id_category = $id;`,
              { $id: categoryId },
              (err) => {
                if (err) reject(err);
                resolve();
              }
            );
          }
        }
      );
    });
  },
};
