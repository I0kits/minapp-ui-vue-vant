module.exports = {
  devServer: { disableHostCheck: true },
  publicPath: process.env.PUBLIC_PATH ? `/${process.env.PUBLIC_PATH}/` : '',
};
