const transactionsModel = require("../models/transactionsModel");

module.exports = transactionsService = {
  save: async (transaction) => {
    if (validate(transaction)) {
      const id = await transactionsModel.save(transaction);
      let newTransaction = await transactionsModel.getById(id);
      newTransaction = formatJSON(newTransaction);
      return newTransaction;
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  getById: async (transactionId) => {
    let transaction = await transactionsModel.getById(transactionId);
    if(transaction) {
      transaction = formatJSON(transaction);
      return transaction;
    }
    const err = Error();
    err.httpCode = 404;
    throw err;
  },

  update: async (transactionId, transaction) => {
    if (validate(transaction)) {
      const id = await transactionsModel.update(transactionId, transaction);
      let newTransaction = await transactionsModel.getById(id);
      newTransaction = formatJSON(newTransaction);
      return newTransaction;
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  delete: async (transactionId) => {
    return await transactionsModel.delete(transactionId);
  },
};

const validate = (transaction) => {
  const { date, type, amount, description, category } = transaction;
  if (date && amount && description && category) {
    if (type === "cash-in" || type === "cash-out") return true;
  }
  return false;
};

const formatJSON = (transaction) => {
  return {
    id: transaction.id,
    date: transaction.date,
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description,
    category: {
      id: transaction.categoryName,
      name: transaction.categoryId,
    },
  };
};
