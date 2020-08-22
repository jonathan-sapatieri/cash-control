const { summaryModel } = require("../models/summaryModel");

module.exports.summaryService = {
  getSummary: async () => {
    const currentDate = new Date().toISOString();
    let summary = await summaryModel.getSummaryByDate(currentDate);
    
    summary = await formatJSON(summary);
    return summary;
  },

  getSummaryByDate: async (summaryDate) => {
    let summary = await summaryModel.getSummaryByDate(summaryDate);
    summary = await formatJSON(summary);
    return summary;

    // const err = new Error();
    // err.httpCode = 404;
    // throw err;
  },
};

const formatJSON = async(transactions = []) => {
  let totalCashIn = 0,
      totalCashOut = 0,
      newTransactions = [];

  transactions.forEach((transaction) => {
    if (transaction.type === 'cash-in') {
      totalCashIn += transaction.amount;
    } else {
      totalCashOut += transaction.amount;
    };

    newTransactions.push({
      id: transaction.id,
      date: transaction.date,
      type: transaction.type,
      amount: parseFloat(transaction.amount.toFixed(2)),
      description: transaction.description,
      category: {
        id: transaction.categoryId,
        name: transaction.categoryName,
      },
    });
  });

  return {
    balance: parseFloat((totalCashIn - totalCashOut).toFixed(2)),
    totalCashIn: parseFloat(totalCashIn.toFixed(2)),
    totalCashOut: parseFloat(totalCashOut.toFixed(2)),
    transactions: newTransactions,
  };
};
