const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

let data = {};

data.categories = [ "Rent", "Sale", "Employees", "Tax", "Providers"];

data.transactions = [
  {
    "date": new Date().toISOString(),
    "type": "cash-in",
    "amount": 99.9,
    "description": "Sold a Product",
    "category": 2,
  },
  {
    "date": new Date().toISOString(),
    "type": "cash-out",
    "amount": 50.4,
    "description": "Buying a Product",
    "category": 5,
  }
];

let sql = {};

sql.insertCategories = `
  INSERT INTO Categories (
    name
  ) VALUES (
    $name
  );`;

sql.insertTransactions = `
  INSERT INTO Transactions (
    date, type, amount, description, id_category
  ) VALUES (
    $date, $type, $amount, $description, $idCategory
  );`;

function sqlError(err) {
	if(err) { console.log(err.message)};
};

db.serialize(() => {
  data.categories.forEach((category) => {
    db.run(
      sql.insertCategories, 
      { $name: category }, 
      sqlError
    );
  });

  data.transactions.forEach((transaction) => {
    db.run(
      sql.insertTransactions, 
      {
        $date: transaction.date,
        $type: transaction.type,
        $amount: transaction.amount,
        $description: transaction.description,
        $idCategory: transaction.category
      },
      sqlError
    );
  })
  db.close();
});