const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/database.sqlite');

const { migration } = require('./migration');
const { seed } = require('./seed');

function init(db) {
  try {
    migration.createTableCategories(db);
    migration.createTableTransactions(db);
    seed.seedCategories(db);
    seed.seedTransactions(db);
  } catch (err) {
    console.log(err);
  }
};

init(db);