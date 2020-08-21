const categoriesRouter = require('express').Router();
const { categoriesController } = require('../api/controllers/categoriesController');

categoriesRouter.param('id', categoriesController.paramId);

categoriesRouter.post('/', categoriesController.save);
categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.get('/:id', categoriesController.getById);
categoriesRouter.put('/:id', categoriesController.update);
categoriesRouter.delete('/:id', categoriesController.delete);

module.exports = categoriesRouter;
