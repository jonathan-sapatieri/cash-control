const categoriesModel = require("../models/categoriesModel");
const transactionsModel = require("../models/transactionsModel");


module.exports = categoriesService = {
  save: async(category) => {
    if (validate(category)) {
      const id = await categoriesModel.save(category);
      return await categoriesModel.getById(id);
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  getAll: async() => {
    return await categoriesModel.getAll();
  },

  getById: async(idCategory) => {
    return await categoriesModel.getById(idCategory);
  },

  update: async(idCategory, category) => {
    if (validate(category)) {
      const id = await categoriesModel.update(idCategory, category);
      return await categoriesModel.getById(id);
    }
    const err = new Error();
    err.httpCode = 400;
    throw err;
  },

  delete: async(idCategory) => {
    const transactions = await transactionsModel.getByCategory(idCategory);
    if(transactions.length > 0) {
      const err = new Error();
      err.httpCode = 405;
      throw err;
    };
    return await categoriesModel.delete(idCategory);
  },
};

const validate = (category) => {
  const { name } = category;
  if (name) return true;
  return false;
};
