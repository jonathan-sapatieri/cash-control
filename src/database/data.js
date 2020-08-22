const getDate = () => {
  return new Date().toISOString();
};

const getType = () => {
  const value = Math.ceil(Math.random() * 2);
  if(value === 1) return 'cash-in';
  return 'cash-out'
};

const getAmount = (value) => {
  const amount = Math.random() * value;
  return parseFloat(amount.toFixed(2))
};

const getCategory = (qtdCategories) => {
  return Math.ceil(Math.random() * qtdCategories);
};

module.exports.data = {
  categories: ['Rent', 'Sale', 'Employees', 'Tax', 'Providers'],

  transactions: [
    {
      date: getDate(),
      type: getType(),
      amount: getAmount(1000),
      description: 'Transaction description',
      idCategory: 2,
    },
    {
      date: getDate(),
      type: getType(),
      amount: getAmount(1000),
      description: 'Transaction description',
      idCategory: 4,
    },
    {
      date: getDate(),
      type: getType(),
      amount: getAmount(1000),
      description: 'Transaction description',
      idCategory: 5,
    },
    {
      date: getDate(),
      type: getType(),
      amount: getAmount(1000),
      description: 'Transaction description',
      idCategory: 2,
    }
  ]
};