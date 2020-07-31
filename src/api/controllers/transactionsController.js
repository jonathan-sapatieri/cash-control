const { transactionsService } = require("../services/transactionsService");

module.exports.transactionsController = {
  paramId: async(req, res, next, idTransaction) => {
    try {
      const transaction = await transactionsService.getById(idTransaction);
      req.transaction = transaction;
      next();
    } catch(err) {
      next(err);
    };
  },

  save: async(req, res, next) => {
    try {
      const newTransaction = await transactionsService.save(req.body);
      res.status(201).json({ transactions: [newTransaction] });
    } catch (err) {
      next(err);
    };
  },

  getById: async(req, res, next) => {
    res.status(200).json({ transactions: [req.transaction] });
  },

  update: async(req, res, next) => {
    try {
      const newTransaction = await transactionsService.update(
        req.params.id,
        req.body
      );
      res.status(200).json({ transactions: [newTransaction] });
    } catch (err) {
      next(err);
    }
  },

  delete: async(req, res, next) => {
    try {
      await transactionsService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
