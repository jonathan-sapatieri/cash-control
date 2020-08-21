const { summaryService } = require('../services/summaryService');

module.exports.summaryController = {
  getSummary: async(req, res, next) => {
    try {
      const summary = await summaryService.getSummary();
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  },

  getSummaryByDate: async(req, res, next) => {
    try {
      const summary = await summaryService.getSummaryByDate(req.params.date);
      res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  }
};

