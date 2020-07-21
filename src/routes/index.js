const router = require('express').Router();

const categoriesRouter = require('./categoriesRouter');
const transactionsRouter = require('./transactionsRouter');
const summaryRouter = require('./summaryRouter');

router.get('/', (req, res, next) => {
  res.status(200).send('API is running. See documentation for available paths.')
});

router.use('/categories', categoriesRouter);
router.use('/transactions', transactionsRouter);
router.use('/summary', summaryRouter);

router.use((err, req, res, next) => {
  console.log(err);
  if(err.httpCode) {
    res.status(err.httpCode).send();
  } else {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;