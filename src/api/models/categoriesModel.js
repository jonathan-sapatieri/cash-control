const { database } = require('../../config/');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(database);

module.exports.categoriesModel = {
  save: (category) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Categories (name) VALUES ($name);`,
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
        `SELECT id_category as id, name FROM Categories`,
        (err, categories) => {
          if (err) reject(err);
          resolve(categories);
        }
      );
    });
  },

  getById: (idCategory) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT id_category as id, name
         FROM Categories 
         WHERE Categories.id_category = $idCategory;`,
        { $idCategory: idCategory },
        (err, category) => {
          if (err) reject(err);
          resolve(category);
        }
      );
    });
  },

  update: (idCategory, category) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE Categories SET name = $name 
        WHERE Categories.id_category = $idCategory;`,
        { $idCategory: idCategory, $name: category.name },
        (err) => {
          if (err) reject(err);
          resolve(idCategory);
        }
      );
    });
  },

  delete: (idCategory) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM Categories
         WHERE Categories.id_category = $idCategory;`,
        { $idCategory: idCategory },
        (err) => {
          if (err) reject(err);
          resolve();
        });
    });
  },
};
