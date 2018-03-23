const webpack = require('webpack');
const paths = require('./paths');


module.exports = {
  context: paths.appSrc,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@css': paths.appCSS,
      '@js': paths.appJS,
      '@assets': paths.appAssets,
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: []
}
