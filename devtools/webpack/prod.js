const { merge } = require('webpack-merge');
const common = require('./common.js');

const prodConfig = merge(common, {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
});

module.exports = prodConfig;
