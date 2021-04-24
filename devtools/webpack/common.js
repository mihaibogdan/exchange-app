const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const formatter = require('eslint-formatter-pretty');

const options = {
  mode: process.env.NODE_ENV,
  entry: ['./src/index.tsx'],
  output: {
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['src', 'node_modules'],
    alias: {},
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(ts|tsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};

module.exports = options;
