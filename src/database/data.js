module.exports.data = {
  categories: ['Rent', 'Sale', 'Employees', 'Tax', 'Providers'],

  transactions: [
    {
      date: new Date().toISOString(),
      type: 'cash-in',
      amount: 49.90,
      description: 'Sold a product',
      idCategory: 2,
    },
    {
      date: new Date().toISOString(),
      type: 'cash-out',
      amount: 100.45,
      description: 'Tax payment',
      idCategory: 4,
    },
    {
      date: new Date().toISOString(),
      type: 'cash-out',
      amount: 40.99,
      description: 'Electricity bill',
      idCategory: 5,
    },
    {
      date: new Date().toISOString(),
      type: 'cash-in',
      amount: 125.55,
      description: 'Sold a product',
      idCategory: 2,
    }
  ]
};
