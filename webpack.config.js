var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var SERVER_DIR = path.resolve(__dirname, 'src/server');

var config = [
  {
    name: "client",
    entry: APP_DIR + '/index.jsx',
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module : {
      loaders : [
        {
          test : /\.jsx$/,
          exclude:  /(node_modules|bower_components)/,
          loader: 'babel'
        }
      ]
    }
  },
  {
    name: 'server',
    entry: SERVER_DIR + '/express.js',
    target: 'node',
    output: {
      path: __dirname + '/dist/server',
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'] },
        { test:  /\.json$/, loader: 'json-loader' },
      ]
    },
  }
];

module.exports = config;

