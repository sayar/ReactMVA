var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/js/app.js',
  output: { path: __dirname + '/app/', filename: 'app.min.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};