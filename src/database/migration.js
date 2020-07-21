const sqlite3 = require('sqlite3');
const db =  new sqlite3.Database('./database.sqlite');

let sql = {};

sql.createTbCategories = `
CREATE TABLE IF NOT EXISTS Categories (
	id_category	INTEGER		NOT NULL,
	name				TEXT			NOT NULL,
	PRIMARY KEY (id_category)
);`;

sql.createTbTransactions = `
CREATE TABLE IF NOT EXISTS Transactions (
	id_transaction	INTEGER NOT NULL,
	date						TEXT		NOT NULL,
	type						TEXT		NOT NULL,
	amount					REAL		NOT NULL,
	description			TEXT		NOT NULL,
	id_category			INTEGER	NOT NULL,
	PRIMARY KEY (id_transaction),
	FOREIGN KEY (id_category) REFERENCES Categories (id_category)
);`;

function sqlError(err) {
	if(err) { console.log(err.message)};
};

db.serialize(() => {
	db.run(sql.createTbCategories, sqlError);
	db.run(sql.createTbTransactions, sqlError);
	db.close();
});