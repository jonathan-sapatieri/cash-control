require('dotenv').config({path: './src/config/.env'});
const { database } = require('../src/config');

const app = require('../src')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(database);

require('../src/database/');
require('./tests/categoriesTest').categoriesTest(app, db, '/api/categories');
require('./tests/transactionsTest').transactionsTest(app, db, '/api/transactions');
require('./tests/summaryTest').summaryTest(app, db, '/api/summary');



