require('dotenv').config();

const {
  DEV_DB_URL,
  TEST_DB_URL,
  PROD_DB_URL
} = process.env;

module.exports = {
  development: {
    dburl: DEV_DB_URL
  },
  test: {
    dburl: TEST_DB_URL
  },
  production: {
    dburl: PROD_DB_URL
  },
};
