const { transactionsModel } = require("../models/transactionsModel");

module.exports.transactionsService = {
  save: async(transaction) => {
    if(validate(transaction)) {
      const idTransaction = await transactionsModel.save(transaction);
      let newTransaction = await transactionsModel.getById(idTransaction);
      newTransaction = await formatJSON(newTransaction);
      return newTransaction;
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  getById: async(idTransaction) => {
    let transaction = await transactionsModel.getById(idTransaction);
    if(transaction) {
      return await formatJSON(transaction);
    } else {
      const err = new Error();
      err.httpCode = 404;
      throw err;
    };
  },

  update: async(idTransaction, transaction) => {
    if(validate(transaction)) {
      const id = await transactionsModel.update(idTransaction, transaction);
      let newTransaction = await transactionsModel.getById(id);
      newTransaction = formatJSON(newTransaction);
      return newTransaction;
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  delete: async (idTransaction) => {
    return await transactionsModel.delete(idTransaction);
  },
};

const validate = (transaction) => {
  const { date, type, amount, description, category } = transaction;
  if (date && amount && description && category.id) {
    if (type === 'cash-in' || type === 'cash-out') {
      return true;
    }
  };
  return false;
};

const formatJSON = async(transaction) => {
  return {
    id: transaction.id,
    date: transaction.date,
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description,
    category: {
      id: transaction.categoryId,
      name: transaction.categoryName,
    },
  };
};
