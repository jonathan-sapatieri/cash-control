const categoriesModel = require("../models/categoriesModel");

module.exports = categoriesService = {
  save: async (category) => {
    if (validate(category)) {
      const id = await categoriesModel.save(category);
      const newCategory = await categoriesModel.getById(id);
      return newCategory;
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  getAll: async () => {
    return await categoriesModel.getAll();
  },

  getById: async (categoryId) => {
    const category = await categoriesModel.getById(categoryId);
    if(category) return category;
    
    const err = Error();
    err.httpCode = 404;
    throw err;
  },

  update: async (categoryId, category) => {
    if (validate(category)) {
      const id = await categoriesModel.update(categoryId, category);
      const newCategory = await categoriesModel.getById(id);
      return newCategory;
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  delete: async (categoryId) => {
    return await categoriesModel.delete(categoryId);
  },
};

const validate = (category) => {
  const { name } = category;
  if (name) return true;
  return false;
};
