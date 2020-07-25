module.exports.data = {
  categories: ['Rent', 'Sale', 'Employees', 'Tax', 'Providers'],

  transactions: [
    {
      date: new Date().toISOString(),
      type: "cash-in",
      amount: 99.55,
      description: "Sold a product",
      idCategory: 2,
    },
    {
      date: new Date().toISOString(),
      type: "cash-out",
      amount: 50.45,
      description: "Buying a product",
      idCategory: 5,
    },
    {
      date: new Date().toISOString(),
      type: "cash-out",
      amount: 20.54,
      description: "Electricity bill",
      idCategory: 5,
    }
  ]
};
