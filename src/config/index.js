function getDatabase() {
  if(process.env.NODE_ENV == `dev`) {
    return process.env.DB_DEV_SRC
  }
  if(process.env.NODE_ENV == `test`) {
    return process.env.DB_TEST_SRC
  }
  if(process.env.NODE_ENV == `prod`) {
    return process.env.DB_PROD_SRC
  };
};

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database: getDatabase()
};