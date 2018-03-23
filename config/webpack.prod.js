const webpack = require('webpack');
const paths = require('./paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.js');

config.entry = {
  index: paths.appIndexJS
};

config.output = {
  library: 'keykeyjs',
  libraryTarget: 'umd',
  umdNamedDefine: true,
  path: paths.appBuildPath,
  publicPath: '/',
  filename: 'index.js',
  chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
};


config.plugins.push(
  new CleanWebpackPlugin(['build'], {
    verbose: true,
    root: paths.appROOT
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }),
  new webpack.LoaderOptionsPlugin({minimize: true}),
);

module.exports = config;
