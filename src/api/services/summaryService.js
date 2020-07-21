const summaryModel = require("../models/summaryModel");

module.exports = summaryService = {
  getSummary: async () => {
    const currentDate = new Date().toISOString();
    let summary = await summaryModel.getSummaryByDate(currentDate);
    if (summary) {
      summary = await formatJSON(summary);
      return summary;
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  getSummaryByDate: async (summaryDate) => {
    let summary = await summaryModel.getSummaryByDate(summaryDate);
    if(summary.length > 0) {
      summary = await formatJSON(summary);
      return summary;
    }
    const err = new Error();
    err.httpCode = 404;
    throw err;
  },
};

const formatJSON = async (transactions = []) => {
  let totalCashIn = 0, totalCashout = 0, newTransactions = [];

  transactions.forEach((transaction) => {
    if (transaction.type === "cash-in") {
      totalCashIn += transaction.amount;
    } else {
      totalCashout += transaction.amount;
    }

    newTransactions.push({
      id: transaction.id,
      date: transaction.date,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      category: {
        id: transaction.categoryId,
        name: transaction.categoryName,
      },
    });
  });

  return {
    balance: totalCashIn - totalCashout,
    totalCashIn: totalCashIn,
    totalCashout: totalCashout,
    transactions: newTransactions,
  };
};
