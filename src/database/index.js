const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./src/database/database.sqlite");

const { migration } = require("./migration");
const { seed } = require("./seed");

function init(db) {
  const env = process.env.NODE_ENV;

  if(env === 'dev' || env === 'test') {
    try {
      migration.createTableCategories(db);
      migration.createTableTransactions(db);
      seed.seedCategories(db);
      seed.seedTransactions(db);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      migration.createTableCategories(db);
      migration.createTableTransactions(db);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(`Database migrated in ${env} mode.`)
};

init(db);
