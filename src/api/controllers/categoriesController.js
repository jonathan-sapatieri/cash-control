const categoriesService = require("../services/categoriesService");

module.exports = categoriesController = {
  paramId: async(req, res, next, idCategory) => {
    try {
      const category = await categoriesService.getById(idCategory);
      if(category) {
        req.category = category;
        next();
      } else {
        const err = new Error();
        err.httpCode = 404;
        throw err;
      }
    } catch (err) {
      next(err);
    }
  },

  save: async(req, res, next) => {
    try {
      const newCategory = await categoriesService.save(req.body);
      res.status(201).json({ categories: [newCategory] });
    } catch (err) {
      next(err);
    }
  },

  getAll: async(req, res, next) => {
    try {
      const categories = await categoriesService.getAll();
      res.status(200).json({ categories: categories });
    } catch (err) {
      next(err);
    }
  },

  getById: async(req, res, next) => {
    res.status(200).json({ categories: [req.category] });
  },

  update: async(req, res, next) => {
    try {
      const newCategory = await categoriesService.update(req.params.id, req.body);
      res.status(200).json({ categories: [newCategory] });
    } catch (err) {
      next(err);
    }
  },

  delete: async(req, res, next) => {
    try {
      await categoriesService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    };
  },
};
