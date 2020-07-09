const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      filename: '[path].br[query]',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-react', '@babel/preset-env'],
        //   plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-styled-components'],
        // },
      },
    ],
  },
};
