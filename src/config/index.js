function getDatabase() {
  
  const env = process.env.NODE_ENV.trim();

  if(env === 'development') {
    return process.env.DB_DEV_SRC
  }
  if(env === 'test') {
    return process.env.DB_TEST_SRC
  }
  if(env === 'production') {
    return process.env.DB_PROD_SRC
  };
};

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database: getDatabase()
};