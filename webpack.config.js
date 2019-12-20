/* global __dirname, require, module*/

const path = require('path');
const libraryName = 'attribution-js.min.js';

let plugins = [];

const config = {
  mode: 'production',
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: libraryName
  },
  module: {
    rules: [
      {
        loader:'babel-loader',
        test: /\.js$/,
        exclude:  /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devServer:{
    port: 3000,
    contentBase: __dirname + '/build',
    inline: true
  },
  plugins: plugins,
  optimization: {
    minimize: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    providedExports: true,
    usedExports: true
  }
}
module.exports = config;
