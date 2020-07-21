const categoriesService = require("../services/categoriesService");

module.exports = categoriesController = {
  save: async (req, res, next) => {
    try {
      const newCategory = await categoriesService.save(req.body);
      res.status(201).json({ categories: [newCategory] });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const categories = await categoriesService.getAll();
      res.status(200).json({ categories: categories });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const category = await categoriesService.getById(req.params.id);
      res.status(200).json({ categories: [category] });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const newCategory = await categoriesService.update(
        req.params.id,
        req.body
      );
      res.status(200).json({ categories: [newCategory] });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      await categoriesService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
