require('dotenv').config({path: './src/config/.env'});

const { database } = require('../config')
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(database);

const { migration } = require('./migration');
const { seed } = require('./seed');

const init = async(db) => {
  console.log(database);
  const env = process.env.NODE_ENV.trim();

  if(env === 'development' || env === 'test') {
    try {
      await migration.createTableCategories(db);
      await migration.createTableTransactions(db);
      await seed.seedCategories(db);
      await seed.seedTransactions(db);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      await migration.createTableCategories(db);
      await migration.createTableTransactions(db);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(`Database migrated in ${env} mode.`)
};

module.exports.init = init;

init(db);
