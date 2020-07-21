const transactionsService = require("../services/transactionsService");

module.exports = transactionsController = {
  save: async (req, res, next) => {
    try {
      const newTransaction = await transactionsService.save(req.body);
      res.status(201).json({ transactions: [newTransaction] });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      let transaction = await transactionsService.getById(req.params.id);
      res.status(200).json({ transactions: [transaction] });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const newTransaction = await transactionsService.update(
        req.params.id,
        req.body
      );
      res.status(200).json({ transactions: [newTransaction] });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      await transactionsService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
