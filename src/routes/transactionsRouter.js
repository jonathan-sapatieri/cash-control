const transactionsRouter = require("express").Router();
const { transactionsController } = require("../api/controllers/transactionsController");

transactionsRouter.param('id', transactionsController.paramId);

transactionsRouter.post("/", transactionsController.save);
transactionsRouter.get("/:id", transactionsController.getById);
transactionsRouter.put("/:id", transactionsController.update);
transactionsRouter.delete("/:id", transactionsController.delete);

module.exports = transactionsRouter;
