const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.plugins = [
  new ExtractTextPlugin('[name].bundle.css'),
  new webpack.ProvidePlugin({
    // Promise: 'es6-promise',
    // Fetch: 'whatwg-fetch'
  })
];

config.output = {
  path: path.resolve(__dirname, './'),
  filename: '[name].bundle.js',
  sourceMapFilename: '[name].bundle.js.map',
  publicPath: '/'
};

config.devtool = 'eval-source-map';

config.devServer = {
  contentBase: path.resolve(__dirname, './dist')
};

module.exports = config;
