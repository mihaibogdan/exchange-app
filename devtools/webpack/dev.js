const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./common.js');

const devConfig = merge(common, {
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  devtool: 'cheap-module-source-map',
});

module.exports = devConfig;
