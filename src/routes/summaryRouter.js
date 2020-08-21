const summaryRouter = require('express').Router();
const { summaryController } = require('../api/controllers/summaryController');

summaryRouter.get('/', summaryController.getSummary);
summaryRouter.get('/:date', summaryController.getSummaryByDate);

module.exports = summaryRouter;