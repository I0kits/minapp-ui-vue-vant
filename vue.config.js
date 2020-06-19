require('dotenv').config();

const publicPath = process.env.NODE_ENV === 'production'
  ? `/${process.env.PUBLIC_PATH}/`
  : '';

module.exports = {
  publicPath,
};
