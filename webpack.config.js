const path = require('path');
const APP_DIR = path.join(__dirname, 'src');
const BUILD_DIR = path.join(__dirname, 'build');

const CONFIG = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ]
  },
};

module.exports = CONFIG;